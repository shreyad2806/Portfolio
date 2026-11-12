import { novaConfig } from "../config";

/** Sliding-window limiter keyed by a visitor hash. Instance-local: on serverless it is best-effort, not a hard guarantee. */
export class RateLimiter {
  private hits = new Map<string, number[]>();
  constructor(private perMinute = novaConfig.rateLimit.perMinute, private perHour = novaConfig.rateLimit.perHour, private now: () => number = Date.now) {}
  check(key: string): { ok: boolean; retryAfterSec: number } {
    const t = this.now();
    const arr = (this.hits.get(key) ?? []).filter((x) => t - x < 3600_000);
    const lastMin = arr.filter((x) => t - x < 60_000);
    if (lastMin.length >= this.perMinute) { this.hits.set(key, arr); return { ok: false, retryAfterSec: Math.max(1, Math.ceil((60_000 - (t - lastMin[0])) / 1000)) }; }
    if (arr.length >= this.perHour) { this.hits.set(key, arr); return { ok: false, retryAfterSec: Math.max(1, Math.ceil((3600_000 - (t - arr[0])) / 1000)) }; }
    arr.push(t); this.hits.set(key, arr);
    if (this.hits.size > 5000) for (const [k, v] of this.hits) if (t - v[v.length - 1] > 3600_000) this.hits.delete(k);
    return { ok: true, retryAfterSec: 0 };
  }
}
