"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, Trophy, Users, Sparkles, BrainCircuit } from "lucide-react";
import SectionHeading from "@/components/theme/SectionHeading";

const milestones = [
  {
    period: "AUG 2026 — PRESENT",
    title: "Software Engineer Intern",
    organization: "StartupCrafters",
    description: "Investigating repository-level failures, reproducing bugs, analyzing logs and PostHog events, and improving application reliability through code changes, pull requests and testing.",
    tags: ["Debugging", "Root-cause analysis", "Testing", "Reliability"],
    icon: BriefcaseBusiness,
    color: "#a78bfa",
  },
  {
    period: "MAY 2026 — JUN 2026",
    title: "AI Engineer Intern",
    organization: "LawGPT",
    description: "Developed an AI-powered legal marketing CRM for lead discovery, qualification, engagement tracking, content generation and workflow automation using OCR, NLP, REST APIs and Supabase.",
    tags: ["AI workflows", "OCR / NLP", "CRM", "Supabase"],
    icon: BriefcaseBusiness,
    color: "#67e8f9",
  },
];

const recognitions = [
  { title: "Smart India Hackathon", detail: "National Runner-up · 2025", icon: Trophy, color: "#f6c779" },
  { title: "ET GenAI Hackathon", detail: "Finalist · 2025", icon: Sparkles, color: "#a78bfa" },
  { title: "Technomech Club", detail: "President · Community & leadership", icon: Users, color: "#8ee5c1" },
  { title: "NandaHack", detail: "HCLTech × MIT Media Lab · Agentic AI", icon: BrainCircuit, color: "#67e8f9" },
];

export default function JourneySection() {
  return (
    <section id="journey" className="journey-section relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <SectionHeading
          index="03"
          eyebrow="The Journey · Experience"
          title={<>Experience is <span className="th-accent-text" style={{ "--accent": "#ffc46e" } as React.CSSProperties}>built</span>, not collected.</>}
          description="A few chapters that shaped how I approach engineering: building for real workflows, debugging what breaks, and learning alongside other builders."
          accent="#ffc46e"
        />
        <div className="relative grid gap-5 lg:grid-cols-[1.35fr_.85fr]">
          
          <div className="space-y-4">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.organization} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .45, delay: index * .08 }} className="journey-card card-surface relative p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-[.18em]" style={{ color: item.color }}>{item.period}</span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-400">Internship</span>
                  </div>
                  <div className="mt-5 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style={{ color: item.color, borderColor: item.color + "55", background: item.color + "14" }}><Icon size={19}/></div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm font-medium" style={{ color: item.color }}>{item.organization}</p>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">{item.tags.map(tag => <span key={tag} className="rounded-full border border-white/[.08] bg-white/[.025] px-2.5 py-1 text-[10px] text-slate-400">{tag}</span>)}</div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {recognitions.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="journey-recognition card-surface flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ color: item.color, background: item.color + "18" }}><Icon size={19}/></div>
                  <div><h3 className="text-sm font-semibold text-white">{item.title}</h3><p className="mt-1 text-xs text-slate-500">{item.detail}</p></div>
                </motion.div>
              );
            })}
            <a href="https://github.com/shreyad2806" target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-400 transition hover:border-amber-200/40 hover:text-white">
              More experiments & contributions <ArrowUpRight size={16} className="transition group-hover:-translate-y-1 group-hover:translate-x-1"/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
