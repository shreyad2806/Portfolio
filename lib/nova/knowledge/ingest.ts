import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Chunk, IndexFile, KnowledgeDoc } from "../types";
import { getEmbedder } from "./embedder";
import { chunkDocument, indexText, parseDocument } from "./parse";
import { sha1Hex } from "./text";

export interface IngestOptions {
  root: string;               // project root
  knowledgeDir?: string;      // default nova-knowledge
  full?: boolean;             // ignore the existing index, rebuild everything
  check?: boolean;            // dry run: report whether the index is stale, write nothing
  embedderId?: string;
}
export interface IngestReport {
  discovered: number; processed: number; skipped: number; removed: number;
  chunks: number; embeddings: number; duplicates: number; errors: string[]; stale: boolean; unverified: string[]; todos: number;
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
  const report: IngestReport = { discovered: 0, processed: 0, skipped: 0, removed: 0, chunks: 0, embeddings: 0, duplicates: 0, errors: [], stale: false, unverified: [], todos: 0 };
  const embedder = await getEmbedder(opts.embedderId);

  let prev: IndexFile | null = null;
  if (!opts.full && existsSync(indexPath)) {
    try { prev = JSON.parse(readFileSync(indexPath, "utf8")) as IndexFile; } catch { report.errors.push("existing index unreadable — rebuilding"); }
    if (prev && prev.embedder !== embedder.id) { prev = null; }
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
      report.todos += (raw.match(/TODO\(human\)/g) ?? []).length;
      if (!doc.verified) report.unverified.push(doc.source_path);
    } catch (e) { report.errors.push(`${path.relative(opts.root, f)}: ${(e as Error).message.split("\n")[0]}`); }
  }

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
      docChunks = prevChunks.get(doc.document_id)!; report.skipped++;
    } else {
      report.processed++;
      const raw = chunkDocument(doc);
      const dedupe = new Set<string>();
      docChunks = [];
      for (const c of raw) {
        const key = sha1Hex(c.text);
        if (dedupe.has(key)) { report.duplicates++; continue; }
        dedupe.add(key);
        docChunks.push({ ...c, vector: await embedder.embed(indexText(c)) });
        report.embeddings++;
      }
      if (old) report.stale = true;
      else report.stale = true;
    }
    docChunks = docChunks.filter((c) => { const k = sha1Hex(c.text); if (globalText.has(k)) { report.duplicates++; return false; } globalText.add(k); return true; });
    chunks.push(...docChunks);
    documents.push({ document_id: doc.document_id, title: doc.title, category: doc.category, source_path: doc.source_path, verified: doc.verified, hash: doc.hash, chunks: docChunks.length });
  }
  for (const id of prevDocs.keys()) if (!seen.has(id)) { report.removed++; report.stale = true; }
  report.chunks = chunks.length;

  if (!opts.check) {
    const out: IndexFile = { version: 1, embedder: embedder.id, dims: embedder.dims, built_at: new Date().toISOString(), documents, chunks };
    mkdirSync(kdir, { recursive: true });
    // Only rewrite files when content changed so git diffs stay quiet.
    const next = JSON.stringify({ ...out, built_at: report.stale || !prev ? out.built_at : prev!.built_at });
    if (!existsSync(indexPath) || readFileSync(indexPath, "utf8") !== next) writeFileSync(indexPath, next);
    const manifest = {
      generated_by: "npm run nova:ingest",
      embedder: embedder.id,
      documents: documents.map((d) => ({ id: d.document_id, title: d.title, category: d.category, path: d.source_path, verified: d.verified, chunks: d.chunks, hash: d.hash })),
      totals: { documents: documents.length, chunks: chunks.length, verified: documents.filter((d) => d.verified).length, unverified: documents.filter((d) => !d.verified).length },
    };
    const mnext = JSON.stringify(manifest, null, 2) + "\n";
    const mpath = path.join(kdir, "manifest.json");
    if (!existsSync(mpath) || readFileSync(mpath, "utf8") !== mnext) writeFileSync(mpath, mnext);
  }
  return report;
}
