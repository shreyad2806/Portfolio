"use client";

import { FormEvent, forwardRef, useState } from "react";
import { Send } from "lucide-react";

const MAX = 600;

const NovaInput = forwardRef<HTMLInputElement, { busy: boolean; onSend: (q: string) => void }>(function NovaInput({ busy, onSend }, ref) {
  const [v, setV] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    const q = v.trim();
    if (!q || busy) return;
    onSend(q); setV("");
  }
  return (
    <form onSubmit={submit} className="nv-input">
      <label htmlFor="nova-input" className="nv-sr">Ask Nova a question</label>
      <input id="nova-input" ref={ref} value={v} onChange={(e) => setV(e.target.value)} maxLength={MAX} placeholder="Ask about Shreya's work…" autoComplete="off" enterKeyHint="send" />
      <button type="submit" disabled={!v.trim() || busy} aria-label="Send message"><Send size={16} /></button>
    </form>
  );
});
export default NovaInput;
