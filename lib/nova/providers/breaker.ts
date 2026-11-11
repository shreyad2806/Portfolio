/** Per-provider circuit breaker: closed → open after N failures in a window → half-open after a cooldown. */
export type BreakerState = "closed" | "open" | "half-open";

export class CircuitBreaker {
  private failures: number[] = [];
  private openedAt = 0;
  private probing = false;
  constructor(private threshold: number, private windowMs: number, private cooldownMs: number, private now: () => number = Date.now) {}

  state(): BreakerState {
    if (!this.openedAt) return "closed";
    return this.now() - this.openedAt >= this.cooldownMs ? "half-open" : "open";
  }
  /** True if a request may proceed. In half-open state only one probe is let through. */
  allow(): boolean {
    const s = this.state();
    if (s === "closed") return true;
    if (s === "open") return false;
    if (this.probing) return false;
    this.probing = true;
    return true;
  }
  success() { this.failures = []; this.openedAt = 0; this.probing = false; }
  failure(retryAfterMs?: number) {
    const t = this.now();
    this.probing = false;
    this.failures = this.failures.filter((x) => t - x < this.windowMs);
    this.failures.push(t);
    if (this.openedAt) { this.openedAt = t; return; }               // failed probe → reopen
    if (this.failures.length >= this.threshold || (retryAfterMs && retryAfterMs > 10_000)) this.openedAt = t + Math.max(0, (retryAfterMs ?? 0) - this.cooldownMs);
  }
  retryAt(): number | null { return this.openedAt ? this.openedAt + this.cooldownMs : null; }
}
