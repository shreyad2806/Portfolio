"use client";

import { motion } from "framer-motion";
import {
  Server,
  Cpu,
  Layout,
  Wrench,
  Github,
  Globe,
  LucideIcon,
} from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const iconMap: Record<string, LucideIcon> = {
  "Backend Engineering": Server,
  "AI Infrastructure": Cpu,
  "System Design": Layout,
  "Developer Tools": Wrench,
  "Open Source": Github,
  "Modern Web Technologies": Globe,
};

export default function CurrentlyExploring() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="card-surface p-8 lg:p-10"
        >
          <h3 className="text-xl font-semibold tracking-tight mb-6 text-center">
            Currently Exploring
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioData.currentlyExploring.map((item, i) => {
              const Icon = iconMap[item] || Wrench;
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/40 border border-border/30 hover:border-primary/30 transition-all duration-300"
                >
                  <Icon size={16} className="text-primary" />
                  <span className="text-sm text-muted">{item}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
