"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

const sectionTitle = "mb-5 font-mono text-[10px] uppercase tracking-[.22em] text-cyan-100/60";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const featured = projects.filter((project) => project.featured);
  const selected = projects.filter((project) => !project.featured && project.status === "completed");
  const building = projects.filter((project) => project.status === "in-progress");
  const upcoming = projects.filter((project) => project.status === "upcoming");

  return (
    <div className="space-y-16">
      <section>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={sectionTitle}>01 / Flagship systems</p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Built, tested, and learned from.</h2>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[.14em] text-slate-500">Three deep dives into engineering</span>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} featured />)}
        </div>
      </section>

      {selected.length > 0 && (
        <section className="border-t border-white/10 pt-10">
          <p className={sectionTitle}>02 / Selected work</p>
          <h2 className="mb-7 text-2xl font-semibold tracking-tight text-white">Other things I&apos;ve built.</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {selected.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          </div>
        </section>
      )}

      {building.length > 0 && (
        <section className="border-t border-white/10 pt-10">
          <p className={sectionTitle}>03 / In the workshop</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {building.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="border-t border-white/10 pt-10">
          <p className={sectionTitle}>04 / On the horizon</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {upcoming.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          </div>
        </section>
      )}
    </div>
  );
}
