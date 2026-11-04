"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Sparkles } from "lucide-react";
import { useState } from "react";
import { portfolioData } from "@/lib/portfolio-data";

export default function ExplorerHero() {
  const [greetingOpen, setGreetingOpen] = useState(true);

  const explore = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="explorer-hero relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
      <div className="explorer-world" aria-hidden="true" />
      <div className="explorer-vignette" aria-hidden="true" />
      <div className="explorer-stars" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-6 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:px-12 lg:pt-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-slate-950/45 px-3.5 py-2 text-[11px] font-mono uppercase tracking-[.22em] text-cyan-100/80 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
              A digital field journal · 2026
            </div>
            <p className="mb-4 text-xs font-mono uppercase tracking-[.28em] text-violet-200/80">Software engineer · AI / backend systems</p>
            <h1 className="max-w-[760px] text-5xl font-semibold leading-[.98] tracking-[-.055em] text-white sm:text-6xl lg:text-[5.3rem]">
              I build systems
              <span className="mt-2 block bg-gradient-to-r from-violet-200 via-white to-cyan-200 bg-clip-text text-transparent">that move ideas</span>
              <span className="mt-2 block">into reality.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-200/80 sm:text-lg">
              I'm Shreya — exploring agentic AI, backend engineering, and the infrastructure behind intelligent software. I like taking complex ideas apart, understanding how they work, and building things that hold up in the real world.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={explore} className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_45px_rgba(135,120,255,.28)] transition hover:-translate-y-0.5 hover:bg-cyan-100">
                Explore my builds <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a href={portfolioData.personal.resume} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:border-cyan-200/50 hover:bg-white/10">
                Resume <Download size={15} />
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-2">
              {["Agentic AI", "Backend systems", "Developer infrastructure", "Open source"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-slate-950/35 px-3 py-1.5 text-xs text-slate-200/80 backdrop-blur-sm">{item}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="relative mx-auto w-full max-w-[470px] lg:mr-0" initial={{ opacity: 0, x: 24, scale: .97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .9, delay: .2 }}>
          <div className="nova-orbit absolute left-1/2 top-[42%] h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/15" />
          <div className="nova-orbit nova-orbit--second absolute left-1/2 top-[42%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/20" />
          <div className="relative mx-auto h-[360px] w-full max-w-[420px] sm:h-[440px]">
            <img src="/images/nova-guide.svg" alt="Nova, Shreya's AI companion" className="nova-character absolute bottom-0 left-1/2 h-full max-w-full -translate-x-1/2 object-contain object-bottom drop-shadow-[0_18px_55px_rgba(93,210,255,.2)]" />
            <div className="absolute bottom-5 left-1/2 h-10 w-64 -translate-x-1/2 rounded-[50%] bg-cyan-300/20 blur-2xl" />
          </div>
          <div className="absolute right-0 top-5 rounded-xl border border-cyan-100/20 bg-slate-950/55 px-3 py-2 text-[10px] font-mono uppercase tracking-[.16em] text-cyan-100/80 backdrop-blur-lg">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" /> Nova · Online
          </div>
          {greetingOpen ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-3 left-0 right-0 rounded-2xl border border-white/15 bg-[#0b1122]/85 p-4 shadow-2xl backdrop-blur-xl sm:-left-8 sm:right-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white"><Sparkles size={14} className="text-violet-300" /> NOVA <span className="font-normal text-slate-400">· Shreya's AI companion</span></div>
                <button aria-label="Minimize Nova greeting" onClick={() => setGreetingOpen(false)} className="rounded-md px-2 py-1 text-xs text-slate-400 hover:bg-white/10 hover:text-white">−</button>
              </div>
              <p className="text-sm leading-6 text-slate-200/90">Hey, Explorer. I'm Nova. Shreya builds intelligent systems, investigates how they work, and turns ambitious ideas into software. Want to see what she's been building?</p>
              <button onClick={explore} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200 transition hover:text-white">Let's explore <ArrowUpRight size={13}/></button>
            </motion.div>
          ) : (
            <button onClick={() => setGreetingOpen(true)} className="absolute bottom-0 right-0 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-4 py-2 text-xs text-white backdrop-blur-lg"><Sparkles size={13}/> Talk to Nova</button>
          )}
        </motion.div>
      </div>

      <button onClick={explore} className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-mono uppercase tracking-[.22em] text-white/60 transition hover:text-white sm:flex">
        Scroll to explore <ArrowDown size={13} className="animate-bounce"/>
      </button>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#090d18] to-transparent" />
    </section>
  );
}
