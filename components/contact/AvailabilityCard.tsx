"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";

export default function AvailabilityCard() {
  const items = [
    "Full-time opportunities",
    "Software Engineering",
    "AI & Backend Development",
    "Open Source Collaboration",
    "Hackathons & Developer Communities",
    "Freelance / Personal Projects",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ y: -4 }}
      className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Code size={20} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-text">Currently Open To</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="text-xs text-muted flex items-center gap-2"
          >
            <span className="text-primary">✔</span>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
