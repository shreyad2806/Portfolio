"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Compass, FlaskConical, Map, RadioTower, Telescope, Send, X, RotateCcw } from "lucide-react";

type Destination = {
  id: string; number: string; name: string; short: string; description: string;
  target: string; color: string; x: number; y: number; cameraX: number; cameraY: number;
  structure: string; icon: typeof Compass;
  nova: string;
};

const destinations: Destination[] = [
  { id:"basecamp", number:"01", name:"The Basecamp", short:"IDENTITY", description:"Meet the engineer behind the builds. Background, principles and technical foundations.", target:"about", color:"#a78bfa", x:115, y:270, cameraX:310, cameraY:-95, structure:"basecamp", icon:Compass, nova:"The Basecamp is where you get to know Shreya: her background, engineering mindset and the tools she works with." },
  { id:"buildlab", number:"02", name:"The Build Lab", short:"PROJECTS", description:"Explore the systems, experiments and engineering decisions behind the work.", target:"projects", color:"#67e8f9", x:325, y:205, cameraX:95, cameraY:-10, structure:"buildlab", icon:FlaskConical, nova:"The Build Lab holds the projects. Start with CloseLoop and Kavach to see how Shreya approaches reliability, security and agentic workflows." },
  { id:"journey", number:"03", name:"The Journey", short:"EXPERIENCE", description:"Internships, hackathons, leadership and the milestones along the way.", target:"journey", color:"#f6c779", x:545, y:285, cameraX:-170, cameraY:-110, structure:"journey", icon:Map, nova:"The Journey covers Shreya's internships at StartupCrafters and LawGPT, plus hackathons and community leadership." },
  { id:"frontier", number:"04", name:"The Frontier", short:"EXPLORATION", description:"Agentic engineering, developer infrastructure, open source and ideas in progress.", target:"focus", color:"#8ee5c1", x:765, y:190, cameraX:-445, cameraY:0, structure:"frontier", icon:Telescope, nova:"The Frontier is the lab notebook: agentic systems, harnesses, infrastructure, observability and what Shreya is exploring next." },
  { id:"connection", number:"05", name:"The Connection Hub", short:"CONTACT", description:"Have a problem worth solving? Start a conversation or find Shreya elsewhere.", target:"contact", color:"#ff9acb", x:970, y:275, cameraX:-700, cameraY:-95, structure:"connection", icon:RadioTower, nova:"The Connection Hub is the fastest route to Shreya's email, GitHub and LinkedIn. I'd be happy to help you find the right link." },
];

const quickQuestions = [
  { label:"Show me her projects", text:"Take me to the Build Lab", id:"buildlab" },
  { label:"Where has she worked?", text:"Tell me about her experience", id:"journey" },
  { label:"What is she exploring?", text:"What is she learning now?", id:"frontier" },
];

export default function WorldCanvas() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const update = () => setCompact(window.innerWidth < 760);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const [novaOpen, setNovaOpen] = useState(true);
  const [draft, setDraft] = useState("");
  const [novaReply, setNovaReply] = useState("Hi, Explorer. I'm Nova. I can guide you around Shreya's world. Pick a destination or ask me where to go.");
  const selected = destinations.find((item) => item.id === selectedId) ?? null;

  const choose = (id: string) => {
    const destination = destinations.find((item) => item.id === id);
    if (!destination) return;
    setSelectedId(id);
    setNovaReply(destination.nova);
  };

  const enter = () => {
    if (!selected) return;
    document.getElementById(selected.target)?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  const askNova = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;
    const q = question.toLowerCase();
    const destination =
      /project|build|code|closeloop|kavach|visionguard/.test(q) ? destinations[1] :
      /experience|intern|hackathon|journey|work(ed)? at/.test(q) ? destinations[2] :
      /learn|explor|frontier|agent|research|now|current/.test(q) ? destinations[3] :
      /contact|email|linkedin|github|connect|hire/.test(q) ? destinations[4] :
      /about|who|profile|skill|background|shreya/.test(q) ? destinations[0] : null;
    if (destination) {
      setSelectedId(destination.id);
      setNovaReply(destination.nova);
    } else {
      setNovaReply("I can help you explore Shreya's profile, projects, experience, current interests or contact details. Try asking about one of those, or choose a destination on the map.");
    }
    setDraft("");
  };

  const camera = selected
    ? { x:selected.cameraX * (compact ? .48 : 1), y:selected.cameraY * (compact ? .48 : 1), scale:compact ? .78 : 1.22 }
    : { x:0, y:0, scale:compact ? .34 : 1 };
  const stars = useMemo(() => Array.from({length:48}, (_,i) => ({ left:(i*73)%100, top:(i*47)%100, delay:(i%9)*.35 })), []);

  return (
    <section id="world-atlas" className="world-explorer relative overflow-hidden">
      <div className="world-explorer-noise" aria-hidden="true"/>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[.26em] text-cyan-200/70">SHREYA.EXE · INTERACTIVE WORLD MAP</p>
            <h2 className="text-3xl font-semibold tracking-[-.045em] text-white sm:text-4xl">One world. Five places to explore.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">Travel between connected locations. Select a landmark to move the camera, meet Nova's guide notes, then enter that part of the portfolio.</p>
          </div>
          <button type="button" onClick={() => {setSelectedId(null);setNovaReply("Map reset. All five destinations are in view. Where would you like to go?");}} className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-4 py-2 text-xs text-slate-300 transition hover:border-cyan-200/30 hover:text-white"><RotateCcw size={13}/> Reset view</button>
        </div>

        <div className={`world-stage relative ${compact ? "world-stage--compact" : ""}`}>
          <div className="world-stage-stars" aria-hidden="true">
            {stars.map((star,i)=><i key={i} style={{left:star.left+"%",top:star.top+"%",animationDelay:star.delay+"s"}}/>)}
          </div>
          <motion.div className="world-camera" animate={camera} transition={{type:"spring",stiffness:58,damping:19,mass:1.05}}>
            <svg className="world-travel-route" viewBox="0 0 1100 500" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#a78bfa"/><stop offset=".26" stopColor="#67e8f9"/><stop offset=".52" stopColor="#f6c779"/><stop offset=".76" stopColor="#8ee5c1"/><stop offset="1" stopColor="#ff9acb"/></linearGradient></defs>
              <path d="M115 270 C180 130 245 140 325 205 S465 390 545 285 S680 80 765 190 S900 390 970 275" fill="none" stroke="url(#routeGradient)" strokeWidth="3" strokeDasharray="8 12" opacity=".52"/>
              <path d="M115 270 C180 130 245 140 325 205 S465 390 545 285 S680 80 765 190 S900 390 970 275" fill="none" stroke="#d8e6ff" strokeWidth="1" opacity=".2"/>
            </svg>
            {destinations.map((destination) => {
              const Icon = destination.icon;
              const active = selectedId === destination.id;
              return (
                <motion.div key={destination.id} className={`world-location world-location--${destination.structure}`} style={{left:destination.x,top:destination.y,"--landmark-color":destination.color} as React.CSSProperties} animate={{scale:active?1.12:1,opacity: selectedId && !active ? 0.58 : 1}} transition={{duration:.35}}>
                  <div className="world-island" aria-hidden="true">
                    <div className="island-shadow"/>
                    <div className="island-rock island-rock--back"/>
                    <div className="island-rock island-rock--front"/>
                    <div className="island-top"/>
                    <div className={`world-structure world-structure--${destination.structure}`}>
                      {destination.structure === "basecamp" && <><div className="basecamp-spire"/><div className="basecamp-dome"/><div className="basecamp-flag"/></>}
                      {destination.structure === "buildlab" && <><div className="lab-tower"/><div className="lab-core"/><div className="lab-ring lab-ring--one"/><div className="lab-ring lab-ring--two"/></>}
                      {destination.structure === "journey" && <><div className="journey-gate"/><div className="journey-pillar journey-pillar--left"/><div className="journey-pillar journey-pillar--right"/><div className="journey-path"/></>}
                      {destination.structure === "frontier" && <><div className="frontier-dish"/><div className="frontier-mast"/><div className="frontier-signal"/></>}
                      {destination.structure === "connection" && <><div className="hub-tower"/><div className="hub-beacon"/><div className="hub-wave hub-wave--one"/><div className="hub-wave hub-wave--two"/></>}
                    </div>
                    <div className="island-lights"/>
                  </div>
                  <button type="button" className={`world-location-pin ${active?"is-active":""}`} onClick={()=>choose(destination.id)} aria-label={`Travel to ${destination.name}`}>
                    <span className="world-pin-icon"><Icon size={17}/></span>
                    <span className="world-pin-label"><b>{destination.number}</b> {destination.name}</span>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
          <div className="world-stage-legend"><span className="world-live-dot"/> WORLD LINK ESTABLISHED <span>·</span> 5 DESTINATIONS</div>
          <AnimatePresence>
            {selected && (
              <motion.div key={selected.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} className="world-location-panel" style={{"--landmark-color":selected.color} as React.CSSProperties}>
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[9px] tracking-[.18em]" style={{color:selected.color}}>DESTINATION {selected.number} / 05</span><button onClick={()=>setSelectedId(null)} aria-label="Close destination details" className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"><X size={14}/></button></div>
                <h3 className="mt-2 text-lg font-semibold text-white">{selected.name}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">{selected.description}</p>
                <button onClick={enter} className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:brightness-110" style={{background:selected.color}}>Enter destination <ArrowUpRight size={14}/></button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-5">
          {destinations.map((destination)=>(
            <button key={destination.id} onClick={()=>choose(destination.id)} className={`world-destination-tab ${selectedId===destination.id?"is-active":""}`} style={{"--landmark-color":destination.color} as React.CSSProperties}>
              <span className="font-mono text-[9px] opacity-50">{destination.number}</span>
              <span>{destination.name}</span>
              <ArrowUpRight size={13} className="ml-auto opacity-40"/>
            </button>
          ))}
        </div>

        <div className="nova-console mt-8">
          <div className="nova-console-avatar"><img src="/images/nova-guide.svg" alt="Nova guide character"/></div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2"><span className="text-sm font-semibold text-white">Nova</span><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-0.5 font-mono text-[9px] text-emerald-200">GUIDE ONLINE</span><span className="font-mono text-[9px] uppercase tracking-wider text-slate-600">Portfolio navigation assistant</span></div>
            <p className="max-w-3xl text-xs leading-6 text-slate-300/90">{novaReply}</p>
            {novaOpen && <div className="mt-3 flex flex-wrap gap-2">{quickQuestions.map((item)=><button key={item.id} onClick={()=>{choose(item.id);setNovaReply(destinations.find(d=>d.id===item.id)?.nova ?? item.text);}} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-[10px] text-slate-300 transition hover:border-cyan-200/30 hover:text-white">{item.label}</button>)}</div>}
            <form onSubmit={askNova} className="nova-input-row mt-3">
              <input value={draft} onChange={(event)=>setDraft(event.target.value)} placeholder="Ask Nova where to go…" aria-label="Ask Nova where to go"/>
              <button type="submit" aria-label="Send question to Nova" disabled={!draft.trim()}><Send size={14}/></button>
            </form>
          </div>
          <button onClick={()=>setNovaOpen(!novaOpen)} className="nova-collapse" aria-label={novaOpen?"Collapse Nova suggestions":"Expand Nova suggestions"}>{novaOpen?"−":"+"}</button>
        </div>
        <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[.14em] text-slate-600">Nova uses a small local navigation guide in this version · No chat data is sent to a server</p>
      </div>
    </section>
  );
}
