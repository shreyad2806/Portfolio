"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";

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

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  const getBadgeColor = () => {
    if (project.badge === "Featured") return "bg-primary/20 text-primary border-primary/30";
    if (project.badge === "In Progress") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "";
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className="group relative cursor-pointer"
    >
      <div className="card-surface overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted/50">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center text-muted/40 text-sm font-mono">
            Project Thumbnail
          </div>
          <motion.div
            className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          />
          
          {/* Badge */}
          {project.badge && (
            <div className="absolute top-3 left-3 z-30">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${getBadgeColor()}`}>
                {project.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          
          <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted/50 text-muted border border-border/50 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted hover:text-text transition-colors"
                >
                  <Github size={18} />
                </a>
              )}
              {project.externalLink && (
                <a
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted hover:text-text transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            
            <motion.div
              className="flex items-center gap-1.5 text-sm font-medium text-primary"
              whileHover={{ x: 2 }}
            >
              View Details
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight size={16} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
