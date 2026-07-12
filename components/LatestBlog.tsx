"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

export default function LatestBlog() {
  const journal = portfolioData.developerJournal;

  return (
    <section id="blog" className="py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="card-surface p-8 lg:p-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
            <div>
              <p className="eyebrow mb-3">Developer Journal</p>
              <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2">
                {journal.title}
              </h3>
            </div>
            <a
              href="https://github.com/shreyad2806"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors shrink-0"
            >
              GitHub Updates
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="space-y-0 mb-6">
            {journal.articles.map((article, index) => (
              <div key={index}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 py-3 group cursor-default"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-text">{article.title}</h4>
                  </div>
                  <span className="text-xs text-primary/80 bg-primary/10 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted">{article.readTime}</span>
                </motion.div>
                {index < journal.articles.length - 1 && (
                  <div className="ml-2 h-px bg-border/30" />
                )}
              </div>
            ))}
          </div>

          <p className="text-sm text-muted italic">{journal.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
