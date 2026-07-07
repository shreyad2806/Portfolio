"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface EngineeringDecisionsProps {
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

export default function EngineeringDecisions({ data }: EngineeringDecisionsProps) {
  return (
    <section id="decisions" className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-3">Engineering</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Engineering Decisions
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {data.decisions.map((decision, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Decision Row */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="card-surface p-5 rounded-xl border border-border/50">
                    <p className="text-xs text-muted uppercase tracking-wider mb-2">Problem</p>
                    <p className="font-medium text-sm">{decision.problem}</p>
                  </div>
                  
                  <div className="card-surface p-5 rounded-xl border border-border/50 bg-primary/5">
                    <p className="text-xs text-primary uppercase tracking-wider mb-2">Decision</p>
                    <p className="font-medium text-sm text-primary">{decision.decision}</p>
                  </div>
                  
                  <div className="card-surface p-5 rounded-xl border border-border/50">
                    <p className="text-xs text-muted uppercase tracking-wider mb-2">Why</p>
                    <p className="text-sm text-muted">{decision.why}</p>
                  </div>
                </div>

                {/* Arrow between rows */}
                {index < data.decisions.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="flex justify-center py-2"
                  >
                    <ArrowDown size={20} className="text-muted/30" />
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
