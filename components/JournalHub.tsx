"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Code2, Compass, ExternalLink, Layers3, PackageOpen, Sparkles, Wrench } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

type JournalItem = {
  title: string;
  description: string;
  category: string;
  kind: "Build Notes" | "Open Source" | "Tools & Plugins";
  status?: string;
  url?: string;
  date?: string;
};

const FILTERS = ["All", "Build Notes", "Open Source", "Tools & Plugins"] as const;

export default function JournalHub() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const journal = portfolioData.journal;

  const items = useMemo<JournalItem[]>(() => [
    ...journal.buildNotes.map((item) => ({ ...item, kind: "Build Notes" as const })),
    ...journal.openSourceFinds.map((item) => ({ title: item.name, ...item, kind: "Open Source" as const, status: item.date ? `Found · ${item.date}` : "Saved to explore" })),
    ...journal.toolsAndPlugins.map((item) => ({ title: item.name, ...item, kind: "Tools & Plugins" as const, status: item.date ? `Added · ${item.date}` : "In my toolkit" })),
  ], [journal]);

  const visibleItems = active === "All" ? items : items.filter((item) => item.kind === active);
  const counts = {
    "All": items.length,
    "Build Notes": journal.buildNotes.length,
    "Open Source": journal.openSourceFinds.length,
    "Tools & Plugins": journal.toolsAndPlugins.length,
  };

  return (
    <main className="portfolio-world-page journal-hub-page min-h-screen pt-24 pb-20">
      <div className="journal-hub-ambient" aria-hidden="true"><span/><i/><b/></div>
      <div className="container-px mx-auto max-w-7xl relative z-10">
        <motion.header initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.5}} className="journal-hub-hero">
          <div className="journal-hub-kicker"><Sparkles size={13}/> SHREYA.EXE / FIELD LOG 05</div>
          <p className="eyebrow mt-5 mb-3">The Journal · An evolving collection</p>
          <h1>Curiosity, <span>documented.</span></h1>
          <p className="journal-hub-intro">A living notebook of things I build, repositories I discover, tools that make me curious and skills I&apos;m working on. Updated as I explore—not just when I publish.</p>
          <div className="journal-hub-stats">
            <span><b>{journal.buildNotes.length}</b> build notes</span><i/>
            <span><b>{journal.openSourceFinds.length}</b> open-source finds</span><i/>
            <span><b>{journal.toolsAndPlugins.length}</b> tools saved</span><i/>
            <span><b>{journal.skillsInProgress.length}</b> active learning areas</span>
          </div>
        </motion.header>

        <section className="journal-hub-layout">
          <div className="journal-hub-main">
            <div className="journal-hub-section-heading">
              <div><p className="eyebrow mb-2">Browse the log</p><h2>Latest discoveries & notes</h2></div>
              <span className="journal-live-indicator"><i/> PERSONAL FIELD LOG</span>
            </div>

            <div className="journal-filter-row" role="tablist" aria-label="Filter journal entries">
              {FILTERS.map((filter) => <button key={filter} type="button" role="tab" aria-selected={active === filter} onClick={() => setActive(filter)} className={active === filter ? "is-active" : ""}>{filter}<span>{counts[filter]}</span></button>)}
            </div>

            {visibleItems.length > 0 ? (
              <div className="journal-hub-entries">
                {visibleItems.map((item,index) => {
                  const Icon = item.kind === "Build Notes" ? BookOpen : item.kind === "Open Source" ? Code2 : Wrench;
                  const card = <motion.article key={item.kind + item.title} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:index*.045}} className="journal-hub-entry">
                    <div className="journal-hub-entry-icon"><Icon size={19}/></div>
                    <div className="journal-hub-entry-copy">
                      <div className="journal-hub-entry-meta"><span>{item.kind}</span>{item.category && <><i/> <span>{item.category}</span></>}</div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <small>{item.status || "Field note"}{item.date ? ` · ${item.date}` : ""}</small>
                    </div>
                    {item.url && <span className="journal-hub-entry-link"><ExternalLink size={15}/></span>}
                  </motion.article>;
                  return item.url ? <a key={item.kind + item.title} href={item.url} target="_blank" rel="noreferrer" className="journal-hub-entry-anchor">{card}</a> : card;
                })}
              </div>
            ) : (
              <div className="journal-empty-state">
                <span><PackageOpen size={23}/></span>
                <h3>{active === "Open Source" ? "No repositories saved yet." : active === "Build Notes" ? "No build notes published yet." : "No tools added yet."}</h3>
                <p>This space is ready for the next interesting discovery. Add an item to the matching collection in <code>lib/portfolio-data.ts</code> and it will appear here.</p>
                <span className="journal-empty-code">{active === "Open Source" ? "journal.openSourceFinds" : active === "Build Notes" ? "journal.buildNotes" : "journal.toolsAndPlugins"} <ArrowUpRight size={13}/></span>
              </div>
            )}
          </div>

          <aside className="journal-hub-sidebar">
            <section className="journal-sidebar-card journal-skills-card">
              <div className="journal-sidebar-heading"><span><Compass size={17}/></span><p className="eyebrow">Learning orbit</p></div>
              <h2>Skills in progress</h2>
              <p>Topics I&apos;m actively exploring, testing and connecting to real projects.</p>
              <div className="journal-skill-list">{journal.skillsInProgress.map((skill,index)=><span key={skill}><i>{String(index+1).padStart(2,"0")}</i>{skill}</span>)}</div>
            </section>
            <section className="journal-sidebar-card journal-add-card">
              <span className="journal-add-icon"><Layers3 size={19}/></span>
              <p className="eyebrow mt-4 mb-2">Keep the log alive</p>
              <h3>Found something interesting?</h3>
              <p>Add a repository, developer tool, plugin or learning note to the journal data. This page is designed to grow with what you&apos;re exploring.</p>
              <a href="https://github.com/shreyad2806/Portfolio" target="_blank" rel="noreferrer">Open portfolio source <ArrowUpRight size={14}/></a>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
