"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function QuoteCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
        <Quote size={32} className="text-primary/50 mx-auto mb-4" />
        <p className="text-base text-text leading-relaxed mb-4">
          &apos; The best way to learn is to build. The best way to remember is to document. &apos;
        </p>
        <p className="text-sm text-muted">— Shreya Dubey</p>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-xs text-muted/60 mt-4"
      >
        More articles will be published as I continue building projects and learning new technologies.
      </motion.p>
    </motion.div>
  );
}
