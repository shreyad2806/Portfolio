import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { ingest } from "@/lib/nova/knowledge/ingest";

const doc = (title: string, body: string, verified = true) => `---\ntitle: ${title}\ncategory: projects\nsource: test\nlast_updated: 2026-01-01\nverified: ${verified}\ntags: [a, b]\n---\n# ${title}\n\n${body}\n`;
let root: string;
const k = () => path.join(root, "nova-knowledge");
beforeEach(() => { root = mkdtempSync(path.join(tmpdir(), "nova-")); mkdirSync(path.join(k(), "projects"), { recursive: true }); });
afterEach(() => rmSync(root, { recursive: true, force: true }));

describe("ingestion", () => {
  it("indexes markdown and txt, reports counts, writes index+manifest", async () => {
    writeFileSync(path.join(k(), "projects/a.md"), doc("Alpha", "## Overview\nAlpha is a system.\n\n## Stack\nPython and FastAPI."));
    writeFileSync(path.join(k(), "projects/b.txt"), "Plain text note about Beta.");
    const r = await ingest({ root });
    expect(r.discovered).toBe(2); expect(r.processed).toBe(2); expect(r.errors).toEqual([]);
    expect(r.chunks).toBeGreaterThanOrEqual(2); expect(r.embeddings).toBe(r.chunks);
    expect(existsSync(path.join(k(), "index.json"))).toBe(true);
    expect(existsSync(path.join(k(), "manifest.json"))).toBe(true);
    const idx = JSON.parse(readFileSync(path.join(k(), "index.json"), "utf8"));
    expect(idx.chunks[0]).toMatchObject({ document_id: expect.any(String), chunk_id: expect.any(String), source_path: expect.any(String), verified: true });
  });
  it("is incremental: unchanged docs are skipped, changed ones reprocessed", async () => {
    const f = path.join(k(), "projects/a.md");
    writeFileSync(f, doc("Alpha", "First."));
    await ingest({ root });
    const again = await ingest({ root });
    expect(again.processed).toBe(0); expect(again.skipped).toBe(1);
    writeFileSync(f, doc("Alpha", "Changed body."));
    const third = await ingest({ root });
    expect(third.processed).toBe(1);
  });
  it("removes deleted documents from the index", async () => {
    const f = path.join(k(), "projects/a.md");
    writeFileSync(f, doc("Alpha", "x")); writeFileSync(path.join(k(), "projects/b.md"), doc("Beta", "y"));
    await ingest({ root });
    rmSync(f);
    const r = await ingest({ root });
    expect(r.removed).toBe(1);
    const idx = JSON.parse(readFileSync(path.join(k(), "index.json"), "utf8"));
    expect(idx.documents.map((d: { title: string }) => d.title)).toEqual(["Beta"]);
  });
  it("does not duplicate identical content", async () => {
    writeFileSync(path.join(k(), "projects/a.md"), doc("Alpha", "Same body text here."));
    writeFileSync(path.join(k(), "projects/a-copy.md"), doc("Alpha", "Same body text here."));
    const r = await ingest({ root });
    const idx = JSON.parse(readFileSync(path.join(k(), "index.json"), "utf8"));
    expect(new Set(idx.chunks.map((c: { text: string }) => c.text)).size).toBe(idx.chunks.length);
    expect(r.duplicates + idx.documents.length).toBeGreaterThanOrEqual(1);
  });
  it("--check reports staleness without writing", async () => {
    writeFileSync(path.join(k(), "projects/a.md"), doc("Alpha", "x"));
    const r = await ingest({ root, check: true });
    expect(r.stale).toBe(true); expect(existsSync(path.join(k(), "index.json"))).toBe(false);
    await ingest({ root });
    expect((await ingest({ root, check: true })).stale).toBe(false);
  });
  it("flags unverified docs", async () => {
    writeFileSync(path.join(k(), "projects/a.md"), doc("Alpha", "x", false));
    expect((await ingest({ root })).unverified.length).toBe(1);
  });
});
