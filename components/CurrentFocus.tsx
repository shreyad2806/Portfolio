"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Boxes, Database, Network, Server, ShieldCheck, Workflow, LucideIcon } from "lucide-react";

const pillars: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Database, title: "RAG & LLMs", text: "LangGraph, LangChain" },
  { icon: ShieldCheck, title: "Secure Systems", text: "Kavach, MCP" },
  { icon: Server, title: "Scalable Platforms", text: "FastAPI, AWS" },
];

export default function CurrentFocus() {
  return (
    <section id="focus" className="ar-section py-12 lg:py-16">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55 }} className="ar-scene card-surface">
          <div className="ar-copy">
            <p className="ar-eyebrow"><i /> 03 / THE ARCHITECTURE</p>
            <h2 className="ar-title">Engineering with<br />agentic systems</h2>
            <p className="ar-text">Building multi-agent workflows, intelligent systems and scalable infrastructure for real-world impact.</p>
            <Link href="/projects" className="ar-btn">Explore My Projects <ArrowRight size={16} /></Link>
          </div>

          <div className="ar-visual" aria-hidden="true">
            <span className="ar-glow" />
            <span className="ar-ring ar-ring--a" /><span className="ar-ring ar-ring--b" />
            <div className="ar-cube"><span>AI</span></div>
            <span className="ar-node ar-node--1"><ShieldCheck size={16} /></span>
            <span className="ar-node ar-node--2"><Database size={16} /></span>
            <span className="ar-node ar-node--3"><Network size={16} /></span>
            <span className="ar-node ar-node--4"><Workflow size={16} /></span>
            <span className="ar-node ar-node--5"><Boxes size={16} /></span>
          </div>

          <ul className="ar-pillars">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title}><span><Icon size={20} /></span><div><b>{title}</b><small>{text}</small></div></li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
