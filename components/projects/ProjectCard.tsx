"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Loader2, ScanEye, Layers3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { FLAGSHIP, DETAIL_SLUGS } from "@/lib/flagship";

interface ProjectCardProps { project: Project; index: number; total?: number; featured?: boolean; categories?: string[]; }

const statusConfig = {
  completed: { label: "Completed", dot: "#3be6a0" },
  "in-progress": { label: "In Progress", dot: "#ffc46e" },
  upcoming: { label: "Upcoming", dot: "#8da2ff" },
};


export default function ProjectCard({ project, index, total = 0, featured = false, categories = [] }: ProjectCardProps) {
  const hasDetails = DETAIL_SLUGS.has(project.slug);
  const detailHref = hasDetails ? `/projects/${project.slug}` : project.github ?? "/projects";
  const external = !hasDetails && Boolean(project.github);
  const flag = featured ? FLAGSHIP[project.id] : undefined;

  /* ---------- flagship ---------- */
  if (flag) {
    const Icon = flag.icon;
    const Stat = flag.stat.icon;
    return (
      <motion.article
        initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.09 }} whileHover={{ y: -6 }}
        className={`bl-card card-surface bl-card--${flag.tone}`}
      >
        <div className="bl-top">
          <span className="bl-status"><i />{flag.status}</span>
          <span className="bl-count">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>
        <Link href={detailHref} className="bl-thumb" aria-label={`Open ${project.name}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flag.thumb} alt={flag.alt} loading="lazy" style={{ objectPosition: flag.position }} />
          <span className="bl-thumb-shine" aria-hidden="true" />
        </Link>
        <div className="bl-id">
          <span className="bl-icon"><Icon size={26} strokeWidth={1.6} /></span>
          <div className="min-w-0"><h3>{project.name}</h3><p>{flag.subtitle}</p></div>
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="bl-ext" aria-label={`${project.name} on GitHub`}><Github size={19} /></a>}
        </div>
        <p className="bl-summary">{project.description}</p>
        {project.proof && <p className="pj-proof">{project.proof}</p>}
        <div className="bl-tech">
          {project.tech.slice(0, 5).map((t) => <span key={t} className="chip">{t}</span>)}
          {project.tech.length > 5 && <span className="chip bl-more">+{project.tech.length - 5}</span>}
        </div>
        <div className="bl-actions">
          <Link href={detailHref} className="bl-btn" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{external ? "View Repository" : "View Details"} <ArrowRight size={16} /></Link>
          <span className="bl-stat"><Stat size={20} /><span><b>{flag.stat.value}</b><small>{flag.stat.label}</small></span></span>
        </div>
      </motion.article>
    );
  }

  /* ---------- standard ---------- */
  const status = statusConfig[project.status];
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }} whileHover={{ y: -5 }}
      className="pj-card card-surface group"
    >
      <div className="pj-top">
        <span className="bl-status" style={{ ["--dot" as string]: status.dot }}>
          {project.status === "in-progress" ? <Loader2 size={11} className="animate-spin" /> : <i />}{status.label}
        </span>
        {categories[0] && <span className="pj-cat">{categories[0]}</span>}
      </div>
      <div className="pj-thumb">
        {project.thumbnail ? (
          <Image src={project.thumbnail} alt={`${project.name} preview`} fill sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw" className="pj-thumb-img" />
        ) : (
          <div className="pj-art" aria-hidden="true">
            <span className="pj-art-grid" /><span className="pj-art-ring pj-art-ring--a" /><span className="pj-art-ring pj-art-ring--b" />
            <span className="pj-art-core">{project.id === "visionguard" ? <ScanEye size={34} strokeWidth={1.5} /> : <Layers3 size={34} strokeWidth={1.5} />}</span>
          </div>
        )}
        <span className="pj-thumb-fade" aria-hidden="true" />
      </div>
      <div className="pj-body">
        <h3>{project.name}</h3>
        {project.focus && <p className="pj-focus">{project.focus}</p>}
        <p className="pj-desc">{project.description}</p>
        <div className="bl-tech">
          {project.tech.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}
          {project.tech.length > 4 && <span className="chip bl-more">+{project.tech.length - 4}</span>}
        </div>
        <div className="pj-actions">
          {hasDetails && <Link href={detailHref} className="pj-btn">Case study <ArrowRight size={14} /></Link>}
          {!hasDetails && project.externalLink && <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="pj-btn">Project brief <ArrowUpRight size={14} /></a>}
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="pj-gh" aria-label={`${project.name} on GitHub`}><Github size={16} /> Repository</a>}
        </div>
      </div>
    </motion.article>
  );
}
