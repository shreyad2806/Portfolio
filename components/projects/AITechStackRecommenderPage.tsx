"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  ArrowUpRight,
  Play,
  X,
  ChevronRight,
} from "lucide-react";
import { ProjectDetailData } from "@/lib/project-detail-data";
import MotivationSection from "./MotivationSection";
import FeatureShowcase from "./FeatureShowcase";
import EngineeringDecisions from "./EngineeringDecisions";
import ChallengesSection from "./ChallengesSection";
import DevelopmentJourney from "./DevelopmentJourney";
import ResultsSection from "./ResultsSection";
import LearningsSection from "./LearningsSection";

interface AITechStackRecommenderPageProps {
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

const screenshots = [
  { src: "/images/stackmind.png", caption: "Landing Page" },
  { src: "/images/stack3.png", caption: "Recommendation Results" },
  { src: "/images/stack4.png", caption: "Architecture Suggestion" },
  { src: "/images/stack5.png", caption: "Deployment Roadmap" },
];

export default function AITechStackRecommenderPage({ data }: AITechStackRecommenderPageProps) {
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string; caption: string }>({
    open: false,
    src: "",
    caption: "",
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="space-y-6"
            >
              <span className="chip">{data.badge}</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
                {data.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
                {data.oneLiner}
              </p>

              <div className="flex flex-wrap gap-3">
                {data.techStack.map((tech) => (
                  <span key={tech} className="chip text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <button className="btn-secondary opacity-70 cursor-not-allowed">
                  <Play size={16} />
                  Demo Video (Coming Soon)
                </button>
                <button
                  onClick={() => scrollTo("architecture")}
                  className="btn-secondary"
                >
                  Architecture
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative space-y-5"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10 group">
                <Image
                  src="/images/stack1.png"
                  alt="AI Tech Stack Recommender landing page"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10 group">
                <Image
                  src="/images/stack2.png"
                  alt="AI Tech Stack Recommender dashboard"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">Problem</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              What problem does this solve?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {data.problem.points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="card-surface p-6 rounded-xl border border-border/50 hover:border-primary/40 transition-all duration-300"
              >
                <p className="font-medium leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MotivationSection data={data} />

      {/* Architecture */}
      <section id="architecture" className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">Architecture</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              System Architecture
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="relative group cursor-pointer"
            onClick={() =>
              setLightbox({
                open: true,
                src: "/images/stack_archi.png",
                caption: "AI Tech Stack Recommender System Architecture",
              })
            }
          >
            <Image
              src="/images/stack_archi.png"
              alt="AI Tech Stack Recommender Architecture"
              width={1600}
              height={900}
              className="w-full h-auto rounded-xl border border-zinc-800 object-contain shadow-lg"
              priority
            />
            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 mt-8">
            {data.architecture.steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="card-surface p-5 rounded-xl border border-border/50 hover:border-primary/40 transition-all duration-300"
              >
                <p className="font-semibold tracking-tight mb-1 text-sm">{step.label}</p>
                <p className="text-sm text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeatureShowcase data={data} />
      <EngineeringDecisions data={data} />
      <ChallengesSection data={data} />
      <DevelopmentJourney data={data} />

      {/* Screenshots */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">Product</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Screenshots
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {screenshots.map((shot, i) => (
              <motion.div
                key={shot.caption}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-video rounded-xl overflow-hidden border border-border/50 cursor-pointer"
                onClick={() => setLightbox({ open: true, src: shot.src, caption: shot.caption })}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-medium flex items-center gap-2">
                    {shot.caption}
                    <ArrowUpRight size={16} />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="py-12 lg:py-16">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="max-w-2xl mx-auto"
          >
            <div className="card-surface p-8 rounded-2xl text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Play size={24} className="text-primary ml-0.5" />
              </div>
              <p className="text-lg font-semibold tracking-tight mb-1">Demo Coming Soon</p>
              <p className="text-sm text-muted">
                A walkthrough of the recommendation engine, dashboard and architecture generation will be added soon.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <ResultsSection data={data} />
      <LearningsSection data={data} />

      {/* Final CTA */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="max-w-3xl mx-auto"
          >
            <div className="card-surface p-8 lg:p-12 rounded-2xl text-center relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Github size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-4">
                  Explore Source Code
                </h2>
                <p className="text-muted mb-8 max-w-lg mx-auto">
                  Interested in the implementation? Browse the repository to explore the backend architecture, recommendation engine and frontend application.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Open GitHub
                    <ArrowUpRight size={16} />
                  </a>
                  <Link href="/projects" className="btn-secondary">
                    Back to Projects
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox({ open: false, src: "", caption: "" })}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
              onClick={() => setLightbox({ open: false, src: "", caption: "" })}
            >
              <X size={24} />
            </button>
            <div
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden"
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
