"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { portfolioData } from "@/lib/portfolio-data";

export default function FeaturedProjects() {
  const featuredProjects = portfolioData.projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Featured Work</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary transition-all duration-200"
          >
            View All Projects
            <motion.span
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              <ArrowUpRight size={16} />
            </motion.span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-surface p-8"
            >
              <h3 className="text-xl font-semibold tracking-tight mb-3">
                {project.name}
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2.5 mb-6">
                {project.tech.map((tech) => (
                  <span key={tech} className="chip text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/projects/${project.id}`}
                  className="btn-primary text-sm"
                >
                  View Details
                  <ArrowUpRight size={14} />
                </Link>
                <a href={project.github} className="btn-secondary text-sm">
                  GitHub
                  <Github size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
