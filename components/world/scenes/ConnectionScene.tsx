"use client";
import { ArrowUpRight, FileText, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/world/content";
import { useWorld } from "../WorldContext";
import SceneHeader from "./SceneHeader";

export default function ConnectionScene({ mode }: { mode: "pinned" | "stacked" }) {
  const w = useWorld();
  const links = [
    { label: "Email", href: CONTACT.email, icon: Mail, ext: false },
    { label: "GitHub", href: CONTACT.github, icon: Github, ext: true },
    { label: "LinkedIn", href: CONTACT.linkedin, icon: Linkedin, ext: true },
    { label: "Resume", href: CONTACT.resume, icon: FileText, ext: true },
  ];
  void mode;
  return (
    <section aria-labelledby="wx-h-connection" className="wx-scene wx-connection">
      <SceneHeader id="connection" blurb="Have a system worth building? Software engineering, backend development, AI applications or open-source collaboration — let’s talk." />
      <ul className="wx-beacons">
        {links.map((l) => (
          <li key={l.label} data-reveal><a href={l.href} className="wx-beacon" {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}><l.icon size={20} aria-hidden="true" /><span>{l.label}</span><ArrowUpRight size={14} aria-hidden="true" /></a></li>
        ))}
      </ul>
      <div data-reveal className="wx-row">
        <button type="button" className="wx-btn wx-btn--primary" onClick={() => window.dispatchEvent(new CustomEvent("nova:ask", { detail: { question: "How can I collaborate with Shreya?" } }))}><MessageCircle size={15} aria-hidden="true" /> Ask Nova</button>
        <button type="button" className="wx-btn wx-btn--ghost" onClick={() => w.goTo("intro")}>Back to the entrance</button>
      </div>
    </section>
  );
}
