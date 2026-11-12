import { describe, expect, it, vi } from "vitest";
import { GeminiProvider } from "@/lib/nova/providers/gemini";
import { OpenRouterProvider } from "@/lib/nova/providers/openrouter";
import { CircuitBreaker } from "@/lib/nova/providers/breaker";
import { ProviderManager } from "@/lib/nova/providers/manager";
import { ProviderError, classifyStatus, parseRetryAfter } from "@/lib/nova/providers/types";
import { FakeProvider, fastCfg, sse } from "../helpers";

const req = { system: "sys", messages: [{ role: "user" as const, content: "hi" }] };
const collect = async (g: AsyncGenerator<string>) => { let s = ""; for await (const d of g) s += d; return s; };
const gem = (f: typeof fetch) => new GeminiProvider({ apiKey: "KEY123", model: "m" } as never, f);
const orp = (f: typeof fetch) => new OpenRouterProvider({ apiKey: "KEY456", model: "m" } as never, f);

describe("provider adapters", () => {
  it("Gemini: parses SSE, sends key only in a header", async () => {
    const f = vi.fn(async () => sse([JSON.stringify({ candidates: [{ content: { parts: [{ text: "Hel" }] } }] }), JSON.stringify({ candidates: [{ content: { parts: [{ text: "lo" }] } }], usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 2 } })]));
    expect(await collect(gem(f as never).stream(req))).toBe("Hello");
    const [url, init] = f.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).not.toContain("KEY123");
    expect((init.headers as Record<string, string>)["x-goog-api-key"]).toBe("KEY123");
  });
  it("OpenRouter: parses SSE deltas and [DONE]", async () => {
    const f = vi.fn(async () => sse([JSON.stringify({ choices: [{ delta: { content: "A" } }] }), JSON.stringify({ choices: [{ delta: { content: "B" } }] }), "[DONE]"]));
    expect(await collect(orp(f as never).stream(req))).toBe("AB");
  });
  it.each([[429, "rate_limit"], [401, "auth"], [403, "auth"], [400, "bad_request"], [503, "unavailable"]])("maps HTTP %i → %s without leaking bodies", async (status, kind) => {
    const f = vi.fn(async () => new Response("SECRET UPSTREAM BODY", { status }));
    const e = await collect(gem(f as never).stream(req)).catch((x) => x);
    expect(e).toBeInstanceOf(ProviderError); expect(e.kind).toBe(kind); expect(e.message).not.toContain("SECRET");
  });
  it("unconfigured provider throws unconfigured", async () => {
    const p = new GeminiProvider({ apiKey: undefined, model: "m" } as never);
    expect(p.isConfigured()).toBe(false);
    expect((await collect(p.stream(req)).catch((x) => x)).kind).toBe("unconfigured");
  });
  it("network/abort errors become timeout/network", async () => {
    const f = vi.fn(async () => { throw Object.assign(new Error("x"), { name: "TimeoutError" }); });
    expect((await collect(gem(f as never).stream(req)).catch((x) => x)).kind).toBe("timeout");
  });
  it("parses Retry-After seconds", () => { expect(parseRetryAfter("2")).toBe(2000); expect(parseRetryAfter(null)).toBeUndefined(); expect(classifyStatus("g", 429, 1500).retryAfterMs).toBe(1500); });
});

describe("circuit breaker", () => {
  it("closed → open → half-open → closed", () => {
    let t = 1000; const b = new CircuitBreaker(3, 60_000, 1000, () => t);
    expect(b.allow()).toBe(true);
    b.failure(); b.failure(); expect(b.state()).toBe("closed"); b.failure();
    expect(b.state()).toBe("open"); expect(b.allow()).toBe(false);
    t = 2500; expect(b.state()).toBe("half-open"); expect(b.allow()).toBe(true); expect(b.allow()).toBe(false); // single probe
    b.success(); expect(b.state()).toBe("closed");
  });
  it("a failed probe reopens", () => {
    let t = 1000; const b = new CircuitBreaker(1, 60_000, 1000, () => t);
    b.failure(); t = 2100; expect(b.allow()).toBe(true); b.failure(); expect(b.state()).toBe("open");
  });
});

describe("provider manager", () => {
  it("retries a transient error then succeeds", async () => {
    const p = new FakeProvider("a", (n) => (n < 2 ? new ProviderError("unavailable", "a", 503) : "ok answer"));
    const out = await new ProviderManager([p], fastCfg, async () => {}).stream(req, () => {});
    expect(out.text).toBe("ok answer"); expect(p.calls).toBe(2); expect(out.attempts).toBe(2);
  });
  it("applies exponential backoff between retries", async () => {
    const waits: number[] = [];
    const p = new FakeProvider("a", (n) => (n < 3 ? new ProviderError("unavailable", "a", 503) : "ok"));
    await new ProviderManager([p], fastCfg, async (ms) => { waits.push(ms); }).stream(req, () => {});
    expect(waits.length).toBe(2); expect(waits[1]).toBeGreaterThan(waits[0]);
  });
  it("honours a short Retry-After", async () => {
    const waits: number[] = [];
    const p = new FakeProvider("a", (n) => (n < 2 ? new ProviderError("rate_limit", "a", 429, 1200) : "ok"));
    await new ProviderManager([p], fastCfg, async (ms) => { waits.push(ms); }).stream(req, () => {});
    expect(waits).toEqual([1200]);
  });
  it("skips to the next provider on a long Retry-After and on auth errors", async () => {
    const a = new FakeProvider("a", () => new ProviderError("rate_limit", "a", 429, 60_000));
    const b = new FakeProvider("b", () => "from b");
    const out = await new ProviderManager([a, b], fastCfg, async () => {}).stream(req, () => {});
    expect(out.provider).toBe("b"); expect(a.calls).toBe(1);
    const c = new FakeProvider("c", () => new ProviderError("auth", "c", 401));
    const d = new FakeProvider("d", () => "from d");
    expect((await new ProviderManager([c, d], fastCfg, async () => {}).stream(req, () => {})).provider).toBe("d"); expect(c.calls).toBe(1);
  });
  it("falls back gemini → openrouter and reports usage", async () => {
    const a = new FakeProvider("gemini", () => new ProviderError("unavailable", "gemini", 500));
    const b = new FakeProvider("openrouter", () => "fallback text");
    const out = await new ProviderManager([a, b], { ...fastCfg, llm: { ...fastCfg.llm, maxRetries: 0 } }, async () => {}).stream(req, () => {});
    expect(out.provider).toBe("openrouter"); expect(out.usage.output).toBe(5);
  });
  it("opens the breaker after repeated failures and stops calling the provider", async () => {
    const a = new FakeProvider("a", () => new ProviderError("unavailable", "a", 500));
    const m = new ProviderManager([a], { ...fastCfg, llm: { ...fastCfg.llm, maxRetries: 0 } }, async () => {});
    for (let i = 0; i < 3; i++) await m.stream(req, () => {}).catch(() => {});
    const before = a.calls;
    await expect(m.stream(req, () => {})).rejects.toBeInstanceOf(ProviderError);
    expect(a.calls).toBe(before); expect(m.available()).toBe(false); expect(m.status()[0].breaker).toBe("open");
  });
  it("keeps partial text when a stream dies mid-answer", async () => {
    const p = new FakeProvider("a", () => "x");
    p.stream = async function* () { yield "partial "; throw new ProviderError("network", "a"); } as never;
    const out = await new ProviderManager([p], fastCfg, async () => {}).stream(req, () => {});
    expect(out.text).toBe("partial "); expect(out.truncated).toBe(true);
  });
  it("throws unconfigured when nothing is configured; available() false when disabled", async () => {
    const p = new FakeProvider("a", () => "x", false);
    const m = new ProviderManager([p], fastCfg);
    expect(m.available()).toBe(false);
    await expect(m.stream(req, () => {})).rejects.toMatchObject({ kind: "unconfigured" });
    expect(new ProviderManager([new FakeProvider("a", () => "x")], { ...fastCfg, llm: { ...fastCfg.llm, disabled: true } }).available()).toBe(false);
  });
});
