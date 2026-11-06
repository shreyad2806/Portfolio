"use client";

import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

export interface WorldDestination {
  id: string;
  n: string;
  title: string;
  sub: string;
  color: string;
  icon: LucideIcon;
}

type Props = {
  destinations: WorldDestination[];
  onNavigate: (id: string) => void;
};

/* Canvas is 1895 x 1270. Each island is its own image so the group can be spread apart. */
const CANVAS = { w: 1895, h: 1270 };
const ISLANDS: Record<string, { left: number; top: number; width: number; w: number; h: number; pill: { left: number; top: number } }> = {
  buildlab: { left: 6.612, top: 23.732, width: 27.757, w: 526, h: 570, pill: { left: 20.49, top: 56.05 } },
  basecamp: { left: 34.522, top: 8.173, width: 31.398, w: 595, h: 514, pill: { left: 50.22, top: 37.31 } },
  journey: { left: 26.802, top: 51.835, width: 30.818, w: 584, h: 503, pill: { left: 42.21, top: 80.35 } },
  frontier: { left: 64.929, top: 28.724, width: 26.438, w: 501, h: 316, pill: { left: 78.15, top: 46.64 } },
  connection: { left: 64.063, top: 49.732, width: 29.182, w: 553, h: 536, pill: { left: 78.65, top: 80.12 } },
};

/* Glowing travel routes between islands (canvas coordinates). */
const ROUTES = [
  "M 952 361 Q 630 372 388 586",
  "M 952 361 Q 1246 347 1481 523",
  "M 388 586 Q 643 686 800 910",
  "M 800 910 Q 1146 1008 1490 900",
  "M 1481 523 Q 1187 798 800 910",
];

export default function HeroWorld({ destinations, onNavigate }: Props) {
  return (
    <div className="xh-world" role="group" aria-label="Five floating destinations in Shreya's portfolio">
      <div className="xh-world-glow" aria-hidden="true" />
      <svg className="xh-routes" viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} aria-hidden="true">
        <defs>
          <linearGradient id="xh-route" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7de3ff" />
            <stop offset="1" stopColor="#b48cff" />
          </linearGradient>
          <filter id="xh-route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter="url(#xh-route-glow)" fill="none" stroke="url(#xh-route)" strokeLinecap="round">
          {ROUTES.map((d) => (
            <g key={d}>
              <path d={d} strokeWidth="5" opacity=".85" />
              <path d={d} strokeWidth="2" stroke="#fff" className="xh-route-flow" />
            </g>
          ))}
        </g>
      </svg>

      {destinations.map((d, i) => {
        const isl = ISLANDS[d.id];
        return (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={`img-${d.id}`}
            src={`/images/island-${d.id}.webp`}
            alt=""
            width={isl.w}
            height={isl.h}
            draggable={false}
            className="xh-island"
            style={{ left: `${isl.left}%`, top: `${isl.top}%`, width: `${isl.width}%`, animationDelay: `${-i * 1.7}s` } as CSSProperties}
          />
        );
      })}

      {destinations.map((d, i) => {
        const Icon = d.icon;
        const pos = ISLANDS[d.id].pill;
        return (
          <button
            key={d.id}
            type="button"
            className="xh-pill"
            style={{ left: `${pos.left}%`, top: `${pos.top}%`, "--c": d.color, animationDelay: `${-i * 1.7}s` } as CSSProperties}
            onClick={() => onNavigate(d.id)}
            aria-label={`Explore ${d.title}`}
          >
            <span className="xh-pill-icon"><Icon size={22} strokeWidth={1.8} /></span>
            <span className="xh-pill-copy">
              <b><i>{d.n}</i> {d.title}</b>
              <small>{d.sub}</small>
            </span>
          </button>
        );
      })}
    </div>
  );
}
