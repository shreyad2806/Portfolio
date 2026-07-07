"use client";

import { motion } from "framer-motion";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface LearningsSectionProps {
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

export default function LearningsSection({ data }: LearningsSectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-3">Learnings</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            What I Learned
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.learnings.map((learning, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="font-semibold tracking-tight mb-3 text-primary">
                {learning.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {learning.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
