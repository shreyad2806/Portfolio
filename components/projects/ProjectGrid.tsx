"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

const CATEGORY: Record<string, string[]> = {
  closeloop: ["AI Systems", "Backend"],
  kavach: ["Security", "AI Systems"],
  complytai: ["AI Systems"],
  visionguard: ["Machine Learning"],
  talentlens: ["AI Systems"],
  "lawgpt-crm": ["AI Systems", "Full Stack"],
  architectiq: ["Developer Tools", "AI Systems"],
  devforge: ["Full Stack", "Developer Tools"],
  "ai-tech-stack-recommender": ["AI Systems", "Full Stack"],
  "falcon-airlines": ["Full Stack", "Backend"],
  "reflex-ninja": ["Mobile"],
};
const FILTERS = ["All", "AI Systems", "Backend", "Full Stack", "Security", "Machine Learning", "Developer Tools", "Mobile"];

function Heading({ n, label, title }: { n: string; label: string; title?: string }) {
  return (
    <div className="pj-heading">
      <p className="ar-eyebrow"><i /> {n} / {label}</p>
      {title && <h2>{title}</h2>}
      <span className="pj-heading-line" />
    </div>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const match = (p: Project) => filter === "All" || (CATEGORY[p.id] ?? []).includes(filter);

  const featuredAll = projects.filter((p) => p.featured);
  const featured = featuredAll.filter(match);
  const selected = projects.filter((p) => !p.featured && p.status === "completed" && match(p));
  const building = projects.filter((p) => p.status === "in-progress" && match(p));
  const upcoming = projects.filter((p) => p.status === "upcoming" && match(p));
  const counts = useMemo(() => Object.fromEntries(FILTERS.map((f) => [f, f === "All" ? projects.length : projects.filter((p) => (CATEGORY[p.id] ?? []).includes(f)).length])), [projects]);
  const empty = featured.length + selected.length + building.length + upcoming.length === 0;

  return (
    <div className="space-y-14">
      <div className="pj-filters" role="tablist" aria-label="Filter projects">
        {FILTERS.filter((f) => counts[f] > 0).map((f) => (
          <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={filter === f ? "is-active" : ""}>
            {f}<small>{counts[f]}</small>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={filter} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-16">
          {featured.length > 0 && (
            <section>
              <Heading n="01" label="FLAGSHIP SYSTEMS" title="Built, tested, and learned from." />
              <div className="bl-grid">
                {featured.map((p, i) => <ProjectCard key={p.id} project={p} index={i} total={featured.length} featured categories={CATEGORY[p.id]} />)}
              </div>
            </section>
          )}

          {selected.length > 0 && (
            <section>
              <Heading n="02" label="SELECTED WORK" title="Other things I've built." />
              <div className="pj-grid">
                {selected.map((p, i) => <ProjectCard key={p.id} project={p} index={i} categories={CATEGORY[p.id]} />)}
              </div>
            </section>
          )}

          {building.length > 0 && (
            <section>
              <Heading n="03" label="IN THE WORKSHOP" />
              <div className="pj-grid">{building.map((p, i) => <ProjectCard key={p.id} project={p} index={i} categories={CATEGORY[p.id]} />)}</div>
            </section>
          )}

          {upcoming.length > 0 && (
            <section>
              <Heading n="04" label="ON THE HORIZON" />
              <div className="pj-grid">{upcoming.map((p, i) => <ProjectCard key={p.id} project={p} index={i} categories={CATEGORY[p.id]} />)}</div>
            </section>
          )}

          {empty && <p className="py-16 text-center text-muted">Nothing here yet — more builds are on the way.</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
