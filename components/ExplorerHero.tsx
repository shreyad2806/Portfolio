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
const destinations = [
  { id:"basecamp", n:"01", title:"The Basecamp", sub:"About · Skills · Philosophy", target:"journey", color:"#a78bfa", icon:Compass, reply:"The Basecamp is where you get to know Shreya: her background, engineering mindset and technical foundations." },
  { id:"buildlab", n:"02", title:"The Build Lab", sub:"Projects · Systems · Demos", target:"projects", color:"#67e8f9", icon:FlaskConical, reply:"Start with CloseLoop and Kavach to see how Shreya approaches reliability, security and agentic workflows." },
  { id:"journey", n:"03", title:"The Journey", sub:"Experience · Hackathons · Impact", target:"journey", color:"#f6c779", icon:Map, reply:"The Journey covers Shreya's internships, hackathons and the milestones along the way." },
  { id:"frontier", n:"04", title:"The Frontier", sub:"Explore · Experiments · Learn", target:"focus", color:"#8ee5c1", icon:Telescope, reply:"The Frontier is the lab notebook: agentic systems, developer infrastructure, observability and what Shreya is exploring next." },
  { id:"connection", n:"05", title:"The Connection Hub", sub:"Contact · Collaborate · Opportunities", target:"contact", color:"#ff9acb", icon:RadioTower, reply:"The Connection Hub is the fastest route to Shreya's email, GitHub and LinkedIn." },
];

export default function ExplorerHero() {
  const goTo = (id: string) => {
    const destination = destinations.find((item) => item.id === id);
    if (!destination) return;
    if (id === "buildlab") document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" });
    else if (id === "journey") document.getElementById("journey")?.scrollIntoView({ behavior:"smooth" });
    else if (id === "frontier") document.getElementById("focus")?.scrollIntoView({ behavior:"smooth" });
    else if (id === "connection") document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" });
    else document.getElementById("skills")?.scrollIntoView({ behavior:"smooth" });
  };

  const metrics = [
    { value:"8+", label:"Individual Projects", icon:Layers3 },
    { value:"4+", label:"Production-Style Systems", icon:Boxes },
    { value:"20+", label:"Technologies Explored", icon:Code2 },
    { value:"SIH", label:"National Runner-up", icon:Trophy },
  ];

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
    <section id="home" className="cinematic-hero relative isolate overflow-hidden min-h-screen bg-[#050914]">
      {/* Cinematic background with depth */}
      <div className="cinematic-bg" aria-hidden="true">
        <div className="cinematic-stars"/>
        <div className="cinematic-nebula"/>
        <div className="cinematic-clouds"/>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1920px] items-center gap-5 px-6 pb-8 pt-20 sm:px-8 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(320px,0.88fr)_minmax(520px,1.15fr)_minmax(380px,0.94fr)] lg:gap-6 lg:px-10 lg:pb-6 lg:pt-24 xl:gap-8 xl:px-12">
        {/* Left Hero Content - 25-27% */}
        <motion.div 
          initial={{opacity:0,x:-20}} 
          animate={{opacity:1,x:0}} 
          transition={{duration:0.8,delay:0.1}}
          className="relative z-10 max-w-lg flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-violet-400/25 bg-violet-950/40 px-4 py-2.5 text-[10px] font-mono uppercase tracking-[0.22em] text-violet-100/90 backdrop-blur-xl shadow-[0_0_25px_rgba(167,139,250,0.15)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300 shadow-[0_0_8px_#a78bfa]"/>
            SHREYA.EXE · AN INTERACTIVE PORTFOLIO
          </div>

          {/* Role */}
          <p className="mb-5 text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-200/80 leading-relaxed">
            SOFTWARE ENGINEER · AI / BACKEND SYSTEMS
          </p>

          {/* Main Headline */}
          <h1 className="max-w-[620px] text-[clamp(2.8rem,4vw,4.8rem)] font-bold leading-[1.05] tracking-[-0.06em] text-white mb-6">
            <span className="block">I build systems</span>
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-magenta-300 bg-clip-text text-transparent">that move ideas</span>
            <span className="block">into reality.</span>
          </h1>

          {/* Supporting text */}
          <p className="mt-6 max-w-md text-base leading-7 text-slate-300/85">
            Exploring agentic AI, backend engineering, and the infrastructure behind intelligent software.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3.5">
            <button 
              onClick={() => goTo("buildlab")} 
              className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(139,92,246,0.45)] hover:brightness-110"
            >
              <Sparkles size={16}/> Explore the World <ArrowRight size={16}/>
            </button>
            <a 
              href={portfolioData.personal.resume} 
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(103,232,249,0.15)]"
            >
              View Resume <Download size={16}/>
            </a>
          </div>

          {/* Currently Exploring */}
          <div className="mt-6">
            <p className="mb-3.5 text-[9px] font-mono uppercase tracking-[0.22em] text-slate-400">CURRENTLY EXPLORING</p>
            <div className="flex flex-wrap gap-2.5">
              {["Agentic AI", "System Design", "AI Infra"].map((x,i)=>
                <span 
                  key={x} 
                  className={`rounded-full border px-3.5 py-2 text-[10px] font-medium transition-all hover:scale-105 ${
                    i===0 
                      ? "border-violet-400/40 bg-violet-500/10 text-violet-200 shadow-[0_0_15px_rgba(167,139,250,0.2)]" 
                      : i===1 
                        ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-200 shadow-[0_0_15px_rgba(103,232,249,0.2)]" 
                        : "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                  }`}
                >
                  {x}
                </span>
              )}
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
          <NovaAssistant destinations={destinations} onNavigate={scrollToSection} />
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
        {/* Central Floating-Islands World - 43-46% */}
        <div className="floating-world-stage relative min-h-[400px] sm:min-h-[520px] lg:min-h-[600px] xl:min-h-[650px] overflow-visible">
          <div className="floating-world-container" aria-label="Five floating destinations in Shreya's portfolio">
            <div className="island-art-layer" aria-hidden="true">
              <img className="island-art-piece island-art--basecamp" src="/images/island-basecamp.svg" alt="" />
              <img className="island-art-piece island-art--buildlab" src="/images/island-buildlab.svg" alt="" />
              <img className="island-art-piece island-art--journey" src="/images/island-journey.svg" alt="" />
              <img className="island-art-piece island-art--frontier" src="/images/island-frontier.svg" alt="" />
              <img className="island-art-piece island-art--connection" src="/images/island-connection.svg" alt="" />
            </div>
            {destinations.map((d) => (
              <button 
                key={d.id} 
                type="button" 
                onClick={() => goTo(d.id)} 
                className={`floating-island floating-island--${d.id} floating-island-button`}
                style={{"--island-color":d.color,"--island-glow":d.color} as React.CSSProperties}
                aria-label={`Explore ${d.title}`}
              >
                <span className="island-rock"/>
                <span className="island-top"/>
                <span className="island-structure"/>
                <span className="island-label"><span>{d.n}</span>{d.title}</span>
              </button>
            ))}
          </div>
          {/* Luminous pathways connecting islands */}
          <svg className="luminous-pathways" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa"/>
                <stop offset="25%" stopColor="#67e8f9"/>
                <stop offset="50%" stopColor="#f6c779"/>
                <stop offset="75%" stopColor="#8ee5c1"/>
                <stop offset="100%" stopColor="#ff9acb"/>
              </linearGradient>
            </defs>
            <path d="M25 15 Q 35 35, 15 50 Q 35 65, 25 85 Q 55 70, 75 50 Q 55 30, 75 15" fill="none" stroke="url(#pathGradient)" strokeWidth="0.3" strokeDasharray="2 3" opacity="0.5"/>
          </svg>
        </div>

        {/* Right Nova Panel - 27-30% */}
        <NovaAssistant destinations={destinations} onNavigate={goTo} />

        {/* Bottom Statistics Strip */}
        <div className="statistics-strip col-span-full mx-auto mt-4 grid w-full max-w-6xl grid-cols-2 divide-x divide-white/10 lg:grid-cols-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.3)]">
          {metrics.map((m) => { 
            const Icon=m.icon; 
            return (
              <div key={m.label} className="flex items-center justify-center gap-3 px-4 py-5 sm:py-6 transition-all hover:bg-white/5">
                <Icon size={22} className="shrink-0 text-violet-300"/>
                <div>
                  <div className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{m.value}</div>
                  <div className="text-[10px] text-slate-300 sm:text-[11px] uppercase tracking-wide">{m.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})} 
        className="absolute bottom-6 left-10 z-10 hidden items-center gap-2.5 text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400 transition-all hover:text-white lg:flex"
      >
        <ArrowDown size={14}/> Scroll to explore
      </button>
    </section>
  );
}
