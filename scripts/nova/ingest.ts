import path from "node:path";
import { ingest } from "../../lib/nova/knowledge/ingest";

const args = process.argv.slice(2);
const flag = (n: string) => args.includes(`--${n}`);
const embedderArg = args.find((a) => a.startsWith("--embedder="))?.split("=")[1];

(async () => {
  const r = await ingest({ root: path.resolve(__dirname, "../.."), full: flag("full"), check: flag("check"), embedderId: embedderArg });
  console.log("Nova knowledge ingestion");
  console.log("  documents discovered :", r.discovered);
  console.log("  documents processed  :", r.processed);
  console.log("  documents skipped    :", r.skipped, "(unchanged)");
  console.log("  documents removed    :", r.removed);
  console.log("  chunks (total)       :", r.chunks);
  console.log("  embeddings generated :", r.embeddings);
  console.log("  duplicate chunks     :", r.duplicates);
  console.log("  unverified documents :", r.unverified.length, r.unverified.length ? `(${r.unverified.join(", ")})` : "");
  console.log("  TODO(human) markers  :", r.todos);
  console.log("  errors               :", r.errors.length);
  r.errors.forEach((e) => console.log("    -", e));
  if (flag("check") && r.stale) { console.error("Index is STALE — run `npm run nova:ingest`."); process.exit(1); }
  if (r.errors.length) process.exitCode = 1;
})();
