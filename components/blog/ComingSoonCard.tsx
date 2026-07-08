"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import UpcomingArticles from "./UpcomingArticles";

export default function ComingSoonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="p-8 rounded-xl bg-card/50 border border-border/50"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-lg bg-primary/10">
          <BookOpen size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text mb-2">Articles Coming Soon</h2>
          <p className="text-sm text-muted leading-relaxed">
            I'm currently focused on building projects and preparing technical write-ups that explain the engineering decisions behind them.
          </p>
          <p className="text-sm text-muted leading-relaxed mt-2">
            My goal is to publish practical articles that help developers understand modern software engineering and AI systems through real projects.
          </p>
        </div>
      </div>
      <UpcomingArticles />
    </motion.div>
  );
}
