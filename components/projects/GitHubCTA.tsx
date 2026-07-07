"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface GitHubCTAProps {
  data: ProjectDetailData;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function GitHubCTA({ data }: GitHubCTAProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <div className="card-surface p-8 lg:p-12 rounded-2xl border border-border/50 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
            
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Github size={32} className="text-primary" />
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-4">
                View Source Code
              </h2>
              
              <p className="text-muted mb-8 max-w-lg mx-auto">
                Explore the complete implementation, architecture decisions, and code behind this project on GitHub.
              </p>
              
              <motion.a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 btn-primary"
              >
                Open Repository
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
