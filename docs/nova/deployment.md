# Deployment

1. `npm run nova:ingest` after any change in `nova-knowledge/`, commit the regenerated `index.json`/`manifest.json` (the index is bundled into the server build, so no database or file access is needed at runtime).
2. On Vercel set, as *server* environment variables (not `NEXT_PUBLIC_*`): `GEMINI_API_KEY` and optionally `OPENROUTER_API_KEY`. Leave them unset to run in offline mode.
3. `GET /api/nova/health` reports providers (configured / breaker state — never keys), knowledge stats and in-memory metrics.
4. Route runs on the Node.js runtime; request bodies are capped at 8 KB.
5. Limits are instance-local (rate limiter, cache, breaker, metrics). For strict global limits put the platform firewall/rate limiting in front, or move those stores to a shared service.
6. Verify offline behaviour at any time with `NOVA_DISABLE_LLM=1`.
