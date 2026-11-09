/* Fixed night sky behind every page: nebula glows, twinkling stars, drifting clouds. Pure CSS, no JS. */

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = rng(21);
const STARS = Array.from({ length: 70 }, () => {
  const c = rand();
  return {
    x: +(rand() * 100).toFixed(2),
    y: +(rand() * 100).toFixed(2),
    s: +(1 + rand() * 2).toFixed(1),
    d: +(3 + rand() * 4).toFixed(1),
    o: +(rand() * -6).toFixed(1),
    c: c > 0.86 ? "#9cefff" : c > 0.94 ? "#e3c8ff" : "#e6ecff",
  };
});

export default function SiteBackdrop() {
  return (
    <div className="th-sky" aria-hidden="true">
      <div className="th-sky-nebula th-sky-nebula--a" />
      <div className="th-sky-nebula th-sky-nebula--b" />
      <div className="th-sky-nebula th-sky-nebula--c" />
      {STARS.map((s, i) => (
        <i
          key={i}
          className="th-star"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, background: s.c, boxShadow: `0 0 ${s.s * 4}px ${s.c}`, animationDuration: `${s.d}s`, animationDelay: `${s.o}s` }}
        />
      ))}
      <div className="th-sky-mist" />
      <span className="th-sky-cloud th-sky-cloud--1" />
      <span className="th-sky-cloud th-sky-cloud--2" />
      <span className="th-sky-cloud th-sky-cloud--3" />
    </div>
  );
}
