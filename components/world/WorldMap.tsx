"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ISLAND_IDS, STOPS, stopById } from "@/lib/world/destinations";
import { useWorld } from "./WorldContext";

/** Map of the five islands and their routes. Choosing one runs the same camera journey as scrolling. */
export default function WorldMap({ open, onClose }: { open: boolean; onClose: () => void }) {
  const w = useWorld();
  const ref = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    ref.current?.querySelector<HTMLElement>("button[data-cur='true'], button[data-node]")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
      if (e.key === "Tab") { const f = ref.current?.querySelectorAll<HTMLElement>("button"); if (!f?.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
    };
    document.addEventListener("keydown", key, true);
    return () => { document.removeEventListener("keydown", key, true); (opener.current as HTMLElement | null)?.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  const pts = ISLAND_IDS.map((id) => { const p = stopById(id)!.pos; return { id, x: ((p.x + 200) / 400) * 100, y: ((p.y + 60) / 120) * 100 }; });
  return (
    <div className="wx-map-back" onClick={onClose}>
      <div ref={ref} className="wx-map" role="dialog" aria-modal="true" aria-label="World map" onClick={(e) => e.stopPropagation()}>
        <header><h2>World map</h2><button type="button" onClick={onClose} aria-label="Close map"><X size={18} aria-hidden="true" /></button></header>
        <div className="wx-map-canvas">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            {pts.slice(0, -1).map((p, i) => <path key={i} d={`M${p.x} ${p.y} C${p.x + 8} ${p.y - 8}, ${pts[i + 1].x - 8} ${pts[i + 1].y + 8}, ${pts[i + 1].x} ${pts[i + 1].y}`} />)}
          </svg>
          {pts.map((p) => { const s = stopById(p.id)!; return (
            <button key={p.id} type="button" data-node data-cur={w.current === p.id} className={w.current === p.id ? "is-on" : ""} style={{ left: `${p.x}%`, top: `${p.y}%`, ["--accent" as string]: s.color }} onClick={() => { onClose(); w.goTo(p.id); }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.island} alt="" width={96} height={86} loading="lazy" />
              <span><small>{String(s.chapter).padStart(2, "0")}</small>{s.title}</span>
            </button>
          ); })}
        </div>
        <button type="button" className="wx-map-home" onClick={() => { onClose(); w.goTo("intro"); }}>{STOPS[0].title}</button>
      </div>
    </div>
  );
}
