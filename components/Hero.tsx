"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import SystemsGraph from "./SystemsGraph";

const STACK = ["Python", "FastAPI", "RAG", "AI Agents", "LLMs", "React"];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-grid-fade"
    >
      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="eyebrow mb-5"
          >
            AI Engineer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.08]"
          >
            Hi, I&apos;m Shreya Dubey
            <span className="block text-muted mt-2 text-2xl sm:text-3xl lg:text-[1.9rem] font-medium">
              AI Engineer building production AI systems.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 text-base sm:text-lg text-muted max-w-xl leading-relaxed"
          >
            I design and build production-ready AI products using RAG, AI
            Agents, LLMs and scalable backend systems.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#projects" className="btn-primary">
              Explore Projects
              <ArrowUpRight size={16} />
            </a>
            <a href="/resume.pdf" className="btn-secondary">
              Download Resume
              <Download size={16} />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {STACK.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <SystemsGraph />
        </motion.div>
      </div>
    </section>
  );
}
