"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { projects } from "@/components/projects/ProjectData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container-px mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-12"
          >
            <p className="eyebrow mb-4">MY WORK</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
              Projects
            </h1>
            <p className="text-lg text-muted max-w-2xl">
              A collection of AI systems, developer tools, and production-ready applications I&apos;ve built.
            </p>
          </motion.div>

          {/* Project Grid */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <ProjectGrid projects={projects} />
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="mt-20"
          >
            <div className="card-surface p-8 lg:p-10 text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold tracking-tight mb-3">
                Building in public.
              </h3>
              <p className="text-muted leading-relaxed">
                Currently exploring AI infrastructure, developer tools, backend engineering, and open-source software.
              </p>
              <p className="text-muted mt-2">
                More projects are on the way.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
