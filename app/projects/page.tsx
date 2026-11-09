"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { projects } from "@/components/projects/ProjectData";
import PageHero from "@/components/theme/PageHero";
import NextDestinations from "@/components/theme/NextDestinations";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ProjectsPage() {
  const flagship = projects.filter((p) => p.featured).length;
  const building = projects.filter((p) => p.status === "in-progress").length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20">
        <div className="container-px mx-auto max-w-[1400px]">
          <PageHero
            place="buildlab"
            title={
              <>
                The <span className="th-accent-text" style={{ "--accent": "#66e9f4" } as React.CSSProperties}>Build Lab</span>
              </>
            }
            description="A closer look at the systems I have built — from financial workflows and runtime security to machine-learning applications. Explore the engineering choices, tools and lessons behind each one."
            stats={[
              { value: String(projects.length), label: "projects" },
              { value: String(flagship), label: "flagship systems" },
              ...(building ? [{ value: String(building), label: "in the workshop" }] : []),
            ]}
          />

          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }}>
            <ProjectGrid projects={projects} />
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mt-20">
            <div className="card-surface mx-auto max-w-2xl p-8 text-center lg:p-10">
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-white">Building in public.</h3>
              <p className="leading-relaxed text-muted">
                Currently exploring AI infrastructure, developer tools, backend engineering, and open-source software.
              </p>
              <p className="mt-2 text-muted">More projects are on the way.</p>
            </div>
          </motion.div>

          <NextDestinations current="buildlab" />
        </div>
      </main>
    </>
  );
}
