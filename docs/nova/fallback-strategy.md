# Fallback strategy

| Level | Mechanism | API call? |
|---|---|---|
| 0 | Injection/secret request → fixed refusal | no |
| 1 | Exact FAQ match | no |
| 2 | Intent match: greeting, thanks, resume, contact, navigation, project list | no |
| 3 | Local retrieval → abstain, or quoted excerpts | no |
| 4 | TTL cache of previously validated answers | no |
| 5 | LLM (Gemini → OpenRouter) | yes |

- **Timeouts**: 15 s per attempt, 22 s total budget.
- **Retries**: up to 2, exponential backoff (400 ms·2ⁿ + jitter), only before the first token. `Retry-After` is honoured up to 3 s; longer waits skip to the next provider.
- **Circuit breaker** per provider: 3 failures in 60 s → open for 60 s → one half-open probe → closed on success.
- **Mid-stream failure**: the partial text already shown is kept.
- **Provider fallback**: Gemini → OpenRouter, transparently.
- **All providers down / unconfigured / disabled**: Nova answers from levels 1–3. The UI shows *"Showing excerpts from Shreya's verified notes (AI-generated answers are offline)"*; local text is never presented as model output.
- **Rate limit** (per visitor hash): HTTP 429 with `Retry-After`; the UI shows a friendly message.
- Navigation, resume, contact and FAQs never need a provider.
