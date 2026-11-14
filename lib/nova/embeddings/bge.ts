import type { EmbeddingProvider } from "./types";

/**
 * BAAI/bge-small-en-v1.5 (384-d) running locally through ONNX (`@huggingface/transformers`, optional dependency).
 *
 * Space definition — changing any of these changes the space id and forces a re-embed:
 *   model weights revision, CLS pooling, L2 normalisation, q8 quantisation, and the query instruction prefix
 *   ("Represent this sentence for searching relevant passages: ") that BGE recommends for short-query → passage retrieval.
 *   Documents are embedded WITHOUT the prefix.
 */
export const BGE_MODEL = "BAAI/bge-small-en-v1.5";
export const BGE_ONNX_REPO = "Xenova/bge-small-en-v1.5";   // ONNX export of the same weights
export const BGE_QUERY_PREFIX = "Represent this sentence for searching relevant passages: ";
export const BGE_POOLING = "cls";

type Extractor = (text: string | string[], opts: { pooling: string; normalize: boolean }) => Promise<{ data: Float32Array | number[]; dims?: number[] }>;
export type ExtractorFactory = () => Promise<Extractor>;

const round = (xs: ArrayLike<number>) => Array.from(xs, (x) => Math.round(x * 1e5) / 1e5);

export class BgeSmallProvider implements EmbeddingProvider {
  readonly id = "bge-small-en-v1.5";
  readonly model = BGE_MODEL;
  readonly dims = 384;
  readonly kind = "neural" as const;
  readonly space: string;
  private extractor: Promise<Extractor> | null = null;
  private failedAt = 0;

  constructor(readonly revision = process.env.NOVA_BGE_REVISION ?? "main", private factory: ExtractorFactory = defaultFactory, private retryAfterMs = 60_000) {
    this.space = `${this.id}@${revision}/${BGE_POOLING}+norm/q8/prefix-v1`;
  }

  private load(): Promise<Extractor> {
    if (this.extractor) return this.extractor;
    if (this.failedAt && Date.now() - this.failedAt < this.retryAfterMs) return Promise.reject(new Error("embedding model unavailable (cooling down)"));
    this.extractor = this.factory().catch((e) => { this.extractor = null; this.failedAt = Date.now(); throw e; });
    return this.extractor;
  }
  private async run(text: string): Promise<number[]> {
    const ex = await this.load();
    const out = await ex(text, { pooling: BGE_POOLING, normalize: true });
    return round(out.data);
  }
  embedQuery(text: string) { return this.run(BGE_QUERY_PREFIX + text); }
  embedDocument(text: string) { return this.run(text); }
  async healthCheck() {
    const t0 = Date.now();
    try { const v = await this.embedDocument("health check"); return { ok: v.length === this.dims, detail: `model loaded, ${v.length} dims`, latencyMs: Date.now() - t0 }; }
    catch (e) { return { ok: false, detail: (e as Error).message.slice(0, 160) }; }
  }
}

async function defaultFactory(): Promise<Extractor> {
  const name = "@huggingface/transformers";
  // Optional dependency: resolved at runtime only, so the app builds and runs (offline, hash/BM25 retrieval) without it.
  const mod = await import(/* webpackIgnore: true */ name);
  if (process.env.NOVA_EMBED_MODEL_DIR) { mod.env.allowRemoteModels = false; mod.env.localModelPath = process.env.NOVA_EMBED_MODEL_DIR; }
  else if (process.env.NOVA_EMBED_OFFLINE === "1") mod.env.allowRemoteModels = false;
  return (await mod.pipeline("feature-extraction", BGE_ONNX_REPO, { dtype: "q8" })) as Extractor;
}
