// Compatibility shim: embedding code lives in lib/nova/embeddings/*.
export { hashEmbed, HASH_DIMS, hashProvider } from "../embeddings/hash";
import { hashProvider } from "../embeddings/hash";
import type { EmbeddingProvider } from "../embeddings/types";
import { getProvider } from "../embeddings/registry";
export type { EmbeddingProvider };
export function getEmbedder(id?: string): EmbeddingProvider { return id ? getProvider(id) : hashProvider; }

export function cosine(a: number[], b: number[]): number {
  let d = 0, na = 0, nb = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) { d += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return d / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}
