/** A small, fixed number of CSS-animated motes (kept low for mobile). Foreground depth layer; parallaxed by the timeline. */
const MOTES = Array.from({ length: 16 }, (_, i) => ({ x: (i * 37) % 100, y: (i * 53) % 100, s: 2 + (i % 4), d: 6 + (i % 5) * 2, delay: -(i * 1.3) }));
export default function FloatingParticles() {
  return (
    <div data-layer="foreground" className="wx-fg" aria-hidden="true">
      {MOTES.map((m, i) => <i key={i} className="wx-mote" style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.s, height: m.s, animationDuration: `${m.d}s`, animationDelay: `${m.delay}s` }} />)}
      <span className="wx-mist wx-mist--a" /><span className="wx-mist wx-mist--b" />
    </div>
  );
}
