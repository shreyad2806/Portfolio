"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Layers3, ShieldCheck, ScanEye, Activity, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectCardProps { project: Project; index: number; featured?: boolean; }

const visualConfig: Record<string, { label: string; icon: typeof Layers3; className: string; glyph: string }> = {
  closeloop: { label: "FINANCIAL SYSTEMS", icon: Layers3, className: "project-visual--closeloop", glyph: "01 / RECONCILIATION" },
  kavach: { label: "RUNTIME SECURITY", icon: ShieldCheck, className: "project-visual--kavach", glyph: "02 / ZERO TRUST" },
  visionguard: { label: "COMPUTER VISION", icon: ScanEye, className: "project-visual--visionguard", glyph: "03 / IMAGE INTELLIGENCE" },
  complytai: { label: "FINANCIAL COMPLIANCE", icon: Activity, className: "project-visual--complytai", glyph: "RAG / RISK INTELLIGENCE" },
};

const statusConfig = {
  completed: { label: "Completed", className: "project-status--complete", icon: null },
  "in-progress": { label: "In Progress", className: "project-status--active", icon: Loader2 },
  upcoming: { label: "Upcoming", className: "project-status--upcoming", icon: null },
};

const detailedSlugs = new Set(["closeloop", "kavach", "talentlens", "ai-tech-stack-recommender", "lawgpt-crm", "complytai", "falcon-airlines", "devforge", "architectiq", "reflex-ninja"]);

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;
  const visual = visualConfig[project.id];
  const hasDetails = detailedSlugs.has(project.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: .45, delay: index * .06 }}
      whileHover={{ y: -5 }}
      className={`project-showcase-card group ${featured ? "project-showcase-card--featured" : ""}`}
    >
      <div className={`project-showcase-visual ${visual?.className ?? ""}`}>
        {project.thumbnail ? (
          <Image src={project.thumbnail} alt={project.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105"/>
        ) : (
          <div className="project-visual-art" aria-hidden="true">
            <span className="project-visual-orbit project-visual-orbit--one"/>
            <span className="project-visual-orbit project-visual-orbit--two"/>
            <span className="project-visual-core"><span>{visual?.icon ? <visual.icon size={34}/> : <Layers3 size={34}/>}</span></span>
            <span className="project-visual-grid"/>
          </div>
        )}
        <div className="project-visual-topline"><span>{visual?.label ?? "SELECTED BUILD"}</span><span>{visual?.glyph ?? "ENGINEERING / FIELD NOTES"}</span></div>
        <span className={`project-status ${status.className}`}>{StatusIcon && <StatusIcon size={11} className="animate-spin"/>}{status.label}</span>
        <span className="project-visual-index">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {project.focus && <p className="mb-2 font-mono text-[9px] uppercase tracking-[.14em] text-cyan-100/60">{project.focus}</p>}
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-100">{project.name}</h3>
        <p className="mb-5 flex-1 text-sm leading-6 text-slate-400">{project.description}</p>
        {project.proof && <div className="mb-5 border-l border-violet-300/50 pl-3 text-xs leading-5 text-slate-300">{project.proof}</div>}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, featured ? 5 : 4).map((tech) => <span key={tech} className="rounded-full border border-white/10 bg-white/[.035] px-2.5 py-1 font-mono text-[9px] text-slate-400">{tech}</span>)}
          {project.tech.length > (featured ? 5 : 4) && <span className="px-1 py-1 font-mono text-[9px] text-slate-500">+{project.tech.length - (featured ? 5 : 4)}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white transition hover:border-cyan-200/50 hover:bg-cyan-200/5"><Github size={14}/> Repository <ExternalLink size={11}/></a>}
          {hasDetails && <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-100/80 transition hover:text-white">Case study <ArrowUpRight size={14}/></Link>}
          {!hasDetails && project.externalLink && <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white">Project brief <ArrowUpRight size={13}/></a>}
        </div>
      </div>
    </motion.article>
  );
}
