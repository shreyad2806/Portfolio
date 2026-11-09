"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Code2, FileText, ShieldCheck, Sparkles, LucideIcon } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const ICONS: LucideIcon[] = [Sparkles, Code2, FileText, ShieldCheck];

export default function LatestBlog() {
  const journal = portfolioData.developerJournal;

  return (
    <section id="blog" className="fn-section py-12 lg:py-16">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55 }} className="fn-scene card-surface">
          <div className="fn-art" aria-hidden="true">
            <span className="fn-glow" />
            <span className="fn-ring fn-ring--a" /><span className="fn-ring fn-ring--b" />
            <div className="fn-book"><span /><span /><span /><i><Code2 size={22} /></i></div>
          </div>

          <div className="fn-content">
            <div className="fn-head">
              <div>
                <p className="ar-eyebrow"><i /> 04 / DEVELOPER JOURNAL</p>
                <h2 className="fn-title">{journal.title}</h2>
                <p className="mt-2 text-sm text-muted">Ideas, tools and learnings from my journey in tech.</p>
              </div>
              <Link href="/journal" className="fn-all">View All Entries <ArrowUpRight size={14} /></Link>
            </div>

            <ul className="fn-list">
              {journal.articles.map((a, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <motion.li key={a.title} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}>
                    <Link href="/journal" className="fn-row">
                      <span className="fn-row-icon"><Icon size={16} /></span>
                      <span className="fn-row-text"><b>{a.title}</b><small>{a.category}</small></span>
                      <span className="fn-row-date">{a.readTime}</span>
                      <ArrowUpRight size={16} className="fn-row-arrow" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <p className="fn-note"><BookOpen size={14} /> {journal.note}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
