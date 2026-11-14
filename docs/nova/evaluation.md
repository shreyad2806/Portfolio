# Evaluation

`npm run nova:eval` runs 123 questions in 15 categories (profile, education, experience, projects, architecture, technologies, interests, navigation, follow-up, unknown, paraphrase, comparison, internship, multi-turn, injection — including ambiguous employer names, unanswerable questions and prompt-injection attempts) through the real engine.

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

## Retrieval metrics
Computed on the 64 answerable single-turn questions, over distinct documents in the top K=5: **Recall@5, Precision@5, MRR**. Citation precision = share of cited sources that are expected; citation coverage = share of questions that cite at least one expected source.

## Latest results (offline and degraded, hash embedder, BM25 + RRF)
- 123/123 passed in both scenarios; hallucination 0 %; abstention 100 %; navigation 100 %; citations 100 %; answer precision ≈ 86.7 %, answer recall ≈ 95.0 %.
- Retrieval only: Recall@5 ≈ 88.3 %, MRR ≈ 0.80, Precision@5 ≈ 56.6 % (precision@5 is low by construction: most questions have one relevant document and K=5).
- **Live LLM results: not measured** — no provider key was available. Offline/degraded numbers describe the deterministic path only; do not read them as LLM quality.
- **Neural (bge-small) results: not measured** — the model could not be downloaded in the build sandbox. `npm run nova:embed:bench` reports SKIPPED with the reason when the model is unavailable.
- The question set is self-authored and query aliases were tuned while fixing failures found by it, so the numbers are optimistic. Treat them as regression protection, not an independent benchmark.

## Other checks
`npm test` (vitest: retrieval, verification policy, answer composition, embeddings (fake neural provider + mocked ONNX runtime), incremental ingestion, provider adapters with mocked fetch and a real local HTTP mock server (401/429/503/hang/mid-stream drop), backoff, breaker, fallback, injection, navigation whitelist, validation, rate limiter, cache), `npm run typecheck`, `npm run lint`, `npm run build`.
