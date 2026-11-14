/**
 * Answer composition (no LLM): turns verified chunks into answers whose shape depends on the question.
 *
 *   overview / technologies / architecture / comparison / internship / profile / simple
 *
 * Every sentence in the output is copied (trimmed, never paraphrased or invented) from verified chunks; the structure
 * around it is a template. Long material goes into `details` (progressive disclosure) instead of the chat bubble.
 */
import { localIndex } from "../knowledge/store";
import { isStopword, stem, tokens } from "../knowledge/text";
import { PROJECTS } from "../tools/registry";
import type { Chunk, Hit } from "../types";

export type Level = "overview" | "technologies" | "architecture" | "comparison" | "internship" | "profile" | "simple";
export interface Composed { /** false when the answer only says the notes don't cover the question */ grounded: boolean; level: Level; text: string; details?: { title: string; markdown: string }; evidenceDocs: string[] }

// ---------- document views over the index ----------
interface Line { text: string; heading: string }
interface DocView { id: string; title: string; lines: Line[]; sections: Map<string, string[]>; oneLiner?: string; stack: string[]; period?: string; chunks: Chunk[] }

const views = new Map<string, DocView>();
const clean = (s: string) => s.replace(/^\s*(?:[-*]|\d+\.)\s+/, "").replace(/\s+/g, " ").trim();

export function docView(id: string): DocView | null {
  if (views.has(id)) return views.get(id)!;
  const chunks = localIndex.chunks.filter((c) => c.document_id === id && c.verified).sort((a, b) => a.chunk_id.localeCompare(b.chunk_id));
  if (!chunks.length) return null;
  const lines: Line[] = []; const sections = new Map<string, string[]>();
  for (const c of chunks) for (const raw of c.text.split("\n")) {
    const t = clean(raw); if (!t) continue;
    lines.push({ text: t, heading: c.section_heading });
    if (!sections.has(c.section_heading)) sections.set(c.section_heading, []);
    sections.get(c.section_heading)!.push(t);
  }
  const find = (re: RegExp) => lines.map((l) => l.text.match(re)?.[1]).find(Boolean)?.trim();
  const v: DocView = {
    id, title: chunks[0].title, lines, sections, chunks,
    oneLiner: find(/^One-liner:\s*(.+)$/i),
    stack: (find(/^Stack:\s*(.+)$/i) ?? "").replace(/\.$/, "").split(/,\s*/).filter(Boolean),
    period: find(/^Period:\s*(.+)$/i),
  };
  views.set(id, v);
  return v;
}

const projectName = (docId: string) => PROJECTS.find((p) => `projects-${p.id}` === docId)?.name ?? docView(docId)?.title ?? docId;

// ---------- evidence selection ----------
const df = (() => {
  const m = new Map<string, number>();
  for (const c of localIndex.chunks) for (const t of new Set(tokens(c.text))) m.set(t, (m.get(t) ?? 0) + 1);
  return m;
})();
const idf = (t: string) => Math.log(1 + (localIndex.chunks.length + 1) / ((df.get(t) ?? 0) + 1));
const GENERIC = new Set(["work", "use", "make", "build", "built", "thing", "explain", "tell", "describe", "show", "happen", "doe", "do", "get", "give"].map((w) => stem(w)));

/** Best-matching lines (one sentence each) for a query among the given documents. */
export function bestEvidence(query: string, docIds: string[], opts: { k?: number; minScore?: number; exclude?: Set<string> } = {}): { text: string; docId: string; heading: string; score: number }[] {
  const names = new Set(docIds.flatMap((d) => tokens(`${docView(d)?.title ?? ""} ${PROJECTS.find((p) => `projects-${p.id}` === d)?.aliases.join(" ") ?? ""}`)));
  const q = [...new Set(tokens(query))].filter((t) => !names.has(t) && !GENERIC.has(t) && !isStopword(t));
  if (!q.length) return [];
  const wAll = q.reduce((s, t) => s + idf(t), 0);
  const out: { text: string; docId: string; heading: string; score: number }[] = [];
  for (const id of docIds) for (const l of docView(id)?.lines ?? []) {
    if (/^(One-liner|Stack|GitHub|Case study page|Period):/i.test(l.text)) continue;
    for (const sentence of l.text.split(/(?<=[.!?])\s+(?=[A-Z])/)) {
      const set = new Set(tokens(sentence));
      const sc = q.reduce((s, t) => s + (set.has(t) ? idf(t) : 0), 0) / wAll;
      if (sc >= (opts.minScore ?? 0.3) && !opts.exclude?.has(sentence)) out.push({ text: sentence, docId: id, heading: l.heading, score: sc });
    }
  }
  return out.sort((a, b) => b.score - a.score).filter((e, i, a) => a.findIndex((x) => x.text === e.text) === i).slice(0, opts.k ?? 3);
}

const trim = (s: string, max: number) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const i = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "), cut.lastIndexOf(", "));
  return (i > max * 0.55 ? cut.slice(0, i) : cut.replace(/\s+\S*$/, "")).replace(/[,;:]$/, "") + "…";
};
const sentence = (s: string) => (/[.!?…]$/.test(s) ? s : s + ".");
const bullets = (xs: string[], max = 170) => xs.map((x) => `- ${trim(x, max)}`).join("\n");

// ---------- level detection ----------
export function detectLevel(query: string, opts: { compare?: boolean; project?: string; category?: string }): Level {
  const q = query.toLowerCase();
  if (opts.compare) return "comparison";
  if (opts.project) {
    if (/\b(architect\w*|pipeline|workflow|orchestrat\w*|structured|designed|components?|internals?|data ?flow|how (does|is|do) (it|\w+) (work|built|structured|designed)|how does .* work)\b/.test(q)) return "architecture";
    if (/\b(technolog\w*|tech stack|stack|built with|framework\w*|librar\w*|language\w*|tools?|databases?)\b/.test(q)) return "technologies";
    if (/^(what('s| is| are)?|tell me about|explain|describe|overview|about|walk me through)\b/.test(q) && !/\b(why|how|happen|if|when|fail|error|limit|metric)\b/.test(q)) return "overview";
    return "simple";
  }
  if (opts.category === "experience") return "internship";
  if (opts.category === "profile") return "profile";
  return "simple";
}

// ---------- composers ----------
function overview(id: string): Composed | null {
  const v = docView(id); if (!v) return null;
  const name = projectName(id);
  const did = v.sections.get("What it does") ?? v.sections.get("Features") ?? [];
  const parts = [`**${name}** — ${sentence(v.oneLiner ?? v.lines[0]?.text ?? "")}`];
  if (v.stack.length) parts.push(`**Built with:** ${v.stack.join(", ")}.`);
  const sents = did.flatMap((l) => l.split(/(?<=[.!?])\s+(?=[A-Z])/));
  if (sents.length) parts.push(bullets(sents.slice(0, 3), 260));
  const details = detailsFor(v);
  return { grounded: true, level: "overview", text: parts.join("\n\n"), details, evidenceDocs: [id] };
}

function detailsFor(v: DocView): Composed["details"] {
  const arch = v.sections.get("Architecture");
  const orch = v.sections.get("Orchestration");
  const dec = v.sections.get("Engineering decisions");
  const tests = v.sections.get("Testing");
  const md: string[] = [];
  if (arch?.length) md.push("**Architecture**\n" + arch.map((l, i) => `${i + 1}. ${trim(l.replace(/^\d+\.\s*/, ""), 190)}`).join("\n"));
  if (orch?.length) md.push("**Orchestration**\n" + trim(orch.join(" "), 420));
  if (dec?.length) md.push("**Engineering decisions**\n" + bullets(dec.slice(0, 6), 210));
  if (tests?.length) md.push("**Testing**\n" + trim(tests.join(" "), 360));
  return md.length ? { title: "Technical details", markdown: md.join("\n\n") } : undefined;
}

function technologies(id: string): Composed | null {
  const v = docView(id); if (!v || !v.stack.length) return overview(id);
  const name = projectName(id);
  const dec = (v.sections.get("Engineering decisions") ?? []).map((l) => l.match(/Decision:\s*(.+?)\s+Why:\s*(.+)$/)).filter(Boolean) as RegExpMatchArray[];
  const parts = [`**${name}** is built with ${v.stack.join(", ")}.`];
  if (dec.length) parts.push("**Why these choices (from her notes):**\n" + bullets(dec.slice(0, 4).map((m) => `${m[1]} — ${m[2]}`), 200));
  return { grounded: true, level: "technologies", text: parts.join("\n\n"), details: detailsFor(v), evidenceDocs: [id] };
}

function architecture(id: string): Composed | null {
  const v = docView(id); if (!v) return null;
  const name = projectName(id);
  const arch = v.sections.get("Architecture");
  const orch = v.sections.get("Orchestration");
  const did = v.sections.get("What it does") ?? [];
  const parts = [`**${name} — how it's built**`, sentence(v.oneLiner ?? "")];
  if (arch?.length) parts.push(arch.map((l, i) => `${i + 1}. ${trim(l.replace(/^\d+\.\s*/, ""), 120)}`).join("\n"));
  else if (did.length) parts.push(bullets(did.slice(0, 4), 200));
  if (orch?.length) parts.push(trim(orch.join(" "), 300));
  if (!arch?.length) parts.push("_Her notes describe this at a high level; there is no deeper component breakdown yet._");
  const full = detailsFor(v);
  const details = full && arch?.length ? { ...full, markdown: full.markdown.replace(/^\*\*Architecture\*\*[\s\S]*?\n\n/, "").replace(/^\*\*Orchestration\*\*[\s\S]*?(\n\n|$)/, "") || full.markdown } : undefined;
  return { grounded: true, level: "architecture", text: parts.filter(Boolean).join("\n\n"), details: details?.markdown?.trim() ? details : undefined, evidenceDocs: [id] };
}

function roleEntry(id: string): string | null {
  const v = docView(id); if (!v) return null;
  const resp = (v.sections.get("Responsibilities (from her resume)") ?? v.lines.map((l) => l.text)).filter((l) => !/^Period:|^Technologies/i.test(l));
  const tech = v.lines.map((l) => l.text.match(/^Technologies shown on the portfolio:\s*(.+)$/i)?.[1]).find(Boolean);
  return [`**${v.title.replace(/\s[—-]\s/, " — ")}** (${v.period ?? "dates not listed"})`, bullets(resp.slice(0, 2), 200), tech ? `_Technologies shown on her portfolio: ${tech.replace(/\.$/, "")}._` : ""].filter(Boolean).join("\n");
}

function internship(ids: string[]): Composed | null {
  const roles = ids.length ? ids : ["experience-startupcrafters", "experience-lawgpt"];
  const entries = roles.map(roleEntry).filter(Boolean) as string[];
  if (!entries.length) return null;
  const head = entries.length > 1 ? `Shreya has ${entries.length} internships on her resume:` : "";
  return { grounded: true, level: "internship", text: [head, ...entries].filter(Boolean).join("\n\n"), evidenceDocs: roles.filter((r) => docView(r)) };
}

function profile(id: string): Composed | null {
  const v = docView(id); if (!v) return null;
  const first = v.lines.slice(0, 2).map((l) => l.text);
  const focus = v.sections.get("Current focus") ?? [];
  return { grounded: true, level: "profile", text: [first.join(" "), focus.length ? "**Right now:** " + trim(focus.join(" "), 260) : ""].filter(Boolean).join("\n\n"), evidenceDocs: [id] };
}

function simple(query: string, docIds: string[]): Composed | null {
  const ev = bestEvidence(query, docIds, { k: 3 });
  if (!ev.length) return null;
  const body = ev.length === 1 ? sentence(trim(ev[0].text, 260)) : ev.map((e) => sentence(trim(e.text, 200))).join(" ");
  const why = /\bwhy\b/i.test(query);
  const handling = /\b(what happens|what if|how (does|do) it handle|fails?|failure|error)\b/i.test(query);
  const text = why ? `Her notes don't spell out the reasoning, but they describe it this way: ${body.charAt(0).toLowerCase() + body.slice(1)}` : handling ? `${body} Her notes don't describe the behaviour in more detail than that.` : body;
  return { grounded: true, level: "simple", text, evidenceDocs: [...new Set(ev.map((e) => e.docId))] };
}

/** Honest "the notes don't go that far" answer for a named project (instead of dumping an overview). */
function notCovered(id: string): Composed | null {
  const v = docView(id); if (!v) return null;
  const name = projectName(id);
  return { grounded: false, level: "simple", text: `Her verified notes on **${name}** don't cover that. What they do say: ${sentence(trim(v.oneLiner ?? v.lines[0]?.text ?? "", 220))}`, evidenceDocs: [id] };
}

function comparison(ids: string[], query: string): Composed | null {
  const vs = ids.map((i) => ({ id: i, v: docView(i), name: projectName(i) })).filter((x) => x.v);
  if (vs.length < 2) return null;
  const [a, b] = vs;
  const lowerStack = (x: typeof a) => new Map(x.v!.stack.map((s) => [s.toLowerCase(), s]));
  const sa = lowerStack(a), sb = lowerStack(b);
  const shared = [...sa.keys()].filter((k) => sb.has(k)).map((k) => sa.get(k)!);
  const onlyA = [...sa.keys()].filter((k) => !sb.has(k)).map((k) => sa.get(k)!);
  const onlyB = [...sb.keys()].filter((k) => !sa.has(k)).map((k) => sb.get(k)!);
  const first = (x: typeof a) => (x.v!.sections.get("What it does") ?? [])[0];
  const rows: string[] = [`**${a.name} vs ${b.name}**`];
  rows.push(`- **Purpose** — ${a.name}: ${trim(sentence(a.v!.oneLiner ?? ""), 170)} ${b.name}: ${trim(sentence(b.v!.oneLiner ?? ""), 170)}`);
  rows.push(`- **Stack** — ${a.name}: ${a.v!.stack.join(", ") || "not documented"}. ${b.name}: ${b.v!.stack.join(", ") || "not documented"}.${shared.length ? ` Shared: ${shared.join(", ")}.` : " No technologies in common are listed."}`);
  const fa = first(a), fb = first(b);
  if (fa || fb) rows.push(`- **Design** — ${a.name}: ${fa ? trim(sentence(fa), 170) : "not documented."} ${b.name}: ${fb ? trim(sentence(fb), 170) : "not documented."}`);
  // A focused follow-up ("Which one uses PostgreSQL?") is answered per project from evidence, saying so when a project doesn't mention it.
  const stripped = query.replace(/\b(compare|comparison|difference|differences|between|versus|vs|and|which|one|both|each|either|other|first|second)\b/gi, " ");
  const focusTerms = [...new Set(tokens(stripped))].filter((t) => !isStopword(t) && !GENERIC.has(t) && ![a, b].some((x) => tokens(`${x.name} ${x.v!.title}`).includes(t)));
  if (focusTerms.length) {
    const per = [a, b].map((x) => {
      const inStack = x.v!.stack.find((s) => tokens(s).some((t) => focusTerms.includes(t)));
      const ev = bestEvidence(stripped, [x.id], { k: 1, minScore: 0.45 })[0];
      return `${x.name}: ${inStack ? `its stack lists ${inStack}.` : ev ? trim(sentence(ev.text), 170) : "not mentioned in her notes."}`;
    });
    rows.push(`- **On your question** — ${per.join(" ")}`);
  }
  void onlyA; void onlyB;
  const det = [a, b].map((x) => { const d = detailsFor(x.v!); return d ? `### ${x.name}\n${d.markdown}` : `### ${x.name}\nNo deeper technical notes are documented.`; }).join("\n\n");
  return { grounded: true, level: "comparison", text: rows.join("\n"), details: { title: "Details for both projects", markdown: det }, evidenceDocs: [a.id, b.id] };
}

// ---------- public entry ----------
export interface ComposeInput { followup?: boolean; query: string; hits: Hit[]; compare?: string[]; project?: string; category?: string }

export function compose(input: ComposeInput): Composed | null {
  const docIds = [...new Set(input.hits.map((h) => h.chunk.document_id))];
  const projDoc = input.project ? `projects-${input.project}` : docIds.length === 1 && docIds[0].startsWith("projects-") ? docIds[0] : undefined;
  const category = input.category ?? input.hits[0]?.chunk.category;
  if (input.compare && input.compare.length >= 2) return comparison(input.compare.map((p) => `projects-${p}`), input.query);
  let level = detectLevel(input.query, { project: projDoc ? "x" : undefined, category });
  // An inferred follow-up ("what is the capital of Mongolia?" while Kavach is active) must never turn into an overview dump.
  if (input.followup && level === "overview" && !/\b(overview|summar|tell me more|more about|about (it|this)|explain (it|this))\b/i.test(input.query)) level = "simple";
  let c: Composed | null = null;
  if (projDoc) {
    if (level === "architecture") c = architecture(projDoc);
    else if (level === "technologies") c = technologies(projDoc);
    else if (level === "overview") c = overview(projDoc);
    else c = simple(input.query, [projDoc]) ?? notCovered(projDoc);
  } else if (level === "internship") {
    const exp = docIds.filter((d) => d.startsWith("experience-"));
    const general = /\b(internships?|experience|worked|work experience|roles?)\b/i.test(input.query) && !/(startupcrafters|lawgpt)/i.test(input.query);
    c = internship(general ? [] : exp.slice(0, 2));
  } else if (level === "profile" && docIds.includes("profile-shreya-dubey")) c = profile("profile-shreya-dubey");
  return c ?? simple(input.query, docIds.slice(0, 4));
}
