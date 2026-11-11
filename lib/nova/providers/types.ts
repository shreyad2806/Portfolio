export type ProviderErrorKind = "rate_limit" | "auth" | "timeout" | "unavailable" | "bad_request" | "blocked" | "network" | "unconfigured";

/** Normalised provider error: raw upstream bodies are never surfaced to visitors. */
export class ProviderError extends Error {
  constructor(public kind: ProviderErrorKind, public provider: string, public status?: number, public retryAfterMs?: number, detail?: string) {
    super(`${provider}:${kind}${status ? ":" + status : ""}${detail ? " " + detail : ""}`);
    this.name = "ProviderError";
  }
  get retryable() { return this.kind === "rate_limit" || this.kind === "timeout" || this.kind === "unavailable" || this.kind === "network"; }
}

export interface LLMMessage { role: "user" | "assistant"; content: string }
export interface LLMRequest { system: string; messages: LLMMessage[]; temperature?: number; maxOutputTokens?: number; signal?: AbortSignal }
export interface Usage { input: number; output: number; estimated: boolean }
export interface LLMResult { text: string; usage: Usage }
export interface ModelInfo { provider: string; model: string }

export interface LLMProvider {
  readonly name: string;
  isConfigured(): boolean;
  generate(req: LLMRequest): Promise<LLMResult>;
  /** Yields text deltas. `onUsage` is called once if the provider reports token usage. */
  stream(req: LLMRequest, onUsage?: (u: Usage) => void): AsyncGenerator<string, void, void>;
  /** Cheap by default (configuration only). `deep` performs a real 1-token request. */
  healthCheck(deep?: boolean): Promise<{ ok: boolean; detail: string; latencyMs?: number }>;
  getModelInfo(): ModelInfo;
}

export const estimateTokens = (s: string) => Math.ceil(s.length / 4);

/** Parse a `text/event-stream` body into `data:` payload strings. */
export async function* sseData(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i: number;
      while ((i = buf.search(/\r?\n\r?\n/)) >= 0) {
        const block = buf.slice(0, i);
        buf = buf.slice(i).replace(/^\r?\n\r?\n/, "");
        const data = block.split(/\r?\n/).filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).join("\n");
        if (data) yield data;
      }
    }
    const tail = buf.split(/\r?\n/).filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).join("\n");
    if (tail) yield tail;
  } finally { reader.releaseLock(); }
}

export function parseRetryAfter(h: string | null): number | undefined {
  if (!h) return undefined;
  const s = Number(h);
  if (!Number.isNaN(s)) return Math.max(0, s * 1000);
  const d = Date.parse(h);
  return Number.isNaN(d) ? undefined : Math.max(0, d - Date.now());
}

export function classifyStatus(provider: string, status: number, retryAfter?: number): ProviderError {
  if (status === 429) return new ProviderError("rate_limit", provider, status, retryAfter);
  if (status === 401 || status === 403) return new ProviderError("auth", provider, status);
  if (status === 408 || status === 504) return new ProviderError("timeout", provider, status);
  if (status >= 500) return new ProviderError("unavailable", provider, status, retryAfter);
  return new ProviderError("bad_request", provider, status);
}
