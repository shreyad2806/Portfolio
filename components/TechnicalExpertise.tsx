"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Cpu, Brain, Server, Layout, Database, Code, LucideIcon } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";
import SectionHeading from "@/components/theme/SectionHeading";

const iconMap: Record<string, LucideIcon> = { Cpu, Brain, Server, Layout, Database, Code };
const ACCENTS = ["#b49aff", "#66e9f4", "#78e5bd", "#ffc46e", "#f58dc8", "#8b9bff"];

export default function TechnicalExpertise() {
  return (
    <section id="skills" className="relative py-20 lg:py-24">
      <div className="container-px mx-auto max-w-[1400px]">
        <SectionHeading
          index="01"
          eyebrow="The Basecamp · Technical Expertise"
          title={<>Skills &amp; <span className="th-accent-text" style={{ "--accent": "#b49aff" } as CSSProperties}>technologies</span></>}
          description="The toolkit behind the systems: from core computer science to agentic AI and the infrastructure that keeps it reliable."
          accent="#b49aff"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.technicalExpertise.map((area, i) => {
            const Icon = iconMap[area.icon] || Cpu;
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <motion.div
                key={area.category}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="skills-card card-surface th-skill p-6"
                style={{ "--accent": accent } as CSSProperties}
              >
                <div className="mb-5 flex items-center gap-3.5">
                  <div className="th-skill-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{area.category}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-[.16em]" style={{ color: accent }}>
                      {String(i + 1).padStart(2, "0")} · {area.skills.length} skills
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pb-3">
                  {area.skills.map((skill) => (
                    <span key={skill} className="chip text-xs">
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
