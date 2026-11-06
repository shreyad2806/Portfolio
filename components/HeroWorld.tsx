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

/* Canvas is 1749 x 1172. Each island is its own image so the group can be spread apart. */
const CANVAS = { w: 1749, h: 1172 };
const ISLANDS: Record<string, { left: number; top: number; width: number; w: number; h: number; pill: { left: number; top: number } }> = {
  // Wider spacing and larger silhouettes create a clear five-island arc:
  // two upper islands, two lower islands, and Journey as the foreground anchor.
  buildlab: { left: 0, top: 18, width: 37, w: 526, h: 570, pill: { left: 18, top: 57 } },
  basecamp: { left: 30, top: 0.5, width: 40, w: 595, h: 514, pill: { left: 50, top: 38 } },
  journey: { left: 22, top: 51, width: 41, w: 584, h: 503, pill: { left: 43, top: 82 } },
  frontier: { left: 66, top: 20, width: 33, w: 501, h: 316, pill: { left: 82, top: 47 } },
  connection: { left: 65, top: 48, width: 35, w: 553, h: 536, pill: { left: 82, top: 81 } },
};

/* Glowing travel routes between islands (canvas coordinates). */
const ROUTES = [
  "M 878 335 Q 583 345 362 541",
  "M 878 335 Q 1147 322 1363 483",
  "M 362 541 Q 595 633 739 838",
  "M 739 838 Q 1057 928 1372 829",
  "M 1363 483 Q 1094 735 739 838",
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
