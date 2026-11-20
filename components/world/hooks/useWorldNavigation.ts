"use client";
import { useEffect, useRef } from "react";
import { WORLD_IDS, resolveDestination, type WorldId } from "@/lib/world/destinations";
import { WORLD_TRAVEL, setWorldHash, type TravelDetail } from "@/lib/world/navigation";

export interface Controller { goTo(id: WorldId, o?: { instant?: boolean }): void; /** true while a scripted camera journey is running */ busy(): boolean }

/**
 * The one place that turns external inputs into travel: Nova/adapter events, URL hash (back/forward/deep link) and scoped keys.
 * It only ever calls the controller; scroll position (ScrollTrigger) stays the single source of truth.
 */
export function useWorldNavigation(ctl: React.MutableRefObject<Controller>, current: WorldId, onOpen: (d: TravelDetail["open"]) => void, enabled: boolean) {
  const cur = useRef(current); cur.current = current;
  useEffect(() => {
    if (!enabled) return;
    const push = (id: WorldId) => setWorldHash(id === "intro" ? "" : `#${id}`, "push");
    const onTravel = (e: Event) => {
      const d = (e as CustomEvent<TravelDetail>).detail;
      const id = resolveDestination(d?.destination); if (!id) return;
      if (d.open) onOpen(d.open);
      push(id); ctl.current.goTo(id);
    };
    const onHash = () => { const id = resolveDestination(location.hash) ?? "intro"; if (id !== cur.current) ctl.current.goTo(id); };
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.closest("input,textarea,select,[contenteditable],[role=dialog],.nv-root"))) return;
      if (ctl.current.busy()) return;
      const i = WORLD_IDS.indexOf(cur.current);
      // Arrow Left/Right and [ ] hop between destinations; native scroll keys (↑ ↓ PgUp PgDn Space) keep working and snap.
      if (e.key === "ArrowRight" || e.key === "]") { if (i < WORLD_IDS.length - 1) { e.preventDefault(); const n = WORLD_IDS[i + 1]; push(n); ctl.current.goTo(n); } }
      else if (e.key === "ArrowLeft" || e.key === "[") { if (i > 0) { e.preventDefault(); const n = WORLD_IDS[i - 1]; push(n); ctl.current.goTo(n); } }
    };
    // Client-side arrival (e.g. "Return to the world" from an interior page): the URL hash can land after the timeline is built, so re-check briefly.
    let tries = 0; const settle = setInterval(() => {
      const id = resolveDestination(location.hash);
      if (++tries > 12 || (id && id === cur.current) || (!id && tries > 3)) { clearInterval(settle); return; }
      if (id && id !== "intro") { ctl.current.goTo(id, { instant: true }); }
    }, 120);
    window.addEventListener(WORLD_TRAVEL, onTravel);
    window.addEventListener("popstate", onHash);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    return () => { clearInterval(settle); window.removeEventListener(WORLD_TRAVEL, onTravel); window.removeEventListener("popstate", onHash); window.removeEventListener("hashchange", onHash); window.removeEventListener("keydown", onKey); };
  }, [ctl, enabled, onOpen]);
}
