"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gsap, registerGsap, useGSAP } from "@/lib/world/gsap";
import { PLACES, type DestinationId } from "./destinations";

type Props = {
  place: DestinationId;
  title: ReactNode;
  description: ReactNode;
  stats?: { value: string; label: string }[];
  children?: ReactNode;
};

/**
 * Hero for every interior page. Each page is a destination in the world, so its
 * hero shows that destination's floating island with orbiting light and a crumb trail.
 */
export default function PageHero({ place, title, description, stats = [], children }: Props) {
  const p = PLACES[place];
  const Icon = p.icon;
  const root = useRef<HTMLElement>(null);
  /* short GSAP entrance (the interior routes are not part of the pinned world; reduced motion shows everything immediately) */
  useGSAP(() => {
    registerGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from("[data-enter]", { opacity: 0, y: 18, duration: 0.55, stagger: 0.07, ease: "power2.out", clearProps: "opacity,transform" });
    gsap.from("[data-art]", { opacity: 0, scale: 0.92, duration: 0.8, delay: 0.1, ease: "power2.out", clearProps: "opacity,transform" });
  }, { scope: root });
  return (
    <section ref={root} className="th-hero" style={{ "--accent": p.color } as CSSProperties}>
      <div className="th-hero-grid">
        <div>
          <div data-enter className="th-crumb">
            <Icon size={15} />
            SHREYA.EXE <span className="opacity-50">/</span> {p.n} · {p.title}
          </div>
          <h1
            data-enter
            className="mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.04] tracking-[-.035em] text-white"
          >
            {title}
          </h1>
          <p
            data-enter
            className="mt-6 max-w-xl text-base leading-8 text-slate-300/85 sm:text-lg"
          >
            {description}
          </p>
          {stats.length > 0 && (
            <div data-enter className="mt-7 flex flex-wrap gap-3">
              {stats.map((s) => (
                <span key={s.label} className="th-stat">
                  <b>{s.value}</b>
                  {s.label}
                </span>
              ))}
            </div>
          )}
          {children && (
            <div data-enter className="mt-8">
              {children}
            </div>
          )}
          <Link href={`/#${place}`} data-enter className="th-return"><ArrowLeft size={14} aria-hidden="true" /> Return to the world</Link>
        </div>

        <div data-art className="th-hero-art" aria-hidden="true">
          <div className="th-hero-art-glow" />
          <div className="th-orbit" />
          <div className="th-orbit th-orbit--2" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.island} alt="" width={640} height={560} draggable={false} />
        </div>
      </div>
    </section>
  );
}
