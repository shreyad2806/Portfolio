import { novaConfig } from "../config";
import { LLMProvider, LLMRequest, LLMResult, ProviderError, Usage, classifyStatus, estimateTokens, parseRetryAfter, sseData } from "./types";

type FetchLike = typeof fetch;

export class GeminiProvider implements LLMProvider {
  readonly name = "gemini";
  constructor(private cfg = novaConfig.gemini, private fetchImpl: FetchLike = (...a) => fetch(...a)) {}
  isConfigured() { return Boolean(this.cfg.apiKey); }
  getModelInfo() { return { provider: this.name, model: this.cfg.model }; }

  private body(req: LLMRequest) {
    return {
      systemInstruction: { parts: [{ text: req.system }] },
      contents: req.messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
      generationConfig: { temperature: req.temperature ?? novaConfig.llm.temperature, maxOutputTokens: req.maxOutputTokens ?? novaConfig.llm.maxOutputTokens },
    };
  }

  private async call(path: string, req: LLMRequest): Promise<Response> {
    if (!this.cfg.apiKey) throw new ProviderError("unconfigured", this.name);
    let res: Response;
    try {
      res = await this.fetchImpl(`https://generativelanguage.googleapis.com/v1beta/models/${this.cfg.model}:${path}`, {
        method: "POST",
        // The key travels in a header (never in the URL, which would end up in logs).
        headers: { "Content-Type": "application/json", "x-goog-api-key": this.cfg.apiKey },
        body: JSON.stringify(this.body(req)),
        signal: req.signal,
      });
    } catch (e) {
      const n = (e as Error).name;
      throw new ProviderError(n === "TimeoutError" || n === "AbortError" ? "timeout" : "network", this.name);
    }
    if (!res.ok) { await res.body?.cancel().catch(() => {}); throw classifyStatus(this.name, res.status, parseRetryAfter(res.headers.get("retry-after"))); }
    return res;
  }

  async generate(req: LLMRequest): Promise<LLMResult> {
    let text = ""; let usage: Usage | undefined;
    for await (const d of this.stream(req, (u) => (usage = u))) text += d;
    return { text, usage: usage ?? { input: estimateTokens(req.system + req.messages.map((m) => m.content).join("")), output: estimateTokens(text), estimated: true } };
  }

  async *stream(req: LLMRequest, onUsage?: (u: Usage) => void): AsyncGenerator<string, void, void> {
    const res = await this.call("streamGenerateContent?alt=sse", req);
    if (!res.body) throw new ProviderError("unavailable", this.name);
    let emitted = false;
    for await (const data of sseData(res.body)) {
      let j: { candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[]; usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number }; promptFeedback?: { blockReason?: string } };
      try { j = JSON.parse(data); } catch { continue; }
      if (j.promptFeedback?.blockReason) throw new ProviderError("blocked", this.name);
      const t = j.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
      if (t) { emitted = true; yield t; }
      if (j.usageMetadata && onUsage) onUsage({ input: j.usageMetadata.promptTokenCount ?? 0, output: j.usageMetadata.candidatesTokenCount ?? 0, estimated: false });
      if (j.candidates?.[0]?.finishReason === "SAFETY" && !emitted) throw new ProviderError("blocked", this.name);
    }
    if (!emitted) throw new ProviderError("unavailable", this.name, undefined, undefined, "empty response");
  }

  async healthCheck(deep = false) {
    if (!this.isConfigured()) return { ok: false, detail: "GEMINI_API_KEY not set" };
    if (!deep) return { ok: true, detail: "configured" };
    const t0 = Date.now();
    try { await this.generate({ system: "Reply with OK.", messages: [{ role: "user", content: "ping" }], maxOutputTokens: 4 }); return { ok: true, detail: "reachable", latencyMs: Date.now() - t0 }; }
    catch (e) { return { ok: false, detail: (e as ProviderError).kind ?? "error", latencyMs: Date.now() - t0 }; }
  }
}
