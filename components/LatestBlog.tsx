"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Code2, Compass, PackageOpen, Wrench } from "lucide-react";
import Link from "next/link";
import { portfolioData } from "@/lib/portfolio-data";

const categories = [
  { icon: BookOpen, label: "Build notes", detail: "Ideas from projects & engineering" },
  { icon: Code2, label: "Open-source finds", detail: "Repositories worth exploring" },
  { icon: Wrench, label: "Tools & plugins", detail: "Useful things in my workflow" },
  { icon: Compass, label: "Skills in progress", detail: "What I'm learning next" },
];

export default function LatestBlog() {
  const journal = portfolioData.journal;
  const totalFinds = journal.openSourceFinds.length + journal.toolsAndPlugins.length;

  return (
    <section id="journal" className="py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }} className="journal-preview-scene">
          <div className="journal-preview-heading">
            <div>
              <p className="eyebrow mb-3">05 / The Journal · Field notes & discoveries</p>
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">Things I&apos;m building, finding & learning.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">A living collection of engineering notes, interesting open-source projects, useful tools and skills I&apos;m exploring. Less polished blog, more builder&apos;s notebook.</p>
            </div>
            <Link href="/journal" className="journal-preview-link">Explore Journal <ArrowUpRight size={15}/></Link>
          </div>

          <div className="journal-category-grid">
            {categories.map(({icon: Icon,label,detail}, index) => {
              const count = [journal.buildNotes.length,journal.openSourceFinds.length,journal.toolsAndPlugins.length,journal.skillsInProgress.length][index];
              return <motion.div key={label} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.06}} className={`journal-category-tile journal-category-tile--${index+1}`}>
                <span className="journal-category-icon"><Icon size={19}/></span>
                <span className="journal-category-count">{String(count).padStart(2,"0")}</span>
                <b>{label}</b>
                <small>{detail}</small>
              </motion.div>;
            })}
          </div>

          <div className="journal-preview-bottom">
            <span><PackageOpen size={14}/> {totalFinds} resources collected so far</span>
            <span>UPDATED AS I EXPLORE <i/></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
