/* Layered night-sky backdrop: nebula, twinkling stars, moon, mountains, drifting clouds. Pure CSS/SVG, no JS. */

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = rng(7);
const STARS = Array.from({ length: 90 }, () => ({
  x: +(rand() * 100).toFixed(2),
  y: +(rand() * 78).toFixed(2),
  s: +(0.8 + rand() * 2.2).toFixed(1),
  d: +(2 + rand() * 4).toFixed(1),
  o: +(rand() * -6).toFixed(1),
  c: rand() > 0.82 ? "#9cefff" : rand() > 0.9 ? "#e3c8ff" : "#e6ecff",
}));

const SPARKLES = [
  { x: 47, y: 9 }, { x: 74, y: 24 }, { x: 88, y: 12 },
];

export default function HeroBackdrop() {
  return (
    <div className="xh-sky" aria-hidden="true">
      <div className="xh-nebula xh-nebula--a" />
      <div className="xh-nebula xh-nebula--b" />
      <div className="xh-nebula xh-nebula--c" />

      {STARS.map((s, i) => (
        <i
          key={i}
          className="xh-star"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, background: s.c, boxShadow: `0 0 ${s.s * 4}px ${s.c}`, animationDuration: `${s.d}s`, animationDelay: `${s.o}s` }}
        />
      ))}
      {SPARKLES.map((s, i) => (
        <b key={i} className="xh-sparkle" style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${-i * 1.3}s` }} />
      ))}

      <div className="xh-moon-wrap">
        <span className="xh-moon" />
      </div>

      <svg className="xh-mountains" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="xh-m1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4b3a9a" />
            <stop offset=".6" stopColor="#241a63" />
            <stop offset="1" stopColor="#120b3d" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="xh-m2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#33297f" />
            <stop offset="1" stopColor="#0f0a38" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-20 600 L120 470 L210 520 L340 360 L440 470 L520 410 L640 520 L760 330 L870 500 L980 390 L1090 520 L1210 300 L1330 480 L1430 400 L1520 500 L1620 440 L1620 600Z" fill="url(#xh-m1)" opacity=".75" />
        <path d="M1210 300 L1160 380 L1210 360 L1245 395 L1280 350Z" fill="#b8a6ff" opacity=".18" />
        <path d="M760 330 L720 400 L760 385 L795 420 L825 375Z" fill="#b8a6ff" opacity=".14" />
        <path d="M340 360 L300 430 L340 415 L372 445 L395 400Z" fill="#b8a6ff" opacity=".14" />
        <path d="M-20 600 L60 540 L170 575 L300 505 L430 570 L560 520 L700 580 L860 530 L1010 585 L1160 520 L1300 575 L1450 520 L1620 570 L1620 600Z" fill="url(#xh-m2)" opacity=".9" />
      </svg>

      <span className="xh-rock xh-rock--1" />
      <span className="xh-rock xh-rock--2" />
      <span className="xh-rock xh-rock--3" />

      <div className="xh-mist" />
      <span className="xh-cloud xh-cloud--l" />
      <span className="xh-cloud xh-cloud--m" />
      <span className="xh-cloud xh-cloud--r" />
      <span className="xh-cloud xh-cloud--b" />
      <div className="xh-vignette" />
    </div>
  );
}
