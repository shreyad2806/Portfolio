import path from "node:path";
import { ingest } from "../../lib/nova/knowledge/ingest";

const args = process.argv.slice(2);
const flag = (n: string) => args.includes(`--${n}`);
const neuralArg = flag("neural") ? "bge-small-en-v1.5" : args.find((a) => a.startsWith("--neural="))?.split("=")[1];

(async () => {
  const r = await ingest({ root: path.resolve(__dirname, "../.."), full: flag("full"), check: flag("check"), neural: neuralArg, noNeural: flag("no-neural") });
  console.log("Nova knowledge ingestion");
  console.log("  documents discovered :", r.discovered);
  console.log("  documents processed  :", r.processed);
  console.log("  documents skipped    :", r.skipped, "(unchanged)");
  console.log("  documents removed    :", r.removed);
  console.log("  chunks (total)       :", r.chunks);
  console.log("  embeddings generated :", r.embeddings, "(lexical baseline)");
  console.log("  neural embeddings    :", r.neural.space ? `${r.neural.embedded} new, ${r.neural.reused} reused — space ${r.neural.space}` : "none" + (r.neural.note ? ` — ${r.neural.note}` : ""));
  console.log("  duplicate chunks     :", r.duplicates);
  console.log("  unverified documents :", r.unverified.length, r.unverified.length ? `(${r.unverified.join(", ")})` : "");
  console.log("  TODO(human) markers  :", r.todos);
  console.log("  policy               :", `${r.policy.conflicts} conflicts, ${r.policy.needsHuman} needs-human, ${r.policy.unverifiedRecords} unverified records, ${r.policy.errors.length} violations`);
  r.policy.errors.forEach((e) => console.log("    ! policy:", e));
  console.log("  errors               :", r.errors.length);
  r.errors.forEach((e) => console.log("    -", e));
  if (flag("check") && r.stale) { console.error("Index is STALE — run `npm run nova:ingest`."); process.exit(1); }
  if (r.errors.length || r.policy.errors.length) process.exitCode = 1;
})();
