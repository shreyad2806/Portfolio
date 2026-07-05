"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const TALENTLENS_STACK = ["RAG", "FastAPI", "Sentence Transformers", "Pinecone"];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Featured Work</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Projects
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* TalentLens — large featured card, spans full width */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 card-surface p-8 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <p className="eyebrow mb-3">Featured Project</p>
              <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">
                TalentLens
              </h3>
              <p className="text-muted max-w-2xl leading-relaxed mb-6">
                Production Resume Intelligence Platform
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {TALENTLENS_STACK.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="btn-primary">
                  Case Study
                  <ArrowUpRight size={16} />
                </a>
                <a href="#" className="btn-secondary">
                  GitHub
                  <Github size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* AI Tech Stack Recommender */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="card-surface p-8"
          >
            <h3 className="text-xl font-semibold tracking-tight mb-3">
              AI Tech Stack Recommender
            </h3>
            <p className="text-muted leading-relaxed">
              LLM powered technology recommendation engine.
            </p>
          </motion.div>

          {/* LawGPT CRM */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="card-surface p-8"
          >
            <h3 className="text-xl font-semibold tracking-tight mb-3">
              LawGPT CRM
            </h3>
            <p className="text-muted leading-relaxed">
              AI-powered CRM and marketing automation platform.
            </p>
          </motion.div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors"
          >
            View All Projects
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
