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
  FileText,
  Search,
  Shield,
  Bot,
  Database,
  Layers,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface ComplytaiPageProps {
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
  { title: "Manual document review", desc: "Compliance teams spend hours manually reviewing thousands of documents." },
  { title: "Slow information retrieval", desc: "Finding relevant regulatory context in large document collections is slow." },
  { title: "Missed compliance risks", desc: "Important risks can be overlooked due to information overload." },
  { title: "Limited semantic search", desc: "Traditional systems don't understand relationships between requirements." },
  { title: "Repetitive analysis", desc: "Analysts repeatedly compare policies against regulatory requirements." },
];

const features = [
  { icon: FileText, title: "Document Ingestion", desc: "Process enterprise policies, contracts, audit reports, and regulatory documents." },
  { icon: Search, title: "Semantic Search", desc: "Find relevant compliance information using natural-language queries." },
  { icon: Bot, title: "CrewAI Orchestration", desc: "Coordinate specialized agents for compliance analysis and risk identification." },
  { icon: Shield, title: "Risk Detection", desc: "Identify potential compliance risks and regulatory gaps in enterprise documentation." },
  { icon: Database, title: "Vector Retrieval", desc: "Pinecone-powered semantic search across compliance documents." },
  { icon: Lock, title: "Local LLM Processing", desc: "Qwen2.5 via Ollama for privacy-conscious document analysis." },
];

const engineeringHighlights = [
  { icon: Layers, title: "RAG Pipeline", desc: "Document ingestion → embeddings → retrieval → generation" },
  { icon: Bot, title: "CrewAI Agents", desc: "Specialized agent orchestration for compliance analysis" },
  { icon: Database, title: "Pinecone", desc: "Scalable vector storage and semantic retrieval" },
  { icon: Lock, title: "Local LLM", desc: "Qwen2.5 via Ollama for private inference" },
  { icon: Shield, title: "Hybrid Retrieval", desc: "Semantic + keyword search for better recall" },
  { icon: AlertTriangle, title: "Risk Analysis", desc: "Evidence-grounded compliance risk identification" },
];

const learnings = [
  { icon: Layers, title: "Production RAG", desc: "Document processing, chunking, embeddings, and retrieval quality are critical." },
  { icon: Bot, title: "Agentic AI", desc: "Clear agent responsibilities and controlled workflows enable reliable systems." },
  { icon: Lock, title: "Local LLM Infrastructure", desc: "Privacy requires balancing model quality, hardware, and operational complexity." },
  { icon: Shield, title: "Enterprise AI", desc: "Privacy, reliability, scalability, and maintainable service boundaries are essential." },
];

const screenshots = [
  { src: "/images/comp1.png", caption: "Document Upload Interface" },
  { src: "/images/comp2.png", caption: "Compliance Analysis Dashboard" },
  { src: "/images/comp3.png", caption: "Risk Detection Results" },
  { src: "/images/comp4.png", caption: "Policy Retrieval Interface" },
];

export default function ComplytaiPage({ data }: ComplytaiPageProps) {
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
                  src="/images/comply(thumbnail).png"
                  alt="ComplytAI product screenshot"
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
                  Why ComplytAI?
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
                    <h3 className="font-medium text-sm mb-2">{card.title}</h3>
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
                src: "/images/comp-archi.png",
                caption: "ComplytAI System Architecture",
              })
            }
          >
            <Image
              src="/images/comp-archi.png"
              alt="ComplytAI Architecture"
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
            Production pipeline showing document ingestion, semantic chunking, embedding generation, CrewAI agent orchestration, and local LLM reasoning.
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
                src="/images/comp1.png"
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
                  Explore the complete implementation, architecture, and code behind ComplytAI.
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
