"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
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
  return (
    <section className="th-hero" style={{ "--accent": p.color } as CSSProperties}>
      <div className="th-hero-grid">
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="th-crumb">
            <Icon size={15} />
            SHREYA.EXE <span className="opacity-50">/</span> {p.n} · {p.title}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.04] tracking-[-.035em] text-white"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-8 text-slate-300/85 sm:text-lg"
          >
            {description}
          </motion.p>
          {stats.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }} className="mt-7 flex flex-wrap gap-3">
              {stats.map((s) => (
                <span key={s.label} className="th-stat">
                  <b>{s.value}</b>
                  {s.label}
                </span>
              ))}
            </motion.div>
          )}
          {children && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8">
              {children}
            </motion.div>
          )}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1 }} className="th-hero-art" aria-hidden="true">
          <div className="th-hero-art-glow" />
          <div className="th-orbit" />
          <div className="th-orbit th-orbit--2" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.island} alt="" width={640} height={560} draggable={false} />
        </motion.div>
      </div>
    </section>
  );
}
