import type { NavAction } from "@/lib/nova/types";
import { resolveDestination, type WorldId } from "./destinations";
import { FEATURED_BY_GITHUB } from "./content";

/** Single event bus for world travel. Everything (nav buttons, map, keyboard, hash, Nova) goes through `travelTo`. */
export const WORLD_TRAVEL = "world:travel";
export const WORLD_ARRIVED = "world:arrived";
export interface TravelDetail { destination: WorldId; /** open a project/experience panel on arrival */ open?: { kind: "project" | "experience"; id: string }; source: "nova" | "ui" | "hash" }
export interface ArrivedDetail { destination: WorldId }

export function travelTo(detail: TravelDetail) { if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent<TravelDetail>(WORLD_TRAVEL, { detail })); }

const PROJECTS = new Set(["closeloop", "kavach", "complytai", "visionguard"]);

/**
 * Nova → world adapter. Takes an already server-validated NavAction and decides whether it should be a camera journey on the home page.
 * Returns the travel request, or null when the action should use normal routing/links. The model never produces these values directly:
 * the destination must resolve through the registry and the project through a fixed set.
 */
export function worldTravelFromAction(action: NavAction, pathname: string): TravelDetail | null {
  if (pathname !== "/") return null;
  if (action.type === "navigate") {
    const d = resolveDestination(action.id) ?? resolveDestination(action.href.split("#")[1]);
    return d ? { destination: d, source: "nova" } : null;
  }
  const m = action.href.match(/^\/projects\/([a-z0-9-]+)$/);
  const id = m && PROJECTS.has(m[1]) ? m[1] : FEATURED_BY_GITHUB[action.href.toLowerCase()];
  if (id) return { destination: "buildlab", open: { kind: "project", id }, source: "nova" };
  return null;
}

/** Context sent with Nova requests so answers can be island-aware. Only a registry id is ever sent. */
export function currentDestination(): WorldId | null {
  if (typeof document === "undefined") return null;
  return resolveDestination(document.documentElement.getAttribute("data-world-destination"));
}

/**
 * URL updates for world destinations. These deliberately bypass Next's patched history methods: the router would treat a hash-only
 * change as a navigation and scroll its segment into view, which fights the pinned ScrollTrigger. Next ignores popstate entries it
 * did not create, and the world's own popstate listener handles back/forward.
 */
export function setWorldHash(hash: string, mode: "push" | "replace") {
  if (typeof window === "undefined") return;
  const url = `${location.pathname}${location.search}${hash}`;
  if ((location.hash || "") === hash) return;
  const fn = mode === "push" ? History.prototype.pushState : History.prototype.replaceState;
  fn.call(history, null, "", url);
}
