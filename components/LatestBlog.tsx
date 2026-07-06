"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

export default function LatestBlog() {
  return (
    <section id="blog" className="py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <p className="eyebrow mb-3">Latest Writing</p>

        {portfolioData.blog.href ? (
          <motion.a
            href={portfolioData.blog.href}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="group card-surface p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-primary/40 transition-colors"
          >
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
                {portfolioData.blog.title}
              </h3>
              <p className="text-sm text-muted font-mono">{portfolioData.blog.readingTime} read</p>
            </div>
            <ArrowUpRight
              size={22}
              className="text-muted group-hover:text-primary transition-colors shrink-0"
            />
          </motion.a>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="card-surface p-8 lg:p-10"
          >
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2 text-muted">
                {portfolioData.blog.title}
              </h3>
              <p className="text-sm text-muted font-mono">{portfolioData.blog.readingTime} read</p>
              <p className="text-sm text-muted mt-2 italic">Coming soon</p>
            </div>
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <a
            href="https://github.com/shreyad2806"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors"
          >
            Check GitHub for updates
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
