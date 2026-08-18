"use client";

import Image from "next/image";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface ScreenshotsGalleryProps {
  data: ProjectDetailData;
}

export default function ScreenshotsGallery({
  data,
}: ScreenshotsGalleryProps) {
  if (!data.screenshots || data.screenshots.length === 0) {
    return null;
  }

  return (
    <section className="mt-24 px-6 md:mt-32">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-sm uppercase tracking-wider text-purple-400">
            Product Walkthrough
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            See {data.name} in action.
          </h2>

          <p className="mt-4 text-base leading-7 text-white/50">
            Screenshots from the actual product interface and workflow.
          </p>
        </div>

        {/* =====================================================
            SCREENSHOT GRID
        ===================================================== */}
        <div className="grid gap-6 md:grid-cols-2">
          {data.screenshots.map((screenshot, index) => (
            <div
              key={`${data.slug}-screenshot-${index}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-xl shadow-black/20"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-black/30">

                {/* Gradient */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-purple-500/[0.08] via-transparent to-blue-500/[0.05]" />

                <Image
                  src={screenshot.src}
                  alt={`${data.name} — ${screenshot.caption}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              </div>

              {/* Caption */}
              <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-5 py-4">
                <span className="text-sm font-medium text-white/80">
                  {screenshot.caption}
                </span>

                <span className="font-mono text-xs text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}