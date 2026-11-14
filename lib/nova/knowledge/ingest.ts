import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Chunk, IndexFile, KnowledgeDoc } from "../types";
import { hashProvider } from "../embeddings/hash";
import { calibrate } from "../embeddings/calibration";
import { getProvider } from "../embeddings/registry";
import type { EmbeddingProvider, NeuralMeta } from "../embeddings/types";
import { cosine } from "./embedder";
import { chunkDocument, indexText, internalNotes, parseDocument } from "./parse";
import { sha1Hex } from "./text";

export interface IngestOptions {
  root: string;               // project root
  knowledgeDir?: string;      // default nova-knowledge
  full?: boolean;             // ignore the existing index, rebuild everything
  check?: boolean;            // dry run: report whether the index is stale, write nothing
  /** Also build neural vectors with this provider id (e.g. "bge-small-en-v1.5"). Without it, an index that already has neural vectors keeps them when the same model is available. */
  neural?: string;
  /** Test hook: inject a provider instance instead of resolving `neural` from the registry. */
  neuralProvider?: EmbeddingProvider;
  /** Drop neural vectors even if the previous index had them. */
  noNeural?: boolean;
}
export interface IngestReport {
  discovered: number; processed: number; skipped: number; removed: number;
  chunks: number; embeddings: number; duplicates: number; errors: string[]; stale: boolean; unverified: string[]; todos: number;
  /** Verification-policy findings (errors make `--check` fail). */
  neural: { space?: string; embedded: number; reused: number; note?: string };
  policy: { conflicts: number; needsHuman: number; unverifiedRecords: number; errors: string[] };
}

const SUPPORTED = new Set([".md", ".mdx", ".txt", ".pdf"]);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") || name === "index.json" || name === "manifest.json" || name === "faq.json" || name === "sources.json" || name === "README.md") continue;
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (SUPPORTED.has(path.extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

function readText(file: string): string {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".pdf") {
    // Requires poppler's `pdftotext`; reported as an error (not a crash) when unavailable.
    return execFileSync("pdftotext", ["-layout", file, "-"], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
  }
  return readFileSync(file, "utf8");
}

export async function ingest(opts: IngestOptions): Promise<IngestReport> {
  const kdir = path.join(opts.root, opts.knowledgeDir ?? "nova-knowledge");
  const indexPath = path.join(kdir, "index.json");
  const report: IngestReport = { discovered: 0, processed: 0, skipped: 0, removed: 0, chunks: 0, embeddings: 0, duplicates: 0, errors: [], stale: false, unverified: [], todos: 0, neural: { embedded: 0, reused: 0 }, policy: { conflicts: 0, needsHuman: 0, unverifiedRecords: 0, errors: [] } };
  const embedder = hashProvider;   // lexical baseline: always built, so offline retrieval never depends on a model

  let prev: IndexFile | null = null;
  if (!opts.full && existsSync(indexPath)) {
    try { prev = JSON.parse(readFileSync(indexPath, "utf8")) as IndexFile; } catch { report.errors.push("existing index unreadable — rebuilding"); }
    if (prev && prev.embedder !== embedder.id) { prev = null; }
  }
  // ---- Neural space (optional). Same model + revision + pooling + prefix, or nothing: a mixed index would corrupt similarity.
  let neural: EmbeddingProvider | null = null;
  if (!opts.noNeural) {
    const want = opts.neuralProvider?.id ?? opts.neural ?? prev?.neural?.provider;
    if (want) {
      try {
        neural = opts.neuralProvider ?? getProvider(want);
        const h = await neural.healthCheck();
        if (!h.ok) throw new Error(h.detail);
      } catch (e) {
        report.neural.note = `neural embeddings requested (${want}) but unavailable: ${(e as Error).message.slice(0, 140)} — index built with the lexical baseline only`;
        if (opts.neural || opts.neuralProvider) report.errors.push(report.neural.note);
        neural = null;
      }
    }
  }
  if (prev && (prev.neural?.space ?? null) !== (neural?.space ?? null)) {
    // space changed (model/revision/prefix) or neural dropped/added: every chunk must be re-embedded
    for (const c of prev.chunks) delete c.nvector;
    prev = { ...prev, documents: prev.documents.map((d) => ({ ...d, hash: "" })) };
    report.stale = true;
  }
  {
  }
  const prevDocs = new Map((prev?.documents ?? []).map((d) => [d.document_id, d]));
  const prevChunks = new Map<string, Chunk[]>();
  for (const c of prev?.chunks ?? []) prevChunks.set(c.document_id, [...(prevChunks.get(c.document_id) ?? []), c]);

  const files = walk(kdir);
  const extra = path.join(kdir, "sources.json");
  if (existsSync(extra)) {
    try { for (const rel of JSON.parse(readFileSync(extra, "utf8")).sources as string[]) { const p = path.join(opts.root, rel); if (existsSync(p)) files.push(p); else report.errors.push(`sources.json: missing ${rel}`); } }
    catch (e) { report.errors.push("sources.json invalid: " + (e as Error).message); }
  }
  report.discovered = files.length;

  const docs: KnowledgeDoc[] = [];
  for (const f of files) {
    try {
      const rel = path.relative(kdir, f).startsWith("..") ? path.relative(opts.root, f) : path.relative(kdir, f);
      let raw = readText(f);
      if (path.extname(f).toLowerCase() === ".pdf" || path.extname(f).toLowerCase() === ".txt") {
        if (!raw.startsWith("---")) raw = `---\ntitle: ${path.basename(f)}\ncategory: ${rel.split("/")[0] === ".." ? "profile" : "profile"}\nsource: ${rel}\nupdated: ${new Date(statSync(f).mtime).toISOString().slice(0, 10)}\nverified: true\ntags: [resume, source-document]\n---\n\n${raw.replace(/\f/g, "\n").replace(/[ \t]{2,}/g, " ")}`;
      }
      const doc = parseDocument(raw, rel.split(path.sep).join("/"));
      docs.push(doc);
      if (!doc.verified) report.unverified.push(doc.source_path);
    } catch (e) { report.errors.push(`${path.relative(opts.root, f)}: ${(e as Error).message.split("\n")[0]}`); }
  }

  // ---- Verification policy checks.
  try {
    const ver = JSON.parse(readFileSync(path.join(kdir, "verification.json"), "utf8")) as { records: { id: string; status: string; docs: string[]; public_note?: string }[] };
    const paths = new Set(docs.map((d) => d.source_path));
    for (const r of ver.records) {
      if (r.status === "conflict") report.policy.conflicts++;
      if (r.status === "needs-human") report.policy.needsHuman++;
      if (r.status === "unverified") report.policy.unverifiedRecords++;
      for (const d of r.docs) if (!paths.has(d)) report.policy.errors.push(`verification.json: record ${r.id} references missing document ${d}`);
      if (r.status === "conflict" && !r.public_note) report.policy.errors.push(`verification.json: conflict ${r.id} needs a public_note so the conflict is explained to visitors`);
    }
    for (const d of docs) if (!d.verified && !ver.records.some((r) => r.status === "unverified" && r.docs.includes(d.source_path))) report.policy.errors.push(`${d.source_path} is unverified but has no 'unverified' record in verification.json`);
  } catch (e) { report.policy.errors.push("verification.json unreadable: " + (e as Error).message); }
  try {
    const faq = JSON.parse(readFileSync(path.join(kdir, "faq.json"), "utf8")) as { faqs: { id: string; sources: string[]; answer: string }[] };
    for (const f of faq.faqs) {
      if (/TODO\(human\)/i.test(f.answer)) report.policy.errors.push(`faq ${f.id}: contains TODO text`);
      for (const sp of f.sources) { const d = docs.find((x) => x.source_path === sp); if (!d) report.policy.errors.push(`faq ${f.id}: unknown source ${sp}`); else if (!d.verified) report.policy.errors.push(`faq ${f.id}: cites unverified source ${sp}`); }
    }
  } catch (e) { report.policy.errors.push("faq.json unreadable: " + (e as Error).message); }
  report.todos = docs.reduce((n, d) => n + internalNotes(d).todos.length, 0);

  const seen = new Set<string>();
  const globalText = new Set<string>();   // identical chunk text across documents is indexed once (first document wins)
  const chunks: Chunk[] = [];
  const documents: IndexFile["documents"] = [];
  for (const doc of docs) {
    if (seen.has(doc.document_id)) { report.errors.push(`duplicate document id ${doc.document_id}`); continue; }
    seen.add(doc.document_id);
    const old = prevDocs.get(doc.document_id);
    let docChunks: Chunk[];
    if (old && old.hash === doc.hash && prevChunks.has(doc.document_id)) {
      docChunks = prevChunks.get(doc.document_id)!; report.skipped++; report.neural.reused += docChunks.filter((c) => c.nvector).length;
    } else {
      report.processed++;
      const raw = chunkDocument(doc);
      const dedupe = new Set<string>();
      docChunks = [];
      for (const c of raw) {
        const key = sha1Hex(c.text);
        if (dedupe.has(key)) { report.duplicates++; continue; }
        dedupe.add(key);
        const text = indexText(c);
        const nv = neural ? await neural.embedDocument(text) : undefined;
        if (nv) { report.neural.embedded++; }
        docChunks.push({ ...c, vector: await embedder.embedDocument(text), ...(nv ? { nvector: nv } : {}) });
        report.embeddings++;
      }
      if (old) report.stale = true;
      else report.stale = true;
    }
    for (const c of docChunks) if (/TODO\(human\)/i.test(c.text)) report.policy.errors.push(`${c.chunk_id}: TODO(human) leaked into a public chunk`);
    docChunks = docChunks.filter((c) => { const k = sha1Hex(c.text); if (globalText.has(k)) { report.duplicates++; return false; } globalText.add(k); return true; });
    chunks.push(...docChunks);
    documents.push({ document_id: doc.document_id, title: doc.title, category: doc.category, source_path: doc.source_path, verified: doc.verified, hash: doc.hash, chunks: docChunks.length });
  }
  for (const id of prevDocs.keys()) if (!seen.has(id)) { report.removed++; report.stale = true; }
  report.chunks = chunks.length;

  if (!opts.check) {
    let neuralMeta: NeuralMeta | undefined;
    if (neural) {
      const withV = chunks.filter((c) => c.nvector);
      neuralMeta = {
        space: neural.space, provider: neural.id, model: neural.model, revision: neural.revision, dims: neural.dims,
        pooling: "cls+l2norm", query_prefix: neural.kind === "neural" ? "bge-instruction" : "", built_at: prev?.neural?.space === neural.space && !report.stale ? prev.neural.built_at : new Date().toISOString(),
        calibration: calibrate(withV.map((c) => c.nvector!), withV.map((c) => c.document_id), cosine),
      };
      report.neural.space = neural.space;
    }
    const out: IndexFile = { version: 1, embedder: embedder.id, dims: embedder.dims, built_at: new Date().toISOString(), ...(neuralMeta ? { neural: neuralMeta } : {}), documents, chunks };
    mkdirSync(kdir, { recursive: true });
    // Only rewrite files when content changed so git diffs stay quiet.
    const next = JSON.stringify({ ...out, built_at: report.stale || !prev ? out.built_at : prev!.built_at });
    if (!existsSync(indexPath) || readFileSync(indexPath, "utf8") !== next) writeFileSync(indexPath, next);
    const manifest = {
      generated_by: "npm run nova:ingest",
      embedder: embedder.id,
      neural: neuralMeta ? { space: neuralMeta.space, model: neuralMeta.model, revision: neuralMeta.revision, dims: neuralMeta.dims } : null,
      documents: documents.map((d) => ({ id: d.document_id, title: d.title, category: d.category, path: d.source_path, verified: d.verified, chunks: d.chunks, hash: d.hash })),
      totals: { documents: documents.length, chunks: chunks.length, verified: documents.filter((d) => d.verified).length, unverified: documents.filter((d) => !d.verified).length },
    };
    const mnext = JSON.stringify(manifest, null, 2) + "\n";
    const mpath = path.join(kdir, "manifest.json");
    if (!existsSync(mpath) || readFileSync(mpath, "utf8") !== mnext) writeFileSync(mpath, mnext);
  }
  return report;
}
