"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, ArrowUpRight, Radio } from "lucide-react";
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
    <section id="contact" className="relative py-20 lg:py-28">
      <div className="container-px mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="card-surface relative overflow-hidden px-6 py-14 text-center sm:px-12"
          style={{ borderColor: "rgba(245,141,200,.45)", boxShadow: "0 24px 70px rgba(2,0,20,.55), 0 0 60px rgba(245,141,200,.18)" }}
        >
          <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-[70%] rounded-full bg-[radial-gradient(ellipse,rgba(245,141,200,.28),transparent_70%)] blur-2xl" aria-hidden="true" />
          <div className="th-beacon" aria-hidden="true">
            <span className="th-beacon-ring" />
            <span className="th-beacon-ring" />
            <span className="th-beacon-ring" />
            <span className="th-beacon-core"><Radio size={20} /></span>
          </div>
          <p className="th-heading-index mb-4 justify-center" style={{ "--accent": "#f58dc8" } as React.CSSProperties}>
            <i /> 05 · The Connection Hub
          </p>
          <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-semibold tracking-[-.03em] text-white sm:text-5xl">
            Let&apos;s build something <span className="th-accent-text" style={{ "--accent": "#f58dc8" } as React.CSSProperties}>great</span>.
          </h2>
          <p className="mx-auto mb-9 max-w-xl leading-relaxed text-slate-300/85">
            Whether it&apos;s software engineering, backend development, AI applications, or open-source collaboration, I&apos;m always excited to connect with builders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className={i === 0 ? "btn-primary" : "btn-secondary"}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <link.icon size={16} />
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/projects" className="group inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-white">
              Browse all projects
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
