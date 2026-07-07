"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface NextProjectProps {
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

export default function NextProject({ data }: NextProjectProps) {
  if (!data.nextProject) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <Link
            href={`/projects/${data.nextProject.slug}`}
            className="group block max-w-3xl mx-auto"
          >
            <div className="card-surface p-8 lg:p-12 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <p className="text-sm text-muted mb-4">Next Project</p>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3 group-hover:text-primary transition-colors">
                  {data.nextProject.name}
                </h3>
                <p className="text-muted mb-6">{data.nextProject.description}</p>
                
                <motion.div
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                  whileHover={{ x: 4 }}
                >
                  View Project
                  <ArrowUpRight size={16} />
                </motion.div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
