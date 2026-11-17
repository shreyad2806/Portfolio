"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { streamChat } from "@/lib/nova/client/stream";
import type { ChatResult, ConversationState, NavAction, Source } from "@/lib/nova/types";

export interface UiMessage {
  id: string; role: "user" | "assistant"; text: string;
  actions?: NavAction[]; sources?: Source[]; notice?: string; notes?: string[]; details?: { title: string; markdown: string };
  error?: boolean; interrupted?: boolean; /** question to re-ask */ retry?: string;
}

const KEY = "nova:session:v2";
const GREETING: UiMessage = { id: "greet", role: "assistant", text: "Hey, Explorer! 👋 I'm **Nova**, Shreya's AI companion. Ask me about her projects, experience, skills or achievements — or tell me where you'd like to go." };
const DEFAULT_SUGGESTIONS = ["What is CloseLoop?", "What did she do during her internships?", "Where can I find her resume?"];
const uid = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));
const MAX_LEN = 600;

export function useNova() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([GREETING]);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const stateRef = useRef<ConversationState>({});
  const abortRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const msgRef = useRef(messages);
  msgRef.current = messages;

  // Session-scoped memory only (sessionStorage); bounded and cleared with the tab. Drafts are never persisted.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as { messages: UiMessage[]; state: ConversationState };
        if (Array.isArray(s.messages) && s.messages.length) {
          // A reload mid-stream leaves an empty assistant bubble behind; drop those.
          setMessages(s.messages.slice(-30).filter((m) => m.role === "user" || m.text));
          stateRef.current = s.state ?? {};
        }
      }
    } catch { /* storage unavailable */ }
  }, []);
  useEffect(() => {
    if (busyRef.current) return;
    try { sessionStorage.setItem(KEY, JSON.stringify({ messages: messages.slice(-30), state: stateRef.current })); } catch { /* ignore */ }
  }, [messages, busy]);

  /** Cancel an in-flight request (panel closed, conversation cleared). The partial answer is kept and marked interrupted. */
  const cancel = useCallback(() => {
    const ac = abortRef.current;
    if (!ac) return;
    ac.abort(); abortRef.current = null;
  }, []);

  /**
   * Send a question. Returns true only if the server accepted it; on failure before acceptance the caller's draft is
   * left untouched (see `submit`), so nothing the visitor typed is silently lost.
   */
  const ask = useCallback(async (raw: string, opts: { onAccepted?: () => void; fromDraft?: boolean } = {}): Promise<boolean> => {
    const q = raw.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
    if (!q || !/[\p{L}\p{N}]/u.test(q) || q.length > MAX_LEN || busyRef.current) return false;
    const history = msgRef.current.filter((m) => m.id !== "greet" && !m.error && m.text).slice(-6).map((m) => ({ role: m.role, content: m.text }));
    const uidMsg = uid(); const aid = uid();
    busyRef.current = true; setBusy(true); setSuggestions([]);
    const ac = new AbortController(); abortRef.current = ac;
    let accepted = false;
    const patch = (fn: (m: UiMessage) => UiMessage) => setMessages((all) => all.map((m) => (m.id === aid ? fn(m) : m)));
    const show = () => setMessages((m) => [...m, { id: uidMsg, role: "user", text: q }, { id: aid, role: "assistant", text: "" }]);
    show();
    await streamChat({ message: q, history, state: stateRef.current }, {
      onAccepted: () => { accepted = true; opts.onAccepted?.(); },
      onToken: (d) => patch((m) => ({ ...m, text: m.text + d })),
      onDone: (r: ChatResult) => {
        stateRef.current = r.state ?? {};
        patch((m) => ({ ...m, text: r.text, actions: r.actions, sources: r.sources, notice: r.notice, notes: r.notes, details: r.details }));
        setSuggestions(r.suggestions ?? []);
      },
      onError: (message) => {
        // Keep whatever streamed; otherwise show the error with a retry that re-asks the same question.
        if (!accepted && opts.fromDraft) {
          // Typed submission that never reached the server: the draft is restored by `submit`, so no duplicate bubble / retry.
          setMessages((all) => all.filter((m) => m.id !== uidMsg).map((m) => (m.id === aid ? { ...m, text: message, error: true } : m)));
        } else patch((m) => (m.text ? { ...m, interrupted: true, retry: q } : { ...m, text: message, error: true, retry: q }));
        setSuggestions(DEFAULT_SUGGESTIONS);
      },
    }, ac.signal);
    if (ac.signal.aborted) {
      // Cancelled by close/reset: remove an empty bubble, keep partial text but mark it.
      setMessages((all) => all.flatMap((m) => (m.id === aid ? (m.text ? [{ ...m, interrupted: true }] : []) : m.id === uidMsg && !accepted ? [] : [m])));
      setSuggestions(DEFAULT_SUGGESTIONS);
    }
    if (abortRef.current === ac) abortRef.current = null;
    busyRef.current = false; setBusy(false);
    return accepted;
  }, []);

  /** Composer submit: the draft is cleared once the server accepts the request and is restored if it never does. */
  const submit = useCallback(async () => {
    const q = draft;
    if (!/[\p{L}\p{N}]/u.test(q) || busyRef.current) return;
    // The draft stays in the box until the server accepts the request; it is never cleared optimistically.
    const ok = await ask(q, { fromDraft: true, onAccepted: () => setDraft((cur) => (cur === q ? "" : cur)) });
    if (!ok) setDraft((cur) => (cur ? cur : q));
  }, [draft, ask]);

  const clear = useCallback(() => {
    cancel();
    stateRef.current = {}; busyRef.current = false; setBusy(false); setDraft("");
    setMessages([GREETING]); setSuggestions(DEFAULT_SUGGESTIONS);
    try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
  }, [cancel]);

  // Other parts of the site (navbar button, hero card) talk to Nova through window events.
  useEffect(() => {
    const onOpen = (e: Event) => { setOpen(true); setMinimized(false); const q = (e as CustomEvent<{ question?: string }>).detail?.question; if (q) void ask(q); };
    window.addEventListener("nova:open", onOpen);
    window.addEventListener("nova:ask", onOpen);
    return () => { window.removeEventListener("nova:open", onOpen); window.removeEventListener("nova:ask", onOpen); };
  }, [ask]);
  useEffect(() => () => abortRef.current?.abort(), []);

  return { open, setOpen, minimized, setMinimized, messages, busy, suggestions, draft, setDraft, ask, submit, clear, cancel };
}
