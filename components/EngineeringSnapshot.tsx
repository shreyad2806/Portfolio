"use client";

import { motion } from "framer-motion";
import { Layers, Boxes, Wrench, Trophy, LucideIcon } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Boxes,
  Wrench,
  Trophy,
};

export default function EngineeringSnapshot() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioData.metrics.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Layers;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="card-surface p-6 flex flex-col gap-4"
              >
                <Icon size={18} className="text-primary" strokeWidth={1.75} />
                <div>
                  <p className="text-2xl lg:text-3xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text mt-1">{stat.label}</p>
                  <p className="text-xs text-muted mt-1">{stat.caption}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
