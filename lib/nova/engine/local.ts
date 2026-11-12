import type { Hit } from "../types";

const trim = (s: string, max: number) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const i = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("\n"));
  return (i > max * 0.5 ? cut.slice(0, i + 1) : cut.replace(/\s+\S*$/, "") + "…").trim();
};

/**
 * LEVEL 3 template answer: quotes the most relevant verified excerpts. It does NOT paraphrase and is never
 * presented as a generated answer.
 */
export function composeLocal(hits: Hit[], max = 3): string {
  const picks: Hit[] = [];
  const perDoc = new Map<string, number>();
  for (const h of hits) {
    const n = perDoc.get(h.chunk.document_id) ?? 0;
    if (n >= 2) continue;
    perDoc.set(h.chunk.document_id, n + 1);
    picks.push(h);
    if (picks.length >= max) break;
  }
  const body = picks.map((h, i) => {
    const title = h.chunk.title.replace(/\s[—-]\s.*$/, "");
    const head = h.chunk.section_heading && h.chunk.section_heading !== h.chunk.title ? ` — ${h.chunk.section_heading}` : "";
    return `**${title}${head}** [${i + 1}]\n${trim(h.chunk.text, 520)}`;
  });
  return body.join("\n\n");
}
