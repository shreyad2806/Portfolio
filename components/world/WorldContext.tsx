"use client";
import { createContext, useContext } from "react";
import type { WorldId } from "@/lib/world/destinations";

export interface OpenRequest { kind: "project" | "experience"; id: string; nonce: number }
export interface WorldApi {
  mode: "pinned" | "stacked";
  current: WorldId;
  goTo(id: WorldId): void;
  next(): void;
  prev(): void;
  openMap(): void;
  /** Fly into an island and continue to its interior route (reduced motion: plain navigation). */
  enter(id: WorldId): void;
  /** Set by Nova/adapter travel; scenes consume it once they are active. */
  openRequest: OpenRequest | null;
  consumeOpen(): void;
}
const Ctx = createContext<WorldApi | null>(null);
export const WorldProvider = Ctx.Provider;
export function useWorld(): WorldApi {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWorld must be used inside <WorldExperience>");
  return v;
}
