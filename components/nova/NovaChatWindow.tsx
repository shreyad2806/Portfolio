"use client";

import { useEffect, useRef } from "react";
import type { useNova } from "./useNova";
import NovaHeader from "./NovaHeader";
import NovaInput from "./NovaInput";
import NovaMessages from "./NovaMessages";

type Nova = ReturnType<typeof useNova>;

export default function NovaChatWindow({ nova, onClose }: { nova: Nova; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const { minimized, setMinimized, messages, busy, suggestions, ask, clear } = nova;

  useEffect(() => { if (!minimized) inputRef.current?.focus({ preventScroll: true }); }, [minimized]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } };
    const el = rootRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <section ref={rootRef} className={`nv-window ${minimized ? "is-min" : ""}`} role="dialog" aria-modal="false" aria-labelledby="nova-title">
      <NovaHeader titleId="nova-title" minimized={minimized} canClear={messages.length > 1 || busy} onMinimize={() => setMinimized(!minimized)} onClose={onClose} onClear={clear} />
      {!minimized && (
        <>
          <NovaMessages messages={messages} busy={busy} suggestions={suggestions} onAsk={ask} onNavigate={() => { if (window.matchMedia("(max-width: 639px)").matches) setMinimized(true); }} />
          <NovaInput ref={inputRef} busy={busy} onSend={ask} />
          <p className="nv-foot">Answers come from Shreya&apos;s verified portfolio notes.</p>
        </>
      )}
    </section>
  );
}
