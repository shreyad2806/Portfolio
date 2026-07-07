"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface QuoteCardProps {
  quote?: string;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
    >
      <Quote size={24} className="text-primary/50 mb-3" />
      <p className="text-sm text-text leading-relaxed italic">{quote}</p>
      <p className="text-xs text-muted mt-3">— Shreya Dubey</p>
    </motion.div>
  );
}
