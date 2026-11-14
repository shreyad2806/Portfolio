"use client";

import { useEffect, useRef } from "react";
import type { useNova } from "./useNova";
import NovaHeader from "./NovaHeader";
import NovaInput from "./NovaInput";
import NovaMessages from "./NovaMessages";

type Nova = ReturnType<typeof useNova>;

/** Keeps the sheet above the on-screen keyboard: the visual viewport shrinks, so we expose its size as CSS variables. */
function useViewportVars(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const vv = window.visualViewport; const el = ref.current;
    if (!vv || !el) return;
    const apply = () => {
      const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      el.style.setProperty("--nv-kb", `${Math.round(kb)}px`);
      el.style.setProperty("--nv-vvh", `${Math.round(vv.height)}px`);
    };
    apply(); vv.addEventListener("resize", apply); vv.addEventListener("scroll", apply);
    return () => { vv.removeEventListener("resize", apply); vv.removeEventListener("scroll", apply); };
  }, [ref]);
}

export default function NovaChatWindow({ nova, onClose }: { nova: Nova; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const { minimized, setMinimized, messages, busy, suggestions, ask, clear, draft, setDraft, submit } = nova;
  useViewportVars(rootRef);

  // Focus: fine pointers get the composer immediately; touch devices get the dialog itself so the keyboard doesn't pop up uninvited.
  useEffect(() => {
    if (minimized) return;
    if (window.matchMedia("(pointer: coarse)").matches) rootRef.current?.focus({ preventScroll: true });
    else inputRef.current?.focus({ preventScroll: true });
  }, [minimized]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } };
    const el = rootRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <section ref={rootRef} tabIndex={-1} className={`nv-window ${minimized ? "is-min" : ""}`} role="dialog" aria-modal="false" aria-labelledby="nova-title">
      <NovaHeader titleId="nova-title" minimized={minimized} canClear={messages.length > 1 || busy} onMinimize={() => setMinimized(!minimized)} onClose={onClose} onClear={clear} />
      {!minimized && (
        <>
          <NovaMessages messages={messages} busy={busy} suggestions={suggestions} onAsk={(q) => void ask(q)} onRetry={(q) => void ask(q)} onNavigate={() => { if (window.matchMedia("(max-width: 639px)").matches) setMinimized(true); }} />
          <NovaInput ref={inputRef} value={draft} onChange={setDraft} busy={busy} onSubmit={() => void submit()} />
          <p className="nv-foot">Answers come from Shreya&apos;s verified portfolio notes.</p>
        </>
      )}
    </section>
  );
}
