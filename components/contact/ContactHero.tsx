"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-medium text-primary mb-4"
      >
        LET'S CONNECT
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold text-text mb-4"
      >
        Let's Connect.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm md:text-base text-muted max-w-2xl leading-relaxed"
      >
        I'm always open to discussing new opportunities, interesting projects, collaborations, or simply connecting with fellow developers.
      </motion.p>
    </motion.div>
  );
}
