import { fnv1a, tokens } from "./text";

/**
 * Embedders turn text into vectors. The index records which embedder built it, and queries must use the same one.
 *
 *  - "hash-384-v1": dependency-free, deterministic signed feature-hashing over stemmed unigrams, bigrams and
 *    character trigrams. It is a lexical-semantic model (robust to typos/inflection) — NOT a neural embedding.
 *  - "bge-small-en-v1.5": optional neural model (BAAI/bge-small-en-v1.5) via @xenova/transformers, used when that
 *    package is installed and NOVA_EMBEDDER=bge-small-en-v1.5. See docs/nova/rag-pipeline.md.
 */
export interface Embedder { id: string; dims: number; embed(text: string): Promise<number[]> }

export const HASH_DIMS = 384;

export function hashEmbed(text: string, dims = HASH_DIMS): number[] {
  const v = new Array<number>(dims).fill(0);
  const toks = tokens(text);
  const add = (feat: string, w: number) => {
    const h = fnv1a(feat);
    v[h % dims] += (h & 0x80000000 ? -1 : 1) * w;
  };
  toks.forEach((t, i) => {
    add("u:" + t, 1);
    if (i < toks.length - 1) add("b:" + t + "_" + toks[i + 1], 0.7);
    const padded = `^${t}$`;
    for (let j = 0; j + 3 <= padded.length; j++) add("c:" + padded.slice(j, j + 3), 0.25);
  });
  let n = 0;
  for (const x of v) n += x * x;
  n = Math.sqrt(n) || 1;
  return v.map((x) => Math.round((x / n) * 1000) / 1000);
}

export const hashEmbedder: Embedder = { id: "hash-384-v1", dims: HASH_DIMS, embed: async (t) => hashEmbed(t) };

export async function getEmbedder(id?: string): Promise<Embedder> {
  const want = id ?? process.env.NOVA_EMBEDDER ?? "hash-384-v1";
  if (want === "hash-384-v1") return hashEmbedder;
  if (want === "bge-small-en-v1.5") {
    try {
      const modName = "@xenova/transformers";
      const mod = await import(/* webpackIgnore: true */ modName);
      const pipe = await mod.pipeline("feature-extraction", "Xenova/bge-small-en-v1.5");
      return {
        id: want, dims: 384,
        embed: async (t: string) => Array.from((await pipe(t, { pooling: "mean", normalize: true })).data as Float32Array).map((x) => Math.round(x * 1e4) / 1e4),
      };
    } catch {
      throw new Error("NOVA_EMBEDDER=bge-small-en-v1.5 requires `npm i @xenova/transformers` and network access to download the model.");
    }
  }
  throw new Error(`Unknown embedder "${want}"`);
}

export function cosine(a: number[], b: number[]): number {
  let d = 0, na = 0, nb = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) { d += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return d / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}
