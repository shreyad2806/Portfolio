import { RateLimiter } from "@/lib/nova/cache/rate-limit";
import { getNova } from "@/lib/nova/engine";
import { sha1Hex } from "@/lib/nova/knowledge/text";
import { log, metrics } from "@/lib/nova/observability";
import { parseChatRequest } from "@/lib/nova/engine/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limiter = new RateLimiter();
const SALT = process.env.NOVA_RATE_SALT ?? Math.random().toString(36).slice(2);
const MAX_BODY = 8 * 1024;
const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });

export async function POST(request: Request) {
  const len = Number(request.headers.get("content-length") ?? 0);
  if (len > MAX_BODY) return json({ error: "Request too large." }, 413);
  let raw: unknown;
  try { const text = await request.text(); if (text.length > MAX_BODY) return json({ error: "Request too large." }, 413); raw = JSON.parse(text); } catch { return json({ error: "Invalid request." }, 400); }
  const parsed = parseChatRequest(raw);
  if ("error" in parsed) return json({ error: parsed.error }, 400);

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const rl = limiter.check(sha1Hex(ip + SALT));
  if (!rl.ok) {
    metrics.recordRateLimited();
    return json({ error: "You're sending messages quickly — please wait a moment and try again.", retryAfterSec: rl.retryAfterSec }, 429, { "Retry-After": String(rl.retryAfterSec) });
  }

  const enc = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (o: unknown) => controller.enqueue(enc.encode(JSON.stringify(o) + "\n"));
      try {
        const result = await getNova().run(parsed, (d) => send({ t: "token", d }));
        send({ t: "done", result });
        log("chat", { mode: result.mode, ms: result.meta.latencyMs, provider: result.meta.provider, cache: result.meta.cacheHit, chunks: result.meta.chunks });
      } catch (e) {
        log("chat_error", { error: (e as Error).name });
        send({ t: "error", message: "Nova hit a problem answering that. Please try again, or use the navigation to explore." });
      } finally { controller.close(); }
    },
  });
  return new Response(stream, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" } });
}
