/** Text utilities shared by ingestion and retrieval (must stay deterministic: the index depends on them). */

const STOP = new Set(("best good great nice a an the and or but if then of in on at to for from by with about as is are was were be been being it its this that these those " +
  "i me my we our you your he she her his hers they them their what which who whom whose how why when where do does did done can could should would will " +
  "tell show give explain describe please me more also just any some there here has have had into over under than so not no yes shreya shreyas nova").split(/\s+/));

/** Query/document alias expansion: maps nicknames to canonical terms. */
const ALIASES: [RegExp, string][] = [
  [/\bagent\s?shield\b/g, "kavach"],
  [/\brazorpay\b/g, "closeloop razorpay"],
  [/\bcomply\s?ai\b/g, "complytai"],
  [/\bthumbly\s?ai\b/g, "thumblyai"],
  [/\bvision\s?guard\b/g, "visionguard"],
  [/\btalent\s?lens\b/g, "talentlens"],
  [/\barchitect\s?iq\b/g, "architectiq"],
  [/\bdev\s?forge\b/g, "devforge"],
  [/\bstartup\s?crafters?\b/g, "startupcrafters"],
  [/\bsih\b/g, "smart india hackathon"],
  [/\bcv\b/g, "resume"],
  [/\bnext\.?js\b/g, "nextjs"],
  [/\bc\+\+\b/g, "cpp"],
  [/\bpg\s?vector\b/g, "pgvector"],
  [/\binterns\b|\binternships\b/g, "internship"],
  [/\bllms?\b/g, "llm"],
  [/\bmulti[- ]?agent(s)?\b/g, "multiagent"],
  [/\bfail[- ]closed\b/g, "failclosed"],
];

export function normalize(input: string): string {
  let s = input.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
  s = s.replace(/[’']s\b/g, "");
  for (const [re, rep] of ALIASES) s = s.replace(re, rep);
  return s.replace(/[^a-z0-9\s.+#-]/g, " ").replace(/\s+/g, " ").trim();
}

/** Light suffix stemmer — good enough for English technical prose, and deterministic. */
export function stem(w: string): string {
  if (w.length <= 3) return w;
  if (w.endsWith("ies") && w.length > 4) return w.slice(0, -3) + "y";
  for (const suf of ["ations", "ation", "ingly", "ings", "ing", "ers", "ments", "ment", "ized", "izes", "ize", "ness", "ally", "ed", "es", "s"]) {
    if (w.endsWith(suf) && w.length - suf.length >= 3) return w.slice(0, -suf.length);
  }
  return w;
}

export function tokens(input: string, opts: { keepStop?: boolean } = {}): string[] {
  const out: string[] = [];
  for (const raw of normalize(input).split(/[\s.-]+/)) {
    if (!raw || raw.length < 2) continue;
    if (!opts.keepStop && STOP.has(raw)) continue;
    out.push(stem(raw));
  }
  return out;
}

export function isStopword(w: string) { return STOP.has(w); }

export function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}

export function sha1Hex(s: string): string {
  // tiny non-crypto content hash (change detection only) — avoids importing node:crypto into client-safe code
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
}

export function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
