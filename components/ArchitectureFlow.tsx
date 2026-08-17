"use client";

import { motion } from "framer-motion";

const STEPS = [
  { id: "user", label: "User", y: 0 },
  { id: "frontend", label: "Frontend", y: 56 },
  { id: "backend", label: "Backend API", y: 112 },
  { id: "business", label: "Business Logic", y: 168 },
  { id: "ai", label: "AI/ML Pipeline", y: 224 },
  { id: "data", label: "Data Layer", y: 280 },
  { id: "model", label: "AI Model", y: 336 },
  { id: "response", label: "Response", y: 392 },
];

const X = 70;

export default function ArchitectureFlow() {
  return (
    <div className="relative w-full max-w-[180px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Connecting line */}
        <div className="absolute left-[70px] top-[18px] w-0.5 h-[388px] bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 rounded-full" />

        {/* Animated flow dot */}
        <motion.div
          className="absolute left-[66px] w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/60 z-10"
          initial={{ top: 18 }}
          animate={{ top: [18, 388, 18] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative space-y-2">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
              className="flex items-center gap-4"
            >
              <div className="relative w-[140px] flex items-center justify-end">
                <div
                  className={`px-3 py-2 rounded-lg border text-xs font-medium text-center w-full transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 ${
                    index === 0 || index === STEPS.length - 1
                      ? "bg-card/40 border-border/50 text-muted"
                      : "bg-card/60 border-primary/20 text-text"
                  }`}
                >
                  {step.label}
                </div>
                <div className="absolute -right-[14px] w-2 h-2 rounded-full bg-primary/80" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
