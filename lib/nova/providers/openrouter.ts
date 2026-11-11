import { novaConfig } from "../config";
import { LLMProvider, LLMRequest, LLMResult, ProviderError, Usage, classifyStatus, estimateTokens, parseRetryAfter, sseData } from "./types";

type FetchLike = typeof fetch;

export class OpenRouterProvider implements LLMProvider {
  readonly name = "openrouter";
  constructor(private cfg = novaConfig.openrouter, private fetchImpl: FetchLike = (...a) => fetch(...a)) {}
  isConfigured() { return Boolean(this.cfg.apiKey); }
  getModelInfo() { return { provider: this.name, model: this.cfg.model }; }

  async generate(req: LLMRequest): Promise<LLMResult> {
    let text = ""; let usage: Usage | undefined;
    for await (const d of this.stream(req, (u) => (usage = u))) text += d;
    return { text, usage: usage ?? { input: estimateTokens(req.system + req.messages.map((m) => m.content).join("")), output: estimateTokens(text), estimated: true } };
  }

  async *stream(req: LLMRequest, onUsage?: (u: Usage) => void): AsyncGenerator<string, void, void> {
    if (!this.cfg.apiKey) throw new ProviderError("unconfigured", this.name);
    let res: Response;
    try {
      res = await this.fetchImpl("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.cfg.apiKey}`, "X-Title": "SHREYA.EXE Nova" },
        body: JSON.stringify({
          model: this.cfg.model, stream: true, stream_options: { include_usage: true },
          temperature: req.temperature ?? novaConfig.llm.temperature, max_tokens: req.maxOutputTokens ?? novaConfig.llm.maxOutputTokens,
          messages: [{ role: "system", content: req.system }, ...req.messages],
        }),
        signal: req.signal,
      });
    } catch (e) {
      const n = (e as Error).name;
      throw new ProviderError(n === "TimeoutError" || n === "AbortError" ? "timeout" : "network", this.name);
    }
    if (!res.ok) { await res.body?.cancel().catch(() => {}); throw classifyStatus(this.name, res.status, parseRetryAfter(res.headers.get("retry-after"))); }
    if (!res.body) throw new ProviderError("unavailable", this.name);
    let emitted = false;
    for await (const data of sseData(res.body)) {
      if (data === "[DONE]") break;
      let j: { choices?: { delta?: { content?: string } }[]; usage?: { prompt_tokens?: number; completion_tokens?: number }; error?: { code?: number } };
      try { j = JSON.parse(data); } catch { continue; }
      if (j.error) throw new ProviderError(j.error.code === 429 ? "rate_limit" : "unavailable", this.name, j.error.code);
      const t = j.choices?.[0]?.delta?.content;
      if (t) { emitted = true; yield t; }
      if (j.usage && onUsage) onUsage({ input: j.usage.prompt_tokens ?? 0, output: j.usage.completion_tokens ?? 0, estimated: false });
    }
    if (!emitted) throw new ProviderError("unavailable", this.name, undefined, undefined, "empty response");
  }

  async healthCheck(deep = false) {
    if (!this.isConfigured()) return { ok: false, detail: "OPENROUTER_API_KEY not set" };
    if (!deep) return { ok: true, detail: "configured" };
    const t0 = Date.now();
    try { await this.generate({ system: "Reply with OK.", messages: [{ role: "user", content: "ping" }], maxOutputTokens: 4 }); return { ok: true, detail: "reachable", latencyMs: Date.now() - t0 }; }
    catch (e) { return { ok: false, detail: (e as ProviderError).kind ?? "error", latencyMs: Date.now() - t0 }; }
  }
}
