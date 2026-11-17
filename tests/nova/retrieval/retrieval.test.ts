import { describe, expect, it } from "vitest";
import { retriever } from "../helpers";

const top = async (q: string, o = {}) => (await retriever.search(q, o)).hits.map((h) => h.chunk.document_id);

describe("retrieval", () => {
  it.each([
    ["What is CloseLoop?", "closeloop"],
    ["How does Kavach detect prompt injection?", "kavach"],
    ["Tell me about VisionGuard", "visionguard"],
    ["Which university is she at? VIT degree", "education-vit"],
    ["What did she do at StartupCrafters?", "startupcrafters"],
  ])("%s → doc containing %s in top results", async (q, id) => {
    const ids = (await top(q)).slice(0, 3);
    expect(ids.some((d) => d.includes(id))).toBe(true);
  });
  it("applies the project filter", async () => {
    const ids = await top("architecture", { projectId: "closeloop" });
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.every((d) => d.endsWith("closeloop"))).toBe(true);
  });
  it("applies the category filter", async () => {
    const ids = await top("Python", { categories: ["skills"] });
    expect(ids.every((d) => d.includes("skills"))).toBe(true);
  });
  it("dedupes and respects topK and context budget", async () => {
    const r = await retriever.search("projects", { topK: 3, maxContextChars: 1200 });
    expect(r.hits.length).toBeLessThanOrEqual(3);
    expect(r.hits.reduce((s, h) => s + h.chunk.text.length, 0)).toBeLessThanOrEqual(1200 + 900);
    expect(new Set(r.hits.map((h) => h.chunk.chunk_id)).size).toBe(r.hits.length);
  });
  it("gives low confidence to out-of-scope queries", async () => {
    for (const q of ["What is the capital of Mongolia?", "Explain quantum chromodynamics", "best pizza recipe"]) {
      expect((await retriever.search(q)).confidence).toBeLessThan(0.34);
    }
  });
  it("gives high confidence to in-scope queries", async () => {
    expect((await retriever.search("What is CloseLoop and how does it work?")).confidence).toBeGreaterThan(0.34);
  });
  it("exposes diagnostics", async () => {
    const r = await retriever.search("kavach");
    expect(r.diagnostics.embedder).toBeTruthy();
    expect(r.diagnostics.candidates).toBeGreaterThan(0);
  });
});
