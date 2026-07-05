"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText } from "lucide-react";

const LINKS = [
  { label: "Email", href: "mailto:hello@shreyadubey.dev", icon: Mail },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "GitHub", href: "#", icon: Github },
  { label: "Resume", href: "/resume.pdf", icon: FileText },
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
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8">
            Let&apos;s build intelligent AI products.
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} className="btn-secondary">
                <link.icon size={16} />
                {link.label}
              </a>
            ))}
          </div>
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
