"use client";

import { motion } from "framer-motion";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface MotivationSectionProps {
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

export default function MotivationSection({ data }: MotivationSectionProps) {
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
          <p className="eyebrow mb-3">Motivation</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Why I Built This
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.motivations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold tracking-tight mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
