/**
 * Embedding providers. Documents and queries MUST be embedded in the same vector space; a "space" id captures
 * everything that defines it (model, revision, pooling, query prefix, quantisation), so an index built in one space is
 * never queried with a different one.
 */
export interface EmbeddingProvider {
  /** Short provider id, e.g. "hash-384-v1" or "bge-small-en-v1.5". */
  readonly id: string;
  /** Full space id (provider + revision + preprocessing); stored in the index and compared on load. */
  readonly space: string;
  readonly model: string;
  readonly revision: string;
  readonly dims: number;
  readonly kind: "lexical" | "neural";
  embedQuery(text: string): Promise<number[]>;
  embedDocument(text: string): Promise<number[]>;
  /** Batch helper (providers may override for throughput). */
  embedDocuments?(texts: string[]): Promise<number[][]>;
  healthCheck(): Promise<{ ok: boolean; detail: string; latencyMs?: number }>;
}

/** How raw cosine similarity is turned into a 0..1 relevance signal for this space (neural models are compressed into a narrow band). */
export interface Calibration { floor: number; ref: number }

export interface NeuralMeta {
  space: string; provider: string; model: string; revision: string; dims: number;
  pooling: string; query_prefix: string; calibration: Calibration; built_at: string;
}
