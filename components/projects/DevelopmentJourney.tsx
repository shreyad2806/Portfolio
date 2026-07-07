"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface DevelopmentJourneyProps {
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

export default function DevelopmentJourney({ data }: DevelopmentJourneyProps) {
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
          <p className="eyebrow mb-3">Journey</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Development Journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 hidden md:block" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4">
            {data.journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="relative flex-1"
              >
                <div className="card-surface p-5 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-semibold">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold tracking-tight text-sm">{item.phase}</h3>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                </div>

                {/* Arrow between items */}
                {index < data.journey.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="hidden md:flex justify-center mt-2"
                  >
                    <ChevronRight size={16} className="text-muted/30" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
