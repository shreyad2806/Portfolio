/** Central configuration. All secrets come from server-side environment variables only. */
const num = (v: string | undefined, d: number) => (v && !Number.isNaN(Number(v)) ? Number(v) : d);

export const novaConfig = {
  retrieval: {
    topK: num(process.env.NOVA_TOP_K, 5),
    /** Below this confidence Nova abstains instead of answering. */
    minConfidence: num(process.env.NOVA_MIN_CONFIDENCE, 0.34),
    maxContextChars: num(process.env.NOVA_MAX_CONTEXT_CHARS, 5200),
  },
  llm: {
    timeoutMs: num(process.env.NOVA_LLM_TIMEOUT_MS, 15000),
    totalBudgetMs: num(process.env.NOVA_LLM_BUDGET_MS, 22000),
    maxRetries: num(process.env.NOVA_LLM_RETRIES, 2),
    maxOutputTokens: num(process.env.NOVA_MAX_OUTPUT_TOKENS, 520),
    temperature: num(process.env.NOVA_TEMPERATURE, 0.3),
    /** Comma separated provider order, e.g. "gemini,openrouter". Set NOVA_DISABLE_LLM=1 to force offline mode. */
    order: (process.env.NOVA_PROVIDERS ?? "gemini,openrouter").split(",").map((s) => s.trim()).filter(Boolean),
    disabled: process.env.NOVA_DISABLE_LLM === "1",
  },
  gemini: { apiKey: process.env.GEMINI_API_KEY, model: process.env.GEMINI_MODEL ?? "gemini-2.0-flash" },
  openrouter: { apiKey: process.env.OPENROUTER_API_KEY, model: process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.3-70b-instruct:free" },
  breaker: { failureThreshold: num(process.env.NOVA_BREAKER_FAILURES, 3), windowMs: 60_000, cooldownMs: num(process.env.NOVA_BREAKER_COOLDOWN_MS, 60_000) },
  rateLimit: { perMinute: num(process.env.NOVA_RATE_PER_MIN, 12), perHour: num(process.env.NOVA_RATE_PER_HOUR, 80) },
  cache: { ttlMs: num(process.env.NOVA_CACHE_TTL_MS, 24 * 3600_000), max: 300 },
  input: { maxMessageChars: 600, maxHistoryTurns: 6, maxHistoryChars: 700 },
} as const;
