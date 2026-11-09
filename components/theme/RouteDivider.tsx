"use client";

import { useId } from "react";

/** A glowing travel-route between two sections, with a node in the middle. */
export default function RouteDivider({ from = "#8b6bff", to = "#67e8f9", flip = false }: { from?: string; to?: string; flip?: boolean }) {
  const id = useId().replace(/:/g, "");
  const d = flip ? "M 40 10 C 260 90, 420 -10, 600 45 S 940 100, 1160 20" : "M 40 70 C 260 -10, 420 100, 600 45 S 940 -10, 1160 70";
  return (
    <div className="th-route" aria-hidden="true">
      <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`g${id}`} x1="0" x2="1">
            <stop offset="0" stopColor={from} stopOpacity="0" />
            <stop offset=".25" stopColor={from} />
            <stop offset=".75" stopColor={to} />
            <stop offset="1" stopColor={to} stopOpacity="0" />
          </linearGradient>
          <filter id={`f${id}`} x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter={`url(#f${id})`} fill="none" strokeLinecap="round">
          <path d={d} stroke={`url(#g${id})`} strokeWidth="3" opacity=".7" />
          <path d={d} stroke="#fff" strokeWidth="1.4" className="th-route-flow" opacity=".85" />
          <circle cx="600" cy="45" r="6" fill="#fff" stroke={to} strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}
