import { portfolioData } from "@/lib/portfolio-data";
import { experienceData, type ExperienceItem } from "@/data/experience";
import { FLAGSHIP, DETAIL_SLUGS } from "@/lib/flagship";

/**
 * Scene content is derived from the site's existing sources (portfolio-data, data/experience, flagship metadata).
 * Nothing here invents skills, proficiency levels, metrics or architecture details.
 */

/* Basecamp ------------------------------------------------------------------------------------------------------- */
export const PROFILE = {
  name: portfolioData.personal.name,
  role: portfolioData.personal.role,
  subtitle: portfolioData.personal.subtitle,
  description: portfolioData.personal.description,
  // Source: approved resume (see nova-knowledge/education/vit.md).
  education: { school: "Vellore Institute of Technology (VIT)", degree: "B.Tech, Computer Science and Engineering", dates: "Sep 2023 – May 2027" },
};
export const SKILL_DOMAINS = portfolioData.technicalExpertise;

/* Build Lab ------------------------------------------------------------------------------------------------------ */
export const FEATURED_IDS = ["closeloop", "kavach", "complytai", "visionguard"] as const;
export interface WorldProject {
  id: string; name: string; subtitle: string; description: string; tech: string[]; github: string; caseStudy?: string;
  stat?: { value: string; label: string }; tone: string;
}
const TONES: Record<string, string> = { closeloop: "#78e5bd", kavach: "#b49aff", complytai: "#66e9f4", visionguard: "#f58dc8" };
export const FEATURED: WorldProject[] = FEATURED_IDS.map((id) => {
  const p = portfolioData.projects.find((x) => x.id === id)!;
  const f = FLAGSHIP[id];
  return { id, name: p.name, subtitle: f?.subtitle ?? "Computer vision · ML", description: p.description, tech: p.tech, github: p.github, caseStudy: DETAIL_SLUGS.has(id) ? `/projects/${id}` : undefined, stat: f ? { value: f.stat.value, label: f.stat.label } : undefined, tone: TONES[id] };
});
export const OTHER_PROJECTS = portfolioData.projects.filter((p) => !(FEATURED_IDS as readonly string[]).includes(p.id)).map((p) => ({ id: p.id, name: p.name, href: DETAIL_SLUGS.has(p.id) ? `/projects/${p.id}` : p.github, external: !DETAIL_SLUGS.has(p.id) }));
/** GitHub URL → featured project id (lets Nova's project links open the in-world panel). */
export const FEATURED_BY_GITHUB: Record<string, string> = Object.fromEntries(FEATURED.map((p) => [p.github.toLowerCase(), p.id]));

/* Journey: one source of truth = data/experience.ts ------------------------------------------------------------------ */
const byId = (id: string) => experienceData.find((e) => e.id === id) as ExperienceItem;
export const JOURNEY_GROUPS: { label: string; tone: string; items: ExperienceItem[] }[] = [
  { label: "Experience", tone: "#ffc46e", items: ["startupcrafters-intern", "lawgpt-intern", "bluestock-intern"].map(byId) },
  { label: "Hackathons", tone: "#ffe29a", items: ["et-genai", "sih"].map(byId) },
  { label: "Leadership & community", tone: "#ffa94d", items: ["technomech-president", "rtc-member"].map(byId) },
];

/* Frontier ------------------------------------------------------------------------------------------------------- */
export const EXPLORING_NOW = portfolioData.currentlyExploring;
/** Mirrors the owner-verified interests list (nova-knowledge/interests/technical-interests.md). Interests, not claims of mastery. */
export const INTERESTS = ["Generative AI and LLMs", "Agentic AI and multi-agent workflows", "RAG and knowledge retrieval", "Inference engineering and optimization", "AI infrastructure", "Backend engineering", "Distributed systems and system design", "Production-grade software systems"];
export const BUILDING_NOW = (byId("current").highlights ?? []);
export const JOURNAL = portfolioData.developerJournal;

/* Connection ----------------------------------------------------------------------------------------------------- */
export const CONTACT = portfolioData.contact;
export const RESUME = portfolioData.personal.resume;
