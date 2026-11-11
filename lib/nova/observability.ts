/**
 * In-process operational metrics + structured logging.
 * Never records message content, API keys or raw IPs; visitors are identified only by a short, salted hash for rate limiting.
 */
interface Counters {
  requests: number; byMode: Record<string, number>; cacheHits: number; fallbacks: number; llmCalls: number; llmErrors: Record<string, number>;
  tokensIn: number; tokensOut: number; llmLatencyMs: number[]; retrievalMs: number[]; retrievedChunks: number[]; rateLimited: number;
}
const fresh = (): Counters => ({ requests: 0, byMode: {}, cacheHits: 0, fallbacks: 0, llmCalls: 0, llmErrors: {}, tokensIn: 0, tokensOut: 0, llmLatencyMs: [], retrievalMs: [], retrievedChunks: [], rateLimited: 0 });
let c = fresh();
const push = (a: number[], v: number) => { a.push(v); if (a.length > 200) a.shift(); };
const avg = (a: number[]) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0);

export const metrics = {
  recordRequest(r: { mode: string; cacheHit?: boolean; fallback?: boolean; retrievalMs?: number; chunks?: number }) {
    c.requests++; c.byMode[r.mode] = (c.byMode[r.mode] ?? 0) + 1;
    if (r.cacheHit) c.cacheHits++;
    if (r.fallback) c.fallbacks++;
    if (r.retrievalMs !== undefined) push(c.retrievalMs, r.retrievalMs);
    if (r.chunks !== undefined) push(c.retrievedChunks, r.chunks);
  },
  recordLLM(r: { provider: string; model: string; latencyMs: number; ok: boolean; error?: string; usage?: { input: number; output: number } }) {
    c.llmCalls++;
    if (!r.ok) c.llmErrors[r.error ?? "error"] = (c.llmErrors[r.error ?? "error"] ?? 0) + 1;
    else { push(c.llmLatencyMs, r.latencyMs); c.tokensIn += r.usage?.input ?? 0; c.tokensOut += r.usage?.output ?? 0; }
    log("llm", { provider: r.provider, model: r.model, ms: r.latencyMs, ok: r.ok, error: r.error });
  },
  recordRateLimited() { c.rateLimited++; },
  snapshot() {
    return {
      requests: c.requests, byMode: c.byMode, cacheHits: c.cacheHits, fallbackActivations: c.fallbacks, rateLimited: c.rateLimited,
      llm: { calls: c.llmCalls, errors: c.llmErrors, avgLatencyMs: avg(c.llmLatencyMs), tokensIn: c.tokensIn, tokensOut: c.tokensOut },
      retrieval: { avgMs: avg(c.retrievalMs), avgChunks: c.retrievedChunks.length ? +(c.retrievedChunks.reduce((x, y) => x + y, 0) / c.retrievedChunks.length).toFixed(1) : 0 },
    };
  },
  reset() { c = fresh(); },
};

export function log(event: string, fields: Record<string, unknown>) {
  if (process.env.NODE_ENV === "test" || process.env.NOVA_LOG === "0") return;
  console.log(JSON.stringify({ t: new Date().toISOString(), src: "nova", event, ...fields }));
}
