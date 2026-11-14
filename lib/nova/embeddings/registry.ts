import { BgeSmallProvider } from "./bge";
import { hashProvider } from "./hash";
import type { EmbeddingProvider } from "./types";

export const PROVIDER_IDS = ["hash-384-v1", "bge-small-en-v1.5"] as const;

const cache = new Map<string, EmbeddingProvider>();
export function getProvider(id: string): EmbeddingProvider {
  if (id === "hash-384-v1") return hashProvider;
  if (id === "bge-small-en-v1.5") { if (!cache.has(id)) cache.set(id, new BgeSmallProvider()); return cache.get(id)!; }
  throw new Error(`Unknown embedding provider "${id}". Known: ${PROVIDER_IDS.join(", ")}`);
}
/** Test hook. */
export function setProvider(id: string, p: EmbeddingProvider | null) { if (p) cache.set(id, p); else cache.delete(id); }

/** Which neural provider queries should use. `NOVA_EMBEDDER=hash-384-v1` (or "off") disables neural retrieval even if the index has neural vectors. */
export function preferredNeuralId(): string | null {
  const v = (process.env.NOVA_EMBEDDER ?? "auto").toLowerCase();
  if (v === "off" || v === "hash-384-v1" || v === "none") return null;
  return v === "auto" ? "bge-small-en-v1.5" : v;
}
