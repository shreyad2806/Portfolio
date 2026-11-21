import type { ReactNode } from "react";
import { stopById, type WorldId } from "@/lib/world/destinations";

/** Shared header for every island panel: chapter number, title, blurb. Accent colour comes from the destination. */
export default function SceneHeader({ id, blurb, children }: { id: WorldId; blurb: ReactNode; children?: ReactNode }) {
  const s = stopById(id)!;
  return (
    <header className="wx-head" style={{ ["--accent" as string]: s.color }}>
      <p data-reveal className="wx-kicker"><span>{String(s.chapter).padStart(2, "0")}</span> / {s.tagline}</p>
      <h2 data-reveal id={`wx-h-${id}`} className="wx-title">{s.title}</h2>
      <p data-reveal className="wx-blurb">{blurb}</p>
      {children}
    </header>
  );
}
