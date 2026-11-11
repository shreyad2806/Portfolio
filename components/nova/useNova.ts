"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { streamChat } from "@/lib/nova/client/stream";
import type { ChatResult, ConversationState, NavAction, Source } from "@/lib/nova/types";

export interface UiMessage { id: string; role: "user" | "assistant"; text: string; actions?: NavAction[]; sources?: Source[]; notice?: string; error?: boolean }

const KEY = "nova:session:v1";
const GREETING: UiMessage = { id: "greet", role: "assistant", text: "Hey, Explorer! 👋 I'm **Nova**, Shreya's AI companion. Ask me about her projects, experience, skills or achievements — or tell me where you'd like to go." };
const DEFAULT_SUGGESTIONS = ["What is CloseLoop?", "What did she do during her internship?", "Where can I find her resume?"];
const uid = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));

export function useNova() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([GREETING]);
  const [busy, setBusy] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const stateRef = useRef<ConversationState>({});
  const abortRef = useRef<AbortController | null>(null);
  const msgRef = useRef(messages);
  msgRef.current = messages;

  // Session-scoped memory only (sessionStorage); bounded and cleared with the tab.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) { const s = JSON.parse(raw) as { messages: UiMessage[]; state: ConversationState }; if (Array.isArray(s.messages) && s.messages.length) { setMessages(s.messages.slice(-30)); stateRef.current = s.state ?? {}; } }
    } catch { /* storage unavailable */ }
  }, []);
  useEffect(() => {
    try { sessionStorage.setItem(KEY, JSON.stringify({ messages: messages.slice(-30), state: stateRef.current })); } catch { /* ignore */ }
  }, [messages]);

  const ask = useCallback(async (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    const history = msgRef.current.filter((m) => m.id !== "greet" && !m.error && m.text).slice(-6).map((m) => ({ role: m.role, content: m.text }));
    const aid = uid();
    setMessages((m) => [...m, { id: uid(), role: "user", text: q }, { id: aid, role: "assistant", text: "" }]);
    setBusy(true); setSuggestions([]);
    const ac = new AbortController(); abortRef.current = ac;
    const patch = (fn: (m: UiMessage) => UiMessage) => setMessages((all) => all.map((m) => (m.id === aid ? fn(m) : m)));
    await streamChat({ message: q, history, state: stateRef.current }, {
      onToken: (d) => patch((m) => ({ ...m, text: m.text + d })),
      onDone: (r: ChatResult) => {
        stateRef.current = r.state ?? {};
        patch((m) => ({ ...m, text: r.text, actions: r.actions, sources: r.sources, notice: r.notice }));
        setSuggestions(r.suggestions ?? []);
      },
      onError: (message) => { patch((m) => ({ ...m, text: m.text || message, error: !m.text })); setSuggestions(DEFAULT_SUGGESTIONS); },
    }, ac.signal);
    setBusy(false);
  }, [busy]);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    stateRef.current = {}; setBusy(false);
    setMessages([GREETING]); setSuggestions(DEFAULT_SUGGESTIONS);
    try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
  }, []);

  // Other parts of the site (navbar button, hero panel) talk to Nova through window events.
  useEffect(() => {
    const onOpen = (e: Event) => { setOpen(true); setMinimized(false); const q = (e as CustomEvent<{ question?: string }>).detail?.question; if (q) void ask(q); };
    window.addEventListener("nova:open", onOpen);
    window.addEventListener("nova:ask", onOpen);
    return () => { window.removeEventListener("nova:open", onOpen); window.removeEventListener("nova:ask", onOpen); };
  }, [ask]);

  return { open, setOpen, minimized, setMinimized, messages, busy, suggestions, ask, clear };
}
