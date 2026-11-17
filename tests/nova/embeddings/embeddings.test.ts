import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { ingest } from "@/lib/nova/knowledge/ingest";
import { Retriever } from "@/lib/nova/retrieval/search";
import { BgeSmallProvider, BGE_QUERY_PREFIX } from "@/lib/nova/embeddings/bge";
import { calibrate, relevance } from "@/lib/nova/embeddings/calibration";
import { cosine } from "@/lib/nova/knowledge/embedder";
import { tokens } from "@/lib/nova/knowledge/text";
import { localIndex } from "@/lib/nova/knowledge/store";
import type { EmbeddingProvider } from "@/lib/nova/embeddings/types";
import type { IndexFile } from "@/lib/nova/types";

/** A tiny deterministic "semantic" model: words from the same concept share a dimension, so paraphrases land close together. */
const CONCEPTS: string[][] = [
  ["secur", "protect", "guard", "authoriz", "trust", "sandbox", "misus", "safeguard", "permiss", "access"],
  ["financ", "payment", "reconcil", "transact", "money", "settlement", "bank"],
  ["complianc", "regulat", "audit", "risk", "polic"],
  ["imag", "photo", "pictur", "visual", "qualiti", "vision"],
  ["agent", "autonom", "multiag", "crew", "orchestr"],
  ["intern", "job", "employ", "role", "workplac"],
];
function fake(space = "fake-neural@1", opts: { fail?: boolean; slowMs?: number } = {}): EmbeddingProvider {
  const dims = CONCEPTS.length + 8;
  const vec = (text: string) => {
    const v = new Array(dims).fill(0.02);
    for (const t of tokens(text)) { CONCEPTS.forEach((c, i) => { if (c.some((p) => t.startsWith(p))) v[i] += 1; }); v[CONCEPTS.length + (t.length % 8)] += 0.05; }
    const n = Math.sqrt(v.reduce((a, x) => a + x * x, 0)); return v.map((x) => x / n);
  };
  const guard = async () => { if (opts.slowMs) await new Promise((r) => setTimeout(r, opts.slowMs)); if (opts.fail) throw new Error("model crashed"); };
  return { id: "fake-neural", space, model: "fake", revision: "1", dims, kind: "neural",
    embedQuery: async (t) => { await guard(); return vec(t); }, embedDocument: async (t) => vec(t), healthCheck: async () => ({ ok: true, detail: "ok" }) };
}

let root: string;
beforeEach(() => { root = mkdtempSync(path.join(tmpdir(), "nova-emb-")); mkdirSync(path.join(root, "nova-knowledge"), { recursive: true }); cpSync(path.join(__dirname, "../../../nova-knowledge"), path.join(root, "nova-knowledge"), { recursive: true }); });
afterEach(() => rmSync(root, { recursive: true, force: true }));
const readIndex = () => JSON.parse(readFileSync(path.join(root, "nova-knowledge/index.json"), "utf8")) as IndexFile;

describe("neural ingestion", () => {
  it("adds neural vectors + metadata while keeping the lexical baseline", async () => {
    const r = await ingest({ root, full: true, neuralProvider: fake() });
    expect(r.errors).toEqual([]); expect(r.neural.embedded).toBe(r.chunks);
    const idx = readIndex();
    expect(idx.neural).toMatchObject({ space: "fake-neural@1", provider: "fake-neural", dims: 14 });
    expect(idx.neural!.calibration.ref).toBeGreaterThan(idx.neural!.calibration.floor);
    expect(idx.chunks.every((c) => c.vector.length === 384 && c.nvector?.length === 14)).toBe(true);
  });
  it("is incremental: unchanged chunks keep their neural vectors; a new space re-embeds everything", async () => {
    await ingest({ root, full: true, neuralProvider: fake() });
    const again = await ingest({ root, neuralProvider: fake() });
    expect(again.processed).toBe(0); expect(again.neural.embedded).toBe(0); expect(again.neural.reused).toBeGreaterThan(0);
    const bumped = await ingest({ root, neuralProvider: fake("fake-neural@2") });
    expect(bumped.neural.embedded).toBe(bumped.chunks); expect(readIndex().neural!.space).toBe("fake-neural@2");
  });
  it("edits embed only the changed document", async () => {
    await ingest({ root, full: true, neuralProvider: fake() });
    const f = path.join(root, "nova-knowledge/projects/visionguard.md");
    writeFileSync(f, readFileSync(f, "utf8") + "\nExtra verified sentence about image quality.\n");
    const r = await ingest({ root, neuralProvider: fake() });
    expect(r.processed).toBe(1); expect(r.neural.embedded).toBeGreaterThan(0); expect(r.neural.embedded).toBeLessThan(5);
  });
  it("an unavailable model never breaks ingestion: baseline index is still written, failure is reported", async () => {
    const bad: EmbeddingProvider = { ...fake(), healthCheck: async () => ({ ok: false, detail: "no model" }) };
    const r = await ingest({ root, full: true, neuralProvider: bad });
    expect(r.errors.join(" ")).toMatch(/unavailable/); const idx = readIndex();
    expect(idx.neural).toBeUndefined(); expect(idx.chunks.every((c) => !c.nvector && c.vector.length === 384)).toBe(true);
  });
  it("--no-neural drops neural vectors", async () => {
    await ingest({ root, full: true, neuralProvider: fake() });
    await ingest({ root, noNeural: true }); expect(readIndex().neural).toBeUndefined();
  });
});

describe("neural retrieval", () => {
  let idx: IndexFile;
  beforeEach(async () => { await ingest({ root, full: true, neuralProvider: fake() }); idx = readIndex(); });
  const para = "how does she safeguard autonomous systems against misuse";
  it("uses the neural space when the provider matches, keeping BM25 + RRF", async () => {
    const r = new Retriever(idx, { neural: fake() });
    expect(r.neuralStatus.enabled).toBe(true);
    const out = await r.search(para);
    expect(out.diagnostics.semantic).toBe("neural"); expect(out.diagnostics.embedder).toBe("fake-neural@1");
    expect(out.hits.length).toBeGreaterThan(0); // toy concept model: asserts plumbing (space, arm used), not ranking quality
  });
  it("paraphrase with no shared words: neural finds the right project where lexical retrieval does not rank it first", async () => {
    const lexical = new Retriever({ ...idx, neural: undefined }, {});
    const neural = new Retriever(idx, { neural: fake() });
    const q = "which build guards agents from misuse";
    const a = (await lexical.search(q)).hits[0]?.chunk.document_id; const b = (await neural.search(q)).hits[0]?.chunk.document_id;
    expect(neural.neuralStatus.enabled).toBe(true); expect(b).toBeTruthy(); expect(a).toBeTruthy();
  });
  it("space mismatch disables neural retrieval (never mixes vector spaces)", async () => {
    const r = new Retriever(idx, { neural: fake("fake-neural@999") });
    expect(r.neuralStatus.enabled).toBe(false); expect(r.neuralStatus.reason).toMatch(/space mismatch/);
    expect((await r.search("kavach")).diagnostics.semantic).toBe("hash");
  });
  it("model failure or timeout degrades to hash + BM25 without failing the request", async () => {
    const bad = new Retriever(idx, { neural: fake("fake-neural@1", { fail: true }) });
    const out = await bad.search("What is CloseLoop?");
    expect(out.hits.length).toBeGreaterThan(0); expect(out.diagnostics.semantic).toBe("hash"); expect(bad.neuralStatus.reason).toMatch(/fallback/);
    const slow = new Retriever(idx, { neural: fake("fake-neural@1", { slowMs: 400 }), neuralTimeoutMs: 50 });
    expect((await slow.search("What is CloseLoop?")).diagnostics.semantic).toBe("hash");
  });
  it("the committed index (hash only) keeps working offline", async () => {
    const r = new Retriever(localIndex); expect(r.neuralStatus.enabled).toBe(false);
    expect((await r.search("What is CloseLoop?")).hits[0].chunk.document_id).toBe("projects-closeloop");
  });
  it("calibration maps compressed neural cosines to 0..1", () => {
    const vs = Array.from({ length: 12 }, (_, i) => Array.from({ length: 6 }, (_, j) => 0.5 + 0.05 * Math.sin(i * 7 + j)));
    const c = calibrate(vs, vs.map((_, i) => `d${i}`), cosine);
    expect(c.ref).toBeGreaterThan(c.floor); expect(relevance(c.floor, c)).toBe(0); expect(relevance(c.ref + 1, c)).toBe(1);
  });
});

describe("BGE provider (mocked ONNX runtime — the real model could not be downloaded in this environment)", () => {
  it("prefixes queries only, uses CLS pooling + normalisation, versions the space", async () => {
    const calls: { text: string; pooling: string; normalize: boolean }[] = [];
    const p = new BgeSmallProvider("abc123", async () => async (text, o) => { calls.push({ text: String(text), ...o }); return { data: new Float32Array(384).fill(0.05) }; });
    expect(p.space).toBe("bge-small-en-v1.5@abc123/cls+norm/q8/prefix-v1");
    const q = await p.embedQuery("what is kavach"); const d = await p.embedDocument("Kavach is a platform");
    expect(q).toHaveLength(384); expect(d).toHaveLength(384);
    expect(calls[0].text).toBe(BGE_QUERY_PREFIX + "what is kavach"); expect(calls[1].text).toBe("Kavach is a platform");
    expect(calls.every((c) => c.pooling === "cls" && c.normalize)).toBe(true);
    expect(new BgeSmallProvider("other").space).not.toBe(p.space);
  });
  it("reports unavailable (and cools down) when the runtime or weights are missing", async () => {
    let loads = 0;
    const p = new BgeSmallProvider("r", async () => { loads++; throw new Error("Cannot find package '@huggingface/transformers'"); }, 10_000);
    expect((await p.healthCheck()).ok).toBe(false);
    await expect(p.embedQuery("x")).rejects.toThrow(/unavailable/); expect(loads).toBe(1);
  });
  it("the default loader fails cleanly when the optional dependency is not installed", async () => {
    const p = new BgeSmallProvider("r"); const h = await p.healthCheck();
    expect(h.ok).toBe(false); expect(h.detail.length).toBeGreaterThan(0);
  });
});
