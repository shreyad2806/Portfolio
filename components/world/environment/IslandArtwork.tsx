"use client";
import { MousePointerClick } from "lucide-react";
import type { CSSProperties } from "react";
import { useWorld } from "../WorldContext";
import { ISLAND_SIZE, type WorldStop } from "@/lib/world/destinations";

/** One island: halo light + the existing artwork. Position/size use world units (CSS var --u); the idle bob is CSS-only. */
export default function IslandArtwork({ stop, eager = false, inline = false }: { stop: WorldStop; eager?: boolean; inline?: boolean }) {
  const w = useWorld();
  if (!stop.island) return null;
  const style = { "--ix": stop.pos.x, "--iy": stop.pos.y, "--iw": ISLAND_SIZE, "--accent": stop.color, "--glow": stop.glow, "--bd": `${(stop.index % 3) * -1.7}s` } as CSSProperties;
  return (
    <div data-island={stop.id} className={`wx-island${inline ? " wx-island--inline" : ""}`} style={style}>
      <div data-halo className="wx-halo" aria-hidden="true" />
      <div data-body className="wx-island-body">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={stop.island} alt={`Floating island: ${stop.title}`} width={560} height={500} loading={eager ? "eager" : "lazy"} decoding="async" fetchPriority={eager ? "high" : "low"} draggable={false} />
        <i className="wx-ring wx-ring--a" aria-hidden="true" /><i className="wx-ring wx-ring--b" aria-hidden="true" />
      </div>
      {!inline && stop.route && (
        <>
          <button type="button" className="wx-island-hit" aria-label={`${w.current === stop.id ? "Enter" : "Fly to"} ${stop.title}`} onClick={() => (w.current === stop.id ? w.enter(stop.id) : w.goTo(stop.id))} />
          <span data-label className="wx-enter-hint" aria-hidden="true"><MousePointerClick size={15} />Click me — enter the island</span>
        </>
      )}
      {!inline && <button type="button" data-label className="wx-island-label" aria-label={`Travel to ${stop.title}`} onClick={() => w.goTo(stop.id)}><span aria-hidden="true">0{stop.chapter}</span>{stop.title}</button>}
    </div>
  );
}
