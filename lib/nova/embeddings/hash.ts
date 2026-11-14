import { fnv1a, tokens } from "../knowledge/text";
import type { EmbeddingProvider } from "./types";

export const HASH_DIMS = 384;

/** Deterministic signed feature hashing over stemmed unigrams, bigrams and character trigrams. Lexical-semantic — NOT a neural model. */
export function hashEmbed(text: string, dims = HASH_DIMS): number[] {
  const v = new Array<number>(dims).fill(0);
  const toks = tokens(text);
  const add = (feat: string, w: number) => { const h = fnv1a(feat); v[h % dims] += (h & 0x80000000 ? -1 : 1) * w; };
  toks.forEach((t, i) => {
    add("u:" + t, 1);
    if (i < toks.length - 1) add("b:" + t + "_" + toks[i + 1], 0.7);
    const padded = `^${t}$`;
    for (let j = 0; j + 3 <= padded.length; j++) add("c:" + padded.slice(j, j + 3), 0.25);
  });
  let n = 0; for (const x of v) n += x * x; n = Math.sqrt(n) || 1;
  return v.map((x) => Math.round((x / n) * 1000) / 1000);
}

export const hashProvider: EmbeddingProvider = {
  id: "hash-384-v1", space: "hash-384-v1", model: "feature-hashing", revision: "1", dims: HASH_DIMS, kind: "lexical",
  embedQuery: async (t) => hashEmbed(t), embedDocument: async (t) => hashEmbed(t),
  healthCheck: async () => ({ ok: true, detail: "deterministic, no model" }),
};
