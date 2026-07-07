"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ExperienceItem } from "@/data/experience";
import FloatingCube from "./FloatingCube";
import InfoCards from "./InfoCards";
import ContributionList from "./ContributionList";
import QuoteCard from "./QuoteCard";

interface ExperienceContentProps {
  data: ExperienceItem;
}

export default function ExperienceContent({ data }: ExperienceContentProps) {
  return (
    <motion.div
      key={data.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Hero Section */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-medium text-primary mb-4"
          >
            {data.year}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-text mb-2"
          >
            {data.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted mb-4"
          >
            {data.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-muted leading-relaxed"
          >
            {data.description}
          </motion.p>
        </div>
        <FloatingCube />
      </div>

      {/* Info Cards */}
      <InfoCards
        focusAreas={data.focusAreas}
        highlights={data.highlights}
      />

      {/* Recent Contributions */}
      {data.contributions && data.contributions.length > 0 && (
        <ContributionList contributions={data.contributions} />
      )}

      {/* Bottom Section with Checklist and Quote */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {/* Checklist */}
        {data.checklist && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl bg-card/50 border border-border/50"
          >
            <h3 className="text-sm font-semibold text-text mb-4">What I Do</h3>
            <ul className="space-y-2">
              {data.checklist.map((item, i) => (
                <li key={i} className="text-xs text-muted flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Quote */}
        <QuoteCard quote={data.quote} />
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-center"
      >
        <p className="text-sm text-text mb-4">
          This is one stop in a continuous journey of learning and building.
        </p>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm text-primary hover:bg-primary/20 transition-colors">
          Next Stop
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}
