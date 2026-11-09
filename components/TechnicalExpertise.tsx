"use client";

import { motion } from "framer-motion";
import {
  Cpu, Brain, Server, Layout, Database, Code, LucideIcon, Orbit, Sparkles,
} from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const iconMap: Record<string, LucideIcon> = { Cpu, Brain, Server, Layout, Database, Code };

export default function TechnicalExpertise() {
  const totalSkills = portfolioData.technicalExpertise.reduce((sum, area) => sum + area.skills.length, 0);

  return (
    <section id="skills" className="skills-world-section py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="skills-world-heading mb-10">
          <div className="skills-heading-copy">
            <p className="eyebrow mb-3">01 / The Basecamp · Technical Expertise</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Skills & Technologies</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              A focused engineering toolkit—from computer science fundamentals and backend systems to machine learning and agentic AI.
            </p>
          </div>
          <div className="skills-world-total" aria-label={`${totalSkills} resume-listed skills and technologies across six domains`}>
            <span className="skills-world-total-icon"><Orbit size={19} /></span>
            <span><b>{totalSkills}</b><small>resume-listed skills & tools</small></span>
          </div>
        </div>

        <div className="skills-world-orbit" aria-hidden="true">
          <span className="skills-orbit-ring skills-orbit-ring--one" />
          <span className="skills-orbit-ring skills-orbit-ring--two" />
          <span className="skills-orbit-core"><Sparkles size={20} /></span>
          <span className="skills-orbit-node skills-orbit-node--one" />
          <span className="skills-orbit-node skills-orbit-node--two" />
          <span className="skills-orbit-node skills-orbit-node--three" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 skills-world-grid">
          {portfolioData.technicalExpertise.map((area, i) => {
            const Icon = iconMap[area.icon] || Cpu;
            return (
              <motion.article
                key={area.category}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                className={`skills-card skills-card--domain-${i + 1} card-surface p-6 transition-all duration-300`}
                data-domain={area.category}
              >
                <div className="skills-card-topline">
                  <span>DOMAIN / 0{i + 1}</span>
                  <span>{String(area.skills.length).padStart(2, "0")} MODULES</span>
                </div>
                <div className="skills-card-heading">
                  <div className="skills-card-icon"><Icon size={20} /></div>
                  <h3 className="text-base font-semibold text-text">{area.category}</h3>
                </div>
                <div className="skills-card-tags" aria-label={`${area.category} skills`}>
                  {area.skills.map((skill) => <span key={skill} className="skill-chip">{skill}</span>)}
                </div>
                <div className="skills-card-footer">
                  <span>RESUME TOOLSET</span>
                  <span className="skills-card-signal" aria-hidden="true"><i /><i /><i /><i /></span>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="skills-world-legend" aria-hidden="true">
          <span><i /> FOUNDATIONS</span><b />
          <span><i /> ENGINEERING</span><b />
          <span><i /> INTELLIGENCE</span><b />
          <span><i /> INFRASTRUCTURE</span>
        </div>
      </div>
    </section>
  );
}
