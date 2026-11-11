/** Small in-memory LRU+TTL cache for safe, grounded answers (instance-local; see docs/nova/fallback-strategy.md). */
export class TTLCache<V> {
  private m = new Map<string, { v: V; exp: number }>();
  constructor(private max: number, private ttlMs: number, private now: () => number = Date.now) {}
  get(k: string): V | undefined {
    const e = this.m.get(k);
    if (!e) return undefined;
    if (e.exp < this.now()) { this.m.delete(k); return undefined; }
    this.m.delete(k); this.m.set(k, e);           // refresh recency
    return e.v;
  }
  set(k: string, v: V) {
    this.m.delete(k);
    this.m.set(k, { v, exp: this.now() + this.ttlMs });
    while (this.m.size > this.max) this.m.delete(this.m.keys().next().value as string);
  }
  get size() { return this.m.size; }
  clear() { this.m.clear(); }
}
