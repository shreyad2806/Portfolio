"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { portfolioData } from "@/lib/portfolio-data";
import { FLAGSHIP as META, DETAIL_SLUGS } from "@/lib/flagship";

const ORDER = ["closeloop", "kavach", "complytai"];

export default function FeaturedProjects() {
  const projects = ORDER.map((id) => portfolioData.projects.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section id="projects" className="bl-section py-16 lg:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="bl-head">
          <div className="bl-head-copy">
            <p className="bl-pill"><Sparkles size={14} /> / 02 · THE BUILD LAB</p>
            <h2 className="bl-title"><span className="bl-spark" aria-hidden="true"><Sparkles size={34} fill="currentColor" /></span>Projects</h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">A blend of production systems and innovative ideas — building scalable, intelligent and secure solutions.</p>
          </div>
          <div className="bl-orbit" aria-hidden="true"><span className="bl-planet" /><span className="bl-ring bl-ring--a" /><span className="bl-ring bl-ring--b" /><i className="bl-sat" /></div>
          <Link href="/projects" className="bl-all">View All Projects <ArrowRight size={16} /></Link>
        </div>

        <div className="bl-grid">
          {projects.map((project, index) => {
            const m = META[project.id];
            const Icon = m.icon;
            const Stat = m.stat.icon;
            const hasDetails = DETAIL_SLUGS.has(project.id);
            const href = hasDetails ? `/projects/${project.id}` : project.github;
            const ext = hasDetails ? {} : { target: "_blank", rel: "noopener noreferrer" };
            const shown = project.tech.slice(0, 3);
            const extra = project.tech.length - shown.length;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.09 }}
                whileHover={{ y: -6 }}
                className={`bl-card card-surface bl-card--${m.tone}`}
              >
                <div className="bl-top">
                  <span className="bl-status"><i />{m.status}</span>
                  <span className="bl-count">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                </div>
                <Link href={href} className="bl-thumb" aria-label={`Open ${project.name}`} {...ext}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.thumb} alt={m.alt} loading="lazy" style={{ objectPosition: m.position }} />
                  <span className="bl-thumb-shine" aria-hidden="true" />
                </Link>
                <div className="bl-id">
                  <span className="bl-icon"><Icon size={26} strokeWidth={1.6} /></span>
                  <div className="min-w-0">
                    <h3>{project.name}</h3>
                    <p>{m.subtitle}</p>
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="bl-ext" aria-label={`${project.name} on GitHub`}><ArrowUpRight size={20} /></a>
                </div>
                <p className="bl-summary">{m.summary}</p>
                <div className="bl-tech">
                  {shown.map((t) => <span key={t} className="chip">{t}</span>)}
                  {extra > 0 && <span className="chip bl-more">+{extra}</span>}
                </div>
                <div className="bl-actions">
                  <Link href={href} className="bl-btn" {...ext}>{hasDetails ? "View Details" : "View Repository"} <ArrowRight size={16} /></Link>
                  <span className="bl-stat"><Stat size={20} /><span><b>{m.stat.value}</b><small>{m.stat.label}</small></span></span>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="bl-trail" aria-hidden="true"><i /><Sparkles size={22} fill="currentColor" /><i /></div>
      </div>
    </section>
  );
}
