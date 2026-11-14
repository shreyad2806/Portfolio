import { afterAll, beforeAll, describe, expect, it } from "vitest";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { GeminiProvider } from "@/lib/nova/providers/gemini";
import { OpenRouterProvider } from "@/lib/nova/providers/openrouter";
import { ProviderManager } from "@/lib/nova/providers/manager";
import { ProviderError } from "@/lib/nova/providers/types";
import { fastCfg } from "../helpers";

/**
 * HTTP-level provider validation against a LOCAL mock server (real sockets, real fetch, real SSE framing).
 * This exercises our adapters/manager end to end; it is NOT a test of live Gemini/OpenRouter.
 */
let server: http.Server; let base = ""; let behaviour: (req: http.IncomingMessage, res: http.ServerResponse) => void = () => {};
const seen: { url: string; headers: http.IncomingHttpHeaders }[] = [];
beforeAll(async () => {
  server = http.createServer((q, s) => { seen.push({ url: q.url ?? "", headers: q.headers }); q.resume(); behaviour(q, s); });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r)); base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
afterAll(() => { server.closeAllConnections?.(); server.close(); });

const toLocal: typeof fetch = (input, init) => fetch(String(input).replace(/^https:\/\/[^/]+/, base), init);
const gemSse = (...t: string[]) => t.map((x) => `data: ${JSON.stringify({ candidates: [{ content: { parts: [{ text: x }] } }] })}\n\n`).join("");
const orSse = (...t: string[]) => t.map((x) => `data: ${JSON.stringify({ choices: [{ delta: { content: x } }] })}\n\n`).join("") + "data: [DONE]\n\n";
const ok = (body: string) => (_: http.IncomingMessage, s: http.ServerResponse) => { s.writeHead(200, { "Content-Type": "text/event-stream" }); s.end(body); };
const status = (code: number, headers: Record<string, string> = {}) => (_: http.IncomingMessage, s: http.ServerResponse) => { s.writeHead(code, headers); s.end("{}"); };
const gem = (key = "SECRET-KEY") => new GeminiProvider({ apiKey: key, model: "m" } as never, toLocal);
const orp = (key = "SECRET-KEY") => new OpenRouterProvider({ apiKey: key, model: "m" } as never, toLocal);
const req = { system: "sys", messages: [{ role: "user" as const, content: "hi" }] };
const mgr = (ps: never[], retries = 0) => new ProviderManager(ps, { ...fastCfg, llm: { ...fastCfg.llm, maxRetries: retries } }, async () => {});

describe("providers over real HTTP (local mock)", () => {
  it("streams tokens incrementally from both wire formats", async () => {
    behaviour = ok(gemSse("Hel", "lo"));
    const a: string[] = []; const r1 = await mgr([gem()] as never).stream(req, (d) => a.push(d)); expect(r1.text).toBe("Hello"); expect(a).toEqual(["Hel", "lo"]);
    behaviour = ok(orSse("Wor", "ld"));
    const r2 = await mgr([orp()] as never).stream(req, () => {}); expect(r2.text).toBe("World");
  });
  it("never puts the API key in the URL", async () => {
    seen.length = 0; behaviour = ok(gemSse("x")); await mgr([gem()] as never).stream(req, () => {});
    expect(seen[0].url).not.toContain("SECRET-KEY"); expect(seen[0].headers["x-goog-api-key"]).toBe("SECRET-KEY");
  });
  it("invalid key (401/403) fails over to the next provider without retrying the bad one", async () => {
    let bad = 0;
    behaviour = (q, s) => { if (q.url?.includes("generativelanguage") || q.url?.includes(":streamGenerateContent")) { bad++; status(401)(q, s); } else ok(orSse("fallback"))(q, s); };
    const out = await mgr([gem(), orp()] as never, 2).stream(req, () => {});
    expect(out.provider).toBe("openrouter"); expect(out.text).toBe("fallback"); expect(bad).toBe(1);
  });
  it("429 with a long Retry-After fails over; the error never leaks the key", async () => {
    behaviour = (q, s) => (q.url?.includes("chat/completions") ? ok(orSse("ok"))(q, s) : status(429, { "retry-after": "120" })(q, s));
    const out = await mgr([gem(), orp()] as never, 2).stream(req, () => {}); expect(out.provider).toBe("openrouter");
    behaviour = status(429, { "retry-after": "120" });
    const err = await mgr([gem()] as never).stream(req, () => {}).catch((e) => e as ProviderError);
    expect(err).toBeInstanceOf(ProviderError); expect(String((err as Error).message)).not.toContain("SECRET-KEY");
  });
  it("server outage (503) retries then falls back, and the breaker opens after repeated failures", async () => {
    let n = 0; behaviour = (q, s) => { n++; status(503)(q, s); };
    const m = mgr([gem()] as never, 1);
    for (let i = 0; i < 3; i++) await m.stream(req, () => {}).catch(() => {});
    expect(m.status()[0].breaker).toBe("open"); const before = n; await m.stream(req, () => {}).catch(() => {}); expect(n).toBe(before);
  });
  it("a hung upstream is cut by the abort signal (timeout) instead of hanging", async () => {
    behaviour = () => { /* never respond */ };
    const t0 = Date.now(); const ac = new AbortController(); setTimeout(() => ac.abort(), 150);
    await expect(mgr([gem()] as never).stream({ ...req, signal: ac.signal }, () => {})).rejects.toBeInstanceOf(ProviderError);
    expect(Date.now() - t0).toBeLessThan(2000);
  });
  it("a connection that dies mid-stream keeps the partial text and is flagged truncated", async () => {
    behaviour = (_q, s) => { s.writeHead(200, { "Content-Type": "text/event-stream" }); s.write(gemSse("partial ")); setTimeout(() => s.destroy(), 30); };
    const out = await mgr([gem()] as never).stream(req, () => {}); expect(out.text).toBe("partial "); expect(out.truncated).toBe(true);
  });
  it("an unreachable provider (connection refused) is a network error, not a crash", async () => {
    const dead = new GeminiProvider({ apiKey: "k", model: "m" } as never, (i, init) => fetch(String(i).replace(/^https:\/\/[^/]+/, "http://127.0.0.1:1"), init));
    await expect(mgr([dead] as never).stream(req, () => {})).rejects.toBeInstanceOf(ProviderError);
  });
});
