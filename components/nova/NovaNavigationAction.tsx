"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, FileText, Mail, MapPin } from "lucide-react";
import type { NavAction } from "@/lib/nova/types";

/** Executes a validated navigation action. Same-page anchors scroll smoothly; other routes use client-side routing. */
export default function NovaNavigationAction({ action, onNavigate }: { action: NavAction; onNavigate?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const Icon = action.type === "navigate" ? MapPin : action.href.startsWith("mailto:") ? Mail : action.href.endsWith(".pdf") ? FileText : ArrowUpRight;

  function go(e: React.MouseEvent) {
    if (action.type === "link" && (action.external || action.href.endsWith(".pdf") || action.href.startsWith("mailto:"))) return; // native behaviour
    e.preventDefault();
    onNavigate?.();
    const [path, hash] = action.href.split("#");
    if (hash && (path === "" || path === pathname)) {
      const el = document.getElementById(hash);
      if (el) { el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); return; }
    }
    router.push(action.href);
  }

  const external = action.type === "link" && (action.external || action.href.startsWith("http"));
  return (
    <a href={action.href} onClick={go} className="nv-action" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : action.href.endsWith(".pdf") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <Icon size={14} aria-hidden="true" /> {action.label}
    </a>
  );
}
