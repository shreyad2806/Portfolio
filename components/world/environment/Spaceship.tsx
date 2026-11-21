import { STOPS } from "@/lib/world/destinations";
import ShipArt from "./ShipArt";

export const WARP_STREAKS = 18;

/** The ship, warp streaks, cockpit frame and "en route" read-out. Purely decorative (aria-hidden); the master timeline fades it in mid-flight only. */
export default function Spaceship() {
  return (
    <div className="wx-flight" aria-hidden="true">
      <div className="wx-cockpit"><i /><i /><i /><i /></div>
      <div className="wx-tunnel" />
      <div className="wx-warp">
        {Array.from({ length: WARP_STREAKS }, (_, i) => (
          <i key={i} data-streak style={{ top: `${(i * 37 + 11) % 92 + 4}%`, left: `${(i * 53) % 70}%`, width: `${10 + ((i * 7) % 16)}%` }} />
        ))}
      </div>
      <div className="wx-ship" data-ship>
        <span className="wx-sparks">{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ ["--d" as string]: `${i * 0.13}s`, ["--y" as string]: `${(i % 4) * 9 - 14}px` }} />)}</span>
        <ShipArt uid="fl" />
      </div>
      <div className="wx-enroute">
        {STOPS.slice(1).map((s) => <span key={s.id} data-leg={s.index} style={{ ["--accent" as string]: s.color }}>En route <b>→ {s.title}</b><u><em /></u></span>)}
      </div>
    </div>
  );
}
