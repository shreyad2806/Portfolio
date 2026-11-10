"use client";

import { useEffect, useRef, useState, type FormEvent, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Compass, FlaskConical, Map, Radio, Send, Sparkles, Telescope, RotateCcw, Minus, X } from "lucide-react";
import { answerNova, novaDestinations, type NovaDestinationId } from "@/lib/nova-engine";

type Message = { id: number; role: "assistant" | "user"; content: string; destinationId?: NovaDestinationId; suggestions?: string[] };
type Props = { onNavigate: (id: string) => void; listenForOpen?: boolean; startClosed?: boolean };
const icons = { basecamp: Compass, buildlab: FlaskConical, journey: Map, frontier: Telescope, connection: Radio };

const initialMessage: Message = {
  id: 0,
  role: "assistant",
  content: "Hey, Explorer! I'm Nova. I can help you discover Shreya's projects, experience, technical foundations, and current explorations. Ask me anything or choose a destination.",
  suggestions: ["Show me the featured projects", "Tell me about Shreya's experience", "What is she exploring now?", "How can I contact her?"],
};

export default function NovaAssistant({ onNavigate, listenForOpen = false, startClosed = false }: Props) {
  const [view, setView] = useState<"open" | "minimized" | "closed">(startClosed ? "closed" : "open");
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [draft, setDraft] = useState("");
  const [messageId, setMessageId] = useState(1);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!listenForOpen) return;
    const openNova = () => {
      setView("open");
      window.setTimeout(() => inputRef.current?.focus(), 120);
    };
    window.addEventListener("nova:open", openNova);
    return () => window.removeEventListener("nova:open", openNova);
  }, [listenForOpen]);

  function sendQuestion(value: string) {
    const question = value.trim();
    if (!question) return;
    const result = answerNova(question);
    setMessages((current) => [
      ...current,
      { id: messageId, role: "user", content: question },
      { id: messageId + 1, role: "assistant", content: result.text, destinationId: result.destinationId, suggestions: result.suggestions },
    ]);
    setMessageId((id) => id + 2);
    setDraft("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendQuestion(draft);
  }

  function resetConversation() {
    setMessages([initialMessage]);
    setDraft("");
  }

  if (view === "closed") {
    return <button type="button" className="xh-nova-launcher" onClick={() => setView("open")} aria-label="Open Nova guide"><Sparkles size={18} /> Ask Nova</button>;
  }

  return (
    <motion.aside initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="xh-nova xh-nova--complete" aria-label="Nova, portfolio guide">
      <header className="xh-nova-head">
        <span className="xh-nova-brand"><Sparkles size={19} /></span>
        <div className="xh-nova-title"><h2>Nova</h2><span>Your portfolio guide</span></div>
        <span className="xh-nova-online"><i />Local guide</span>
        <div className="xh-nova-ctrl">
          <button type="button" aria-label={view === "open" ? "Minimize Nova" : "Expand Nova"} onClick={() => setView(view === "open" ? "minimized" : "open")}><Minus size={14} /></button>
          <button type="button" aria-label="Close Nova" onClick={() => setView("closed")}><X size={14} /></button>
        </div>
      </header>
      <AnimatePresence initial={false}>
        {view === "open" && (
          <motion.div key="nova-content" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="xh-nova-body">
            <div className="xh-nova-stage xh-nova-stage--complete">
              <div className="xh-nova-halo" aria-hidden="true" />
              <motion.div className="xh-nova-rig xh-nova-rig--complete" animate={{ y: [0, -5, 0], rotate: [-0.6, 0.6, -0.6] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}>
                <img src="/images/nova-guide.svg" alt="Nova, the illustrated guide for Shreya's portfolio" />
                <span className="xh-nova-orbit xh-nova-orbit--one" />
                <span className="xh-nova-orbit xh-nova-orbit--two" />
              </motion.div>
              <div className="xh-nova-bubble xh-nova-bubble--complete">
                <span className="xh-nova-bubble-label"><i /> READY TO EXPLORE</span>
                <strong>Five destinations. One world.</strong>
                <p>Ask me a question or pick a place to begin.</p>
              </div>
            </div>
            <div className="xh-nova-destination-grid" aria-label="Portfolio destinations">
              {novaDestinations.map((destination) => {
                const Icon = icons[destination.id];
                return (
                  <button key={destination.id} type="button" onClick={() => onNavigate(destination.id)} style={{ "--nova-color": destination.color } as CSSProperties}>
                    <span className="xh-nova-destination-icon"><Icon size={16} /></span>
                    <span><b>{destination.title}</b><small>{destination.description}</small></span>
                    <ArrowRight size={14} />
                  </button>
                );
              })}
            </div>
            <div className="xh-nova-conversation" ref={chatRef} aria-live="polite" aria-label="Conversation with Nova">
              {messages.map((message) => (
                <div key={message.id} className={"xh-nova-message xh-nova-message--" + message.role}>
                  <p>{message.content}</p>
                  {message.role === "assistant" && message.destinationId && (
                    <button type="button" className="xh-nova-action" onClick={() => onNavigate(message.destinationId!)}>
                      Explore {novaDestinations.find((item) => item.id === message.destinationId)?.title} <ArrowRight size={13} />
                    </button>
                  )}
                  {message.role === "assistant" && message.suggestions && (
                    <div className="xh-nova-suggestions">
                      {message.suggestions.slice(0, 3).map((suggestion) => <button key={suggestion} type="button" onClick={() => sendQuestion(suggestion)}>{suggestion}</button>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={submit} className="xh-nova-input">
              <input ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={500} placeholder="Ask Nova about Shreya's work…" aria-label="Ask Nova a question" />
              <button type="submit" disabled={!draft.trim()} aria-label="Send question"><Send size={16} /></button>
            </form>
            <div className="xh-nova-footer">
              <span><i /> Runs locally · No API calls</span>
              <button type="button" onClick={resetConversation}><RotateCcw size={11} /> Reset chat</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
