import { novaConfig } from "../config";
import { TTLCache } from "../cache";
import { matchFaq } from "../knowledge/faq";
import { localIndex } from "../knowledge/store";
import { sha1Hex, normalize } from "../knowledge/text";
import { metrics } from "../observability";
import { SYSTEM_PROMPT, buildUserTurn } from "../prompts/system";
import { ProviderManager, getProviderManager } from "../providers/manager";
import { ProviderError } from "../providers/types";
import { Retriever } from "../retrieval/search";
import { DESTINATIONS, PROJECTS, getContactInformation, getResumeLink, navigateToSection, projectAction } from "../tools/registry";
import type { ChatRequest, ChatResult, ConversationState, Hit, NavAction, Source } from "../types";
import { actionsFromHits, dedupeActions, extractMarkers, faqActions, fixCitations, sourcesFrom, stripUnsafe, ungroundedNumbers } from "./format";
import { classify, rewriteQuery } from "./intent";
import { composeLocal } from "./local";

interface CachedAnswer { text: string; sources: Source[]; actions: NavAction[]; provider: string; model: string }
export interface NovaDeps { retriever: Retriever; providers: ProviderManager; cache: TTLCache<CachedAnswer>; knowledgeVersion: string }

const projectName = (id?: string) => PROJECTS.find((p) => p.id === id)?.name;
const ABOUT_DEFAULTS = ["What is CloseLoop?", "What did she do during her internship?", "What technologies does she use?", "Where can I find her resume?"];

function suggestionsFor(project?: string, category?: string): string[] {
  if (project) {
    const n = projectName(project) ?? "it";
    return [`Explain the ${n} architecture`, `What technologies does ${n} use?`, "What else has she built?"];
  }
  if (category === "experience") return ["What are her hackathon results?", "Show me her projects"];
  if (category === "projects") return ["What is CloseLoop?", "How does Kavach work?", "Compare CloseLoop and Kavach"];
  return ABOUT_DEFAULTS.slice(0, 3);
}

export function createNova(deps: NovaDeps) {
  async function run(req: ChatRequest, onToken?: (d: string) => void): Promise<ChatResult> {
    const t0 = Date.now();
    const state: ConversationState = { ...req.state };
    const done = (r: Omit<ChatResult, "meta" | "state"> & { state?: ConversationState; meta?: Partial<ChatResult["meta"]> }, extra: { retrievalMs?: number; chunks?: number } = {}): ChatResult => {
      const result: ChatResult = { ...r, state: r.state ?? state, meta: { latencyMs: Date.now() - t0, ...extra, ...r.meta } };
      metrics.recordRequest({ mode: result.mode, cacheHit: result.meta.cacheHit, fallback: result.meta.fallback, retrievalMs: extra.retrievalMs, chunks: extra.chunks });
      return result;
    };
    const say = (text: string) => onToken?.(text);

    const intent = classify(req.message, state);

    // ---- Safety: prompt-injection / secret-seeking requests never reach a model.
    if (intent.type === "injection") {
      const text = "I can't help with that, but I'm happy to answer questions about Shreya's projects, experience, skills or achievements.";
      say(text);
      return done({ text, mode: "blocked", sources: [], actions: [], suggestions: ABOUT_DEFAULTS.slice(0, 3) });
    }

    // ---- LEVEL 1: exact FAQ (no API call).
    const faq = intent.type === "question" && !intent.followup ? matchFaq(req.message) : null;
    if (faq) {
      const sources = faq.sources.map((p) => { const d = localIndex.documents.find((x) => x.source_path === p); return { title: d?.title.replace(/\s[—-]\s.*$/, "") ?? p, path: p, verified: d?.verified ?? true, href: undefined } as Source; });
      say(faq.answer);
      return done({ text: faq.answer, mode: "faq", sources, actions: faqActions(faq.actions), suggestions: faq.suggestions }, {});
    }

    // ---- LEVEL 2: deterministic intents (no API call).
    if (intent.type === "greeting") {
      const text = "Hey, Explorer! 👋 I'm Nova, Shreya's AI companion. Ask me about her projects, experience, skills or achievements — or tell me where you'd like to go.";
      say(text); return done({ text, mode: "intent", sources: [], actions: [], suggestions: ABOUT_DEFAULTS });
    }
    if (intent.type === "thanks") {
      const text = "Happy to help! Ask me anything else about Shreya's work whenever you like.";
      say(text); return done({ text, mode: "intent", sources: [], actions: [], suggestions: suggestionsFor(state.project) });
    }
    if (intent.type === "resume") {
      const text = "Here's Shreya's resume. It covers her education, skills, internships, projects and achievements.";
      say(text); return done({ text, mode: "intent", sources: [], actions: [getResumeLink()], suggestions: ["How can I contact her?", "Show me her projects"] });
    }
    if (intent.type === "contact") {
      const c = getContactInformation();
      const text = `You can reach Shreya at **${c.email}**, or through LinkedIn and GitHub below. The Connection Hub page has everything in one place.`;
      say(text); return done({ text, mode: "intent", sources: [], actions: dedupeActions([...c.actions, navigateToSection("connection")!]), suggestions: ["Where can I find her resume?"] });
    }
    if (intent.type === "navigate") {
      const a = navigateToSection(intent.target)!;
      const d = DESTINATIONS.find((x) => x.id === intent.target)!;
      const text = `Sure — **${d.name}** covers ${d.blurb.toLowerCase()}. Use the button below to head there.`;
      say(text); return done({ text, mode: "intent", sources: [], actions: [a], suggestions: suggestionsFor(undefined, d.id === "buildlab" ? "projects" : undefined) });
    }
    if (intent.type === "list_projects") {
      const flagship = ["closeloop", "kavach", "complytai"];
      const others = PROJECTS.filter((p) => !flagship.includes(p.id) && p.hasCaseStudy).map((p) => p.name);
      const text = `Shreya's flagship builds are **CloseLoop** (AI financial exception resolution), **Kavach** (zero-trust runtime security for AI agents) and **ComplytAI** (multi-agent compliance and risk intelligence). She has also built ${others.slice(0, 6).join(", ")} and more.\n\nPick one and I can explain how it works.`;
      say(text);
      return done({ text, mode: "intent", state: { ...state, project: undefined, topic: "projects" }, sources: [], actions: dedupeActions([...flagship.map((id) => projectAction(id)!).filter(Boolean), navigateToSection("buildlab")!]), suggestions: ["Explain the CloseLoop architecture", "How does Kavach work?", "Compare CloseLoop and Kavach"] });
    }

    // ---- Retrieval (shared by compare / question).
    let query: string; let projectId: string | undefined; let categories: string[] | undefined;
    if (intent.type === "compare") { query = `${req.message} architecture overview`; }
    else { projectId = intent.project; categories = intent.categories; query = rewriteQuery(intent, projectName(projectId)); }

    const hits: Hit[] = []; let confidence = 0; let retrievalMs = 0; let diag = "";
    if (intent.type === "compare") {
      for (const id of intent.projects) {
        const r = await deps.retriever.search(`${projectName(id)} overview architecture`, { projectId: id, topK: 2, maxContextChars: 2000 });
        retrievalMs += r.diagnostics.durationMs; hits.push(...r.hits); confidence = Math.max(confidence, r.confidence);
      }
      diag = "compare";
    } else {
      const r = await deps.retriever.search(query, { projectId, categories, topK: novaConfig.retrieval.topK, maxContextChars: novaConfig.retrieval.maxContextChars });
      hits.push(...r.hits); confidence = r.confidence; retrievalMs = r.diagnostics.durationMs; diag = r.diagnostics.filter ?? "";
    }
    void diag;
    const nextState: ConversationState = { project: intent.type === "compare" ? undefined : projectId ?? (intent.type === "question" && hits[0]?.chunk.document_id.startsWith("projects-") && confidence >= novaConfig.retrieval.minConfidence ? hits[0].chunk.document_id.slice(9) : undefined), topic: hits[0]?.chunk.category };
    const extra = { retrievalMs, chunks: hits.length };

    // ---- Abstention: nothing relevant, or only unverified material.
    const verifiedHits = hits.filter((h) => h.chunk.verified);
    if (!hits.length || confidence < novaConfig.retrieval.minConfidence || !verifiedHits.length) {
      const short = normalize(req.message).split(" ").length <= 1;
      const unverifiedOnly = hits.length > 0 && !verifiedHits.length && confidence >= novaConfig.retrieval.minConfidence;
      const text = unverifiedOnly
        ? `I have a note about that, but its details aren't verified yet, so I'd rather not state them. You can see what is confirmed on the ${hits[0].chunk.category === "projects" ? "Build Lab" : "Journey"} page, or ask me about another topic.`
        : short
          ? "Could you tell me a bit more about what you'd like to know? I can talk about Shreya's projects, internships, skills, education or achievements."
          : "I don't have verified information about that in Shreya's portfolio yet. I can help with her projects, internships, skills, education and achievements — or you can explore her pages directly.";
      say(text);
      return done({ text, mode: "abstain", sources: [], actions: dedupeActions([navigateToSection("buildlab")!, navigateToSection("journey")!]), suggestions: suggestionsFor() , state: { ...state } }, extra);
    }

    const sources = sourcesFrom(hits);
    const actions = actionsFromHits(hits);
    const suggestions = suggestionsFor(nextState.project, hits[0]?.chunk.category);

    // ---- LEVEL 4: cache.
    const key = `${deps.knowledgeVersion}|${projectId ?? ""}|${normalize(query)}`;
    const cached = deps.cache.get(key);
    if (cached) {
      say(cached.text);
      return done({ text: cached.text, mode: "cached", sources: cached.sources, actions: cached.actions, suggestions, state: nextState, meta: { cacheHit: true, provider: cached.provider, model: cached.model } }, extra);
    }

    // ---- LEVEL 5: LLM (when available); otherwise LEVEL 3 local excerpts.
    const localFallback = (notice: string, provider?: string): ChatResult => {
      const text = composeLocal(hits, intent.type === "compare" ? 4 : 3);
      say(text);
      return done({ text, mode: "local", sources, actions, suggestions, state: nextState, notice, meta: { fallback: true, provider } }, extra);
    };

    const anyConfigured = deps.providers.status().some((p) => p.configured) && !novaConfig.llm.disabled;
    if (!deps.providers.available()) {
      return localFallback(anyConfigured ? "Conversational answers are temporarily unavailable, so these are excerpts from Shreya's verified notes." : "Showing excerpts from Shreya's verified notes (AI-generated answers are offline).");
    }

    const history = req.history.slice(-novaConfig.input.maxHistoryTurns).map((m) => ({ role: m.role, content: m.content.slice(0, novaConfig.input.maxHistoryChars) }));
    const context = hits.map((h) => h.chunk.text).join("\n");
    try {
      const hold = markerFilter((d) => onToken?.(d));
      const out = await deps.providers.stream(
        { system: SYSTEM_PROMPT, messages: [...history, { role: "user", content: buildUserTurn(req.message, hits, projectName(nextState.project)) }], temperature: novaConfig.llm.temperature, maxOutputTokens: novaConfig.llm.maxOutputTokens },
        hold.push,
      );
      hold.flush();
      const { clean, actions: modelActions } = extractMarkers(out.text);
      let text = fixCitations(stripUnsafe(clean), hits.length);
      if (!text) return localFallback("The AI service returned an empty answer, so these are excerpts from Shreya's verified notes.", out.provider);
      const bad = ungroundedNumbers(text, context, req.message);
      if (bad.length) return localFallback("I couldn't verify part of a generated answer against Shreya's notes, so here are the source excerpts instead.", out.provider);
      if (out.truncated) text += " …";
      const finalActions = dedupeActions([...modelActions, ...actions]).slice(0, 4);
      deps.cache.set(key, { text, sources, actions: finalActions, provider: out.provider, model: out.model });
      return done({ text, mode: "llm", sources, actions: finalActions, suggestions, state: nextState, meta: { provider: out.provider, model: out.model, tokens: out.usage } }, extra);
    } catch (e) {
      const kind = e instanceof ProviderError ? e.kind : "error";
      return localFallback(kind === "rate_limit" ? "Nova's AI provider is busy right now, so these are excerpts from Shreya's verified notes." : "Conversational answers are temporarily unavailable, so these are excerpts from Shreya's verified notes.");
    }
  }
  return { run };
}

let singleton: ReturnType<typeof createNova> | null = null;
export function getNova() {
  if (!singleton) {
    const retriever = new Retriever(localIndex);
    singleton = createNova({ retriever, providers: getProviderManager(), cache: new TTLCache(novaConfig.cache.max, novaConfig.cache.ttlMs), knowledgeVersion: sha1Hex(localIndex.built_at + localIndex.chunks.length) });
  }
  return singleton;
}

/** Streams deltas to the client but withholds `[[tool:marker]]` text so it never flashes on screen. */
export function markerFilter(emit: (d: string) => void) {
  let pending = "";
  const drain = () => {
    for (;;) {
      const i = pending.indexOf("[[");
      if (i < 0) {
        const keep = pending.endsWith("[") ? 1 : 0;
        if (pending.length > keep) emit(pending.slice(0, pending.length - keep));
        pending = pending.slice(pending.length - keep);
        return;
      }
      if (i > 0) { emit(pending.slice(0, i)); pending = pending.slice(i); }
      const j = pending.indexOf("]]");
      if (j < 0) return;
      pending = pending.slice(j + 2);
    }
  };
  return { push(d: string) { pending += d; drain(); }, flush() { if (!pending.startsWith("[[") && pending !== "[") emit(pending); pending = ""; } };
}
