"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Play } from "lucide-react";
import Link from "next/link";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface ProjectDetailHeroProps {
  data: ProjectDetailData;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function ProjectDetailHero({ data }: ProjectDetailHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="chip">{data.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
            >
              {data.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-muted leading-relaxed max-w-2xl"
            >
              {data.oneLiner}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {data.liveDemo && (
                <a
                  href={data.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Play size={16} />
                  Live Demo
                </a>
              )}
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github size={16} />
                GitHub
              </a>
              {data.caseStudyPdf && (
                <a
                  href={data.caseStudyPdf}
                  className="btn-secondary"
                >
                  <ArrowUpRight size={16} />
                  Case Study PDF
                </a>
              )}
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {data.techStack.map((tech) => (
                <span key={tech} className="chip text-sm">
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Project Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Main Mockup */}
            <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted/40">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-lg bg-muted/20 flex items-center justify-center">
                    <span className="text-4xl">💻</span>
                  </div>
                  <p className="text-sm font-mono">Project Screenshot</p>
                </div>
              </div>
            </div>

            {/* Floating Glass Cards */}
            <motion.div
              {...floatAnimation}
              className="absolute -top-4 -right-4 glass-card p-4 rounded-xl border border-border/50"
            >
              <p className="text-sm font-medium text-primary">Hybrid Retrieval</p>
            </motion.div>

            <motion.div
              {...floatAnimation}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -left-4 glass-card p-4 rounded-xl border border-border/50"
            >
              <p className="text-sm font-medium text-primary">Cross Encoder</p>
            </motion.div>

            <motion.div
              {...floatAnimation}
              transition={{ delay: 1 }}
              className="absolute top-1/2 -right-8 glass-card p-4 rounded-xl border border-border/50"
            >
              <p className="text-sm font-medium text-primary">Semantic Search</p>
            </motion.div>

            <motion.div
              {...floatAnimation}
              transition={{ delay: 1.5 }}
              className="absolute top-1/3 -left-8 glass-card p-4 rounded-xl border border-border/50"
            >
              <p className="text-sm font-medium text-primary">Production Ready</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
