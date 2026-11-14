import { novaConfig } from "../config";
import { metrics } from "../observability";
import { CircuitBreaker } from "./breaker";
import { GeminiProvider } from "./gemini";
import { OpenRouterProvider } from "./openrouter";
import { LLMProvider, LLMRequest, ProviderError, Usage, estimateTokens } from "./types";

export interface StreamOutcome { text: string; provider: string; model: string; usage: Usage; attempts: number; truncated: boolean }
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export class ProviderManager {
  private breakers = new Map<string, CircuitBreaker>();
  constructor(private providers: LLMProvider[], private cfg = novaConfig, private wait: (ms: number) => Promise<void> = sleep) {
    for (const p of providers) this.breakers.set(p.name, new CircuitBreaker(cfg.breaker.failureThreshold, cfg.breaker.windowMs, cfg.breaker.cooldownMs));
  }

  /** True when at least one provider is configured and its breaker is not open. */
  available(): boolean {
    if (this.cfg.llm.disabled) return false;
    return this.providers.some((p) => p.isConfigured() && this.breakers.get(p.name)!.state() !== "open");
  }
  status() {
    return this.providers.map((p) => ({ ...p.getModelInfo(), configured: p.isConfigured(), breaker: this.breakers.get(p.name)!.state() }));
  }

  /**
   * Try providers in order. Retries with exponential backoff (honouring Retry-After when short) happen only while
   * no token has been emitted. Throws the last ProviderError if every provider fails.
   */
  async stream(req: LLMRequest, onToken: (t: string) => void): Promise<StreamOutcome> {
    const deadline = Date.now() + this.cfg.llm.totalBudgetMs;
    let last: ProviderError | null = null;
    let attempts = 0;
    for (const p of this.providers) {
      const br = this.breakers.get(p.name)!;
      if (!p.isConfigured() || !br.allow()) continue;
      for (let n = 0; n <= this.cfg.llm.maxRetries; n++) {
        const remaining = deadline - Date.now();
        if (remaining < 800) { last = last ?? new ProviderError("timeout", p.name); break; }
        attempts++;
        const t0 = Date.now();
        const timeout = AbortSignal.timeout(Math.min(this.cfg.llm.timeoutMs, remaining));
        // Caller cancellation (visitor closed/reset the chat) must also stop the upstream call.
        const signal = req.signal ? AbortSignal.any([req.signal, timeout]) : timeout;
        let text = ""; let usage: Usage | undefined;
        try {
          for await (const d of p.stream({ ...req, signal }, (u) => (usage = u))) { text += d; onToken(d); }
          br.success();
          const info = p.getModelInfo();
          const u = usage ?? { input: estimateTokens(req.system + req.messages.map((m) => m.content).join("")), output: estimateTokens(text), estimated: true };
          metrics.recordLLM({ provider: info.provider, model: info.model, latencyMs: Date.now() - t0, usage: u, ok: true });
          return { text, provider: info.provider, model: info.model, usage: u, attempts, truncated: false };
        } catch (e) {
          const err = e instanceof ProviderError ? e : new ProviderError(((e as Error).name === "TimeoutError" || (e as Error).name === "AbortError") ? "timeout" : "network", p.name);
          metrics.recordLLM({ provider: p.name, model: p.getModelInfo().model, latencyMs: Date.now() - t0, ok: false, error: err.kind });
          if (text) {
            // Stream died mid-answer: keep what the visitor already saw rather than restarting.
            br.failure(err.retryAfterMs);
            const info = p.getModelInfo();
            return { text, provider: info.provider, model: info.model, usage: { input: 0, output: estimateTokens(text), estimated: true }, attempts, truncated: true };
          }
          last = err;
          br.failure(err.retryAfterMs);
          if (!err.retryable || br.state() === "open") break;
          const backoff = Math.min(4000, 400 * 2 ** n + Math.random() * 200);
          const delay = err.retryAfterMs !== undefined ? Math.min(err.retryAfterMs, 3000) : backoff;
          if (err.kind === "rate_limit" && (err.retryAfterMs ?? 0) > 3000) break;       // too long to wait: fall to next provider
          if (n < this.cfg.llm.maxRetries && deadline - Date.now() > delay + 800) await this.wait(delay); else break;
        }
      }
    }
    throw last ?? new ProviderError("unconfigured", "none");
  }
}

let singleton: ProviderManager | null = null;
export function getProviderManager(): ProviderManager {
  if (!singleton) {
    const byName: Record<string, LLMProvider> = { gemini: new GeminiProvider(), openrouter: new OpenRouterProvider() };
    singleton = new ProviderManager(novaConfig.llm.order.map((n) => byName[n]).filter(Boolean));
  }
  return singleton;
}
export function resetProviderManager() { singleton = null; }
