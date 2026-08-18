"use client";

import Image from "next/image";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface ProjectDetailHeroProps {
  data: ProjectDetailData;
}

const HERO_IMAGE_SLUGS = new Set([
  "architectiq",
  "devforge",
  "lawgpt-crm",
  "reflex-ninja",
]);

export default function ProjectDetailHero({
  data,
}: ProjectDetailHeroProps) {
  const showHeroImage = HERO_IMAGE_SLUGS.has(data.slug);

  const getTopLabel = () => {
    switch (data.slug) {
      case "architectiq":
        return "AI Architecture Analysis";

      case "devforge":
        return "Full-Stack SaaS";

      case "lawgpt-crm":
        return "Marketing Automation";

      case "reflex-ninja":
        return "Native Android";

      default:
        return "Production Ready";
    }
  };

  const getBottomLabel = () => {
    switch (data.slug) {
      case "architectiq":
        return "Repository Intelligence";

      case "devforge":
        return "Developer Platform";

      case "lawgpt-crm":
        return "CRM Dashboard";

      case "reflex-ninja":
        return "Kotlin • Android";

      default:
        return "Project";
    }
  };

  return (
    <section className="relative overflow-visible px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[48%_52%] lg:gap-8">

          {/* =====================================================
              LEFT — PROJECT INFORMATION
          ===================================================== */}
          <div className="relative z-20">

            {/* Badge */}
            <div className="mb-7 inline-flex rounded-full border border-white/10 bg-white/[0.02] px-4 py-2">
              <span className="font-mono text-sm text-blue-300">
                {data.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
              {data.name}
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-200/80 md:text-xl">
              {data.oneLiner}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {data.liveDemo && (
                <a
                  href={data.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-6 py-3 font-medium text-white transition hover:bg-purple-400"
                >
                  <span>▷</span>
                  Live Demo
                </a>
              )}

              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/5"
                >
                  <span>⌘</span>
                  GitHub
                </a>
              )}
            </div>

            {/* Tech stack */}
            <div className="mt-8 flex max-w-2xl flex-wrap gap-2">
              {data.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-sm text-blue-200/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* =====================================================
              RIGHT — HERO IMAGE
          ===================================================== */}
          <div className="relative flex w-full items-center justify-center lg:pl-4">

            <div className="relative w-full max-w-[680px]">

              {/* Glow */}
              {showHeroImage && (
                <div className="absolute -inset-8 rounded-[40px] bg-purple-500/10 blur-3xl" />
              )}

              {/* Main visual */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111118] shadow-2xl shadow-purple-500/10">

                {showHeroImage ? (
                  <>
                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={data.heroImage}
                        alt={`${data.name} project screenshot`}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 52vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    </div>

                    {/* Bottom gradient */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-black/50 to-transparent" />
                  </>
                ) : (
                  /* Keep existing placeholder behavior for other projects */
                  <div className="flex aspect-[16/10] items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4 text-5xl">💻</div>
                      <p className="font-mono text-sm text-white/30">
                        Project Screenshot
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Top-right floating label */}
              {showHeroImage && (
                <div className="absolute -right-5 -top-5 z-30 rounded-xl border border-white/10 bg-black/75 px-4 py-3 shadow-xl backdrop-blur-xl">
                  <span className="font-mono text-sm font-medium text-purple-400">
                    {getTopLabel()}
                  </span>
                </div>
              )}

              {/* Bottom-left floating label */}
              {showHeroImage && (
                <div className="absolute -bottom-5 -left-5 z-30 rounded-xl border border-white/10 bg-black/75 px-4 py-3 shadow-xl backdrop-blur-xl">
                  <span className="font-mono text-sm font-medium text-purple-400">
                    {getBottomLabel()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}