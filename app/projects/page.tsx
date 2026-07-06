"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ProjectFilters from "@/components/projects/ProjectFilters";
import SearchBar from "@/components/projects/SearchBar";
import { projects, categories } from "@/components/projects/ProjectData";
import { ProjectCategory, ViewMode } from "@/types/project";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

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
              A collection of AI systems, developer tools, and production-ready applications I've built.
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10"
          >
            {/* Filters */}
            <ProjectFilters
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Search & View Toggle */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </motion.div>

          {/* Project Grid */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <ProjectGrid projects={projects} />
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="mt-20 text-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
            </div>
            <p className="text-muted text-sm">
              More AI projects coming soon.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
