"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import type { UiMessage } from "./useNova";
import NovaMessage from "./NovaMessage";
import NovaSuggestions from "./NovaSuggestions";
import NovaTypingIndicator from "./NovaTypingIndicator";

interface Props { messages: UiMessage[]; busy: boolean; suggestions: string[]; onAsk: (q: string) => void; onRetry: (q: string) => void; onNavigate: () => void }

const NEAR = 72;

/** Scrolling log. Follows new content only while the visitor is at the bottom; otherwise shows a "jump to latest" pill. */
export default function NovaMessages({ messages, busy, suggestions, onAsk, onRetry, onNavigate }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const follow = useRef(true);
  const [away, setAway] = useState(false);
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toBottom = useCallback((smooth: boolean) => { const el = ref.current; if (el) el.scrollTo({ top: el.scrollHeight, behavior: smooth && !reduce() ? "smooth" : "auto" }); }, []);
  const onScroll = () => { const el = ref.current; if (!el) return; const near = el.scrollHeight - el.scrollTop - el.clientHeight < NEAR; follow.current = near; setAway(!near); };

  const last = messages[messages.length - 1];
  // The visitor just sent something → always follow. Streaming tokens → follow only if they were already at the bottom.
  useLayoutEffect(() => { if (last?.role === "user") { follow.current = true; setAway(false); } if (follow.current) toBottom(false); }, [messages, busy, suggestions, last, toBottom]);
  useEffect(() => { const el = ref.current; if (!el || typeof ResizeObserver === "undefined") return; const ro = new ResizeObserver(() => { if (follow.current) toBottom(false); }); ro.observe(el); return () => ro.disconnect(); }, [toBottom]);

  const showTyping = busy && (!last || last.role === "user" || !last.text);
  return (
    <div className="nv-log-wrap">
      <div ref={ref} onScroll={onScroll} className="nv-body" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation with Nova" tabIndex={0}>
        {messages.map((m) => (m.role === "assistant" && !m.text && busy ? null : <NovaMessage key={m.id} m={m} onNavigate={onNavigate} onRetry={onRetry} />))}
        {showTyping && <NovaTypingIndicator />}
        {!busy && <NovaSuggestions items={suggestions} onPick={onAsk} />}
      </div>
      {away && <button type="button" className="nv-jump" onClick={() => { follow.current = true; setAway(false); toBottom(true); }}><ArrowDown size={14} aria-hidden="true" /> Latest</button>}
    </div>
  );
}
