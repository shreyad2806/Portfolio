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

/* Label centres as a percentage of the island artwork. */
const PILLS: Record<string, { left: number; top: number }> = {
  basecamp: { left: 52, top: 46 },
  buildlab: { left: 21, top: 61 },
  frontier: { left: 80, top: 49 },
  journey: { left: 43, top: 85 },
  connection: { left: 77, top: 93 },
};

export default function HeroWorld({ destinations, onNavigate }: Props) {
  return (
    <div className="xh-world" role="group" aria-label="Five floating destinations in Shreya's portfolio">
      <div className="xh-world-glow" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/islands.webp"
        alt=""
        width={1458}
        height={977}
        className="xh-world-img"
        draggable={false}
        fetchPriority="high"
      />

      {destinations.map((d, i) => {
        const Icon = d.icon;
        const pos = PILLS[d.id];
        return (
          <button
            key={d.id}
            type="button"
            className="xh-pill"
            style={{ left: `${pos.left}%`, top: `${pos.top}%`, "--c": d.color, animationDelay: `${-i * 1.3}s` } as CSSProperties}
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
