"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" },
  }),
};

const statusConfig = {
  completed: {
    label: "Completed",
    className: "bg-green-500/15 text-green-400 border-green-500/30",
    icon: null,
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    icon: Loader2,
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-primary/15 text-primary border-primary/30",
    icon: null,
  },
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;
  const detailsEnabled = project.status === "completed";

  const primaryAction =
    project.status === "in-progress"
      ? { label: "Roadmap", href: project.github }
      : project.status === "upcoming"
      ? { label: "Coming Soon", href: undefined }
      : { label: "GitHub", href: project.github };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div className="card-surface overflow-hidden transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/10 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-52 w-full overflow-hidden rounded-t-xl bg-muted/50">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted/40 text-sm font-mono">
              Project Thumbnail
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10" />

          {/* Status Badge */}
          <div className="absolute top-3 right-3 z-30">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border ${status.className}`}
            >
              {StatusIcon && <StatusIcon size={12} className="animate-spin" />}
              {status.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
            {project.name}
          </h3>

          <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted/50 text-muted border border-border/50 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
            {primaryAction.href ? (
              <a
                href={primaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary transition-colors"
              >
                {project.status === "completed" && <Github size={16} />}
                {primaryAction.label}
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted/60 cursor-not-allowed">
                {primaryAction.label}
              </span>
            )}

            {detailsEnabled ? (
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/btn"
              >
                View Details
                <ArrowUpRight size={16} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted/60 cursor-not-allowed">
                View Details
                <ArrowUpRight size={16} />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
