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

  // Optional hero image.
  // Only projects that define this will show an actual hero image.
  heroImage?: string;

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

  const hasHeroImage = Boolean(data.heroImage);

  const heroTopLabel =
    data.slug === "architectiq"
      ? "AI Architecture Analysis"
      : data.slug === "devforge"
        ? "Full-Stack SaaS"
        : data.slug === "lawgpt-crm"
          ? "Marketing Automation"
          : data.slug === "reflex-ninja"
            ? "Native Android"
            : "Production Ready";

  const heroBottomLabel =
    data.slug === "architectiq"
      ? "Repository Intelligence"
      : data.slug === "devforge"
        ? "Developer Platform"
        : data.slug === "lawgpt-crm"
          ? "CRM Dashboard"
          : data.slug === "reflex-ninja"
            ? "Kotlin • Android"
            : "Project";

  return (
    <>
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative overflow-visible pb-24 pt-32 lg:pb-32 lg:pt-40">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[48%_52%] lg:gap-8">
            {/* ======================================================
                LEFT — PROJECT INFORMATION
            ====================================================== */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="relative z-20"
            >
              {/* Badge + Status */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="chip">
                  {data.badge}
                </span>

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

              {/* Title */}
              <h1 className="mb-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                {data.name}
              </h1>

              {/* Description */}
              <p className="mb-8 max-w-4xl text-lg leading-relaxed text-muted sm:text-xl">
                {data.oneLiner}
              </p>

              {/* Tech Stack */}
              <div className="mb-8 flex flex-wrap gap-2">
                {data.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="chip text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
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
                    className="btn-secondary cursor-not-allowed opacity-60"
                  >
                    <Play size={16} />
                    Demo Coming Soon
                  </button>
                )}
              </div>
            </motion.div>

            {/* ======================================================
                RIGHT — PROJECT HERO IMAGE
            ====================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.15,
              }}
              className="relative flex w-full items-center justify-center"
            >
              <div className="relative w-full max-w-[680px]">
                {/* Glow */}
                {hasHeroImage && (
                  <div className="absolute -inset-8 rounded-[40px] bg-primary/10 blur-3xl" />
                )}

                {/* Main image container */}
                <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl">
                  {hasHeroImage ? (
                    <>
                      {/* Gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/5" />

                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={data.heroImage!}
                          alt={`${data.name} project screenshot`}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 52vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                        />
                      </div>

                      {/* Bottom gradient */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-black/50 to-transparent" />
                    </>
                  ) : (
                    /* Existing placeholder for projects without heroImage */
                    <div className="flex aspect-[16/10] items-center justify-center">
                      <div className="text-center">
                        <div className="mb-4 text-5xl">
                          💻
                        </div>

                        <p className="font-mono text-sm text-muted">
                          Project Screenshot
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ==================================================
                    TOP-RIGHT FLOATING LABEL
                ================================================== */}
                {hasHeroImage && (
                  <div className="absolute -right-5 -top-5 z-30 rounded-xl border border-border/50 bg-background/80 px-4 py-3 shadow-xl backdrop-blur-xl">
                    <span className="font-mono text-sm font-medium text-primary">
                      {heroTopLabel}
                    </span>
                  </div>
                )}

                {/* ==================================================
                    BOTTOM-LEFT FLOATING LABEL
                ================================================== */}
                {hasHeroImage && (
                  <div className="absolute -bottom-5 -left-5 z-30 rounded-xl border border-border/50 bg-background/80 px-4 py-3 shadow-xl backdrop-blur-xl">
                    <span className="font-mono text-sm font-medium text-primary">
                      {heroBottomLabel}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROBLEM
      ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
            >
              <p className="eyebrow mb-3">
                The Problem
              </p>

              <h2 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                {data.problem.title}
              </h2>

              <p className="leading-relaxed text-muted">
                {data.description}
              </p>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2">
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
                    <span className="font-mono text-sm text-primary">
                      0{index + 1}
                    </span>

                    <p className="text-sm leading-relaxed text-muted">
                      {point}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY BUILT
      ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">
              Motivation
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Why I Built This
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {data.motivations.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="card-surface p-6"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <span className="font-semibold text-primary">
                    {index + 1}
                  </span>
                </div>

                <h3 className="mb-2 font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ARCHITECTURE
      ============================================================ */}
      <section
        className="py-16 lg:py-24"
        id="architecture"
      >
        <div className="container-px mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">
              Architecture
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
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
                className="card-surface flex items-center gap-5 p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                  <span className="font-mono text-sm text-primary">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="mb-1 font-semibold">
                    {step.label}
                  </h3>

                  <p className="text-sm text-muted">
                    {step.description}
                  </p>
                </div>

                {index < data.architecture.length - 1 && (
                  <ChevronRight
                    size={18}
                    className="hidden text-primary/50 sm:block"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURES
      ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">
              Features
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Feature Showcase
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="card-surface p-6 transition-all hover:border-primary/40"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                  <span className="text-sm text-primary">
                    {index + 1}
                  </span>
                </div>

                <h3 className="mb-2 font-semibold">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ENGINEERING DECISIONS
      ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">
              Engineering
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Engineering Decisions
            </h2>
          </div>

          <div className="mx-auto max-w-5xl space-y-4">
            {data.decisions.map((decision) => (
              <div
                key={decision.problem}
                className="grid gap-4 md:grid-cols-3"
              >
                <div className="card-surface p-5">
                  <p className="mb-2 text-xs uppercase tracking-wider text-muted">
                    Problem
                  </p>

                  <p className="font-medium">
                    {decision.problem}
                  </p>
                </div>

                <div className="card-surface border-primary/20 p-5">
                  <p className="mb-2 text-xs uppercase tracking-wider text-primary">
                    Decision
                  </p>

                  <p className="font-medium">
                    {decision.decision}
                  </p>
                </div>

                <div className="card-surface p-5">
                  <p className="mb-2 text-xs uppercase tracking-wider text-muted">
                    Why
                  </p>

                  <p className="text-sm leading-relaxed text-muted">
                    {decision.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CHALLENGES
      ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">
              Challenges
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Challenges Faced
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.challenges.map((challenge) => (
              <div
                key={challenge.problem}
                className="card-surface p-6"
              >
                <p className="mb-2 text-xs uppercase tracking-wider text-primary">
                  Problem
                </p>

                <h3 className="mb-4 font-semibold">
                  {challenge.problem}
                </h3>

                <p className="text-sm leading-relaxed text-muted">
                  {challenge.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SCREENSHOTS
      ============================================================ */}
      {data.screenshots.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container-px mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="eyebrow mb-3">
                Product
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Screenshots
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-muted">
                Explore the product interface, workflows, and key screens.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {data.screenshots.map((shot, index) => (
                <motion.div
                  key={shot.src}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  whileHover={{ y: -4 }}
                  className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-border/50"
                  onClick={() =>
                    openImage(
                      shot.src,
                      shot.caption
                    )
                  }
                >
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex items-center gap-2 font-medium text-white">
                      {shot.caption}
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-white">
                        {shot.caption}
                      </span>

                      <span className="font-mono text-xs text-white/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          RESULTS
      ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">
              Results
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What This Project Demonstrates
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.results.map((result) => (
              <div
                key={result.label}
                className="card-surface p-6 text-center"
              >
                <p className="mb-2 text-xl font-semibold text-primary">
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

      {/* ============================================================
          LEARNINGS
      ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">
              Learnings
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What I Learned
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.learnings.map((learning) => (
              <div
                key={learning.title}
                className="card-surface p-6"
              >
                <CheckCircle2
                  size={20}
                  className="mb-4 text-primary"
                />

                <h3 className="mb-2 font-semibold">
                  {learning.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted">
                  {learning.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ROADMAP
      ============================================================ */}
      {data.roadmap.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container-px mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="eyebrow mb-3">
                Roadmap
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Future Direction
              </h2>
            </div>

            <div className="space-y-3">
              {data.roadmap.map((item) => (
                <div
                  key={item.feature}
                  className="card-surface flex items-center justify-between gap-4 p-4"
                >
                  <span className="text-sm font-medium">
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

      {/* ============================================================
          GITHUB CTA
      ============================================================ */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-3xl">
          <div className="card-surface relative overflow-hidden rounded-2xl p-8 text-center lg:p-12">
            <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">
              <Github
                size={36}
                className="mx-auto mb-5 text-primary"
              />

              <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
                Explore the Implementation
              </h2>

              <p className="mb-8 text-muted">
                Review the source code, architecture, and engineering decisions behind{" "}
                {data.name}.
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

      {/* ============================================================
          LIGHTBOX
      ============================================================ */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeImage}
          >
            {/* Close */}
            <button
              type="button"
              aria-label="Close image"
              className="absolute right-4 top-4 z-50 p-2 text-white/70 transition hover:text-white"
              onClick={closeImage}
            >
              <X size={26} />
            </button>

            {/* Image */}
            <div
              className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Caption */}
            <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-white/80">
              {lightbox.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}