/**
 * One-off helper: turns lib/project-detail-data.ts (the portfolio's case-study data)
 * into Markdown knowledge documents under nova-knowledge/projects/.
 * Re-run after editing case-study data:  npx tsx scripts/nova/generate-project-docs.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { projectDataMap } from "../../lib/project-detail-data";

const OUT = path.join(process.cwd(), "nova-knowledge", "projects");
mkdirSync(OUT, { recursive: true });
const today = new Date().toISOString().slice(0, 10);

/** Hand-written, source-attributed additions that must survive regeneration. */
const SUPPLEMENTS: Record<string, { resume?: string[]; notes?: string[] }> = {
  complytai: {
    resume: [
      "Resume title: \"ComplytAI – Financial Compliance and Risk Intelligence\". Stack on the resume: Python, FastAPI, Next.js, CrewAI, Pinecone, RAG, Ollama, Qwen2.5.",
      "A five-agent CrewAI workflow for financial document analysis, anti-money laundering (AML), compliance assessment, risk auditing and executive report synthesis.",
      "Pinecone-based RAG using semantic retrieval, embeddings, Pydantic-validated outputs, confidence scoring and evidence citations for traceable compliance findings.",
      "Automated executive PDF report generation with risk scores, compliance gaps, audit flags, recommendations and supporting document evidence.",
    ],
    notes: [
      "The portfolio case study (above) and the resume describe the same project with different emphasis: the case study lists nomic-embed-text and PostgreSQL, the resume lists a five-agent workflow and PDF reports. They do not contradict each other, but neither names the five agents individually; Nova must not name them. (record: complytai-agents)",
      "Case-study \"Results\" are qualitative labels (e.g. \"Production\", \"End-to-End\"), not measured metrics. Nova must not present them as metrics or claim a production deployment. (record: complytai-results)",
    ],
  },
};

const TITLE: Record<string, string> = { "lawgpt-crm": "LawGPT CRM" };

for (const [slug, p] of Object.entries(projectDataMap)) {
  const name = TITLE[slug] ?? p.name;
  const tags = [slug, p.name.toLowerCase(), ...p.techStack.map((t) => t.toLowerCase())].map((t) => t.replace(/[,\]]/g, ""));
  const md = [
    "---",
    `title: ${name}`,
    "category: projects",
    SUPPLEMENTS[slug]?.resume ? "source: portfolio case study (lib/project-detail-data.ts) + resume (approved)" : "source: portfolio case study (lib/project-detail-data.ts)",
    `updated: ${today}`,
    "verified: true",
    `tags: [${tags.join(", ")}]`,
    "---",
    "",
    `# ${name}`,
    "",
    `**One-liner:** ${p.oneLiner}`,
    "",
    `**Stack:** ${p.techStack.join(", ")}`,
    `**GitHub:** ${p.github}`,
    `**Case study page:** /projects/${p.slug}`,
    "",
    p.description,
    "",
    `## ${p.problem.title}`,
    ...p.problem.points.map((x) => `- ${x}`),
    "",
    "## Architecture",
    ...p.architecture.steps.map((s, i) => `${i + 1}. **${s.label}** — ${s.description}`),
    "",
    "## Features",
    ...p.features.map((f) => `- **${f.title}:** ${f.description}`),
    "",
    "## Engineering decisions",
    ...p.decisions.map((d) => `- **Problem:** ${d.problem} **Decision:** ${d.decision} **Why:** ${d.why}`),
    "",
    "## Challenges",
    ...p.challenges.map((c) => `- **Problem:** ${c.problem} **Solution:** ${c.solution} **Learning:** ${c.learning}`),
    "",
    "## Results",
    ...p.results.map((r) => `- **${r.label}: ${r.value}.** ${r.description}`),
    "",
    "## Learnings",
    ...p.learnings.map((l) => `- **${l.title}:** ${l.description}`),
    "",
    ...(SUPPLEMENTS[slug]?.resume ? ["## From her resume (approved source)", ...SUPPLEMENTS[slug].resume!.map((x) => `- ${x}`), ""] : []),
    "## Verification notes (internal)",
    "- Generated from lib/project-detail-data.ts (the portfolio case study). Case-study statements are the owner's own portfolio content; they have not been independently checked against the repository.",
    ...(SUPPLEMENTS[slug]?.notes ?? []).map((x) => `- ${x}`),
    "",
  ].join("\n");
  writeFileSync(path.join(OUT, `${slug}.md`), md);
  console.log("wrote", slug);
}
