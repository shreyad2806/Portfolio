"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Play,
  X,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export interface UniversalProject {
  slug: string;
  name: string;
  status: "completed" | "in-progress";
  badge: string;
  oneLiner: string;
  description: string;
  github: string;
  liveDemo?: string;
  techStack: string[];

  problem: {
    title: string;
    points: string[];
  };

  motivations: {
    title: string;
    description: string;
  }[];

  architecture: {
    label: string;
    description: string;
  }[];

  features: {
    title: string;
    description: string;
  }[];

  decisions: {
    problem: string;
    decision: string;
    why: string;
  }[];

  challenges: {
    problem: string;
    solution: string;
  }[];

  screenshots: {
    src: string;
    caption: string;
  }[];

  learnings: {
    title: string;
    description: string;
  }[];

  roadmap: {
    feature: string;
    status: "planned" | "in-progress" | "completed";
  }[];

  results: {
    label: string;
    value: string;
  }[];
}

interface UniversalProjectPageProps {
  data: UniversalProject;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function UniversalProjectPage({
  data,
}: UniversalProjectPageProps) {
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    src: string;
    caption: string;
  }>({
    open: false,
    src: "",
    caption: "",
  });

  const openImage = (src: string, caption: string) => {
    setLightbox({
      open: true,
      src,
      caption,
    });
  };

  const closeImage = () => {
    setLightbox({
      open: false,
      src: "",
      caption: "",
    });
  };

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-5xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="chip">{data.badge}</span>

              <span
                className={`chip ${
                  data.status === "completed"
                    ? "border-emerald-500/40 text-emerald-400"
                    : "border-primary/40 text-primary"
                }`}
              >
                {data.status === "completed"
                  ? "Completed"
                  : "In Progress"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
              {data.name}
            </h1>

            <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-4xl mb-8">
              {data.oneLiner}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {data.techStack.map((tech) => (
                <span key={tech} className="chip text-sm">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Github size={16} />
                View GitHub
                <ArrowUpRight size={16} />
              </a>

              {data.liveDemo ? (
                <a
                  href={data.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Play size={16} />
                  Live Demo
                </a>
              ) : (
                <button
                  disabled
                  className="btn-secondary opacity-60 cursor-not-allowed"
                >
                  <Play size={16} />
                  Demo Coming Soon
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
            >
              <p className="eyebrow mb-3">The Problem</p>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
                {data.problem.title}
              </h2>

              <p className="text-muted leading-relaxed">
                {data.description}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-3">
              {data.problem.points.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="card-surface p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-mono text-sm">
                      0{index + 1}
                    </span>

                    <p className="text-sm text-muted leading-relaxed">
                      {point}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY BUILT */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Motivation</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Why I Built This
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {data.motivations.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="card-surface p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <span className="text-primary font-semibold">
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="py-16 lg:py-24" id="architecture">
        <div className="container-px mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Architecture</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              System Architecture
            </h2>
          </div>

          <div className="space-y-3">
            {data.architecture.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="card-surface p-5 flex items-center gap-5"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary text-sm font-mono">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold mb-1">
                    {step.label}
                  </h3>

                  <p className="text-sm text-muted">
                    {step.description}
                  </p>
                </div>

                {index < data.architecture.length - 1 && (
                  <ChevronRight
                    size={18}
                    className="hidden sm:block text-primary/50"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Feature Showcase
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="card-surface p-6 hover:border-primary/40 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary text-sm">
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-semibold mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINEERING DECISIONS */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Engineering</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Engineering Decisions
            </h2>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            {data.decisions.map((decision, index) => (
              <div
                key={decision.problem}
                className="grid md:grid-cols-3 gap-4"
              >
                <div className="card-surface p-5">
                  <p className="text-xs uppercase tracking-wider text-muted mb-2">
                    Problem
                  </p>
                  <p className="font-medium">
                    {decision.problem}
                  </p>
                </div>

                <div className="card-surface p-5 border-primary/20">
                  <p className="text-xs uppercase tracking-wider text-primary mb-2">
                    Decision
                  </p>
                  <p className="font-medium">
                    {decision.decision}
                  </p>
                </div>

                <div className="card-surface p-5">
                  <p className="text-xs uppercase tracking-wider text-muted mb-2">
                    Why
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {decision.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Challenges</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Challenges Faced
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.challenges.map((challenge) => (
              <div
                key={challenge.problem}
                className="card-surface p-6"
              >
                <p className="text-xs uppercase tracking-wider text-primary mb-2">
                  Problem
                </p>

                <h3 className="font-semibold mb-4">
                  {challenge.problem}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {challenge.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCREENSHOTS */}
      {data.screenshots.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container-px mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Product</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Screenshots
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {data.screenshots.map((shot) => (
                <motion.div
                  key={shot.src}
                  whileHover={{ y: -4 }}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-border/50 cursor-pointer"
                  onClick={() =>
                    openImage(shot.src, shot.caption)
                  }
                >
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium flex items-center gap-2">
                      {shot.caption}
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RESULTS */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Results</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              What This Project Demonstrates
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.results.map((result) => (
              <div
                key={result.label}
                className="card-surface p-6 text-center"
              >
                <p className="text-primary font-semibold text-xl mb-2">
                  {result.value}
                </p>

                <p className="text-sm text-muted">
                  {result.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNINGS */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Learnings</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              What I Learned
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.learnings.map((learning) => (
              <div
                key={learning.title}
                className="card-surface p-6"
              >
                <CheckCircle2
                  size={20}
                  className="text-primary mb-4"
                />

                <h3 className="font-semibold mb-2">
                  {learning.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {learning.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      {data.roadmap.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container-px mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Roadmap</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Future Direction
              </h2>
            </div>

            <div className="space-y-3">
              {data.roadmap.map((item) => (
                <div
                  key={item.feature}
                  className="card-surface p-4 flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-sm">
                    {item.feature}
                  </span>

                  <span
                    className={`chip text-xs ${
                      item.status === "completed"
                        ? "text-emerald-400"
                        : item.status === "in-progress"
                        ? "text-primary"
                        : ""
                    }`}
                  >
                    {item.status === "completed"
                      ? "Completed"
                      : item.status === "in-progress"
                      ? "In Progress"
                      : "Planned"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GITHUB CTA */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-3xl">
          <div className="card-surface p-8 lg:p-12 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">
              <Github
                size={36}
                className="text-primary mx-auto mb-5"
              />

              <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                Explore the Implementation
              </h2>

              <p className="text-muted mb-8">
                Review the source code, architecture, and engineering decisions behind {data.name}.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open Repository
                  <ArrowUpRight size={16} />
                </a>

                <Link
                  href="/projects"
                  className="btn-secondary"
                >
                  Back to Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeImage}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
              onClick={closeImage}
            >
              <X size={26} />
            </button>

            <div
              className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.caption}
                fill
                className="object-contain"
              />
            </div>

            <p className="absolute bottom-6 left-0 right-0 text-center text-white/80 text-sm">
              {lightbox.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}