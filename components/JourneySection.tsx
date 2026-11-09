"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Github, Briefcase, Scale, Sparkles, Trophy, Users, LucideIcon } from "lucide-react";

const highlights = [
  { icon: Trophy, title: "Hackathons", text: "Smart India Hackathon, ET GenAI Hackathon", tone: "violet" },
  { icon: Github, title: "Open Source", text: "Agentic AI platform contributor", tone: "cyan" },
  { icon: Briefcase, title: "Internships", text: "StartupCrafters & LawGPT", tone: "blue" },
] as const;

const experience = [
  {
    period: "Aug 2026 — Present", title: "Software Engineer Intern", org: "StartupCrafters", active: true, logo: "SC", icon: null as LucideIcon | null,
    description: "Investigated software failures, implemented fixes, and contributed to backend development through PRs and testing.",
    tags: ["Python", "FastAPI", "PostHog", "GitHub"],
  },
  {
    period: "May 2026 — Jun 2026", title: "AI Engineer Intern", org: "LawGPT", active: false, logo: "", icon: Scale,
    description: "Built an AI-powered legal marketing CRM with OCR, NLP and automated workflows.",
    tags: ["Python", "Next.js", "Supabase", "RAG"],
  },
];

const achievements: { title: string; detail: string; icon: LucideIcon }[] = [
  { title: "Smart India Hackathon", detail: "National Runner-up · 2025", icon: Trophy },
  { title: "ET GenAI Hackathon", detail: "Finalist · 2025", icon: Sparkles },
  { title: "NandaHack", detail: "HCLTech × MIT Media Lab · Agentic AI", icon: BrainCircuit },
  { title: "Technomech Club", detail: "President · Community & leadership", icon: Users },
];

export default function JourneySection() {
  const [tab, setTab] = useState<"experience" | "achievements">("experience");

  return (
    <section id="journey" className="jy-section py-16 lg:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="jy-head">
          <div className="jy-head-copy">
            <p className="jy-pill"><Sparkles size={14} /> MY JOURNEY <i /></p>
            <h2 className="jy-title">Building. <span className="jy-violet">Exploring.</span> <span className="jy-cyan">Growing.</span></h2>
            <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted">From hackathons to open source, and real-world internships — a journey of continuous learning and impact.</p>
          </div>
          <div className="jy-planet" aria-hidden="true"><span className="jy-globe" /><span className="jy-ring jy-ring--a" /><span className="jy-ring jy-ring--b" /><i className="jy-moon jy-moon--1" /><i className="jy-moon jy-moon--2" /></div>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }} className="jy-bar">
          {highlights.map(({ icon: Icon, title, text, tone }) => (
            <div key={title} className={`jy-hl jy-hl--${tone}`}>
              <span className="jy-hl-icon"><Icon size={30} strokeWidth={1.5} /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </div>
          ))}
          <Link href="/experience" className="jy-bar-go" aria-label="See full experience"><ArrowRight size={20} /></Link>
        </motion.div>

        <div className="jy-panel">
          <div className="jy-panel-head">
            <span className="jy-panel-title"><i />My {tab === "experience" ? "Experience" : "Achievements"}</span>
            <div className="jy-tabs" role="tablist">
              {(["experience", "achievements"] as const).map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={tab === t ? "is-active" : ""}>{t === "experience" ? "Experience" : "Achievements"}</button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {tab === "experience" ? (
              <motion.div key="exp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="jy-list">
                {experience.map((e) => (
                  <article key={e.org} className="jy-card card-surface">
                    <span className="jy-logo">{e.icon ? <e.icon size={34} strokeWidth={1.4} /> : e.logo}</span>
                    <div className="jy-card-body">
                      <h3>{e.title}</h3>
                      <p className="jy-org">{e.org} <span>· {e.period}</span></p>
                      <p className="jy-desc">{e.description}</p>
                      <div className="jy-tags">{e.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                    </div>
                    {e.active && <span className="jy-active"><i />Active</span>}
                    <div className="jy-mini" aria-hidden="true"><b /><b /><b /><u /><u /></div>
                    <Link href="/experience" className="jy-go" aria-label={`${e.org} details`}><ArrowRight size={16} /></Link>
                  </article>
                ))}
              </motion.div>
            ) : (
              <motion.div key="ach" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="jy-ach">
                {achievements.map(({ title, detail, icon: Icon }) => (
                  <article key={title} className="jy-ach-card card-surface">
                    <span className="jy-logo jy-logo--sm"><Icon size={24} strokeWidth={1.5} /></span>
                    <div><h3>{title}</h3><p>{detail}</p></div>
                  </article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
