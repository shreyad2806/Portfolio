import { ISLAND_IDS, stopById } from "@/lib/world/destinations";

/** Route geometry in world units. Segment k joins island k → k+1; the bright copy is drawn by the master timeline (pathLength = 1). */
export const ROUTE_BOX = { x: -250, y: -90, w: 500, h: 180 };
const pts = ISLAND_IDS.map((id) => stopById(id)!.pos);
const seg = (a: { x: number; y: number }, b: { x: number; y: number }) => `M${a.x} ${a.y} C${a.x + 46} ${a.y - 18}, ${b.x - 46} ${b.y + 18}, ${b.x} ${b.y}`;
export const SEGMENTS = pts.slice(0, -1).map((p, i) => seg(p, pts[i + 1]));

export default function TravelRoutes() {
  return (
    <svg className="wx-routes" viewBox={`${ROUTE_BOX.x} ${ROUTE_BOX.y} ${ROUTE_BOX.w} ${ROUTE_BOX.h}`} aria-hidden="true" focusable="false">
      <defs>
        <filter id="wx-route-glow" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="1.4" /></filter>
      </defs>
      <g data-layer="routes-base">
        {SEGMENTS.map((d, i) => <path key={i} d={d} className="wx-route-base" />)}
      </g>
      <g>
        {SEGMENTS.map((d, i) => (
          <g key={i}>
            <path data-route={i} d={d} pathLength={1} className="wx-route-glow" filter="url(#wx-route-glow)" style={{ stroke: stopById(ISLAND_IDS[i + 1])!.color }} />
            <path data-route-core={i} d={d} pathLength={1} className="wx-route-core" />
            <path id={`wx-seg-${i}`} d={d} fill="none" stroke="none" />
          </g>
        ))}
      </g>
      <circle data-probe r="2.1" className="wx-probe" cx={pts[0].x} cy={pts[0].y} />
    </svg>
  );
}
