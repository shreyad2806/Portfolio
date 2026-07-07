"use client";

import { motion } from "framer-motion";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface ResultsSectionProps {
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

export default function ResultsSection({ data }: ResultsSectionProps) {
  return (
    <section id="results" className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-3">Results</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Key Results
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-surface p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {result.value}
              </div>
              <p className="font-semibold tracking-tight mb-2">{result.label}</p>
              <p className="text-sm text-muted">{result.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
