"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
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
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string; caption: string }>({
    open: false,
    src: "",
    caption: "",
  });

  const screenshots = data.screenshots || [];

  if (screenshots.length === 0) {
    return null;
  }

  return (
    <>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-video rounded-xl overflow-hidden border border-border/50 cursor-pointer"
                onClick={() => setLightbox({ open: true, src: screenshot.src, caption: screenshot.caption })}
              >
                <Image
                  src={screenshot.src}
                  alt={screenshot.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300"
                >
                  <p className="text-white font-medium flex items-center gap-2">
                    {screenshot.caption}
                    <ArrowUpRight size={16} />
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox({ open: false, src: "", caption: "" })}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
              onClick={() => setLightbox({ open: false, src: "", caption: "" })}
            >
              <X size={24} />
            </button>
            <div
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.caption}
                fill
                className="object-contain"
              />
            </div>
            <p className="absolute bottom-6 left-0 right-0 text-center text-white/80 text-sm">
              {lightbox.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
