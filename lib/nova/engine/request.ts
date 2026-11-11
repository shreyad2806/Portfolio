import { novaConfig } from "../config";
import { PROJECTS } from "../tools/registry";
import type { ChatRequest, ChatTurn, ConversationState } from "../types";

/** Validate and normalise the untrusted request body. */
export function parseChatRequest(body: unknown): ChatRequest | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request." };
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message.replace(/[\u0000-\u001f\u007f]/g, " ").trim() : "";
  if (!message) return { error: "Please enter a question." };
  if (message.length > novaConfig.input.maxMessageChars) return { error: `Please keep questions under ${novaConfig.input.maxMessageChars} characters.` };
  const history: ChatTurn[] = Array.isArray(b.history)
    ? b.history.filter((m): m is ChatTurn => !!m && typeof m === "object" && ((m as ChatTurn).role === "user" || (m as ChatTurn).role === "assistant") && typeof (m as ChatTurn).content === "string")
        .slice(-novaConfig.input.maxHistoryTurns).map((m) => ({ role: m.role, content: m.content.slice(0, novaConfig.input.maxHistoryChars) }))
    : [];
  const st = (b.state && typeof b.state === "object" ? b.state : {}) as ConversationState;
  const state: ConversationState = { project: typeof st.project === "string" && PROJECTS.some((p) => p.id === st.project) ? st.project : undefined };
  return { message, history, state };
}

