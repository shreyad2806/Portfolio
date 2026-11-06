"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Code2, FileText, TerminalSquare } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

export default function LatestBlog() {
  const journal = portfolioData.developerJournal;
  const journalIcons = [BookOpen, Code2, FileText, TerminalSquare];

  return (
    <section id="blog" className="py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }} className="journal-scene card-surface">
          <div className="journal-art" aria-hidden="true">
            <div className="journal-art-orbit journal-art-orbit--one"/>
            <div className="journal-art-orbit journal-art-orbit--two"/>
            <div className="journal-book"><span/><span/><span/><i/></div>
            <div className="journal-art-caption"><i/> FIELD NOTES / 04</div>
          </div>
          <div className="journal-content">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-5">
              <div><p className="eyebrow mb-3">05 / Developer Journal</p><h2 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2">{journal.title}</h2><p className="text-sm text-muted">Ideas, lessons and engineering notes from the build process.</p></div>
              <a href="https://github.com/shreyad2806" target="_blank" rel="noopener noreferrer" className="journal-updates">GitHub Updates <ArrowUpRight size={15}/></a>
            </div>
            <div className="journal-entries">
              {journal.articles.map((article, index) => {
                const Icon = journalIcons[index % journalIcons.length];
                return <motion.div key={index} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} whileHover={{ x: 4 }} className="journal-entry">
                  <span className="journal-entry-index">0{index + 1}</span><span className="journal-entry-icon"><Icon size={15}/></span><div className="flex-1 min-w-0"><h3>{article.title}</h3><span>{article.readTime}</span></div><span className="journal-entry-tag">{article.category}</span><ArrowUpRight className="journal-entry-arrow" size={15}/>
                </motion.div>;
              })}
            </div>
            <p className="journal-note">{journal.note}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
