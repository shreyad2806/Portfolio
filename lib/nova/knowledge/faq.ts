import raw from "@/nova-knowledge/faq.json";
import { normalize, tokens } from "./text";

export interface FaqEntry { id: string; questions: string[]; answer: string; sources: string[]; actions: { nav?: string; resume?: boolean; contact?: boolean }[]; suggestions: string[] }
export const FAQS = (raw as { faqs: FaqEntry[] }).faqs;

const jaccard = (a: Set<string>, b: Set<string>) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i || 1); };

/** LEVEL 1: exact (normalised) or near-exact FAQ match. Deliberately strict — anything fuzzy goes to retrieval. */
export function matchFaq(question: string): FaqEntry | null {
  const n = normalize(question).replace(/[?.!]+$/g, "").trim();
  const tk = new Set(tokens(question));
  let best: { e: FaqEntry; s: number } | null = null;
  for (const e of FAQS) for (const q of e.questions) {
    if (normalize(q) === n) return e;
    const s = jaccard(tk, new Set(tokens(q)));
    if (tk.size >= 2 && s >= 0.8 && (!best || s > best.s)) best = { e, s };
  }
  return best?.e ?? null;
}
