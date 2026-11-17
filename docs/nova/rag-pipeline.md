# RAG pipeline

## Ingestion (`npm run nova:ingest`)
1. Discover `.md/.mdx/.txt/.pdf` under `nova-knowledge/` (+ extra files listed in `sources.json`; PDFs need poppler's `pdftotext`).
2. Parse front-matter (`title, category, source, last_updated, verified, tags`), clean Markdown, keep headings.
3. **Chunk** by heading, merging tiny sections (min 260 chars) and splitting long ones (max 900) on paragraph/sentence boundaries. Each chunk carries `document_id, chunk_id, title, category, source_path, section_heading, tags, verified, updated_at`.
4. **Embed** each chunk (`title + heading + text`) with the configured embedder.
5. **Incremental**: unchanged documents (same content hash) are skipped; deleted documents are removed; identical chunk text is indexed once across the whole corpus.
6. Writes `index.json` and `manifest.json` only when content changed. Report: discovered / processed / skipped / removed / chunks / embeddings / duplicates / unverified / TODO markers / errors.

`--full` rebuilds everything; `--check` is a dry run that exits non-zero if the index is stale (usable in CI).

## Retrieval (`lib/nova/retrieval/search.ts`)
- Query is normalised (alias table: `agentshield→kavach`, `sih→smart india hackathon`, …), stemmed, stop-worded.
- **Keyword**: BM25 (k1 1.4, b .75) with field weights body 1 / heading 2 / title+tags 0.35.
- **Semantic**: cosine over the chunk vectors.
- **Fusion**: reciprocal-rank fusion, then Jaccard de-duplication, a relative score cutoff, top-K and a context character budget.
- **Filters**: project id (from the query or session memory) and category hints (experience, education, …).
- **Confidence** (drives abstention, never the model's self-assessment): `0.7 × IDF-weighted share of query terms covered by the top 3 passages + 0.3 × best cosine`. A named project sets a floor (the search is already scoped to its verified notes). A capitalised name that no relevant passage mentions (e.g. an employer not in the notes) multiplies confidence by 0.45.
- Diagnostics (query terms, candidates, kept, duration, embedder, filter) are returned with every retrieval.

## Embeddings (V2)
The index always carries the lexical `hash-384-v1` vector. Optionally it also carries a neural vector (`nvector`) from `BAAI/bge-small-en-v1.5` plus `IndexFile.neural` metadata: a **space id** (model, revision, pooling, quantisation, query prefix), dimensions and a corpus-derived calibration. Queries and documents are only ever compared inside the same space; a mismatch disables the neural arm. Fallback chain: neural → hash → BM25 only. Query embedding times out after 3 s. BM25 + RRF fusion is unchanged.

- Enable: `npm i -D @huggingface/transformers` then `npm run nova:ingest -- --full --neural` (`--no-neural` removes neural vectors).
- Env: `NOVA_EMBEDDER` (`auto`|`off`|`hash-384-v1`), `NOVA_BGE_REVISION`, `NOVA_EMBED_MODEL_DIR` (offline weights), `NOVA_EMBED_OFFLINE=1`.
- Status: `/api/nova/health` → `retrieval`. Benchmark: `npm run nova:embed:bench`.
- Not validated here: the real model could not be downloaded in the build sandbox, so neural calibration and thresholds are untested against real weights.

## Verification policy
Unverified chunks are excluded from retrieval, `Verification notes (internal)` sections are never chunked, `nova-knowledge/verification.json` records conflicts/unverified/needs-human facts, and conflicts are disclosed in `ChatResult.notes`. `npm run nova:verify` regenerates `docs/nova/human-verification-report.md`.

## Known limits
- Lexical matching: a paraphrase with no shared words can miss. Add aliases in `lib/nova/knowledge/text.ts` or FAQ phrasings when you see this.
- A name that exists in the corpus for an unrelated reason (e.g. "Google" inside a tech-stack tag) can still let a question like "her Google internship" through retrieval; in LLM mode the grounding rules and the numeric guard apply, in local mode it shows the nearest verified excerpts with a notice.
