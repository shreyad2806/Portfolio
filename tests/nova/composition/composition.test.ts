import { describe, expect, it } from "vitest";
import { FakeProvider, makeNova } from "../helpers";

const mk = () => makeNova([new FakeProvider("g", () => "x", false)]).nova;
async function convo(qs: string[]) {
  const nova = mk(); let state = {}; const out = [];
  for (const q of qs) { const r = await nova.run({ message: q, history: [], state }); state = r.state; out.push(r); }
  return out;
}
const sentences = (t: string) => t.split(/(?<=[.!?])\s+/).filter(Boolean).length;

describe("response levels", () => {
  it("project overview: compact, built-with line, details only when technical notes exist", async () => {
    const [r] = await convo(["Explain CloseLoop"]);
    expect(r.level).toBe("overview"); expect(r.text).toMatch(/Built with:/); expect(r.text.length).toBeLessThan(900); expect(r.details?.markdown).toMatch(/Architecture/);
  });
  it("architecture: numbered steps in the answer, deeper notes in details", async () => {
    const [r] = await convo(["How does CloseLoop work?"]);
    expect(r.level).toBe("architecture"); expect(r.text).toMatch(/\n1\. /); expect(r.details).toBeTruthy();
  });
  it("technologies question names the stack", async () => {
    const [r] = await convo(["What technologies does ComplytAI use?"]);
    expect(r.level).toBe("technologies"); expect(r.text).toMatch(/CrewAI/);
  });
  it("internships: separate entries per role", async () => {
    const [r] = await convo(["What did she do at LawGPT?"]);
    expect(r.level).toBe("internship"); expect(r.text).toMatch(/AI Engineer Intern — LawGPT/); expect(r.text).not.toMatch(/StartupCrafters/);
  });
  it("simple question: short answer (≤4 sentences) from evidence, not a document dump", async () => {
    const [r] = await convo(["Explain Kavach", ].concat([]));
    const r2 = (await convo(["Explain Kavach", "What happens if authorization fails?"]))[1];
    expect(sentences(r2.text)).toBeLessThanOrEqual(4); expect(r2.text).toMatch(/fail-closed/i); expect(r.text.length).toBeGreaterThan(0);
  });
  it("never dumps raw chunk markup (One-liner:/Stack:/GitHub:)", async () => {
    for (const q of ["Tell me about Kavach", "What is VisionGuard?", "Describe the Falcon Airlines architecture", "What did she do at StartupCrafters?"]) {
      const [r] = await convo([q]); expect(r.text, q).not.toMatch(/One-liner:|^Stack:|GitHub:|Period:/m);
    }
  });
});

describe("comparison uses evidence from both projects", () => {
  it("cites both documents, lists each stack, details for both", async () => {
    const [r] = await convo(["Compare CloseLoop and Kavach"]);
    expect(r.level).toBe("comparison"); expect(r.sources.map((s) => s.path).sort()).toEqual(expect.arrayContaining(["projects/closeloop.md", "projects/kavach.md"]));
    expect(r.text).toMatch(/Shared: Python, FastAPI/); expect(r.text).toMatch(/LangGraph/); expect(r.text).toMatch(/Bedrock/);
    expect(r.details?.markdown).toMatch(/### CloseLoop[\s\S]*### Kavach/);
  });
  it("does not invent: a technology missing from one project is reported as not mentioned", async () => {
    const r = (await convo(["Compare CloseLoop and Kavach", "Which one uses PostgreSQL?"]))[1];
    expect(r.text).toMatch(/Kavach: not mentioned in her notes/); expect(r.text).toMatch(/CloseLoop: its stack lists PostgreSQL/);
  });
});

describe("follow-up intelligence", () => {
  it("Explain Kavach → why two agents → what if authorization fails: all stay on Kavach", async () => {
    const rs = await convo(["Explain Kavach", "Why does it use two agents?", "What happens if authorization fails?"]);
    for (const r of rs) { expect(r.state.project).toBe("kavach"); expect(r.sources.map((s) => s.path)).toEqual(["projects/kavach.md"]); }
    expect(rs[1].text).toMatch(/don't spell out the reasoning/i);   // honest: the notes don't say why
    expect(rs[2].text).toMatch(/fail-closed/i);
  });
  it("a topic switch leaves the project", async () => {
    const rs = await convo(["Explain Kavach", "What did she do at StartupCrafters?"]);
    expect(rs[1].state.project).toBeUndefined(); expect(rs[1].text).toMatch(/StartupCrafters/);
    const w = await convo(["Explain Kavach", "Who is Shreya?"]); expect(w[1].mode).toBe("faq");
  });
  it("off-topic text does not stick to the active project", async () => {
    const rs = await convo(["Explain Kavach", "What is the capital of Mongolia?"]);
    expect(rs[1].mode).toBe("abstain");
  });
  it("switching to another named project", async () => {
    const rs = await convo(["Explain Kavach", "And CloseLoop?"]);
    expect(rs[1].state.project).toBe("closeloop");
  });
  it("project the notes don't cover yields an honest 'not covered'", async () => {
    const r = (await convo(["Tell me about VisionGuard", "What accuracy does it reach?"]))[1];
    expect(r.text).not.toMatch(/\d+%/);
  });
});

describe("ambiguous employer / project names", () => {
  it("LawGPT alone asks which one", async () => {
    const [r] = await convo(["Tell me about LawGPT"]);
    expect(r.text).toMatch(/Internship[\s\S]*Project/); expect(r.suggestions.length).toBe(2);
  });
  it("LawGPT CRM is the project; LawGPT internship is the role", async () => {
    expect((await convo(["What is the LawGPT CRM project?"]))[0].state.project).toBe("lawgpt-crm");
    expect((await convo(["What was her role at the LawGPT internship?"]))[0].level).toBe("internship");
  });
  it("unknown employers abstain and never confirm employment (incl. Razorpay)", async () => {
    for (const q of ["Did she work at Razorpay?", "Tell me about her Google internship", "Has she interned at Microsoft?"]) {
      const [r] = await convo([q]); expect(r.mode, q).toBe("abstain"); expect(r.text).toMatch(/StartupCrafters/); expect(r.text).not.toMatch(/she (worked|interned) at (Razorpay|Google|Microsoft)/i);
    }
  });
});
