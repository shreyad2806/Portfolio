"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LoaderCircle, Minus, Send, Sparkles, X } from "lucide-react";
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

type Message = { id: string; role: "assistant" | "user"; content: string };
type Props = { destinations: NovaDestination[]; onNavigate: (id: string) => void };
type View = "open" | "minimized" | "closed";

export default function NovaAssistant({ destinations, onNavigate }: Props) {
  const [view, setView] = useState<View>("open");
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function ask(value: string) {
    const question = value.trim();
    if (!question || busy) return;
    const next: Message[] = [...messages, { id: crypto.randomUUID(), role: "user", content: question }];
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
      if (!response.ok) throw new Error("request failed");
      const data = (await response.json()) as { reply: string };
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I hit a connection issue. You can still jump straight to any destination below.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(draft);
  }

  if (view === "closed") {
    return (
      <button type="button" className="xh-nova-launcher" onClick={() => setView("open")} aria-label="Open Nova assistant">
        <Sparkles size={18} /> Ask Nova
      </button>
    );
  }

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
            <div className="xh-nova-stage">
              <div className="xh-nova-halo" />
              <motion.img
                src="/images/nova-guide.webp"
                alt="Nova, Shreya's AI companion"
                className="xh-nova-avatar"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="xh-nova-bubble">
                <strong>Hey Explorer! 👋</strong>
                <span>I&apos;m Nova, Shreya&apos;s AI companion.</span>
                <p>I can guide you through her work, projects, experience and what she&apos;s exploring next.</p>
              </div>
            </div>

            {messages.length > 0 && (
              <div ref={listRef} className="xh-nova-chat" aria-live="polite">
                {messages.map((m) => (
                  <p key={m.id} className={`xh-msg xh-msg--${m.role}`}>{m.content}</p>
                ))}
                {busy && <p className="xh-msg xh-msg--assistant xh-msg--busy">Nova is thinking…</p>}
              </div>
            )}

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
              <button type="submit" disabled={!draft.trim() || busy} aria-label="Send message">
                {busy ? <LoaderCircle size={17} className="animate-spin" /> : <Send size={17} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
