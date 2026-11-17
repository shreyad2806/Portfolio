"use client";

import { FormEvent, forwardRef } from "react";
import { Send } from "lucide-react";

const MAX = 600;

interface Props { value: string; onChange: (v: string) => void; busy: boolean; onSubmit: () => void }

/** Controlled composer: the parent owns the draft so a failed request can never lose or corrupt what was typed. */
const NovaInput = forwardRef<HTMLInputElement, Props>(function NovaInput({ value, onChange, busy, onSubmit }, ref) {
  const clean = value.replace(/[\u0000-\u001f\u007f]/g, " ");
  // Punctuation-only input (a lone "-", "…") is not a question: Send stays disabled instead of firing a pointless request.
  const can = /[\p{L}\p{N}]/u.test(clean) && !busy;
  function submit(e: FormEvent) { e.preventDefault(); if (can) onSubmit(); }
  return (
    <form onSubmit={submit} className="nv-input">
      <label htmlFor="nova-input" className="nv-sr">Ask Nova a question</label>
      <input
        id="nova-input" ref={ref} type="text" value={value} onChange={(e) => onChange(e.target.value)} maxLength={MAX}
        placeholder="Ask about Shreya's work…" autoComplete="off" autoCorrect="off" autoCapitalize="sentences" spellCheck={false}
        enterKeyHint="send" inputMode="text" aria-describedby="nova-hint"
      />
      <button type="submit" disabled={!can} aria-label="Send message"><Send size={16} /></button>
      <span id="nova-hint" className="nv-sr">{busy ? "Nova is answering." : "Press Enter to send."}</span>
    </form>
  );
});
export default NovaInput;
