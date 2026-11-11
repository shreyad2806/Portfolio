import { describe, expect, it } from "vitest";
import { DESTINATIONS, PROJECTS, getContactInformation, getProjectInformation, getResumeLink, isSafeHref, navigateToSection, projectAction } from "@/lib/nova/tools/registry";
import { extractMarkers, stripUnsafe } from "@/lib/nova/engine/format";
import { parseChatRequest } from "@/lib/nova/engine/request";
import { RateLimiter } from "@/lib/nova/cache/rate-limit";
import { TTLCache } from "@/lib/nova/cache";
import { classify } from "@/lib/nova/engine/intent";

describe("navigation registry", () => {
  it("has the five whitelisted destinations", () => {
    expect(DESTINATIONS.map((d) => d.id).sort()).toEqual(["basecamp", "buildlab", "connection", "frontier", "journey"]);
    for (const d of DESTINATIONS) expect(d.href.startsWith("/")).toBe(true);
  });
  it("rejects unknown destinations and projects", () => {
    expect(navigateToSection("evil")).toBeNull(); expect(getProjectInformation("nope")).toBeNull(); expect(projectAction("nope")).toBeNull();
    expect(navigateToSection("buildlab")).toMatchObject({ type: "navigate", href: "/projects" });
  });
  it("every project action points inside the site or at github", () => { for (const p of PROJECTS) { const a = projectAction(p.id); if (a) expect(isSafeHref(a.href)).toBe(true); } });
  it("resume & contact", () => { expect(getResumeLink().href).toMatch(/\.pdf$/); expect(getContactInformation()).toBeTruthy(); });
  it("isSafeHref blocks javascript:, data:, protocol-relative and foreign hosts", () => {
    for (const h of ["javascript:alert(1)", "data:text/html,x", "//evil.com", "https://evil.com/x", "vbscript:x"]) expect(isSafeHref(h)).toBe(false);
    for (const h of ["/projects", "/#skills", "mailto:dubeyshreya2507@gmail.com"]) expect(isSafeHref(h)).toBe(true);
  });
  it("marker extraction only produces whitelisted actions", () => {
    const { clean, actions } = extractMarkers("See [[nav:buildlab]] and [[nav:evil]] and [[project:closeloop]] [[project:x]] [[resume]] [[url:https://evil.com]]");
    expect(actions.every((a) => isSafeHref(a.href))).toBe(true);
    expect(actions.some((a) => a.href.includes("evil"))).toBe(false);
    expect(clean).not.toContain("[[");
  });
  it("strips URLs and markdown links from model text", () => {
    const t = stripUnsafe("Visit https://evil.com or [click](javascript:alert(1)) and <script>x</script> www.evil.com");
    expect(t).not.toMatch(/evil\.com|javascript|<script/);
  });
  it("intent: navigation, resume, contact", () => {
    expect(classify("take me to her projects").type).toBe("navigate");
    expect(classify("show me the resume").type).toBe("resume");
    expect(classify("how can I contact her").type).toBe("contact");
  });
});

describe("request validation / limits", () => {
  it("rejects empty, oversized, non-object", () => {
    expect(parseChatRequest(null)).toHaveProperty("error"); expect(parseChatRequest({ message: "  " })).toHaveProperty("error");
    expect(parseChatRequest({ message: "x".repeat(601) })).toHaveProperty("error");
  });
  it("sanitises history, state and control characters", () => {
    const r = parseChatRequest({ message: "hi\u0000there", history: Array.from({ length: 20 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: "y".repeat(5000) })).concat([{ role: "system" as never, content: "x" }]), state: { project: "<script>" } });
    if ("error" in r) throw new Error(r.error);
    expect(r.message).toBe("hi there"); expect(r.history.length).toBeLessThanOrEqual(6); expect(r.history.every((m) => m.content.length <= 700 && m.role !== ("system" as never))).toBe(true);
    expect(r.state?.project).toBeUndefined();
  });
  it("rate limiter enforces per-minute and recovers", () => {
    let t = 0; const rl = new RateLimiter(3, 100, () => t);
    expect([1, 2, 3].every(() => rl.check("a").ok)).toBe(true);
    const blocked = rl.check("a"); expect(blocked.ok).toBe(false); expect(blocked.retryAfterSec).toBeGreaterThan(0);
    expect(rl.check("b").ok).toBe(true); t = 61_000; expect(rl.check("a").ok).toBe(true);
  });
  it("cache expires and evicts", () => {
    let t = 0; const c = new TTLCache<number>(2, 1000, () => t);
    c.set("a", 1); c.set("b", 2); c.set("c", 3); expect(c.get("a")).toBeUndefined(); expect(c.get("c")).toBe(3);
    t = 2000; expect(c.get("c")).toBeUndefined();
  });
});
