import type { Chunk, Hit, NavAction, Source } from "../types";
import { DESTINATIONS, PROJECTS, getContactInformation, getResumeLink, isSafeHref, navigateToSection, projectAction } from "../tools/registry";

export function sourceHref(c: Chunk): string | undefined {
  if (c.document_id.startsWith("projects-")) {
    const id = c.document_id.slice("projects-".length);
    return PROJECTS.find((p) => p.id === id)?.href;
  }
  if (c.category === "experience" || c.category === "achievements") return "/experience";
  if (c.category === "contact") return "/contact";
  return "/";
}

export function sourcesFrom(hits: Hit[]): Source[] {
  const seen = new Set<string>();
  const out: Source[] = [];
  for (const h of hits) {
    if (seen.has(h.chunk.document_id)) continue;
    seen.add(h.chunk.document_id);
    out.push({ title: h.chunk.title.replace(/\s[—-]\s.*$/, "") , path: h.chunk.source_path, section: h.chunk.section_heading || undefined, href: sourceHref(h.chunk), verified: h.chunk.verified });
  }
  return out;
}

export function actionsFromHits(hits: Hit[]): NavAction[] {
  const out: NavAction[] = [];
  const ids = new Set<string>();
  for (const h of hits) if (h.chunk.document_id.startsWith("projects-")) {
    const id = h.chunk.document_id.slice(9);
    if (!ids.has(id)) { ids.add(id); const a = projectAction(id); if (a) out.push(a); }
  }
  const cat = hits[0]?.chunk.category;
  const nav = cat === "experience" || cat === "achievements" ? "journey" : cat === "projects" ? "buildlab" : cat === "contact" ? "connection" : cat === "interests" ? "frontier" : cat === "skills" || cat === "profile" || cat === "education" ? "basecamp" : null;
  if (nav) { const a = navigateToSection(nav); if (a) out.push(a); }
  return dedupeActions(out).slice(0, 3);
}

export function dedupeActions(a: NavAction[]): NavAction[] {
  const seen = new Set<string>();
  return a.filter((x) => (seen.has(x.href) ? false : (seen.add(x.href), isSafeHref(x.href))));
}

export function faqActions(spec: { nav?: string; resume?: boolean; contact?: boolean }[]): NavAction[] {
  const out: NavAction[] = [];
  for (const s of spec) {
    if (s.nav) { const a = navigateToSection(s.nav); if (a) out.push(a); }
    if (s.resume) out.push(getResumeLink());
    if (s.contact) out.push(...getContactInformation().actions);
  }
  return dedupeActions(out);
}

/** Parse + validate tool markers the model may append. Unknown ids are discarded; markers never reach the visitor. */
export function extractMarkers(text: string): { clean: string; actions: NavAction[] } {
  const actions: NavAction[] = [];
  const clean = text.replace(/\[\[\s*([a-z_]+)(?::\s*([a-z0-9-]+))?\s*\]\]/gi, (_, tool: string, arg?: string) => {
    const t = tool.toLowerCase();
    if (actions.length < 2) {
      if (t === "nav" && arg && DESTINATIONS.some((d) => d.id === arg)) { const a = navigateToSection(arg); if (a) actions.push(a); }
      else if (t === "project" && arg) { const a = projectAction(arg); if (a) actions.push(a); }
      else if (t === "resume") actions.push(getResumeLink());
      else if (t === "contact") actions.push(...getContactInformation().actions.slice(0, 1));
    }
    return "";
  }).replace(/\[\[[^\]]*\]\]/g, "")        // unknown / malformed markers never reach the visitor
    .replace(/\n{3,}/g, "\n\n").trim();
  return { clean, actions: dedupeActions(actions) };
}

/** Remove any URL / markdown link the model produced: links come only from the application. */
export function stripUnsafe(text: string, maxChars = 2600): string {
  return text
    .replace(/\[([^\]]+)\]\([^\n]*?\)(?=\s|$|[.,;:!?])/g, "$1")   // markdown links → their label
    .replace(/\b(?:https?:\/\/|www\.)\S+/gi, "")
    .replace(/\b(?:javascript|data|vbscript):\S*/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<\/?(script|iframe|img|style|a|object|embed)[^>]*>/gi, "")
    .replace(/[ \t]+\n/g, "\n")
    .slice(0, maxChars)
    .trim();
}

/** Drop citation markers that point at passages that do not exist. */
export function fixCitations(text: string, available: number): string {
  return text.replace(/\[(\d{1,2})\]/g, (m, n) => (Number(n) >= 1 && Number(n) <= available ? m : ""));
}

/** Heuristic hallucination guard: every multi-digit number in the answer must appear in the context or the question. */
export function ungroundedNumbers(answer: string, context: string, question: string): string[] {
  const strip = (s: string) => s.replace(/\[\d{1,2}\]/g, " ").replace(/,/g, "");
  const grab = (s: string) => (strip(s).match(/\d+(?:\.\d+)?%?\+?/g) ?? []).map((x) => x.replace(/[+%]/g, ""));
  const allowed = new Set([...grab(context), ...grab(question)]);
  return grab(answer).filter((n) => (n.length >= 2 || n.includes(".")) && !allowed.has(n));
}
