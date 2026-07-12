"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ArchitectureFlow from "./ArchitectureFlow";
import { portfolioData } from "@/lib/portfolio-data";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const pathname = usePathname();
  const [tagIndex, setTagIndex] = useState(0);
  const tagsPerView = 6;
  const shiftBy = 3;
  const allTags = portfolioData.personal.stack;

  useEffect(() => {
    if (allTags.length <= tagsPerView) return;
    const interval = setInterval(() => {
      setTagIndex((prev) => (prev + shiftBy) % allTags.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [allTags.length]);

  const visibleTags = Array.from({ length: tagsPerView }, (_, i) =>
    allTags[(tagIndex + i) % allTags.length]
  );

  const handleExploreProjects = () => {
    if (pathname === "/") {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            {portfolioData.personal.role}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.08]"
          >
            Hi, I&apos;m {portfolioData.personal.name}
            <span className="block text-primary mt-2 text-sm sm:text-base font-medium tracking-wide">
              {portfolioData.personal.subtitle}
            </span>
            <span className="block text-muted mt-3 text-2xl sm:text-3xl lg:text-[1.9rem] font-medium">
              {portfolioData.personal.tagline}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 text-base sm:text-lg text-muted max-w-xl leading-relaxed"
          >
            {portfolioData.personal.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            {pathname === "/" ? (
              <button onClick={handleExploreProjects} className="btn-primary">
                Explore Projects
                <ArrowUpRight size={16} />
              </button>
            ) : (
              <Link href="/#projects" className="btn-primary">
                Explore Projects
                <ArrowUpRight size={16} />
              </Link>
            )}
            <a href={portfolioData.personal.resume} className="btn-secondary">
              Download Resume
              <Download size={16} />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex flex-wrap gap-2.5 min-h-[40px]"
          >
            <AnimatePresence mode="wait">
              {visibleTags.map((tech) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="chip"
                >
                  {tech}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <ArchitectureFlow />
        </motion.div>
      </div>
    </section>
  );
}
