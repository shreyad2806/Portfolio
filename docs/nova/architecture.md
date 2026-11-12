# Nova architecture

Nova is Shreya's portfolio assistant. It answers from a curated, versioned knowledge base, works with **no LLM at all**, and uses an LLM only to phrase grounded answers when one is available.

```
 Browser (components/nova)                         Server (Next.js route handlers)
┌─────────────────────────┐   POST /api/nova/chat  ┌───────────────────────────────────────────────┐
│ NovaWidget (launcher)   │ ─────────────────────► │ validate (8KB, ≤600 chars) → rate limit        │
│ NovaChatWindow          │   NDJSON stream        │ ┌─ engine (lib/nova/engine) ───────────────┐   │
│  messages / sources /   │ ◄───────────────────── │ │ 0 injection block                        │   │
│  actions / suggestions  │  {t:token|done|error}  │ │ 1 FAQ exact match           (no API call)│   │
│ sessionStorage memory   │                        │ │ 2 intents: nav/resume/contact/list       │   │
└─────────────────────────┘                        │ │ 3 hybrid retrieval ──► abstain if weak   │   │
        GET /api/nova/health                       │ │ 4 TTL cache                              │   │
                                                   │ │ 5 LLM (ProviderManager) ─► validate      │   │
                                                   │ │ 6 local excerpts + honest notice         │   │
                                                   │ └──────────────────────────────────────────┘   │
                                                   │ providers: Gemini → OpenRouter (breaker each) │
                                                   └───────────────────────────────────────────────┘
 nova-knowledge/*.md ──npm run nova:ingest──► nova-knowledge/index.json (bundled, imported statically)
```

## Request lifecycle
1. The client sends `{message, history (≤6 turns), state{project}}`. The server re-validates everything (`lib/nova/engine/request.ts`); the project id must be on the whitelist.
2. **Injection / secret-seeking** messages are answered with a refusal and never reach a model.
3. **FAQ** (`nova-knowledge/faq.json`) and **deterministic intents** (greeting, resume, contact, navigation, project list) answer immediately — no retrieval, no API call.
4. Otherwise the question is classified (project mentioned? follow-up of the remembered project? category hint) and the **retriever** returns scored passages with a confidence value.
5. Confidence below `NOVA_MIN_CONFIDENCE` (0.34), or only unverified passages → **abstain** with suggested sections.
6. Cache lookup (keyed by normalised question + project + knowledge version).
7. If a provider is configured and its breaker is closed, the model gets the system prompt plus the passages as quoted, untrusted data and streams an answer. The output is post-processed: markers (`[[nav:id]]`, `[[project:id]]`, `[[resume]]`, `[[contact]]`) are validated against the registry, **all URLs/links are stripped**, invalid citations dropped, and answers containing numbers absent from the context are replaced by the local answer.
8. If there is no provider, it is failing, or output was rejected → **local excerpts** with a visible notice that these are excerpts, not generated text.

## Modules
| Path | Role |
|---|---|
| `components/nova/*` | UI: launcher, window/bottom sheet, messages, sources, actions, typing, suggestions, `useNova` state |
| `app/nova.css` | `nv-` styles; launcher, panel, mobile sheet, reduced motion |
| `app/api/nova/{chat,health}/route.ts` | streaming endpoint, health/diagnostics (no secrets) |
| `lib/nova/engine` | layering, intents, formatting/validation |
| `lib/nova/retrieval` | hybrid retriever |
| `lib/nova/knowledge` | parsing, chunking, embedder, ingestion, FAQ |
| `lib/nova/providers` | Gemini, OpenRouter, circuit breaker, manager |
| `lib/nova/tools/registry.ts` | whitelisted destinations/projects/resume/contact |
| `lib/nova/cache`, `observability.ts`, `config` | cache, rate limiter, metrics, env config |
| `scripts/nova/{ingest,evaluate}.ts`, `tests/nova/*` | ingestion CLI, evaluation, tests |

## Session memory
Bounded and session-scoped: the client keeps the last ≤6 turns and `{project}` in `sessionStorage` (`nova:session:v1`); nothing is stored server-side. Clearing the conversation clears it.

## Tools
The model never navigates directly. It may append markers; the application maps them to a whitelist (five sections, known projects, resume, contact). Unknown markers are discarded and never shown. Navigation is client-side (`router.push` or smooth scroll for same-page anchors).

## Honest notes
- The shipped embedder is `hash-384-v1` (signed feature hashing) — a *lexical-semantic* vector, **not a neural model**. An optional `bge-small-en-v1.5` path (`NOVA_EMBEDDER`, `@xenova/transformers`) exists but is not installed or tested here.
- **PostgreSQL + pgvector is not implemented.** The store is a bundled JSON index behind the `Retriever` interface (the "local adapter" fallback from the spec). 25 documents / ~100 chunks do not need a database; a pgvector store would implement the same `search()` contract.
- Rate limiting and cache are instance-local; on serverless they are best-effort.
