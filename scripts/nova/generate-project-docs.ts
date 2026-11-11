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

for (const [slug, p] of Object.entries(projectDataMap)) {
  const tags = [slug, p.name.toLowerCase(), ...p.techStack.map((t) => t.toLowerCase())].map((t) => t.replace(/[,\]]/g, ""));
  const md = [
    "---",
    `title: ${p.name} — ${p.oneLiner}`.replace(/\n/g, " "),
    "category: projects",
    "source: lib/project-detail-data.ts (portfolio case study)",
    `updated: ${today}`,
    "verified: true",
    `tags: [${tags.join(", ")}]`,
    "---",
    "",
    `# ${p.name}`,
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
  ].join("\n");
  writeFileSync(path.join(OUT, `${slug}.md`), md);
  console.log("wrote", slug);
}
