"use client";
import { ChevronLeft, ChevronRight, Map as MapIcon, Rows3 } from "lucide-react";
import { STOPS, TOTAL, stopById } from "@/lib/world/destinations";
import { useWorld } from "./WorldContext";

/** Compact HUD: chapter + destination name, progress, prev/next, map, and a way out to the plain page. Fill is driven directly by the timeline. */
export default function WorldProgress({ onToggleSimple }: { onToggleSimple: () => void; simple: boolean }) {
  const w = useWorld();
  const s = stopById(w.current)!;
  return (
    <>
      <nav className="wx-dock" aria-label="World navigation" style={{ ["--accent" as string]: s.color }}>
        <button type="button" onClick={w.prev} disabled={w.current === "intro"} aria-label="Previous destination"><ChevronLeft size={18} aria-hidden="true" /></button>
        <div className="wx-dock-label">
          <span>{s.chapter ? `Chapter ${String(s.chapter).padStart(2, "0")} / 0${TOTAL}` : "Entrance"}</span>
          <b>{s.title}</b>
          <i className="wx-bar" aria-hidden="true"><i data-progress-fill /></i>
        </div>
        <button type="button" onClick={w.next} disabled={w.current === "connection"} aria-label="Next destination"><ChevronRight size={18} aria-hidden="true" /></button>
        <button type="button" onClick={w.openMap} className="wx-dock-map" aria-haspopup="dialog"><MapIcon size={16} aria-hidden="true" /><span>World map</span></button>
        <button type="button" onClick={onToggleSimple} className="wx-dock-simple" aria-label="Switch to a simple scrolling page"><Rows3 size={16} aria-hidden="true" /><span>Simple page</span></button>
      </nav>
      <ol className="wx-rail" aria-label="Destinations">
        {STOPS.map((d) => (
          <li key={d.id}><button type="button" onClick={() => w.goTo(d.id)} aria-label={d.title} aria-current={w.current === d.id ? "step" : undefined} className={w.current === d.id ? "is-on" : ""} style={{ ["--accent" as string]: d.color }}><i /><span>{d.title}</span></button></li>
        ))}
      </ol>
    </>
  );
}
