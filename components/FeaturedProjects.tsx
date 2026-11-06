"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Layers3, ShieldCheck, ScanEye, Activity } from "lucide-react";
import Link from "next/link";
import { portfolioData } from "@/lib/portfolio-data";

export default function FeaturedProjects() {
  const featuredProjects = portfolioData.projects.filter((p) => p.featured).slice(0, 3);
  const artwork = {
    closeloop: { code: "LEDGER / 017", label: "RECONCILIATION ENGINE", icon: Layers3, accent: "cyan", metric: "MATCH → VERIFY", bars: [42,72,55,88,64,96], flow: ["INGEST", "MATCH", "CLASSIFY", "VERIFY"] },
    kavach: { code: "RUNTIME / ZERO TRUST", label: "POLICY ENFORCEMENT", icon: ShieldCheck, accent: "violet", metric: "ALLOW · DENY · AUDIT", bars: [88,52,76,44,92,68], flow: ["SCAN", "AUTHORIZE", "ISOLATE", "AUDIT"] },
    complytai: { code: "RISK / 005", label: "COMPLIANCE INTELLIGENCE", icon: Activity, accent: "amber", metric: "RETRIEVE → ASSESS", bars: [62,84,70,91,56,88], flow: ["INGEST", "RETRIEVE", "ASSESS", "REPORT"] },
    visionguard: { code: "VISION / QUALITY", label: "IMAGE SIGNAL ANALYSIS", icon: ScanEye, accent: "amber", metric: "SHARPNESS · NOISE · LIGHT", bars: [58,84,46,72,91,63], flow: ["IMAGE", "FEATURES", "MODEL", "SCORE"] },
  } as const;

  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">02 / The Build Lab · Flagship systems</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Projects</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">A few systems where the interesting part is not just the interface—it is the engineering underneath.</p>
          </div>
          <Link href="/projects" className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary transition-all duration-200">View All Projects <motion.span className="group-hover:translate-x-1 transition-transform duration-200"><ArrowUpRight size={16}/></motion.span></Link>
        </div>

        <div className="build-lab-constellation" aria-hidden="true"><span/><i/><i/><i/><b/></div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: index * 0.08 }} className="featured-build-card card-surface overflow-hidden p-0">
              {(() => {
                const art = artwork[project.id as keyof typeof artwork];
                const ArtIcon = art.icon;
                return (
                  <div className={`featured-build-art featured-build-art--${art.accent}`} aria-hidden="true">
                    <div className="featured-build-art-grid"/>
                    <div className="featured-build-orbit featured-build-orbit--one"/>
                    <div className="featured-build-orbit featured-build-orbit--two"/>
                    <div className="featured-build-art-header"><span>{art.code}</span><span>SYS / 0{index + 1}</span></div>
                    <div className="featured-build-console">
                      <div className="featured-build-console-icon"><ArtIcon size={30}/><span className="featured-build-console-pulse"/></div>
                      <div className="featured-build-signal"><span>{art.metric}</span><div>{art.bars.map((height, i) => <i key={i} style={{height: height + "%"}}/>)}</div></div>
                    </div>
                    <div className="featured-build-flow">{art.flow.map((step, i) => <span key={step}>{step}{i < art.flow.length - 1 && <i/>}</span>)}</div>
                    <div className="featured-build-art-footer"><span><Activity size={11}/> {art.label}</span><span>LIVE SYSTEMS</span></div>
                  </div>
                );
              })()}
              <div className="featured-build-content p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
                  {project.status && <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary">{project.status}</span>}
                </div>
                <p className="text-muted leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2.5 mb-6">{project.tech.map((tech) => <span key={tech} className="chip text-xs">{tech}</span>)}</div>
                <div className="flex flex-wrap gap-4">
                  <Link href={`/projects/${project.id}`} className="btn-primary text-sm">View Details <ArrowUpRight size={14}/></Link>
                  <a href={project.github} className="btn-secondary text-sm">GitHub <Github size={14}/></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
