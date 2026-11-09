"use client";

import { motion } from "framer-motion";
import { Telescope } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";
import SectionHeading from "@/components/theme/SectionHeading";

export default function CurrentFocus() {
  const focus = portfolioData.currentFocus;
  return (
    <section id="focus" className="relative py-20 lg:py-24">
      <div className="container-px mx-auto max-w-[1400px]">
        <SectionHeading
          index="04"
          eyebrow="The Frontier · Currently exploring"
          title={<>Out at the <span className="th-accent-text" style={{ "--accent": "#78e5bd" } as React.CSSProperties}>edge</span> of the map.</>}
          accent="#78e5bd"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="card-surface flex flex-col items-start gap-8 p-8 sm:flex-row sm:items-center lg:p-10"
          style={{ borderColor: "rgba(120,229,189,.4)" }}
        >
          <div className="th-radar" aria-hidden="true">
            <span className="th-radar-sweep" />
            <span className="th-radar-dot" style={{ left: "62%", top: "30%" }} />
            <span className="th-radar-dot" style={{ left: "30%", top: "58%", animationDelay: "-1s" }} />
            <span className="th-radar-dot" style={{ left: "70%", top: "68%", animationDelay: "-1.7s" }} />
            <Telescope size={26} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-100" />
          </div>

          <div className="flex-1">
            <p className="eyebrow mb-3">Currently building</p>
            <h3 className="mb-1 text-2xl font-semibold tracking-tight text-white lg:text-3xl">{focus.title}</h3>
            <p className="mb-3 text-sm font-medium text-cyan-200">{focus.subtitle}</p>
            <p className="max-w-xl leading-relaxed text-slate-300/80">{focus.description}</p>
          </div>

          <div className="flex w-fit shrink-0 items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_10px_#6ee7b7]" />
            </span>
            <span className="chip">{focus.badge}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
