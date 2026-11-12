export type Category = "profile" | "contact" | "education" | "skills" | "experience" | "projects" | "achievements" | "interests" | "portfolio" | string;

export interface KnowledgeDoc {
  document_id: string;
  title: string;
  category: Category;
  source: string;
  source_path: string;
  updated_at: string;
  verified: boolean;
  tags: string[];
  body: string;
  hash: string;
}

export interface Chunk {
  chunk_id: string;
  document_id: string;
  title: string;
  category: Category;
  source_path: string;
  section_heading: string;
  tags: string[];
  verified: boolean;
  updated_at: string;
  text: string;
  /** Embedding vector (rounded). Empty when the index was built without embeddings. */
  vector: number[];
}

export interface IndexFile {
  version: 1;
  embedder: string;
  dims: number;
  built_at: string;
  documents: { document_id: string; title: string; category: Category; source_path: string; verified: boolean; hash: string; chunks: number }[];
  chunks: Chunk[];
}

export interface Hit {
  chunk: Chunk;
  score: number;
  bm25: number;
  cosine: number;
  coverage: number;
}

export interface Retrieval {
  hits: Hit[];
  /** 0..1 — how well the best hit answers the query (coverage + similarity). */
  confidence: number;
  diagnostics: { missingEntities?: string[]; queryTerms: string[]; candidates: number; kept: number; durationMs: number; embedder: string; filter?: string };
}

export interface Source { title: string; path: string; section?: string; href?: string; verified: boolean }

export type NavAction = { type: "navigate"; id: string; label: string; href: string } | { type: "link"; label: string; href: string; external?: boolean };

export type AnswerMode = "faq" | "intent" | "cached" | "llm" | "local" | "abstain" | "blocked";

export interface ChatTurn { role: "user" | "assistant"; content: string }

export interface ConversationState { project?: string; topic?: string }

export interface ChatRequest { message: string; history: ChatTurn[]; state?: ConversationState }

export interface ChatResult {
  text: string;
  mode: AnswerMode;
  sources: Source[];
  actions: NavAction[];
  suggestions: string[];
  state: ConversationState;
  notice?: string;
  meta: { provider?: string; model?: string; latencyMs: number; retrievalMs?: number; chunks?: number; cacheHit?: boolean; fallback?: boolean; tokens?: { input: number; output: number; estimated: boolean } };
}
