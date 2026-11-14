# Provider configuration

All keys are **server-side environment variables**. They are never sent to the browser, never put in URLs (Gemini uses the `x-goog-api-key` header) and never logged. Nova works with none of them set.

| Variable | Default | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | – | Primary provider (Google AI Studio free tier) |
| `GEMINI_MODEL` | `gemini-2.0-flash` | |
| `OPENROUTER_API_KEY` | – | Secondary provider |
| `OPENROUTER_MODEL` | `meta-llama/llama-3.3-70b-instruct:free` | a free-tier model |
| `NOVA_PROVIDERS` | `gemini,openrouter` | order of fallback |
| `NOVA_DISABLE_LLM` | – | `1` forces fully offline mode |
| `NOVA_MIN_CONFIDENCE` | `0.34` | abstention threshold |
| `NOVA_EMBEDDER` | `hash-384-v1` | or `bge-small-en-v1.5` (requires `@xenova/transformers`) |
| `NOVA_RATE_PER_MIN` / `NOVA_RATE_PER_HOUR` | 12 / 80 | per-visitor limits |
| `NOVA_BREAKER_FAILURES` / `NOVA_BREAKER_COOLDOWN_MS` | 3 / 60000 | circuit breaker |
| `NOVA_CACHE_TTL_MS` | 24h | |
| `NOVA_RATE_SALT` | built-in | salt for hashing visitor IPs |
| `NOVA_LOG` | on | `0` silences structured logs |

Model names change; check each provider's current free-tier model list before relying on a default.

## Interface (`lib/nova/providers/types.ts`)
`LLMProvider { name, isConfigured(), generate(), stream(), healthCheck(deep?), getModelInfo() }`. Adding a provider = one class implementing it + registering it in `getProviderManager()`.

Errors are normalised to `ProviderError{kind: rate_limit|auth|timeout|unavailable|bad_request|blocked|network|unconfigured}`; raw upstream bodies are never surfaced.

## Privacy
Only the visitor's question, ≤6 recent turns and public, verified portfolio passages are sent to a provider. No private repositories, secrets or personal phone numbers are in the index.

## Live validation status
Adapters and the manager are tested over real HTTP against a local mock server (streaming, 401, 429 + Retry-After, 503, hang, mid-stream drop, refused connection). **Live Gemini/OpenRouter calls have not been tested** (no keys in the build environment). Visitor cancellation now aborts the upstream request. Embedding env vars: see `rag-pipeline.md`.
