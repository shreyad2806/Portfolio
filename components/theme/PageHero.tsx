"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gsap, registerGsap, useGSAP } from "@/lib/world/gsap";
import InteriorSky from "@/components/world/environment/InteriorSky";
import ShipArt from "@/components/world/environment/ShipArt";
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
    let portal: string | null = null;
    try { portal = sessionStorage.getItem("wx:portal"); sessionStorage.removeItem("wx:portal"); } catch { /* ignore */ }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (portal) {
      /* arriving from the world: we are inside the island — its light fades out and the island settles from close-up */
      gsap.fromTo("[data-portal]", { opacity: 1 }, { opacity: 0, duration: 0.9, ease: "power2.out" });
      gsap.from("[data-art]", { scale: 1.5, duration: 1.2, ease: "power3.out", clearProps: "transform" });
    }
    gsap.from("[data-enter]", { opacity: 0, y: 18, duration: 0.55, stagger: 0.07, ease: "power2.out", clearProps: "opacity,transform" });
    gsap.from("[data-art]", { opacity: 0, scale: 0.92, duration: 0.8, delay: 0.1, ease: "power2.out", clearProps: "opacity,transform" });
  }, { scope: root });
  return (
    <section ref={root} className="th-hero" style={{ "--accent": p.color } as CSSProperties}>
      <InteriorSky />
      <div data-portal className="wx-portal wx-portal--arrive" aria-hidden="true" style={{ "--pg": p.glow, opacity: 0 } as CSSProperties} />
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
          <div className="th-hero-ship"><ShipArt uid="hero" flame /></div>
          <span className="th-hero-ship-tag">You&apos;re inside {p.title}</span>
        </div>
      </div>
    </section>
  );
}
