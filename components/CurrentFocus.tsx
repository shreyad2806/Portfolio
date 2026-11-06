"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, GitBranch, Workflow, Zap } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const signals = [
  { icon: Workflow, label: "Agent workflows" },
  { icon: GitBranch, label: "Reliable execution" },
  { icon: Boxes, label: "Production systems" },
];

export default function CurrentFocus() {
  return (
    <section id="focus" className="py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }} className="frontier-scene card-surface">
          <div className="frontier-scene-copy">
            <p className="eyebrow mb-3">04 / The Frontier · Currently Building</p>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-2">{portfolioData.currentFocus.title}</h2>
            <p className="text-sm text-primary font-medium mb-3">{portfolioData.currentFocus.subtitle}</p>
            <p className="text-muted max-w-xl leading-relaxed">{portfolioData.currentFocus.description}</p>
            <div className="frontier-signals">{signals.map(({icon: Icon,label}) => <span key={label}><Icon size={14}/>{label}</span>)}</div>
            <a href="https://github.com/shreyad2806" target="_blank" rel="noreferrer" className="frontier-link">Explore engineering work <ArrowUpRight size={15}/></a>
          </div>
          <div className="frontier-visual" aria-hidden="true">
            <div className="frontier-visual-grid"/>
            <div className="frontier-planet"><div className="frontier-planet-core"><Boxes size={48}/></div><span className="frontier-planet-ring frontier-planet-ring--one"/><span className="frontier-planet-ring frontier-planet-ring--two"/></div>
            <div className="frontier-visual-label"><i/><span>AGENTIC SYSTEMS</span><b>BUILD / 026</b></div>
            <div className="frontier-orbit-node frontier-orbit-node--one"><Workflow size={16}/></div>
            <div className="frontier-orbit-node frontier-orbit-node--two"><Zap size={16}/></div>
            <div className="frontier-orbit-node frontier-orbit-node--three"><GitBranch size={16}/></div>
          </div>
          <div className="frontier-status"><span className="frontier-status-dot"/><span>{portfolioData.currentFocus.badge}</span></div>
        </motion.div>
      </div>
    </section>
  );
}
