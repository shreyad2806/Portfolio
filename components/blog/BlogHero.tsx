"use client";

import { motion } from "framer-motion";

export default function BlogHero() {
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
        Developer Journal
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold text-text mb-4"
      >
        Writing About What I Build.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm md:text-base text-muted max-w-2xl leading-relaxed mb-6"
      >
        I enjoy documenting my journey of building software, experimenting with AI systems, backend engineering, and sharing the lessons I learn along the way.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20"
      >
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"
        />
        <span className="text-xs text-primary font-medium">Articles Coming Soon</span>
      </motion.div>
    </motion.div>
  );
}
