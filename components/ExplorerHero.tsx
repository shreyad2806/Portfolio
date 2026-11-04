"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, Compass, Download, FlaskConical, Map, RadioTower, Send, Sparkles, Telescope, Trophy, Layers3, Boxes, Code2 } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const destinations = [
  { id:"basecamp", n:"01", title:"The Basecamp", sub:"About · Skills · Philosophy", target:"journey", color:"#b49aff", icon:Compass, reply:"The Basecamp is where you get to know Shreya: her background, engineering mindset and technical foundations." },
  { id:"buildlab", n:"02", title:"The Build Lab", sub:"Projects · Systems · Demos", target:"projects", color:"#66e9f4", icon:FlaskConical, reply:"Start with CloseLoop and Kavach to see how Shreya approaches reliability, security and agentic workflows." },
  { id:"journey", n:"03", title:"The Journey", sub:"Experience · Hackathons · Impact", target:"journey", color:"#ffc46e", icon:Map, reply:"The Journey covers Shreya's internships, hackathons and the milestones along the way." },
  { id:"frontier", n:"04", title:"The Frontier", sub:"Explore · Experiments · Learn", target:"focus", color:"#78e5bd", icon:Telescope, reply:"The Frontier is the lab notebook: agentic systems, developer infrastructure, observability and what Shreya is exploring next." },
  { id:"connection", n:"05", title:"The Connection Hub", sub:"Contact · Collaborate · Opportunities", target:"contact", color:"#f58dc8", icon:RadioTower, reply:"The Connection Hub is the fastest route to Shreya's email, GitHub and LinkedIn." },
];



export default function ExplorerHero() {
  const [selected, setSelected] = useState("buildlab");
  const [draft, setDraft] = useState("");
  const [reply, setReply] = useState("Hey Explorer! 👋 I'm Nova, Shreya's AI companion. I can guide you through her work, projects, experience and what she's exploring next.");

  const goTo = (id: string) => {
    const destination = destinations.find((item) => item.id === id);
    if (!destination) return;
    setSelected(id);
    setReply(destination.reply);
    if (id === "buildlab") document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" });
    else if (id === "journey") document.getElementById("journey")?.scrollIntoView({ behavior:"smooth" });
    else if (id === "frontier") document.getElementById("focus")?.scrollIntoView({ behavior:"smooth" });
    else if (id === "connection") document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" });
    else document.getElementById("skills")?.scrollIntoView({ behavior:"smooth" });
  };

  const askNova = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = draft.trim().toLowerCase();
    if (!q) return;
    const match = /project|build|code|closeloop|kavach|visionguard/.test(q) ? "buildlab"
      : /experience|intern|hackathon|journey|work(ed)? at/.test(q) ? "journey"
      : /learn|explor|frontier|agent|research|now|current/.test(q) ? "frontier"
      : /contact|email|linkedin|github|connect|hire/.test(q) ? "connection"
      : /about|who|profile|skill|background|shreya/.test(q) ? "basecamp" : null;
    if (match) {
      const item = destinations.find((d) => d.id === match)!;
      setSelected(match);
      setReply(item.reply);
    } else {
      setReply("I can help you explore Shreya's profile, projects, experience, current interests or contact details. Try asking about one of those, or choose a destination.");
    }
    setDraft("");
  };

  const metrics = [
    { value:"8+", label:"Individual Projects", icon:Layers3 },
    { value:"4+", label:"Production-Style Systems", icon:Boxes },
    { value:"20+", label:"Technologies Explored", icon:Code2 },
    { value:"SIH", label:"National Runner-up", icon:Trophy },
  ];

  return (
    <section id="home" className="explorer-hero relative isolate overflow-hidden">
      <div className="explorer-hero-scene" aria-hidden="true">
        
        <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 1440 850" preserveAspectRatio="none">
          <defs><linearGradient id="sky-route" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a78bfa"/><stop offset=".5" stopColor="#67e8f9"/><stop offset="1" stopColor="#f58dc8"/></linearGradient></defs>
          <path d="M460 470 C650 220 780 650 930 390 S1170 240 1290 510" fill="none" stroke="url(#sky-route)" strokeWidth="2" strokeDasharray="7 12" opacity=".6"/>
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1720px] items-center gap-7 px-5 pb-12 pt-24 sm:px-8 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(285px,.88fr)_minmax(410px,1.42fr)_minmax(320px,.9fr)] lg:gap-5 lg:px-8 lg:pb-10 lg:pt-10 xl:gap-7 xl:px-10">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="relative z-10 max-w-xl lg:py-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-slate-950/45 px-3.5 py-2 text-[10px] font-mono uppercase tracking-[.2em] text-cyan-100/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300"/> SHREYA.EXE · AN INTERACTIVE PORTFOLIO
          </div>
          <p className="mb-4 text-[10px] font-mono uppercase tracking-[.25em] text-violet-200/80">SOFTWARE ENGINEER · AI / BACKEND SYSTEMS</p>
          <h1 className="max-w-[680px] text-[clamp(2.65rem,3.65vw,4.35rem)] font-semibold leading-[1.02] tracking-[-.058em] text-white">
            <span className="block whitespace-normal lg:whitespace-nowrap">I build systems</span>
            <span className="block whitespace-normal lg:whitespace-nowrap bg-gradient-to-r from-violet-200 via-white to-cyan-200 bg-clip-text text-transparent">that move ideas</span>
            <span className="block">into reality.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-slate-200/75 sm:text-base">Exploring agentic AI, backend engineering, and the infrastructure behind intelligent software.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => goTo("buildlab")} className="inline-flex items-center gap-3 rounded-full border border-violet-200/40 bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(135,120,255,.32)] transition hover:-translate-y-0.5 hover:brightness-110"><Sparkles size={15}/> Explore the World <ArrowRight size={15}/></button>
            <a href={portfolioData.personal.resume} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:border-cyan-200/50 hover:bg-white/10">View Resume <Download size={15}/></a>
          </div>
          <div className="mt-8">
            <p className="mb-3 text-[9px] font-mono uppercase tracking-[.2em] text-slate-400">CURRENTLY EXPLORING</p>
            <div className="flex flex-wrap gap-2">{["Agentic AI","System Design","AI Infra"].map((x,i)=><span key={x} className={`rounded-full border px-3 py-1.5 text-[10px] ${i===0?"border-violet-300/40 text-violet-200":i===1?"border-cyan-200/40 text-cyan-100":"border-emerald-200/30 text-emerald-100"}`}>{x}</span>)}</div>
          </div>
        </motion.div>

        <div className="relative min-h-[390px] sm:min-h-[520px] lg:min-h-[690px]">
          <div className="hero-landscape" aria-hidden="true"><span className="hero-landscape-moon"/><span className="hero-landscape-mountain hero-landscape-mountain--back"/><span className="hero-landscape-mountain hero-landscape-mountain--front"/><span className="hero-landscape-cloud hero-landscape-cloud--one"/><span className="hero-landscape-cloud hero-landscape-cloud--two"/></div>
          <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-[90px]"/>
          <div className="hero-island-world hero-island-world--main" aria-label="Five floating destinations in Shreya's portfolio">
            {destinations.map((d) => (
              <button key={d.id} type="button" onClick={() => goTo(d.id)} className={`hero-island hero-island--${d.id} hero-island-button`} style={{"--island-color":d.color,"--island-glow":d.color} as React.CSSProperties} aria-label={`Explore ${d.title}`}>
                <span className="hero-island-rock"/><span className="hero-island-waterfall"/><span className="hero-island-top"/><span className="hero-island-structure"/><span className="hero-island-landscape"/>
                <span className="hero-island-label"><span>{d.n}</span>{d.title}</span>
              </button>
            ))}
          </div>
          <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[9px] font-mono uppercase tracking-[.18em] text-slate-400 lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]"/> FIVE DESTINATIONS · ONE WORLD</div>
        </div>

        <motion.aside initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{duration:.7,delay:.15}} className="hero-nova-panel mx-auto w-full max-w-[470px] p-4 sm:p-5 lg:my-auto">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5"><Sparkles className="text-violet-300" size={19}/><span className="text-lg font-semibold text-white">Nova</span><span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-1 text-[9px] text-emerald-200">Online</span></div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">World guide</span>
          </div>
          <div className="hero-nova-portrait relative flex min-h-[225px] items-center justify-between gap-2 overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_45%_75%,rgba(60,170,220,.2),transparent_60%)]">
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5"/>
            <motion.img src="/images/nova-guide.svg" alt="Nova, Shreya's AI companion" className="hero-nova-avatar h-[242px] w-[58%] object-contain object-bottom drop-shadow-[0_0_30px_rgba(90,170,255,.32)]" animate={{ y: [0, -8, 0], rotate: [0, 1.1, 0], scale: [1, 1.012, 1] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} />
            <div className="hero-nova-speech relative z-10 mr-1 max-w-[46%] rounded-2xl rounded-bl-sm border border-cyan-200/30 bg-slate-950/75 p-3 text-xs leading-5 text-slate-200 shadow-xl backdrop-blur-md">
              <span className="mb-1 block font-mono text-[8px] uppercase tracking-widest text-cyan-200">✦ Nova says</span>
              Hey Explorer! 👋 I&apos;m Nova, Shreya&apos;s AI companion. I can guide you through her work, projects, experience and what she&apos;s exploring next.
            </div>
          </div>
          <div className="mb-2 mt-2 text-sm font-medium text-white">Where would you like to go?</div>
          <div className="space-y-1.5">
            {destinations.map((d) => {
              const Icon = d.icon;
              return <button key={d.id} type="button" aria-pressed={selected===d.id} onClick={() => goTo(d.id)} className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${selected===d.id?"border-violet-300/35 bg-violet-300/10":"border-white/10 bg-white/[.025] hover:border-white/20 hover:bg-white/[.06]"}`}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{color:d.color,background:`${d.color}18`}}><Icon size={16}/></span>
                <span className="min-w-0 flex-1"><span className="block text-[11px] font-semibold text-slate-100">{d.title}</span><span className="block truncate text-[9px] text-slate-400">{d.sub}</span></span>
                <ArrowRight size={13} className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-white"/>
              </button>;
            })}
          </div>
          <AnimatePresence mode="wait"><motion.p key={reply} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mt-3 min-h-[38px] rounded-lg border border-white/5 bg-black/20 p-2.5 text-[10px] leading-4 text-slate-300">{reply}</motion.p></AnimatePresence>
          <form onSubmit={askNova} className="nova-input-row mt-3 max-w-none">
            <input value={draft} onChange={(event)=>setDraft(event.target.value)} placeholder="Ask Nova anything..." aria-label="Ask Nova anything"/>
            <button type="submit" aria-label="Send question to Nova" disabled={!draft.trim()}><Send size={14}/></button>
          </form>
        </motion.aside>

        <div className="hero-proof-strip col-span-full mx-auto mt-2 grid w-full max-w-5xl grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
          {metrics.map((m) => { const Icon=m.icon; return <div key={m.label} className="flex items-center justify-center gap-3 px-3 py-4 sm:py-5"><Icon size={20} className="shrink-0 text-violet-300"/><div><div className="text-xl font-bold tracking-tight text-white sm:text-2xl">{m.value}</div><div className="text-[9px] text-slate-300 sm:text-[10px]">{m.label}</div></div></div>; })}
        </div>
      </div>
      <button onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})} className="absolute bottom-2 left-6 z-10 hidden items-center gap-2 text-[9px] font-mono uppercase tracking-[.18em] text-slate-500 transition hover:text-white lg:flex"><ArrowDown size={13}/> Scroll to explore</button>
    </section>
  );
}
