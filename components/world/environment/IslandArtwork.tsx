import type { CSSProperties } from "react";
import { ISLAND_SIZE, type WorldStop } from "@/lib/world/destinations";

/** One island: halo light + the existing artwork. Position/size use world units (CSS var --u); the idle bob is CSS-only. */
export default function IslandArtwork({ stop, eager = false, inline = false }: { stop: WorldStop; eager?: boolean; inline?: boolean }) {
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
      {!inline && <div data-label className="wx-island-label" aria-hidden="true"><span>0{stop.chapter}</span>{stop.title}</div>}
    </div>
  );
}
