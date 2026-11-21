"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JOURNEY_GROUPS } from "@/lib/world/content";
import { useWorld } from "../WorldContext";
import SceneHeader from "./SceneHeader";

/** A timeline bridge: markers are real buttons grouped by kind. Details come from data/experience.ts (single source of truth). */
export default function JourneyScene({ mode }: { mode: "pinned" | "stacked" }) {
  const w = useWorld();
  const all = JOURNEY_GROUPS.flatMap((g) => g.items.map((i) => ({ ...i, tone: g.tone, group: g.label })));
  const [id, setId] = useState(all[0].id);
  useEffect(() => { if (w.openRequest?.kind === "experience" && all.some((a) => a.id === w.openRequest!.id)) { setId(w.openRequest.id); w.consumeOpen(); } }, [w.openRequest]); // eslint-disable-line react-hooks/exhaustive-deps
  void mode;
  const cur = all.find((a) => a.id === id)!;
  return (
    <section aria-labelledby="wx-h-journey" className="wx-scene wx-journey">
      <SceneHeader id="journey" blurb="Internships, hackathons, leadership and community — the road so far." />
      <div data-reveal className="wx-bridge" role="group" aria-label="Timeline">
        <span className="wx-bridge-rail" aria-hidden="true" />
        {JOURNEY_GROUPS.map((g) => (
          <div key={g.label} className="wx-bridge-group" style={{ ["--accent" as string]: g.tone }}>
            <p>{g.label}</p>
            <ul>
              {g.items.map((it) => (
                <li key={it.id}><button type="button" aria-pressed={id === it.id} onClick={() => setId(it.id)} className="wx-marker"><i aria-hidden="true" /><span>{it.subtitle}</span><small>{it.title}</small></button></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <article data-reveal className="wx-event" aria-live="polite" style={{ ["--accent" as string]: cur.tone }}>
        <p className="wx-event-meta">{cur.group} · {cur.year}{cur.status ? <span className="wx-live"><i /> {cur.status}</span> : null}</p>
        <h3>{cur.title} <span>· {cur.subtitle}</span></h3>
        <p>{cur.description}</p>
        {cur.focusAreas && <ul className="wx-chips" aria-label="Focus areas">{cur.focusAreas.map((f) => <li key={f}>{f}</li>)}</ul>}
        <Link href="/experience" className="wx-link" onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); w.enter("journey"); }}>Full journey <ArrowRight size={15} aria-hidden="true" /></Link>
      </article>
    </section>
  );
}
