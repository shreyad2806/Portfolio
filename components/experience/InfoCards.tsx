"use client";

import { motion } from "framer-motion";

interface InfoCardsProps {
  focusAreas?: string[];
  highlights?: string[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function InfoCards({
  focusAreas,
  highlights,
}: InfoCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {/* Focus Areas Card */}
      {focusAreas && (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          custom={0}
          whileHover={{ y: -4 }}
          className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
        >
          <h4 className="text-sm font-semibold text-text mb-3">Focus Areas</h4>
          <ul className="space-y-2">
            {focusAreas.map((area, i) => (
              <li key={i} className="text-xs text-muted flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                {area}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Highlights Card */}
      {highlights && (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          custom={1}
          whileHover={{ y: -4 }}
          className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
        >
          <h4 className="text-sm font-semibold text-text mb-3">Highlights</h4>
          <ul className="space-y-2">
            {highlights.map((item, i) => (
              <li key={i} className="text-xs text-muted flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
