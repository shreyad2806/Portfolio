import type { ChatResult, ChatTurn, ConversationState } from "../types";

export type StreamEvent = { t: "token"; d: string } | { t: "done"; result: ChatResult } | { t: "error"; message: string };

export interface StreamHandlers { onToken(d: string): void; onDone(r: ChatResult): void; onError(message: string): void }

/** POST to /api/nova/chat and consume the NDJSON stream. Never throws: errors are reported via onError. */
export async function streamChat(body: { message: string; history: ChatTurn[]; state: ConversationState }, h: StreamHandlers, signal?: AbortSignal) {
  try {
    const res = await fetch("/api/nova/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal });
    if (res.status === 429) { h.onError("You're sending messages quickly — please wait a moment and try again."); return; }
    if (!res.ok || !res.body) { let msg = "Nova couldn't answer that right now. Please try again."; try { msg = (await res.json()).error ?? msg; } catch { /* keep default */ } h.onError(msg); return; }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    let finished = false;
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i: number;
      while ((i = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
        if (!line) continue;
        let ev: StreamEvent; try { ev = JSON.parse(line); } catch { continue; }
        if (ev.t === "token") h.onToken(ev.d);
        else if (ev.t === "done") { finished = true; h.onDone(ev.result); }
        else if (ev.t === "error") { finished = true; h.onError(ev.message); }
      }
    }
    if (!finished) h.onError("The connection dropped before Nova finished answering.");
  } catch (e) {
    if ((e as Error).name !== "AbortError") h.onError("I couldn't reach Nova just now. You can still explore the site with the navigation above.");
  }
}
