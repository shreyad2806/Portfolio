import { PLACES, type DestinationId } from "@/components/theme/destinations";

/** The world's stops in travel order. `intro` is the entrance (timeline label 0). One registry: scroll, keys, map, hash and Nova all use it. */
export const WORLD_IDS = ["intro", "basecamp", "buildlab", "journey", "frontier", "connection"] as const;
export type WorldId = (typeof WORLD_IDS)[number];
export const ISLAND_IDS = WORLD_IDS.slice(1) as DestinationId[];

export interface WorldStop {
  id: WorldId;
  index: number;
  chapter: number; // 0 = entrance
  title: string;
  tagline: string;
  color: string;
  glow: string;
  island?: string;
  /** Island centre in world units (1 unit = --u). */
  pos: { x: number; y: number };
  /** Interior route that holds the full version of this destination. */
  route?: string;
  /** Short label for the camera tilt direction while arriving (degrees). */
  tilt: number;
}

const POS: Record<DestinationId, { x: number; y: number }> = {
  basecamp: { x: -156, y: 20 }, buildlab: { x: -78, y: -22 }, journey: { x: 0, y: 22 }, frontier: { x: 78, y: -20 }, connection: { x: 156, y: 20 },
};

export const STOPS: WorldStop[] = [
  { id: "intro", index: 0, chapter: 0, title: "The Entrance", tagline: "SHREYA.EXE", color: "#b49aff", glow: "180,154,255", pos: { x: 0, y: 0 }, tilt: 0 },
  ...ISLAND_IDS.map((id, i): WorldStop => {
    const p = PLACES[id];
    return { id, index: i + 1, chapter: i + 1, title: p.title, tagline: p.tagline, color: p.color, glow: p.glow, island: p.island, pos: POS[id], route: p.href === "/" ? undefined : p.href, tilt: i % 2 ? -2.2 : 2.2 };
  }),
];

export const stopById = (id: string): WorldStop | undefined => STOPS.find((s) => s.id === id);

/** Old homepage section ids (used by earlier links and Nova V1/V2 hrefs) → destination. */
const LEGACY: Record<string, WorldId> = { home: "intro", skills: "basecamp", projects: "buildlab", journey: "journey", focus: "frontier", contact: "connection" };

/** `#basecamp`, `basecamp`, `#skills` … → a valid WorldId or null. Anything else (including arbitrary model output) is rejected. */
export function resolveDestination(input: string | null | undefined): WorldId | null {
  if (!input) return null;
  const k = input.replace(/^#/, "").trim().toLowerCase();
  if ((WORLD_IDS as readonly string[]).includes(k)) return k as WorldId;
  return Object.prototype.hasOwnProperty.call(LEGACY, k) ? LEGACY[k] : null;
}

export const hashFor = (id: WorldId) => (id === "intro" ? "" : `#${id}`);

/* ---- camera poses -------------------------------------------------------------------------------------------------- */
export interface Viewport { w: number; h: number }
export const ISLAND_SIZE = 68; // world units (artwork width)
/** Pixels per world unit — must match the CSS `--u: min(1vw, 1.72svh)`. */
export const unit = (v: Viewport) => Math.min(v.w / 100, v.h / 58);
export const isNarrow = (v: Viewport) => v.w < 820 || v.h > v.w * 1.1;

export interface Pose { x: number; y: number; scale: number }
/** Camera centre (world units) + scale that frames a stop: wide → island left of centre, narrow → island in the upper part. */
export function poseFor(stop: WorldStop, v: Viewport): Pose {
  const narrow = isNarrow(v);
  if (stop.id === "intro") return narrow ? { x: 0, y: -44, scale: 0.42 } : { x: 0, y: -26, scale: Math.max(0.2, Math.min(0.3, (0.97 * v.w) / (unit(v) * 380))) };
  const scale = narrow ? 1.0 : 0.68;
  const f = narrow ? { x: 0.5, y: 0.25 } : { x: 0.27, y: 0.5 };
  const u = unit(v);
  const viewW = v.w / (u * scale), viewH = v.h / (u * scale);
  return { x: stop.pos.x - (f.x - 0.5) * viewW, y: stop.pos.y - (f.y - 0.5) * viewH, scale };
}

/** Timeline position (label time) of a stop. The master timeline has one unit per leg. */
export const timeOf = (id: WorldId) => stopById(id)!.index;
export const TOTAL = STOPS.length - 1;

/** Nearest stop for a progress value 0..1. */
export function nearestStop(progress: number): WorldStop {
  const t = Math.min(TOTAL, Math.max(0, progress * TOTAL));
  return STOPS[Math.round(t)];
}
