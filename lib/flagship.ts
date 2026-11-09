import { BarChart3, Boxes, Landmark, LucideIcon, Scale, ShieldCheck, Sparkles } from "lucide-react";

export type FlagshipMeta = {
  tone: "green" | "violet" | "blue";
  subtitle: string;
  summary: string;
  thumb: string;
  alt: string;
  position: string;
  icon: LucideIcon;
  stat: { icon: LucideIcon; value: string; label: string };
};

/** Shared display metadata for the three flagship builds (home + /projects). */
export const FLAGSHIP: Record<string, FlagshipMeta> = {
  closeloop: {
    tone: "green", subtitle: "AI Financial Exception Resolution Platform",
    summary: "A production-grade system to reconcile payments, classify exceptions and automate resolutions.",
    thumb: "/images/home-projects/closeloop.webp", alt: "CloseLoop automated reconciliation workflow", position: "left top",
    icon: Landmark, stat: { icon: Boxes, value: "17+", label: "Workflow Nodes" },
  },
  kavach: {
    tone: "violet", subtitle: "Zero-Trust Runtime Security Platform",
    summary: "A multi-agent security system with isolated environments and runtime authorization.",
    thumb: "/images/home-projects/kavach.webp", alt: "Kavach runtime security simulator dashboard", position: "left top",
    icon: ShieldCheck, stat: { icon: Sparkles, value: "2-Agent", label: "Architecture" },
  },
  complytai: {
    tone: "blue", subtitle: "Financial Compliance & Risk Intelligence",
    summary: "Multi-agent AI system for compliance analysis, risk detection and automated reporting.",
    thumb: "/images/home-projects/complytai.webp", alt: "ComplyAI smart compliance platform", position: "left top",
    icon: Scale, stat: { icon: BarChart3, value: "5-Agent", label: "Workflow" },
  },
};

/** Slugs that have a /projects/[slug] case-study page (keys of projectDataMap). */
export const DETAIL_SLUGS = new Set(["talentlens", "ai-tech-stack-recommender", "lawgpt-crm", "complytai", "falcon-airlines", "devforge", "architectiq", "reflex-ninja", "kodexa"]);
