"use client";

import { motion } from "framer-motion";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface ChallengesSectionProps {
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

export default function ChallengesSection({ data }: ChallengesSectionProps) {
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
          <p className="eyebrow mb-3">Challenges</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Challenges Faced
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="card-surface p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-2">Problem</p>
                  <p className="font-medium text-sm">{challenge.problem}</p>
                </div>
                
                <div className="h-px bg-border/30" />
                
                <div>
                  <p className="text-xs text-primary uppercase tracking-wider mb-2">Solution</p>
                  <p className="text-sm text-muted">{challenge.solution}</p>
                </div>
                
                <div className="h-px bg-border/30" />
                
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-2">Learning</p>
                  <p className="text-sm text-muted italic">{challenge.learning}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
