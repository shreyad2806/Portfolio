"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Brain,
  Server,
  Layout,
  Database,
  Telescope,
  LucideIcon,
} from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Brain,
  Server,
  Layout,
  Database,
  Telescope,
};

export default function TechnicalExpertise() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="eyebrow mb-3">Technical Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Skills & Technologies
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioData.technicalExpertise.map((area, i) => {
            const Icon = iconMap[area.icon] || Cpu;
            return (
              <motion.div
                key={area.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="card-surface p-6 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-text">
                    {area.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill) => (
                    <span
                      key={skill}
                      className="chip text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
