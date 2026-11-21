import { describe, expect, it } from "vitest";
import { STOPS, TOTAL, WORLD_IDS, hashFor, nearestStop, poseFor, resolveDestination, timeOf, unit, isNarrow } from "@/lib/world/destinations";
import { worldTravelFromAction } from "@/lib/world/navigation";
import { classify } from "@/lib/nova/engine/intent";
import { parseChatRequest } from "@/lib/nova/engine/request";
import { navigateToSection, projectAction } from "@/lib/nova/tools/registry";

describe("world registry", () => {
  it("has the entrance + five islands in travel order, one timeline unit per leg", () => {
    expect(WORLD_IDS).toEqual(["intro", "basecamp", "buildlab", "journey", "frontier", "connection"]);
    expect(TOTAL).toBe(5);
    expect(STOPS.map((s) => timeOf(s.id))).toEqual([0, 1, 2, 3, 4, 5]);
  });
  it("resolves only registry ids, deep-link hashes and legacy section ids", () => {
    expect(resolveDestination("#journey")).toBe("journey");
    expect(resolveDestination("skills")).toBe("basecamp");
    expect(resolveDestination("#contact")).toBe("connection");
    expect(resolveDestination("#focus")).toBe("frontier");
    for (const bad of ["", null, undefined, "#__proto__", "javascript:alert(1)", "../projects", "buildlab; drop"]) expect(resolveDestination(bad as string)).toBeNull();
    expect(hashFor("intro")).toBe(""); expect(hashFor("buildlab")).toBe("#buildlab");
  });
  it("nearest stop follows progress", () => {
    expect(nearestStop(0).id).toBe("intro"); expect(nearestStop(0.2).id).toBe("basecamp"); expect(nearestStop(0.49).id).toBe("buildlab"); expect(nearestStop(1).id).toBe("connection");
  });
  it("camera poses frame each island responsively (island left on wide screens, upper on narrow)", () => {
    const wide = { w: 1440, h: 900 }, narrow = { w: 390, h: 844 };
    expect(isNarrow(wide)).toBe(false); expect(isNarrow(narrow)).toBe(true);
    for (const v of [wide, narrow]) {
      const u = unit(v);
      for (const s of STOPS.slice(1)) {
        const p = poseFor(s, v);
        // where does the island centre land on screen?
        const sx = v.w / 2 + (s.pos.x - p.x) * u * p.scale, sy = v.h / 2 + (s.pos.y - p.y) * u * p.scale;
        if (v === wide) { expect(sx).toBeCloseTo(v.w * 0.27, 0); expect(sy).toBeCloseTo(v.h / 2, 0); } else { expect(sx).toBeCloseTo(v.w / 2, 0); expect(sy).toBeCloseTo(v.h * 0.25, 0); }
      }
      expect(poseFor(STOPS[0], v).scale).toBeLessThan(poseFor(STOPS[1], v).scale);
    }
  });
});

describe("Nova → world navigation adapter", () => {
  const nav = (id: string) => navigateToSection(id)!;
  it("turns validated destination actions into world travel only on the home page", () => {
    expect(worldTravelFromAction(nav("buildlab"), "/")).toMatchObject({ destination: "buildlab", source: "nova" });
    expect(worldTravelFromAction(nav("connection"), "/")).toMatchObject({ destination: "connection" });
    expect(worldTravelFromAction(nav("buildlab"), "/projects")).toBeNull();
  });
  it("opens featured projects in the world; other links keep normal behaviour", () => {
    const kavach = projectAction("kavach")!;
    expect(worldTravelFromAction(kavach, "/")).toMatchObject({ destination: "buildlab", open: { kind: "project", id: "kavach" } });
    expect(worldTravelFromAction(projectAction("talentlens")!, "/")).toBeNull();
    expect(worldTravelFromAction({ type: "link", label: "x", href: "https://evil.example/projects/kavach" }, "/")).toBeNull();
    expect(worldTravelFromAction({ type: "navigate", id: "../../etc", label: "x", href: "/nowhere" }, "/")).toBeNull();
  });
});

describe("Nova island awareness", () => {
  it("resolves 'here' questions from the current destination", () => {
    const i = classify("What is this?", { destination: "buildlab" } as never) as { type: string; categories?: string[] };
    expect(i.type).toBe("question"); expect(i.categories).toEqual(["projects"]);
    expect((classify("What can I do here?", { destination: "journey" } as never) as { categories?: string[] }).categories).toEqual(["experience", "achievements"]);
  });
  it("ignores unknown destinations and never overrides an explicit project", () => {
    expect((classify("What is this?", {} as never) as { categories?: string[] }).categories).toBeUndefined();
    expect((classify("What is this island about Kavach?", { destination: "journey" } as never) as { project?: string }).project).toBe("kavach");
  });
  it("request parsing accepts only registry ids", () => {
    const ok = parseChatRequest({ message: "hi", history: [], state: { destination: "frontier" } }) as { state: { destination?: string } };
    expect(ok.state.destination).toBe("frontier");
    const bad = parseChatRequest({ message: "hi", history: [], state: { destination: "javascript:alert(1)" } }) as { state: { destination?: string } };
    expect(bad.state.destination).toBeUndefined();
  });
});
