"use client";

import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const doneProjects = projects.filter((p) => p.status === "done");
  const upcomingProjects = projects.filter((p) => p.status === "upcoming");

  return (
    <div className="space-y-12">
      {/* Done Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {doneProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Upcoming Projects */}
      {upcomingProjects.length > 0 && (
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm font-medium text-muted mb-5 uppercase tracking-wider">
            Upcoming
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {upcomingProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={doneProjects.length + index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
