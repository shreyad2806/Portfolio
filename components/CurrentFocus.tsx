"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolio-data";

export default function CurrentFocus() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="card-surface p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div>
            <p className="eyebrow mb-3">Currently Building</p>
            <h3 className="text-2xl font-semibold tracking-tight mb-1">
              {portfolioData.currentFocus.title}
            </h3>
            <p className="text-sm text-primary font-medium mb-2">
              {portfolioData.currentFocus.subtitle}
            </p>
            <p className="text-muted max-w-lg leading-relaxed">
              {portfolioData.currentFocus.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="chip">{portfolioData.currentFocus.badge}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-surface p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-dashed"
        >
          <div>
            <p className="eyebrow mb-2">Upcoming</p>
            <h3 className="text-xl font-semibold tracking-tight mb-1">
              {portfolioData.upcomingFocus.title}
            </h3>
            <p className="text-muted leading-relaxed">
              {portfolioData.upcomingFocus.description}
            </p>
          </div>
          <span className="chip shrink-0">{portfolioData.upcomingFocus.subtitle}</span>
        </motion.div>
      </div>
    </section>
  );
}
