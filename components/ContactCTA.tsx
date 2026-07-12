"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, ArrowUpRight } from "lucide-react";
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
    <section id="contact" className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            Let&apos;s Build Something Great.
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Whether it&apos;s software engineering, backend development, AI applications, or open-source collaboration, I&apos;m always excited to connect with builders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} className="btn-secondary">
                <link.icon size={16} />
                {link.label}
              </a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-all duration-200 group"
            >
              Browse All Projects
              <motion.span
                className="group-hover:translate-x-1 transition-transform duration-200"
              >
                <ArrowUpRight size={14} />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <footer className="mt-24 border-t border-border">
        <div className="container-px mx-auto max-w-7xl py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Shreya Dubey
          </p>
          <p className="text-sm text-muted font-mono">
            Built with Next.js &amp; Tailwind
          </p>
        </div>
      </footer>
    </section>
  );
}
