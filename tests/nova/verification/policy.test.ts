import { describe, expect, it } from "vitest";
import { localIndex } from "@/lib/nova/knowledge/store";
import { FAQS } from "@/lib/nova/knowledge/faq";
import { VERIFICATION, publicNotes } from "@/lib/nova/knowledge/verification";
import { chunkDocument, internalNotes, parseDocument } from "@/lib/nova/knowledge/parse";
import { FakeProvider, makeNova, retriever } from "../helpers";

const offline = () => makeNova([new FakeProvider("gemini", () => "x", false)]).nova;
const run = (q: string, state = {}) => offline().run({ message: q, history: [], state });

describe("verification policy", () => {
  it("1. TODO(human) never appears in any chunk, FAQ answer or public answer", async () => {
    expect(localIndex.chunks.some((c) => /TODO\(human\)/i.test(c.text))).toBe(false);
    expect(FAQS.some((f) => /TODO/i.test(f.answer))).toBe(false);
    for (const q of ["Tell me about VisionGuard", "What is CloseLoop?", "Explain the Kavach architecture", "What are her contact details?", "Does she contribute to open source?"]) {
      const r = await run(q); expect(JSON.stringify(r)).not.toMatch(/TODO/i);
    }
  });
  it("chunker skips internal notes and strips stray TODO lines", () => {
    const doc = parseDocument("---\ntitle: T\ncategory: projects\nverified: true\n---\n# T\nPublic fact.\nTODO(human): secret\n## Verification notes (internal)\n- hidden note\n## Later\nMore public text that is long enough to be its own chunk of text.", "projects/t.md");
    const text = chunkDocument(doc).map((c) => c.text).join("\n");
    expect(text).toContain("Public fact."); expect(text).toContain("More public text");
    expect(text).not.toMatch(/TODO|hidden note/);
    expect(internalNotes(doc)).toEqual({ notes: ["hidden note"], todos: ["TODO(human): secret"] });
  });
  it("2. unverified chunks are never retrieved as evidence", async () => {
    for (const q of ["Tell me about THUMBLYAI", "Bluestock internship latency", "President of Technomech Club", "open source contributions scope"]) {
      const r = await retriever.search(q, { topK: 8 });
      expect(r.hits.every((h) => h.chunk.verified)).toBe(true);
    }
  });
  it("2. an unverified match yields a controlled abstention that states nothing", async () => {
    for (const q of ["Tell me about THUMBLYAI", "What did she do at Bluestock?", "Is she the president of Technomech club?"]) {
      const r = await run(q);
      expect(r.mode, q).toBe("abstain"); expect(r.sources).toHaveLength(0);
      expect(r.text).toMatch(/haven't been verified|don't have verified/i);
      expect(r.text).not.toMatch(/latency|president of|REST API/i);
    }
  });
  it("3. conflicts are disclosed, not merged: ET GenAI year and LawGPT title", async () => {
    const hack = await run("What are her hackathon results?");
    expect(hack.text).toMatch(/2025/); expect(hack.notes?.join(" ")).toMatch(/2026/);
    const law = await run("What was her role at LawGPT?");
    expect(law.text + (law.notes ?? []).join(" ")).toMatch(/AI Engineer Intern/);
    expect(law.notes?.join(" ")).toMatch(/AI Research Intern/);
  });
  it("3. internship answers disclose the unverified Bluestock role without stating details", async () => {
    const r = await run("What internships has she done?");
    expect(r.notes?.join(" ")).toMatch(/Bluestock/); expect(r.text).not.toMatch(/Bluestock/); expect(r.text).not.toMatch(/latency/i);
  });
  it("4/5. no unsupported campus, phone number or Razorpay claim anywhere in the index or FAQ", () => {
    const all = JSON.stringify(localIndex.chunks.map((c) => c.text)) + JSON.stringify(FAQS);
    expect(all).not.toMatch(/Bhopal/i); expect(all).not.toMatch(/\+?\d[\d\s-]{9,}\d/);
    expect(all).not.toMatch(/employ(ed)? (at|by) razorpay/i);
  });
  it("verification records are well-formed and point at real documents", () => {
    const paths = new Set(localIndex.documents.map((d) => d.source_path));
    for (const r of VERIFICATION.records) { for (const d of r.docs) expect(paths.has(d), `${r.id}:${d}`).toBe(true); if (r.status === "conflict") expect(r.public_note).toBeTruthy(); }
    for (const d of localIndex.documents.filter((x) => !x.verified)) expect(VERIFICATION.records.some((r) => r.status === "unverified" && r.docs.includes(d.source_path)), d.source_path).toBe(true);
  });
  it("public notes never leak internal fields", () => {
    const n = publicNotes(["experience/lawgpt.md", "achievements/hackathons.md"]).join(" ");
    expect(n).not.toMatch(/data\/experience|action_for_human|record:/i);
  });
});
