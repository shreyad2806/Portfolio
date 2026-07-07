"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitCommit } from "lucide-react";

interface Contribution {
  title: string;
  description: string;
  date: string;
}

interface ContributionListProps {
  contributions?: Contribution[];
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.05, ease: "easeOut" },
  }),
};

export default function ContributionList({
  contributions,
}: ContributionListProps) {
  if (!contributions || contributions.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="p-6 rounded-xl bg-card/50 border border-border/50"
    >
      <h3 className="text-sm font-semibold text-text mb-4">Recent Contributions</h3>
      <div className="space-y-4">
        {contributions.map((contribution, i) => (
          <div key={i}>
            <motion.div
              variants={rowVariants}
              custom={i}
              whileHover={{ x: 4 }}
              className="flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                <GitCommit size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-text mb-1">
                  {contribution.title}
                </h4>
                <p className="text-xs text-muted mb-1">
                  {contribution.description}
                </p>
                <p className="text-xs text-muted/60">{contribution.date}</p>
              </div>
              <a
                href="#"
                className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <ExternalLink size={14} className="text-muted" />
              </a>
            </motion.div>
            {i < contributions.length - 1 && (
              <div className="ml-11 mt-4 h-px bg-border/30" />
            )}
          </div>
        ))}
      </div>
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        href="#"
        className="inline-flex items-center gap-1 mt-4 text-xs text-primary hover:text-primary/80 transition-colors"
      >
        View all on GitHub
        <ExternalLink size={12} />
      </motion.a>
    </motion.div>
  );
}
