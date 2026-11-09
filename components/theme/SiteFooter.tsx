"use client";

import Link from "next/link";
import { ArrowUp, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "Email", href: portfolioData.contact.email, icon: Mail },
  { label: "LinkedIn", href: portfolioData.contact.linkedin, icon: Linkedin },
  { label: "GitHub", href: portfolioData.contact.github, icon: Github },
  { label: "Resume", href: portfolioData.contact.resume, icon: Download },
];

export default function SiteFooter() {
  return (
    <footer className="th-footer">
      <div className="container-px mx-auto grid max-w-[1400px] gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5 text-xl font-semibold text-white">
            <Sparkles size={22} className="text-violet-300 drop-shadow-[0_0_10px_rgba(167,139,250,.9)]" fill="currentColor" />
            Shreya Dubey
          </p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300/75">
            Software engineer building agentic AI, backend systems and the infrastructure behind intelligent software.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" /> Open to opportunities
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[.2em] text-slate-400">Explore</p>
          <ul className="space-y-2.5 text-sm text-slate-300">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[.2em] text-slate-400">Connect</p>
          <ul className="space-y-2.5 text-sm text-slate-300">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="inline-flex items-center gap-2" {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <s.icon size={15} className="text-violet-300" /> {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="th-hairline" />
      <div className="container-px mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 py-6 text-xs text-slate-400 sm:flex-row">
        <p>© {new Date().getFullYear()} Shreya Dubey · SHREYA.EXE</p>
        <p className="font-mono">Built with Next.js, Tailwind &amp; Framer Motion</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 rounded-full border border-violet-300/30 px-3.5 py-1.5 text-slate-200 transition hover:border-cyan-200/60 hover:text-white">
          Back to top <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
