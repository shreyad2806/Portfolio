"use client";
import Image from "next/image";
import { ArrowRight, FileText, Play } from "lucide-react";
import { STOPS } from "@/lib/world/destinations";
import { RESUME } from "@/lib/world/content";
import { useWorld } from "../WorldContext";

export default function EntranceScene({ mode }: { mode: "pinned" | "stacked" }) {
  const w = useWorld();
  return (
    <div className="wx-intro" aria-labelledby="wx-h-intro">
      <p data-reveal className="wx-badge"><i /> SHREYA.EXE · AN INTERACTIVE WORLD</p>
      <h2 data-reveal id="wx-h-intro">I build systems that move <em>ideas</em> into reality.</h2>
      <p data-reveal className="wx-lede">Shreya Dubey — exploring agentic AI, backend engineering, and the infrastructure behind intelligent software.</p>
      <div data-reveal className="wx-cta">
        <button type="button" className="wx-btn wx-btn--primary" onClick={() => w.goTo("basecamp")}><Play size={16} fill="currentColor" aria-hidden="true" /> Begin the journey <ArrowRight size={16} aria-hidden="true" /></button>
        <a className="wx-btn wx-btn--ghost" href={RESUME} target="_blank" rel="noopener noreferrer"><FileText size={16} aria-hidden="true" /> View resume</a>
      </div>
      <aside data-reveal className="wx-nova" aria-label="Nova, Shreya's AI companion">
        <Image src="/images/nova-3d.webp" alt="" width={72} height={72} className="wx-nova-avatar" priority />
        <div>
          <p><b>Hey, Explorer! 👋</b> I&apos;m Nova, Shreya&apos;s AI companion. She&apos;s currently building agentic systems, exploring AI infrastructure, and figuring out how to make software do more than just work.</p>
          <p className="wx-nova-q">Want to explore what she&apos;s building?</p>
          <div className="wx-nova-actions">
            <button type="button" onClick={() => w.goTo("buildlab")}>Show me her projects</button>
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("nova:ask", { detail: { question: "What is Shreya currently building?" } }))}>Ask Nova</button>
          </div>
        </div>
      </aside>
      {mode === "pinned" && (
        <>
          <ul data-reveal className="wx-dests" aria-label="Destinations">
            {STOPS.slice(1).map((s) => <li key={s.id}><button type="button" onClick={() => w.goTo(s.id)} style={{ ["--accent" as string]: s.color }}><i />{s.title}</button></li>)}
          </ul>
          <p className="wx-scrollhint" aria-hidden="true"><span className="wx-mouse"><i /></span> Scroll to travel</p>
        </>
      )}
    </div>
  );
}
