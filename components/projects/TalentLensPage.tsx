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
  Upload,
  Search,
  ArrowUpDown,
  MessageSquare,
  Trophy,
  LayoutDashboard,
  Server,
  Layers,
  Workflow,
  Eye,
  Cpu,
  Database,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface TalentLensPageProps {
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

const problemCards = [
  { title: "Manual screening", desc: "Resume screening is manual and time consuming." },
  { title: "Keyword mismatch", desc: "Keyword search misses qualified candidates." },
  { title: "Weak ATS semantics", desc: "Traditional ATS lacks semantic understanding." },
  { title: "Hybrid relevance", desc: "Hybrid retrieval improves result relevance." },
  { title: "Explainable ranking", desc: "LLM reasoning enables explainable ranking." },
];

const features = [
  { icon: Upload, title: "Resume Upload", desc: "Bulk upload PDF and Word resumes with automatic parsing." },
  { icon: Search, title: "Hybrid Retrieval", desc: "Combine dense and sparse search for better recall." },
  { icon: ArrowUpDown, title: "Cross Encoder Reranking", desc: "Re-rank retrieved resumes for higher precision." },
  { icon: MessageSquare, title: "Resume Chat", desc: "Ask natural language questions about any candidate." },
  { icon: Trophy, title: "Candidate Ranking", desc: "AI-generated ranking with evidence-based scoring." },
  { icon: LayoutDashboard, title: "Recruiter Dashboard", desc: "Centralized view of jobs, candidates, and insights." },
];

const engineeringHighlights = [
  { icon: Search, title: "Hybrid Retrieval", desc: "Dense + Sparse Search" },
  { icon: ArrowUpDown, title: "Cross Encoder", desc: "Improved ranking precision" },
  { icon: Layers, title: "Semantic Chunking", desc: "Better retrieval quality" },
  { icon: Server, title: "FastAPI Backend", desc: "Async REST APIs" },
  { icon: Workflow, title: "Production Pipeline", desc: "Parser → Embeddings → Pinecone → LLM" },
  { icon: Eye, title: "Explainability", desc: "Evidence-based candidate answers" },
];

const learnings = [
  { icon: Cpu, title: "Production AI Systems", desc: "End-to-end RAG pipelines require careful latency and quality trade-offs." },
  { icon: Search, title: "Hybrid Retrieval", desc: "Combining dense and sparse retrieval significantly improves recall." },
  { icon: Database, title: "Vector Databases", desc: "Pinecone enables scalable semantic search with minimal ops overhead." },
  { icon: Layers, title: "System Design", desc: "Caching, async processing, and error handling are essential." },
];

const screenshots = [
  { src: "/images/talentlens.png", caption: "Upload Resume" },
  { src: "/images/talentlens.png", caption: "Candidate Ranking" },
  { src: "/images/talentlens.png", caption: "Resume Chat" },
  { src: "/images/talentlens.png", caption: "Candidate Profile" },
];

export default function TalentLensPage({ data }: TalentLensPageProps) {
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
      <section className="relative pt-32 pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-4xl space-y-8"
          >
            <span className="chip">{data.badge}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              {data.name}
            </h1>
            <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl">
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
        </div>
      </section>

      {/* Problem + Solution */}
      <section id="problem" className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border/50">
                <Image
                  src="/images/talentlens.png"
                  alt="TalentLens product screenshot"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="space-y-6"
            >
              <div>
                <p className="eyebrow mb-3">Problem & Solution</p>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  Why TalentLens?
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {problemCards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.05 }}
                    className="card-surface p-4 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-primary" />
                      <h3 className="font-medium text-sm">{card.title}</h3>
                    </div>
                    <p className="text-sm text-muted">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
                src: "/images/t_archi.png",
                caption: "TalentLens System Architecture",
              })
            }
          >
            <Image
              src="/images/t_archi.png"
              alt="TalentLens Architecture"
              width={1600}
              height={900}
              className="w-full h-auto rounded-xl border border-zinc-800 object-contain shadow-lg"
              priority
            />
            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted max-w-3xl mx-auto"
          >
            Production pipeline showing resume ingestion, semantic chunking, embedding generation, hybrid retrieval, reranking, and LLM reasoning.
          </motion.p>
        </div>
      </section>

      {/* Recruiter Workflow */}
      <section id="workflow" className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">Workflow</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Recruiter Workflow
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
                src: "/images/t_workflow.png",
                caption: "TalentLens Recruiter Workflow",
              })
            }
          >
            <Image
              src="/images/t_workflow.png"
              alt="TalentLens Recruiter Workflow"
              width={1600}
              height={900}
              className="w-full h-auto rounded-xl border border-zinc-800 object-contain shadow-lg"
              priority
            />
            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted max-w-3xl mx-auto"
          >
            End-to-end recruiter workflow from resume upload to explainable candidate ranking.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Feature Showcase
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="card-surface p-6 hover:border-primary/40 transition-all duration-300"
                >
                  <Icon size={22} className="text-primary mb-4" />
                  <h3 className="font-semibold tracking-tight mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

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

      {/* Engineering Highlights */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">Engineering</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Engineering Highlights
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {engineeringHighlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="card-surface p-5 hover:border-primary/40 transition-all duration-300"
                >
                  <Icon size={20} className="text-primary mb-3" />
                  <h3 className="font-semibold tracking-tight mb-1">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learnings */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">Learnings</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              What I Learned
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {learnings.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-5 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <Icon size={20} className="text-primary mb-3" />
                  <h3 className="font-semibold tracking-tight mb-1 text-primary">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="py-16 lg:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">Demo</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Demo Video
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-surface aspect-video rounded-2xl overflow-hidden relative flex items-center justify-center">
              <Image
                src="/images/talentlens.png"
                alt="Demo preview"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="relative text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/50">
                  <Play size={32} className="text-white fill-white ml-1" />
                </div>
                <p className="text-lg font-semibold tracking-tight mb-1">Watch Demo</p>
                <p className="text-sm text-muted">Demo coming soon.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
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
                  GitHub Repository
                </h2>
                <p className="text-muted mb-8 max-w-lg mx-auto">
                  Explore the complete implementation, architecture, and code behind TalentLens.
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
    </>
  );
}
