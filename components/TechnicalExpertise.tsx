"use client";

import { motion } from "framer-motion";
import { Brain, Cloud, Code2, Cpu, Database, FlaskConical, Layers, LucideIcon, Orbit, Terminal, TestTubes } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const iconMap: Record<string, LucideIcon> = { Code: Code2, Terminal, Database, FlaskConical, Brain, Layers };
const artMap: Record<string, LucideIcon> = { Code: Cpu, Terminal, Database, FlaskConical: TestTubes, Brain, Layers: Cloud };
const ACCENTS = ["#8b6bff", "#5aa7ff", "#a78bfa", "#6ee7d9", "#c084fc", "#7aa2ff"];

export default function TechnicalExpertise() {
  const total = portfolioData.technicalExpertise.reduce((sum, a) => sum + a.skills.length, 0);

  return (
    <section id="skills" className="sk-section py-16 lg:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="sk-head">
          <div className="sk-head-copy">
            <p className="eyebrow mb-3">01 / The Basecamp · Technical Expertise</p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
              Skills &amp; <span className="sk-gradient">Technologies</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              The building blocks I reach for—from computer science fundamentals to intelligent systems and the infrastructure around them.
            </p>
          </div>

          <div className="sk-chip-orbit" aria-hidden="true">
            <span className="sk-ring sk-ring--a" />
            <span className="sk-ring sk-ring--b" />
            <span className="sk-ring sk-ring--c" />
            <span className="sk-chip-core"><Cpu size={44} strokeWidth={1.4} /></span>
            <i className="sk-gem sk-gem--1" /><i className="sk-gem sk-gem--2" /><i className="sk-gem sk-gem--3" /><i className="sk-gem sk-gem--4" />
          </div>

          <div className="sk-total">
            <span className="sk-total-icon"><Orbit size={26} /></span>
            <span><b>{total}+</b><small>skills &amp; tools explored</small></span>
          </div>
        </div>

        <div className="sk-grid">
          {portfolioData.technicalExpertise.map((area, i) => {
            const Icon = iconMap[area.icon] ?? Code2;
            const Art = artMap[area.icon] ?? Cpu;
            return (
              <motion.article
                key={area.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="sk-card card-surface"
                style={{ ["--accent" as string]: ACCENTS[i % ACCENTS.length] }}
              >
                <div className="sk-meta"><span>DOMAIN / {String(i + 1).padStart(2, "0")}</span><span>{String(area.skills.length).padStart(2, "0")} MODULES</span></div>
                <div className="sk-title">
                  <span className="sk-icon"><Icon size={26} strokeWidth={1.6} /></span>
                  <h3>{area.category}</h3>
                </div>
                <div className="sk-chips">
                  {area.skills.map((skill) => <span key={skill} className="chip">{skill}</span>)}
                </div>
                <Art className="sk-art" aria-hidden="true" strokeWidth={1} />
                <div className="sk-foot">
                  <span>STACK CONFIGURED</span>
                  <span className="sk-bars"><i /><i /><i /><i /></span>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="sk-tagline" aria-hidden="true"><span>Build</span><i /><span>Learn</span><i /><span>Innovate</span></div>
      </div>
    </section>
  );
}
