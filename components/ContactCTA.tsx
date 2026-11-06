"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, ArrowUpRight, Radio, Sparkles } from "lucide-react";
import Link from "next/link";
import { portfolioData } from "@/lib/portfolio-data";

const LINKS = [
  { label: "Email", href: portfolioData.contact.email, icon: Mail },
  { label: "LinkedIn", href: portfolioData.contact.linkedin, icon: Linkedin },
  { label: "GitHub", href: portfolioData.contact.github, icon: Github },
  { label: "Resume", href: portfolioData.contact.resume, icon: FileText },
];

export default function ContactCTA() {
  return (
    <section id="contact" className="connection-world-section py-20 lg:py-28">
      <div className="connection-world-sky" aria-hidden="true"><span className="connection-moon"/><span className="connection-mountain connection-mountain--one"/><span className="connection-mountain connection-mountain--two"/><span className="connection-island"><i/><b/><em/></span><span className="connection-orbit"/></div>
      <div className="container-px mx-auto max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }} className="connection-hub-card text-center max-w-3xl mx-auto">
          <span className="connection-hub-icon"><Radio size={24}/></span>
          <p className="eyebrow mb-4">05 / The Connection Hub</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">Have a system worth building?</h2>
          <p className="text-muted max-w-xl mx-auto mb-8 leading-relaxed">Whether it&apos;s software engineering, backend development, AI applications, or open-source collaboration, I&apos;m always excited to connect with builders.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">{LINKS.map((link) => <a key={link.label} href={link.href} className="connection-link"><link.icon size={16}/>{link.label}<ArrowUpRight size={13}/></a>)}</div>
          <div className="connection-hub-foot"><span><i/> OPEN TO INTERESTING BUILDS</span><span><Sparkles size={13}/> LET&apos;S CONNECT</span></div>
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-all duration-200 group mt-6">Browse All Projects <ArrowUpRight size={14} className="transition group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>
        </motion.div>
      </div>
      <footer className="connection-footer mt-24 border-t">
        <div className="container-px mx-auto max-w-7xl py-8 flex flex-col sm:flex-row items-center justify-between gap-4"><p className="text-sm text-muted">© {new Date().getFullYear()} Shreya Dubey</p><p className="text-sm text-muted font-mono">Built with Next.js &amp; Tailwind · SHREYA.EXE</p></div>
      </footer>
    </section>
  );
}
