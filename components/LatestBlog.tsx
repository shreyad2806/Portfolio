"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";
import SectionHeading from "@/components/theme/SectionHeading";

export default function LatestBlog() {
  const journal = portfolioData.developerJournal;

  return (
    <section id="blog" className="relative py-16 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        <SectionHeading
          index="04"
          eyebrow="The Frontier · Developer journal"
          title={journal.title}
          accent="#78e5bd"
          action={
            <a href="https://github.com/shreyad2806" target="_blank" rel="noopener noreferrer" className="btn-secondary group text-sm">
              GitHub updates <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          }
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="card-surface p-6 lg:p-8"
        >
          <div className="mb-6">
            {journal.articles.map((article, index) => (
              <div key={index}>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  whileHover={{ x: 6 }}
                  className="group flex cursor-default flex-wrap items-center gap-x-4 gap-y-2 py-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-300/10 text-emerald-200 shadow-[0_0_16px_rgba(120,229,189,.2)] transition group-hover:shadow-[0_0_24px_rgba(120,229,189,.45)]">
                    <BookOpen size={16} />
                  </span>
                  <h4 className="min-w-0 flex-1 text-[15px] font-medium text-white">{article.title}</h4>
                  <span className="rounded-full border border-violet-300/30 bg-violet-400/10 px-2.5 py-1 text-xs text-violet-200">{article.category}</span>
                  <span className="font-mono text-xs text-slate-400">{article.readTime}</span>
                </motion.div>
                {index < journal.articles.length - 1 && <div className="th-hairline opacity-50" />}
              </div>
            ))}
          </div>
          <p className="text-sm italic text-slate-400">{journal.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
