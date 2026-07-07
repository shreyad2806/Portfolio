"use client";

import { motion } from "framer-motion";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface ProblemSectionProps {
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

export default function ProblemSection({ data }: ProblemSectionProps) {
  return (
    <section id="problem" className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Illustration */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border/50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-muted text-sm">Problem Visualization</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-8"
          >
            <div>
              <p className="eyebrow mb-3">The Problem</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {data.problem.title}
              </h2>
            </div>

            <div className="space-y-4">
              {data.problem.points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-muted leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
