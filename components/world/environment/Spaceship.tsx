import { STOPS } from "@/lib/world/destinations";

export const WARP_STREAKS = 18;

/** The ship, warp streaks, cockpit frame and "en route" read-out. Purely decorative (aria-hidden); the master timeline fades it in mid-flight only. */
export default function Spaceship() {
  return (
    <div className="wx-flight" aria-hidden="true">
      <div className="wx-cockpit"><i /><i /><i /><i /></div>
      <div className="wx-warp">
        {Array.from({ length: WARP_STREAKS }, (_, i) => (
          <i key={i} data-streak style={{ top: `${(i * 37 + 11) % 92 + 4}%`, left: `${(i * 53) % 70}%`, width: `${10 + ((i * 7) % 16)}%` }} />
        ))}
      </div>
      <div className="wx-ship" data-ship>
        <svg viewBox="0 0 260 100" focusable="false">
          <defs>
            <linearGradient id="wx-hull" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4f1ff" /><stop offset=".55" stopColor="#b9b0f0" /><stop offset="1" stopColor="#6d62c4" /></linearGradient>
            <linearGradient id="wx-flame" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor="#fff" /><stop offset=".35" stopColor="#9fe9ff" /><stop offset="1" stopColor="#7a5cff" stopOpacity="0" /></linearGradient>
            <radialGradient id="wx-glass" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#e9fcff" /><stop offset=".5" stopColor="#4cc9f0" /><stop offset="1" stopColor="#25308f" /></radialGradient>
          </defs>
          <g data-flame style={{ transformOrigin: "78px 50px" }}>
            <path d="M80 50 C 60 36, 28 40, 0 50 C 28 60, 60 64, 80 50 Z" fill="url(#wx-flame)" opacity=".95" />
          </g>
          <path d="M92 40 L58 10 L112 33 Z M92 60 L58 90 L112 67 Z" fill="#7a6be0" />
          <path d="M76 50 C 100 14, 178 10, 252 50 C 178 90, 100 86, 76 50 Z" fill="url(#wx-hull)" />
          <path d="M84 50 C 112 44, 190 44, 244 50" stroke="#6d62c4" strokeWidth="1.5" fill="none" opacity=".7" />
          <rect x="70" y="40" width="14" height="20" rx="4" fill="#4a40a8" />
          <ellipse cx="176" cy="46" rx="26" ry="13" fill="url(#wx-glass)" />
          <ellipse cx="168" cy="41" rx="9" ry="3.5" fill="#fff" opacity=".7" />
        </svg>
      </div>
      <div className="wx-enroute">
        {STOPS.slice(1).map((s) => <span key={s.id} data-leg={s.index} style={{ ["--accent" as string]: s.color }}>En route <b>→ {s.title}</b></span>)}
      </div>
    </div>
  );
}
