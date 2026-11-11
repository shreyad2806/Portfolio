import type { Chunk, Hit, IndexFile, Retrieval } from "../types";
import { cosine, getEmbedder, hashEmbed, type Embedder } from "../knowledge/embedder";
import { isStopword, normalize, stem, tokens } from "../knowledge/text";

export interface SearchOptions {
  topK?: number;
  /** Restrict to these categories (metadata filter). */
  categories?: string[];
  /** Restrict to documents whose id ends with this project slug (e.g. "closeloop"). */
  projectId?: string;
  maxContextChars?: number;
  /** Chunks with a combined score below this fraction of the best are dropped. */
  relativeCutoff?: number;
}

const IGNORED_NAMES = new Set(["shreya", "dubey", "nova", "ai", "explorer", "hey", "hello", "can", "could", "does", "did", "has", "have", "show", "tell", "what", "which", "where", "when", "why", "how"]);

interface Row { chunk: Chunk; toks: string[]; tf: Map<string, number>; set: Set<string>; len: number }

/** Hybrid retriever: BM25 keyword search + cosine similarity, fused with reciprocal-rank fusion. */
export class Retriever {
  private rows: Row[];
  private df = new Map<string, number>();
  private avgdl = 1;
  private byId = new Map<string, Row>();
  private named = new Set<string>();
  private embedder: Embedder | null = null;
  readonly embedderId: string;

  constructor(private index: IndexFile, embedder?: Embedder) {
    this.embedderId = index.embedder;
    this.embedder = embedder ?? (index.embedder === "hash-384-v1" ? { id: "hash-384-v1", dims: index.dims, embed: async (t) => hashEmbed(t, index.dims) } : null);
    this.rows = index.chunks.map((chunk) => {
      // Field weighting: body text counts 1, the section heading 2, document title/tags 0.35 — tags are shared by every
      // chunk of a document, so weighting them fully would drown the discriminative body terms.
      const tf = new Map<string, number>();
      const add = (txt: string, w: number) => { for (const t of tokens(txt)) tf.set(t, (tf.get(t) ?? 0) + w); };
      const body = tokens(chunk.text);
      add(chunk.text, 1); add(chunk.section_heading, 2); add(`${chunk.title} ${chunk.tags.join(" ")}`, 0.35);
      return { chunk, toks: body, tf, set: new Set(tf.keys()), len: body.length + 1 };
    });
    for (const r of this.rows) { this.byId.set(r.chunk.chunk_id, r); for (const t of tokens(`${r.chunk.title} ${r.chunk.tags.join(" ")}`)) this.named.add(t); }
    for (const r of this.rows) for (const t of r.set) this.df.set(t, (this.df.get(t) ?? 0) + 1);
    this.avgdl = this.rows.reduce((s, r) => s + r.len, 0) / Math.max(1, this.rows.length);
  }

  get size() { return this.rows.length; }

  private async queryVector(q: string): Promise<number[] | null> {
    if (!this.embedder) { try { this.embedder = await getEmbedder(this.index.embedder); } catch { return null; } }
    return this.embedder.embed(q);
  }

  private bm25(q: string[], r: Row): number {
    const N = this.rows.length, k1 = 1.4, b = 0.75;
    let s = 0;
    for (const t of new Set(q)) {
      const f = r.tf.get(t);
      if (!f) continue;
      const df = this.df.get(t) ?? 0;
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
      s += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * r.len) / this.avgdl)));
    }
    return s;
  }

  async search(query: string, opts: SearchOptions = {}): Promise<Retrieval> {
    const t0 = Date.now();
    const topK = opts.topK ?? 5;
    const qTokens = tokens(query);
    const terms = [...new Set(qTokens)];
    let rows = this.rows;
    let filterDesc: string | undefined;
    if (opts.projectId) {
      const f = rows.filter((r) => r.chunk.document_id.endsWith(`-${opts.projectId}`) || r.chunk.tags.includes(opts.projectId!));
      if (f.length) { rows = f; filterDesc = `project=${opts.projectId}`; }
    }
    if (opts.categories?.length) {
      const f = rows.filter((r) => opts.categories!.includes(r.chunk.category));
      if (f.length) { rows = f; filterDesc = (filterDesc ? filterDesc + "," : "") + `category=${opts.categories.join("|")}`; }
    }
    const qv = await this.queryVector(normalize(query));
    const scored = rows.map((r) => {
      const bm = terms.length ? this.bm25(terms, r) : 0;
      const cos = qv && r.chunk.vector.length ? cosine(qv, r.chunk.vector) : 0;
      const hit = terms.filter((t) => r.set.has(t)).length;
      return { r, bm, cos, coverage: terms.length ? hit / terms.length : 0 };
    });
    // Reciprocal-rank fusion of the two rankings.
    const byBm = [...scored].sort((a, b) => b.bm - a.bm);
    const byCos = [...scored].sort((a, b) => b.cos - a.cos);
    const rrf = new Map<Row, number>();
    byBm.forEach((s, i) => s.bm > 0 && rrf.set(s.r, (rrf.get(s.r) ?? 0) + 1 / (60 + i)));
    byCos.forEach((s, i) => rrf.set(s.r, (rrf.get(s.r) ?? 0) + 0.8 / (60 + i)));
    const maxRrf = Math.max(...rrf.values(), 1e-9);
    const maxBm = Math.max(...scored.map((s) => s.bm), 1e-9);

    let ranked: Hit[] = scored
      .map((s) => ({
        chunk: s.r.chunk,
        bm25: s.bm,
        cosine: s.cos,
        coverage: s.coverage,
        score: 0.6 * ((rrf.get(s.r) ?? 0) / maxRrf) + 0.25 * (s.bm / maxBm) + 0.15 * Math.max(0, s.cos) + (s.r.chunk.verified ? 0.02 : 0),
      }))
      .sort((a, b) => b.score - a.score);

    // Duplicate removal + relevance cutoff + context budget.
    const kept: Hit[] = [];
    let chars = 0;
    const cutoff = (ranked[0]?.score ?? 0) * (opts.relativeCutoff ?? 0.45);
    for (const h of ranked) {
      if (kept.length >= topK) break;
      if (h.score < cutoff) break;
      const set = new Set(tokens(h.chunk.text));
      const dup = kept.some((k) => {
        const ks = new Set(tokens(k.chunk.text));
        let inter = 0; for (const t of set) if (ks.has(t)) inter++;
        return inter / Math.max(1, Math.min(set.size, ks.size)) > 0.85;
      });
      if (dup) continue;
      if (chars + h.chunk.text.length > (opts.maxContextChars ?? 5200) && kept.length) break;
      kept.push(h); chars += h.chunk.text.length;
    }
    ranked = kept;

    const best = ranked[0];
    // Confidence reflects retrieval evidence, never the model's own certainty: IDF-weighted share of the query's terms that the
    // top passages jointly cover (rare terms such as a project name count more than "architecture"), plus similarity of the best hit.
    const idf = (t: string) => Math.log(1 + (this.rows.length - (this.df.get(t) ?? 0) + 0.5) / ((this.df.get(t) ?? 0) + 0.5));
    const top = ranked.slice(0, 3);
    const covered = new Set<string>();
    for (const h of top) { const r = this.byId.get(h.chunk.chunk_id); if (r) for (const t of terms) if (r.set.has(t)) covered.add(t); }
    const wAll = terms.reduce((s, t) => s + idf(t), 0) || 1;
    const wCov = [...covered].reduce((s, t) => s + idf(t), 0) / wAll;
    // A capitalised name the passages never mention ("her Google internship") means the question is about something we don't hold.
    const missingEntities = (query.match(/(?<=\s)[A-Z][A-Za-z0-9+#.]{2,}/g) ?? [])
      .filter((w) => !IGNORED_NAMES.has(w.toLowerCase().replace(/\.$/, "")))
      .filter((w) => {
        const st = tokens(w);
        if (!st.length) return false;
        if (st.every((t) => this.named.has(t))) return false;   // the name identifies a document/tag in the corpus (a project, employer, …)
        const rest = terms.filter((t) => !st.includes(t));
        const restW = rest.reduce((x, t) => x + idf(t), 0);
        // The name must appear in a passage that also covers (most of) the rest of the question — otherwise it is a coincidental match.
        return !top.some((h) => { const r = this.byId.get(h.chunk.chunk_id); return !!r && st.every((t) => r.set.has(t)) && (restW === 0 || rest.reduce((x, t) => x + (r.set.has(t) ? idf(t) : 0), 0) / restW >= 0.5); });
      });
    const base = best ? 0.7 * wCov + 0.3 * Math.min(1, Math.max(0, best.cosine) / 0.45) : 0;
    // When the question names a project, retrieval is already scoped to that project's verified notes; within that small
    // scope, generic words ("work", "use") are naturally absent, so a named project sets a floor rather than abstaining.
    const scoped = filterDesc?.startsWith("project=") && best ? Math.max(base, 0.42) : base;
    const confidence = Math.min(1, missingEntities.length ? scoped * 0.45 : scoped);
    return {
      hits: ranked, confidence,
      diagnostics: { missingEntities, queryTerms: terms, candidates: scored.filter((s) => s.bm > 0 || s.cos > 0.1).length, kept: ranked.length, durationMs: Date.now() - t0, embedder: this.embedderId, filter: filterDesc },
    };
  }
}

export { isStopword, stem };
