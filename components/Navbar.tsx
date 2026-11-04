"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Star } from "lucide-react";
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
          ? "bg-[#050914]/85 backdrop-blur-xl border-b border-violet-500/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-px mx-auto max-w-7xl flex items-center justify-between h-16">
        <a
          href="#home"
          className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-white hover:text-violet-200 transition-colors"
        >
          <Star size={16} className="text-violet-400 fill-violet-400/20" />
          Shreya Dubey
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors relative ${
                pathname === link.href
                  ? "text-violet-300 font-medium"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.6)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <a 
            href={portfolioData.personal.resume} 
            className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 hover:bg-violet-500/20 hover:border-violet-400/50 transition-all hover:shadow-[0_0_20px_rgba(167,139,250,0.25)]"
          >
            Resume
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-violet-500/20 bg-[#050914]/95 backdrop-blur-xl">
          <div className="container-px mx-auto max-w-7xl flex flex-col py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? "text-violet-300 font-medium"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a 
              href={portfolioData.personal.resume} 
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 w-fit"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
