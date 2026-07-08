"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { contactData } from "@/data/contact";

export default function QuickConnect() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="p-6 rounded-xl bg-card/50 border border-border/50"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Send size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text mb-1">
              Prefer a quick conversation?
            </h3>
            <p className="text-sm text-muted">
              Feel free to reach out through any platform above. I'm always happy to connect.
            </p>
          </div>
        </div>
        <a
          href={`mailto:${contactData.email}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Let's Connect
        </a>
      </div>
    </motion.div>
  );
}
