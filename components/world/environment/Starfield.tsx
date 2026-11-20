/** Deterministic SVG stars (no hydration mismatch, no canvas). Two depth layers get different parallax from the master timeline. */
function rng(seed: number) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function stars(n: number, seed: number, rMin: number, rMax: number) {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => ({ x: +(r() * 100).toFixed(2), y: +(r() * 100).toFixed(2), r: +(rMin + r() * (rMax - rMin)).toFixed(2), o: +(0.35 + r() * 0.65).toFixed(2), tw: i % 9 === 0 }));
}
const FAR = stars(110, 7, 0.08, 0.2), NEAR = stars(46, 19, 0.18, 0.42);

function Layer({ data, layer }: { data: ReturnType<typeof stars>; layer: string }) {
  return (
    <svg data-layer={layer} className="wx-stars" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {data.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} className={s.tw ? "wx-twinkle" : undefined} style={s.tw ? { animationDelay: `${(i % 7) * 0.6}s` } : undefined} />)}
    </svg>
  );
}
export default function Starfield() { return <><Layer data={FAR} layer="stars-far" /><Layer data={NEAR} layer="stars-near" /></>; }
