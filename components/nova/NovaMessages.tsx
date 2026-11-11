"use client";

import { useEffect, useRef } from "react";
import type { UiMessage } from "./useNova";
import NovaMessage from "./NovaMessage";
import NovaSuggestions from "./NovaSuggestions";
import NovaTypingIndicator from "./NovaTypingIndicator";

interface Props { messages: UiMessage[]; busy: boolean; suggestions: string[]; onAsk: (q: string) => void; onNavigate: () => void }

export default function NovaMessages({ messages, busy, suggestions, onAsk, onNavigate }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [messages, busy]);
  const last = messages[messages.length - 1];
  const showTyping = busy && (!last || last.role === "user" || !last.text);
  return (
    <div ref={ref} className="nv-body" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation with Nova" tabIndex={0}>
      {messages.map((m) => (m.role === "assistant" && !m.text && busy ? null : <NovaMessage key={m.id} m={m} onNavigate={onNavigate} />))}
      {showTyping && <NovaTypingIndicator />}
      {!busy && <NovaSuggestions items={suggestions} onPick={onAsk} />}
    </div>
  );
}
