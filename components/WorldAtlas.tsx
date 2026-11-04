"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { ArrowUpRight, Compass, Cpu, FlaskConical, Map, RadioTower, Telescope } from "lucide-react";

const destinations = [
  { number: "01", name: "The Basecamp", code: "IDENTITY / PROFILE", description: "The person behind the systems: background, engineering principles and the path so far.", target: "skills", icon: Compass, color: "#a78bfa", glow: "rgba(167,139,250,.2)", terrain: "basecamp" },
  { number: "02", name: "The Build Lab", code: "PROJECTS / SYSTEMS", description: "A closer look at the systems I've designed, built, tested and learned from.", target: "projects", icon: FlaskConical, color: "#67e8f9", glow: "rgba(103,232,249,.17)", terrain: "buildlab" },
  { number: "03", name: "The Journey", code: "EXPERIENCE / MILESTONES", description: "Internships, hackathons, collaborations and the moments that shaped my work.", target: "journey", icon: Map, color: "#f6c779", glow: "rgba(246,199,121,.16)", terrain: "journey" },
  { number: "04", name: "The Frontier", code: "EXPLORATION / IDEAS", description: "Agentic engineering, developer infrastructure, experiments and what I'm learning next.", target: "focus", icon: Telescope, color: "#8ee5c1", glow: "rgba(142,229,193,.16)", terrain: "frontier" },
  { number: "05", name: "The Connection Hub", code: "CONTACT / COLLABORATE", description: "Have a problem worth solving or an interesting system to build? Let's connect.", target: "contact", icon: RadioTower, color: "#ff9acb", glow: "rgba(255,154,203,.16)", terrain: "connection" },
];

export default function WorldAtlas() {
  const travelTo = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="world-atlas" className="world-atlas relative overflow-hidden border-y border-white/[.07] py-20 sm:py-24">
      <div className="world-atlas-grid" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[.26em] text-cyan-200/70">Navigation system · five destinations</p>
            <h2 className="text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">Choose your coordinates.</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">This portfolio is a small world, not a long scroll. Pick a destination and jump straight into that part of my work.</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[.18em] text-slate-500"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300"/> All destinations online</div>
        </div>

        <div className="world-route-line mb-5 hidden lg:block" aria-hidden="true" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((destination, index) => {
            const Icon = destination.icon;
            return (
              <motion.button
                key={destination.number}
                type="button"
                onClick={() => travelTo(destination.target)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .15 }}
                transition={{ duration: .45, delay: index * .07 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: .985 }}
                className={`world-destination world-destination--${destination.terrain} group relative flex min-h-[230px] flex-col overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-300`}
                style={{ "--destination-color": destination.color, "--destination-glow": destination.glow } as CSSProperties}
              >
                <div className="destination-orbit" aria-hidden="true" />
                <div className="relative z-10 flex w-full items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[.18em] text-white/40">{destination.number} / 05</span>
                  <ArrowUpRight size={16} className="text-white/40 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </div>
                <div className="relative z-10 mt-8 flex h-12 w-12 items-center justify-center rounded-xl border" style={{ color: destination.color, borderColor: destination.color + "55", background: destination.glow, boxShadow: `0 0 36px ${destination.glow}` }}>
                  <Icon size={22} strokeWidth={1.5}/>
                </div>
                <div className="relative z-10 mt-auto pt-7">
                  <p className="mb-2 font-mono text-[9px] tracking-[.14em]" style={{ color: destination.color }}>{destination.code}</p>
                  <h3 className="text-lg font-semibold leading-tight text-white">{destination.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{destination.description}</p>
                </div>
                <div className="destination-scan" aria-hidden="true"/>
              </motion.button>
            );
          })}
        </div>
        <p className="mt-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[.16em] text-slate-600"><Cpu size={12}/> Coordinates are interactive · Select any destination to travel</p>
      </div>
    </section>
  );
}
