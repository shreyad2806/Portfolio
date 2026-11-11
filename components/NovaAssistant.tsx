"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Minus, Send, Sparkles, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NovaDestination {
  id: string;
  n: string;
  title: string;
  sub: string;
  panelSub: string;
  target: string;
  color: string;
  icon: LucideIcon;
  reply: string;
}

type Props = { destinations: NovaDestination[]; onNavigate: (id: string) => void };
type View = "open" | "minimized" | "closed";

export default function NovaAssistant({ destinations, onNavigate }: Props) {
  // Hero intro card. Conversation itself lives in the global Nova widget (components/nova); this card only hands questions over.
  const [view, setView] = useState<View>("open");
  const [draft, setDraft] = useState("");
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 16 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 16 });
  const shiftX = useSpring(useTransform(px, [-0.5, 0.5], [-4, 4]), { stiffness: 140, damping: 16 });

  function tilt(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function untilt() {
    px.set(0);
    py.set(0);
  }

  function ask(value: string) {
    const question = value.trim();
    if (!question) return;
    window.dispatchEvent(new CustomEvent("nova:ask", { detail: { question } }));
    setDraft("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(draft);
  }

  if (view === "closed") return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="xh-nova"
      aria-label="Nova, Shreya's AI companion"
    >
      <header className="xh-nova-head">
        <Sparkles size={22} className="xh-nova-spark" />
        <h2>Nova</h2>
        <span className="xh-nova-online"><i />Online</span>
        <div className="xh-nova-ctrl">
          <button type="button" aria-label={view === "open" ? "Minimize Nova" : "Expand Nova"} onClick={() => setView(view === "open" ? "minimized" : "open")}>
            <Minus size={14} />
          </button>
          <button type="button" aria-label="Close Nova" onClick={() => setView("closed")}>
            <X size={14} />
          </button>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {view === "open" && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="xh-nova-body"
          >
            <div className="xh-nova-stage" onPointerMove={tilt} onPointerLeave={untilt}>
              <div className="xh-nova-halo" aria-hidden="true" />
              <motion.div className="xh-nova-rig" style={{ rotateX, rotateY, x: shiftX }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/nova-3d.webp" alt="" aria-hidden="true" className="xh-nova-layer xh-nova-layer--back" draggable={false} />
                <motion.img
                  src="/images/nova-3d.webp"
                  alt="Nova, Shreya's AI companion"
                  className="xh-nova-layer xh-nova-layer--main"
                  draggable={false}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <div className="xh-nova-bubble">
                <strong>Hey Explorer! 👋</strong>
                <span>I&apos;m Nova, Shreya&apos;s AI companion.</span>
                <p>I can guide you through her work, projects, experience and what she&apos;s exploring next.</p>
              </div>
            </div>

            <h3 className="xh-nova-ask">Where would you like to go?</h3>
            <div className="xh-nova-dests">
              {destinations.map((d) => {
                const Icon = d.icon;
                return (
                  <button key={d.id} type="button" onClick={() => onNavigate(d.id)} style={{ "--c": d.color } as React.CSSProperties}>
                    <Icon size={20} strokeWidth={1.8} />
                    <span><b>{d.title}</b> – {d.panelSub}</span>
                    <ArrowRight size={16} />
                  </button>
                );
              })}
            </div>

            <form onSubmit={submit} className="xh-nova-input">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={600}
                placeholder="Ask Nova anything..."
                aria-label="Message Nova"
              />
              <button type="submit" disabled={!draft.trim()} aria-label="Send message">
                <Send size={17} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
