"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, LoaderCircle, Minus, Send, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NovaDestination {
  id: string;
  n: string;
  title: string;
  sub: string;
  target: string;
  color: string;
  icon: LucideIcon;
  reply: string;
}

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type Props = {
  destinations: NovaDestination[];
  onNavigate: (id: string) => void;
};

const welcome = "Hey Explorer! 👋 I'm Nova, Shreya's portfolio guide. Ask me about her projects, engineering work, or choose a destination below.";

export default function NovaAssistant({ destinations, onNavigate }: Props) {
  const [messages, setMessages] = useState<Message[]>([{ id: "welcome", role: "assistant", content: welcome }]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function sendQuestion(value: string) {
    const question = value.trim();
    if (!question || busy) return;
    const next = [...messages, { id: crypto.randomUUID(), role: "user" as const, content: question }];
    setMessages(next);
    setDraft("");
    setBusy(true);
    try {
      const response = await fetch("/api/nova", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          history: next.slice(0, -1).slice(-6).map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!response.ok) throw new Error("Nova could not reach her knowledge base.");
      const data = (await response.json()) as { reply: string; mode?: string };
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: data.reply }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I hit a connection issue. You can still explore Shreya's projects, experience and contact details using the shortcuts below.",
        },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendQuestion(draft);
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay: 0.12 }}
      className={`nova-panel cinematic-nova mx-auto w-full max-w-[440px] ${expanded ? "is-expanded" : "is-collapsed"}`}
      aria-label="Nova AI portfolio assistant"
    >
      <header className="nova-header-cinematic">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="nova-brand-icon-cinematic">
            <Sparkles size={18} />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white">Nova</h2>
              <span className="nova-status-cinematic">
                <i /> Online
              </span>
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.16em] text-slate-400">Shreya&apos;s AI companion</p>
          </div>
        </div>
        <button
          type="button"
          className="nova-icon-button-cinematic"
          aria-label={expanded ? "Minimize Nova" : "Expand Nova"}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? <Minus size={15} /> : <ChevronDown size={15} />}
        </button>
      </header>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="nova-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
            className="nova-content-cinematic"
          >
            {/* Large Nova Character */}
            <div className="nova-character-section-cinematic">
              <div className="nova-character-stage-cinematic">
                <div className="nova-character-aura-cinematic" />
                <div className="nova-avatar-wrapper-cinematic">
                  <motion.img
                    src="/images/nova-guide.webp"
                    alt="Nova, Shreya's AI companion"
                    className="nova-character-cinematic"
                    animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <span className="nova-character-spark-cinematic">
                  <Sparkles size={14} />
                </span>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="nova-welcome-cinematic">
              <p className="nova-welcome-text-cinematic">Hey Explorer! 👋</p>
              <p className="nova-welcome-sub-cinematic">I&apos;m Nova, Shreya&apos;s AI companion.</p>
              <p className="nova-welcome-desc-cinematic">
                I can guide you through her work, projects, experience and what she&apos;s exploring next.
              </p>
            </div>

            {/* Navigation Prompt */}
            <div className="nova-nav-prompt-cinematic">
              <p className="nova-nav-prompt-text-cinematic">Where would you like to go?</p>
            </div>

            {/* Destination Buttons */}
            <div className="nova-destinations-cinematic">
              {destinations.map((destination) => {
                const Icon = destination.icon;
                return (
                  <button
                    key={destination.id}
                    type="button"
                    onClick={() => onNavigate(destination.id)}
                    className="nova-destination-cinematic"
                    style={{ "--nova-accent": destination.color } as React.CSSProperties}
                  >
                    <span className="nova-destination-icon-cinematic">
                      <Icon size={16} />
                    </span>
                    <span className="nova-destination-copy-cinematic">
                      <b>{destination.title}</b>
                      <small>{destination.sub}</small>
                    </span>
                    <ArrowRight size={15} className="nova-destination-arrow-cinematic" />
                  </button>
                );
              })}
            </div>

            {/* Input */}
            <form onSubmit={submit} className="nova-composer-cinematic">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={600}
                placeholder="Ask Nova anything..."
                aria-label="Message Nova"
              />
              <button type="submit" disabled={!draft.trim() || busy} aria-label="Send message">
                {busy ? <LoaderCircle size={17} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
