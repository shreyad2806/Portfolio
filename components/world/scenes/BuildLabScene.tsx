"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Landmark, MessageCircle, ScanEye, ShieldCheck, Waypoints, X, type LucideIcon } from "lucide-react";
import { FEATURED, OTHER_PROJECTS } from "@/lib/world/content";
import { useWorld } from "../WorldContext";
import SceneHeader from "./SceneHeader";

const ICONS: Record<string, LucideIcon> = { closeloop: Landmark, kavach: ShieldCheck, complytai: Waypoints, visionguard: ScanEye };

/** Four project “structures”. Selecting one opens its panel in place (purpose, stack, links); “Back to the lab” returns. */
export default function BuildLabScene({ mode }: { mode: "pinned" | "stacked" }) {
  const w = useWorld();
  const [sel, setSel] = useState<string | null>(null);
  void mode;
  useEffect(() => { if (w.openRequest?.kind === "project") { setSel(w.openRequest.id); w.consumeOpen(); } }, [w.openRequest]); // eslint-disable-line react-hooks/exhaustive-deps
  const p = FEATURED.find((x) => x.id === sel);
  return (
    <section aria-labelledby="wx-h-buildlab" className="wx-scene wx-buildlab">
      <SceneHeader id="buildlab" blurb="Production-style systems: reconciliation, runtime security, compliance intelligence and computer vision." />
      {!p ? (
        <>
          <ul className="wx-structures">
            {FEATURED.map((f) => { const Icon = ICONS[f.id]; return (
              <li key={f.id} data-reveal>
                <button type="button" className="wx-structure" onClick={() => setSel(f.id)} style={{ ["--accent" as string]: f.tone }} aria-label={`Open ${f.name}`}>
                  <span className="wx-structure-glyph" aria-hidden="true"><Icon size={26} strokeWidth={1.4} /></span>
                  <b>{f.name}</b><small>{f.subtitle}</small>
                </button>
              </li>
            ); })}
          </ul>
          <div data-reveal className="wx-row">
            <Link href="/projects" className="wx-link">All projects <ArrowRight size={15} aria-hidden="true" /></Link>
            <span className="wx-sep" aria-hidden="true" />
            <ul className="wx-inline" aria-label="More projects">
              {OTHER_PROJECTS.map((o) => <li key={o.id}><a href={o.href} {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{o.name}</a></li>)}
            </ul>
          </div>
        </>
      ) : (
        <article className="wx-project" style={{ ["--accent" as string]: p.tone }} aria-label={`${p.name} details`}>
          <button type="button" className="wx-back" onClick={() => setSel(null)} autoFocus><X size={15} aria-hidden="true" /> Back to the lab</button>
          <h3>{p.name}</h3>
          <p className="wx-project-sub">{p.subtitle}</p>
          <p className="wx-project-desc">{p.description}</p>
          <ul className="wx-chips" aria-label="Technology">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
          {p.stat && <p className="wx-project-stat"><b>{p.stat.value}</b> {p.stat.label}</p>}
          <div className="wx-row">
            {p.caseStudy && <Link href={p.caseStudy} className="wx-btn wx-btn--primary">Case study <ArrowRight size={15} aria-hidden="true" /></Link>}
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="wx-btn wx-btn--ghost">Repository <ArrowUpRight size={15} aria-hidden="true" /></a>
            <button type="button" className="wx-btn wx-btn--ghost" onClick={() => window.dispatchEvent(new CustomEvent("nova:ask", { detail: { question: `Explain the architecture of ${p.name}` } }))}><MessageCircle size={15} aria-hidden="true" /> Ask Nova about its architecture</button>
          </div>
        </article>
      )}
    </section>
  );
}
