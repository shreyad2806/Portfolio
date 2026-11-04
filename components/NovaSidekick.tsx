"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Compass, FlaskConical, Map, RadioTower, Send, Sparkles, Telescope } from "lucide-react";

type Props = {
  reply: string;
  selectedId: string | null;
  onChoose: (id: string) => void;
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const guideStops = [
  { id: "basecamp", number: "01", name: "The Basecamp", hint: "Meet Shreya", icon: Compass, color: "#a78bfa" },
  { id: "buildlab", number: "02", name: "The Build Lab", hint: "Explore projects", icon: FlaskConical, color: "#67e8f9" },
  { id: "journey", number: "03", name: "The Journey", hint: "Experience & impact", icon: Map, color: "#f6c779" },
  { id: "frontier", number: "04", name: "The Frontier", hint: "What she explores", icon: Telescope, color: "#8ee5c1" },
  { id: "connection", number: "05", name: "Connection Hub", hint: "Start a conversation", icon: RadioTower, color: "#ff9acb" },
];

export default function NovaSidekick({ reply, selectedId, onChoose, draft, onDraftChange, onSubmit }: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="nova-sidekick" aria-label="Nova interactive guide">
      <div className="nova-sidekick-glow" aria-hidden="true" />
      <header className="nova-sidekick-header">
        <div className="flex items-center gap-2.5">
          <span className="nova-brand-mark"><Sparkles size={16}/></span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white">Nova</h3>
              <span className="nova-status"><i/> {selectedId ? "GUIDING" : "ONLINE"}</span>
            </div>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[.18em] text-slate-500">Your world guide</p>
          </div>
        </div>
        <button type="button" className="nova-collapse" onClick={() => setExpanded(!expanded)} aria-label={expanded ? "Collapse Nova controls" : "Expand Nova controls"}>
          <ChevronDown size={16} className={expanded ? "" : "rotate-180"}/>
        </button>
      </header>

      <div className="nova-portrait-stage">
        <div className="nova-halo nova-halo--outer" aria-hidden="true"/>
        <div className="nova-halo nova-halo--inner" aria-hidden="true"/>
        <div className="nova-pedestal" aria-hidden="true"><span/><span/><span/></div>
        <motion.div
          className="nova-avatar-motion"
          animate={{ y: [0, -7, 0], rotate: [-0.7, 0.7, -0.7] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src="/images/nova-guide.svg" alt="Nova, a holographic AI guide with violet hair and cyan-lit details"/>
          <span className="nova-eyelid nova-eyelid--left" aria-hidden="true"/>
          <span className="nova-eyelid nova-eyelid--right" aria-hidden="true"/>
          <span className="nova-avatar-glint" aria-hidden="true"/>
        </motion.div>
        <div className="nova-speech-bubble" aria-live="polite">
          <div className="mb-1 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[.14em] text-cyan-200/80"><span className="nova-speaking-bars"><i/><i/><i/></span> Nova says</div>
          <AnimatePresence mode="wait">
            <motion.p key={reply} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:.22}} className="text-[11px] leading-[1.55] text-slate-100/90">{reply}</motion.p>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} className="nova-sidekick-body">
            <p className="mb-2.5 text-[10px] font-medium text-slate-400">Where would you like to go?</p>
            <div className="grid gap-1.5">
              {guideStops.map((stop) => {
                const Icon = stop.icon;
                const active = selectedId === stop.id;
                return (
                  <button key={stop.id} type="button" onClick={() => onChoose(stop.id)} className={`nova-guide-stop ${active ? "is-active" : ""}`} style={{"--stop-color": stop.color} as React.CSSProperties}>
                    <span className="nova-guide-stop-icon"><Icon size={15}/></span>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="block text-[10px] font-semibold text-white">{stop.name}</span>
                      <span className="mt-0.5 block text-[9px] text-slate-500">{stop.hint}</span>
                    </span>
                    <span className="font-mono text-[8px] text-slate-600">{stop.number}</span>
                    <ArrowUpRight size={12} className="text-slate-500"/>
                  </button>
                );
              })}
            </div>
            <form onSubmit={onSubmit} className="nova-sidekick-input mt-3">
              <input value={draft} onChange={(event) => onDraftChange(event.target.value)} placeholder="Ask Nova anything…" aria-label="Ask Nova anything"/>
              <button type="submit" aria-label="Send question to Nova" disabled={!draft.trim()}><Send size={14}/></button>
            </form>
            <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-[.12em] text-slate-600">Local guide · No chat data sent to a server</p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
