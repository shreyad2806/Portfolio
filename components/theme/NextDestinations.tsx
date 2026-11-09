"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { INTERIOR_ORDER, PLACES, type DestinationId } from "./destinations";
import SectionHeading from "./SectionHeading";

/** "Continue exploring" — the other destinations of the world, as floating-island cards. */
export default function NextDestinations({ current }: { current: DestinationId }) {
  const others = INTERIOR_ORDER.filter((id) => id !== current);
  return (
    <section className="mt-24" aria-label="Continue exploring">
      <SectionHeading eyebrow="Continue exploring" title="Pick your next destination." description="Five islands, one world. Jump to another part of Shreya's portfolio." accent={PLACES[current].color} />
      <div className="grid gap-5 md:grid-cols-3">
        {others.map((id, i) => {
          const p = PLACES[id];
          const Icon = p.icon;
          return (
            <motion.div key={id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <Link href={p.href} className="th-dest" style={{ "--accent": p.color } as CSSProperties}>
                <div className="th-dest-art">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.island} alt="" draggable={false} style={{ animationDelay: `${-i * 1.8}s` }} />
                </div>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em]" style={{ color: p.color }}>
                  <Icon size={14} /> {p.n}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-300/75">{p.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
                  Travel there <ArrowRight size={16} style={{ color: p.color }} />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="btn-secondary text-sm">
          Return to the Basecamp
        </Link>
      </div>
    </section>
  );
}
