"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface DemoSectionProps {
  data: ProjectDetailData;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function DemoSection({ data }: DemoSectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-3">Demo</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            See It In Action
          </h2>
        </motion.div>

        {data.liveDemo ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 overflow-hidden relative group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/50"
                >
                  <Play size={32} className="text-white fill-white ml-1" />
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm text-muted">Click to watch demo</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-xl font-semibold tracking-tight mb-2">Demo Coming Soon</p>
                <p className="text-muted">A video demonstration of the platform will be available soon.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
