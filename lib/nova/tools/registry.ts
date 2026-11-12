import { portfolioData } from "@/lib/portfolio-data";
import { DETAIL_SLUGS } from "@/lib/flagship";
import type { NavAction } from "../types";

/**
 * Deterministic navigation + tool registry. The model may *suggest* a tool; the application validates the
 * id against these whitelists and builds the href itself. Model-generated URLs are never used.
 */
export interface Destination { id: string; name: string; blurb: string; href: string; section?: string }

export const DESTINATIONS: Destination[] = [
  { id: "basecamp", name: "The Basecamp", blurb: "Profile and skills", href: "/", section: "skills" },
  { id: "buildlab", name: "The Build Lab", blurb: "Projects", href: "/projects", section: "projects" },
  { id: "journey", name: "The Journey", blurb: "Experience and achievements", href: "/experience", section: "journey" },
  { id: "frontier", name: "The Frontier", blurb: "Technical explorations and the Journal", href: "/journal", section: "focus" },
  { id: "connection", name: "The Connection Hub", blurb: "Contact", href: "/contact", section: "contact" },
];

export interface ProjectInfo { id: string; name: string; aliases: string[]; href: string; github?: string; hasCaseStudy: boolean; oneLiner: string }

const ALIASES: Record<string, string[]> = {
  closeloop: ["closeloop", "razorpay"],
  kavach: ["kavach", "agentshield"],
  complytai: ["complytai", "complyai"],
  visionguard: ["visionguard"],
  talentlens: ["talentlens"],
  architectiq: ["architectiq"],
  devforge: ["devforge"],
  thumblyai: ["thumblyai"],
  "ai-tech-stack-recommender": ["stackmind", "tech stack recommender", "ai tech stack"],
  "lawgpt-crm": ["lawgpt crm", "legal crm"],
  "falcon-airlines": ["falcon airlines", "falcon"],
  "reflex-ninja": ["reflex ninja"],
  kodexa: ["kodexa"],
};

export const PROJECTS: ProjectInfo[] = (() => {
  const list: ProjectInfo[] = portfolioData.projects.map((p) => ({
    id: p.id, name: p.name, aliases: ALIASES[p.id] ?? [p.id], hasCaseStudy: DETAIL_SLUGS.has(p.id),
    href: DETAIL_SLUGS.has(p.id) ? `/projects/${p.id}` : p.github || "/projects", github: p.github,
    oneLiner: p.description.split(/(?<=\.)\s/)[0],
  }));
  const extra: [string, string][] = [["ai-tech-stack-recommender", "AI Tech Stack Recommender"], ["lawgpt-crm", "LawGPT CRM"], ["falcon-airlines", "Falcon Airlines"], ["reflex-ninja", "Reflex Ninja"], ["kodexa", "Kodexa"], ["thumblyai", "THUMBLYAI"]];
  for (const [id, name] of extra) if (!list.some((p) => p.id === id)) list.push({ id, name, aliases: ALIASES[id] ?? [id], hasCaseStudy: DETAIL_SLUGS.has(id), href: DETAIL_SLUGS.has(id) ? `/projects/${id}` : "/projects", oneLiner: "" });
  return list;
})();

export const RESUME_HREF = portfolioData.contact.resume;
export const CONTACT = {
  email: portfolioData.personal.email,
  linkedin: portfolioData.contact.linkedin,
  github: portfolioData.contact.github,
};

const EXTERNAL_ALLOW = [CONTACT.github, CONTACT.linkedin, "https://github.com/shreyad2806/"];

/** navigate_to_section(section_id) */
export function navigateToSection(id: string): NavAction | null {
  const d = DESTINATIONS.find((x) => x.id === id);
  return d ? { type: "navigate", id: d.id, label: d.name, href: d.section && d.href === "/" ? `/#${d.section}` : d.href } : null;
}
/** get_project_information(project_id) */
export function getProjectInformation(id: string): ProjectInfo | null { return PROJECTS.find((p) => p.id === id) ?? null; }
export function projectAction(id: string): NavAction | null {
  const p = getProjectInformation(id);
  if (!p) return null;
  const external = p.href.startsWith("http");
  return { type: "link", label: p.hasCaseStudy ? `${p.name} case study` : `${p.name} on GitHub`, href: p.href, external };
}
/** get_resume_link() */
export function getResumeLink(): NavAction { return { type: "link", label: "Open resume", href: RESUME_HREF }; }
/** get_contact_information() */
export function getContactInformation() {
  return { email: CONTACT.email, linkedin: CONTACT.linkedin, github: CONTACT.github, actions: [
    { type: "link", label: "Email Shreya", href: `mailto:${CONTACT.email}`, external: true },
    { type: "link", label: "LinkedIn", href: CONTACT.linkedin, external: true },
    { type: "link", label: "GitHub", href: CONTACT.github, external: true },
  ] as NavAction[] };
}

export function detectProject(text: string): string | null {
  const t = text.toLowerCase().replace(/[^a-z0-9 ]/g, " ");
  let best: { id: string; len: number } | null = null;
  for (const p of PROJECTS) for (const a of [...p.aliases, p.name.toLowerCase()]) {
    const needle = a.toLowerCase();
    if (new RegExp(`(^|\\s)${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`).test(t) && (!best || needle.length > best.len)) best = { id: p.id, len: needle.length };
  }
  return best?.id ?? null;
}
export function detectAllProjects(text: string): string[] {
  const t = text.toLowerCase().replace(/[^a-z0-9 ]/g, " ");
  return PROJECTS.filter((p) => [...p.aliases, p.name.toLowerCase()].some((a) => new RegExp(`(^|\\s)${a.toLowerCase()}(\\s|$)`).test(t))).map((p) => p.id);
}

/** Validate a model- or client-supplied action: only whitelisted ids / known internal paths / allow-listed hosts survive. */
export function isSafeHref(href: string): boolean {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  if (href.startsWith("mailto:")) return href === `mailto:${CONTACT.email}`;
  return EXTERNAL_ALLOW.some((p) => href.startsWith(p));
}
