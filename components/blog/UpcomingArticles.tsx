"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { upcomingArticles } from "@/data/blog";

export default function UpcomingArticles() {
  return (
    <div className="space-y-0">
      {upcomingArticles.map((article, index) => (
        <div key={index}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-4 py-3 group cursor-default"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-lg shadow.primary/50 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-text mb-1">{article.title}</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted/70">{article.category}</span>
                <span className="text-xs text-muted/50">•</span>
                <span className="text-xs text-muted/70">{article.readTime}</span>
              </div>
            </div>
            <ArrowRight size={16} className="text-muted/30 group-hover:text-primary/50 transition-colors" />
          </motion.div>
          {index < upcomingArticles.length - 1 && (
            <div className="ml-2 h-px bg-border/30" />
          )}
        </div>
      ))}
    </div>
  );
}
