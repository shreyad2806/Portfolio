"use client";

import { motion } from "framer-motion";
import { Boxes, Code2, FileText, Home, Layers3, FlaskConical, Map, Play, ArrowRight, Radio, Telescope, Trophy, Mouse } from "lucide-react";
import HeroBackdrop from "@/components/HeroBackdrop";
import HeroWorld from "@/components/HeroWorld";
import NovaAssistant, { type NovaDestination } from "@/components/NovaAssistant";
import { portfolioData } from "@/lib/portfolio-data";

const destinations: NovaDestination[] = [
  { id: "basecamp", n: "01", title: "The Basecamp", sub: "About · Skills · Philosophy", panelSub: "Get to know Shreya", target: "skills", color: "#b49aff", icon: Home, reply: "" },
  { id: "buildlab", n: "02", title: "The Build Lab", sub: "Projects · Systems · Demos", panelSub: "Explore her projects", target: "projects", color: "#66e9f4", icon: FlaskConical, reply: "" },
  { id: "journey", n: "03", title: "The Journey", sub: "Experience · Hackathons · Impact", panelSub: "Experience & achievements", target: "journey", color: "#ffc46e", icon: Map, reply: "" },
  { id: "frontier", n: "04", title: "The Frontier", sub: "Explore · Experiments · Learn", panelSub: "Current explorations", target: "focus", color: "#78e5bd", icon: Telescope, reply: "" },
  { id: "connection", n: "05", title: "The Connection Hub", sub: "Contact · Collaborate · Opportunities", panelSub: "Let's collaborate", target: "contact", color: "#f58dc8", icon: Radio, reply: "" },
];

const metrics = [
  { value: "8+", label: "Individual Projects", icon: Layers3 },
  { value: "4+", label: "Production-Style Systems", icon: Boxes },
  { value: "20+", label: "Technologies Explored", icon: Code2 },
  { value: "SIH", label: "National Runner-up", icon: Trophy },
];

const exploring = [
  { label: "Agentic AI", cls: "xh-chip--violet" },
  { label: "System Design", cls: "xh-chip--cyan" },
  { label: "AI Infra", cls: "xh-chip--blue" },
];

function scrollToSection(id: string) {
  const target = destinations.find((d) => d.id === id)?.target ?? "skills";
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
}

export default function ExplorerHero() {
  return (
    <section id="home" className="xh-hero">
      <HeroBackdrop />

      <div className="xh-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="xh-copy"
        >
          <div className="xh-badge"><i /> SHREYA.EXE · AN INTERACTIVE PORTFOLIO</div>
          <h1>
            I build systems
            <br />that move <em>ideas</em>
            <br />into reality.
          </h1>
          <p className="xh-sub">
            Exploring agentic AI, backend engineering, and the infrastructure behind intelligent software.
          </p>
          <div className="xh-cta">
            <button type="button" className="xh-btn xh-btn--primary" onClick={() => scrollToSection("buildlab")}>
              <Play size={18} fill="currentColor" /> Explore the World <ArrowRight size={18} />
            </button>
            <a href={portfolioData.personal.resume} className="xh-btn xh-btn--ghost">
              <FileText size={19} /> View Resume
            </a>
          </div>
          <div className="xh-exploring">
            <p>CURRENTLY EXPLORING</p>
            <div>
              {exploring.map((c) => (
                <span key={c.label} className={`xh-chip ${c.cls}`}>{c.label}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="xh-stage"
        >
          <HeroWorld destinations={destinations} onNavigate={scrollToSection} />
        </motion.div>

        <div className="xh-nova-slot">
          <NovaAssistant destinations={destinations} onNavigate={scrollToSection} listenForOpen />
        </div>

        <div className="xh-stats">
          <button type="button" className="xh-scroll" onClick={() => scrollToSection("buildlab")}>
            <Mouse size={34} strokeWidth={1.3} /> <span>SCROLL TO EXPLORE</span>
          </button>
          <div className="xh-stats-bar">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label}>
                  <Icon size={30} strokeWidth={1.5} />
                  <p><b>{m.value}</b><span>{m.label}</span></p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
