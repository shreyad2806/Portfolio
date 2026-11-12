# Evaluation

`npm run nova:eval` runs 45 questions in 10 categories (profile, education, experience, projects, architecture, technologies, interests, navigation, follow-up, unknown) through the real engine.

Scenarios: **offline** (LLM disabled), **degraded** (a provider that always returns 503), and **live** (only when an API key is present — it is skipped, never simulated, otherwise).

| Metric | How it is computed |
|---|---|
| Retrieval precision / recall | cited documents vs the expected document ids per question |
| Citation correctness | at least one expected document is cited |
| Faithfulness / hallucination rate | forbidden claims (employers, salary, …) and numbers not present in the corpus |
| Navigation correctness | required action href present |
| Abstention correctness | unknown questions must abstain / be blocked |
| Fallback correctness | degraded scenario still answers from local retrieval |
| Latency / tokens | wall clock per request; provider-reported or estimated tokens |

Thresholds for exit code 0: hallucination 0 %, navigation 100 %, abstention 100 %, citations ≥ 90 %. Report: `tests/nova/eval-report.json`.

## Latest results (offline and degraded, retrieval hash embedder)
- 45/45 passed in both scenarios; hallucination 0 %; abstention 100 %; navigation 100 %; citations 100 %; precision ≈ 85.6 %, recall ≈ 98.9 %; latency ≈ 1 ms average.
- **Live LLM results: not measured** — no provider key was available in the build environment. Run the script with a key set to measure faithfulness and token use.
- These metrics are heuristic and the question set was written together with the system; treat them as regression protection, not as an independent benchmark.

## Other checks
`npm test` (82 unit/integration tests: retrieval, incremental ingestion, provider adapters with mocked fetch, backoff, breaker, fallback, injection, navigation whitelist, validation, rate limiter, cache), `npm run typecheck`, `npm run lint`, `npm run build`.
