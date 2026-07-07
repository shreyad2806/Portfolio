"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ProjectDetailData } from "@/lib/project-detail-data";
import { useState } from "react";

interface ArchitectureSectionProps {
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

export default function ArchitectureSection({ data }: ArchitectureSectionProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section id="architecture" className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-3">Architecture</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            System Architecture
          </h2>
        </motion.div>

        <div className="relative">
          {/* Architecture Flow */}
          <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto">
            {data.architecture.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="relative w-full"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step Block */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="card-surface p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold tracking-tight">{step.label}</h3>
                        <p className="text-sm text-muted mt-1">{step.description}</p>
                      </div>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-muted transition-transform duration-300 ${
                        hoveredStep === index ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </div>
                </motion.div>

                {/* Arrow between steps */}
                {index < data.architecture.steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="flex justify-center"
                  >
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary/50 to-primary/20" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Side Description Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="hidden lg:block absolute top-0 right-0 w-80"
          >
            <div className="glass-card p-6 rounded-xl border border-border/50 sticky top-32">
              <h4 className="font-semibold tracking-tight mb-4 text-primary">
                Architecture Details
              </h4>
              {hoveredStep !== null ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted">
                    {data.architecture.steps[hoveredStep].description}
                  </p>
                  <div className="pt-3 border-t border-border/30">
                    <p className="text-xs text-muted/70">
                      Step {hoveredStep + 1} of {data.architecture.steps.length}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted">
                  Hover over any step to see detailed information about that component in the architecture.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
