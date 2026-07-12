"use client";

import { motion } from "framer-motion";
import { Trophy, Rocket, Globe, Github, LucideIcon } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const iconMap: Record<string, LucideIcon> = {
  Trophy,
  Rocket,
  Globe,
  Github,
};

export default function HackathonStrip() {
  return (
    <section className="py-8 lg:py-12 border-y border-border/50">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioData.hackathons.map((item, i) => {
            const Icon = iconMap[item.icon] || Trophy;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted truncate">{item.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
