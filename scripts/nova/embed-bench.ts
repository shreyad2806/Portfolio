/**
 * `npm run nova:embed:bench` — compare the offline hash embedder with BAAI/bge-small-en-v1.5 on the eval retrieval set.
 * If the neural model or its runtime is unavailable (no `@huggingface/transformers`, no network/weights) the neural run is
 * reported as SKIPPED with the reason — numbers are never invented. Heuristic, self-authored question set.
 */
import { Retriever } from "../../lib/nova/retrieval/search";
import { localIndex } from "../../lib/nova/knowledge/store";
import { ingest } from "../../lib/nova/knowledge/ingest";
import { BgeSmallProvider } from "../../lib/nova/embeddings/bge";
import { cpSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import type { IndexFile } from "../../lib/nova/types";

const SET: { q: string; docs: string[] }[] = [
  { q: "how do her agents stay safe", docs: ["projects-kavach"] },
  { q: "what's the reconciliation thing she made", docs: ["projects-closeloop"] },
  { q: "which project uses several cooperating agents", docs: ["projects-complytai"] },
  { q: "is there a project about checking image quality", docs: ["projects-visionguard"] },
  { q: "what school is she at", docs: ["education-vit"] },
  { q: "what languages can she code in", docs: ["skills-technical-skills"] },
  { q: "what is she into lately", docs: ["interests-technical-interests"] },
  { q: "any hackathon wins", docs: ["achievements-hackathons"] },
  { q: "where did she intern", docs: ["experience-startupcrafters", "experience-lawgpt"] },
  { q: "which build guards agents from misuse", docs: ["projects-kavach"] },
  { q: "airline booking project", docs: ["projects-falcon-airlines"] },
  { q: "legal AI work", docs: ["experience-lawgpt"] },
];

async function score(r: Retriever, K = 5) {
  let rec = 0, rr = 0, ms = 0;
  for (const it of SET) {
    const t = Date.now(); const out = await r.search(it.q); ms += Date.now() - t;
    const ranked: string[] = []; for (const h of out.hits) if (!ranked.includes(h.chunk.document_id)) ranked.push(h.chunk.document_id);
    rec += ranked.slice(0, K).filter((d) => it.docs.includes(d)).length / it.docs.length;
    const f = ranked.findIndex((d) => it.docs.includes(d)); rr += f >= 0 ? 1 / (f + 1) : 0;
  }
  return { recallAtK: rec / SET.length, mrr: rr / SET.length, avgMs: ms / SET.length };
}
const fmt = (x: { recallAtK: number; mrr: number; avgMs: number }) => `Recall@5 ${(x.recallAtK * 100).toFixed(1)}%  MRR ${x.mrr.toFixed(3)}  avg ${x.avgMs.toFixed(1)}ms/query`;

(async () => {
  console.log(`Embedding benchmark — ${SET.length} paraphrase queries (self-authored, heuristic)\n`);
  const hash = new Retriever({ ...localIndex, neural: undefined } as IndexFile);
  console.log("hash-384-v1 + BM25 :", fmt(await score(hash)));
  const bge = new BgeSmallProvider();
  const health = await bge.healthCheck();
  if (!health.ok) { console.log(`bge-small-en-v1.5  : SKIPPED — ${health.detail}\n  Install with: npm i -D @huggingface/transformers   (weights download on first use; set NOVA_EMBED_MODEL_DIR for offline)`); return; }
  const tmp = mkdtempSync(path.join(tmpdir(), "nova-bench-"));
  try {
    cpSync(path.join(process.cwd(), "nova-knowledge"), path.join(tmp, "nova-knowledge"), { recursive: true });
    const rep = await ingest({ root: tmp, full: true, neuralProvider: bge });
    if (rep.errors.length) { console.log("bge-small-en-v1.5  : SKIPPED —", rep.errors.join("; ")); return; }
    const idx = JSON.parse(readFileSync(path.join(tmp, "nova-knowledge/index.json"), "utf8")) as IndexFile;
    console.log("bge-small + BM25   :", fmt(await score(new Retriever(idx, { neural: bge }))));
  } finally { rmSync(tmp, { recursive: true, force: true }); }
})();
