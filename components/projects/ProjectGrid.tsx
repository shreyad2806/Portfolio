"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

const sectionTitle = "text-sm font-medium text-muted mb-5 uppercase tracking-wider";

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const featuredProjects = projects.filter((p) => p.status === "completed");
  const buildingProjects = projects.filter((p) => p.status === "in-progress");
  const upcomingProjects = projects.filter((p) => p.status === "upcoming");

  return (
    <div className="space-y-16">
      {/* Featured Projects */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className={sectionTitle}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Currently Building */}
      {buildingProjects.length > 0 && (
        <section className="pt-8 border-t border-border/50">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className={sectionTitle}
          >
            Currently Building
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {buildingProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={featuredProjects.length + index}
              />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Projects */}
      {upcomingProjects.length > 0 && (
        <section className="pt-8 border-t border-border/50">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className={sectionTitle}
          >
            Upcoming
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {upcomingProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={featuredProjects.length + buildingProjects.length + index}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
