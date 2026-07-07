"use client";

import { motion } from "framer-motion";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface ScreenshotsGalleryProps {
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

export default function ScreenshotsGallery({ data }: ScreenshotsGalleryProps) {
  const screenshots = [
    { id: 1, caption: "Dashboard Overview" },
    { id: 2, caption: "Resume Upload Interface" },
    { id: 3, caption: "Search Results" },
    { id: 4, caption: "Candidate Ranking" },
  ];

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
          <p className="eyebrow mb-3">Gallery</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Screenshots
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-video rounded-xl overflow-hidden border border-border/50 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🖥️</div>
                  <p className="text-sm text-muted">Screenshot {screenshot.id}</p>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300"
              >
                <p className="text-white font-medium">{screenshot.caption}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
