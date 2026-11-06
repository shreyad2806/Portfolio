"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { portfolioData } from "@/lib/portfolio-data";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "World", href: "/#world-atlas" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080522]/80 backdrop-blur-md border-b border-violet-300/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-px mx-auto max-w-[1720px] flex items-center justify-between h-16">
        <a
          href="#home"
          className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-text"
        >
          <Sparkles size={26} className="text-violet-300 drop-shadow-[0_0_10px_rgba(167,139,250,.9)]" fill="currentColor" />
          Shreya Dubey
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] transition-colors relative ${
                pathname === link.href
                  ? "text-violet-200"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-lg shadow-primary/50"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button type="button" onClick={() => window.dispatchEvent(new Event("nova:open"))} className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-violet-950/70 px-4 py-2 text-sm font-medium text-violet-100 shadow-[0_0_18px_rgba(124,92,255,.18)] transition hover:border-cyan-200/80 hover:bg-violet-900/80" aria-label="Open Nova assistant">
            <Sparkles size={15} className="text-cyan-200" /> Nova
          </button>
          <a href={portfolioData.personal.resume} className="inline-flex items-center gap-2 rounded-full border border-violet-300/50 bg-[#0c0a3a]/70 px-5 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(124,92,255,.25)] transition hover:border-cyan-200/70">
            Resume <Download size={15} />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-text"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container-px mx-auto max-w-7xl flex flex-col py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? "text-primary font-medium"
                    : "text-muted hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button type="button" onClick={() => { setOpen(false); window.dispatchEvent(new Event("nova:open")); }} className="inline-flex items-center gap-2 text-sm text-violet-200"><Sparkles size={15}/> Ask Nova</button>
            <a href={portfolioData.personal.resume} className="btn-secondary text-sm w-fit">
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
