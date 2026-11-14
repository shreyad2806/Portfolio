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
  /** Baseline (lexical hash) embedding — always present so offline retrieval never depends on a model. */
  vector: number[];
  /** Optional neural embedding in the space described by IndexFile.neural. */
  nvector?: number[];
}

export interface IndexFile {
  version: 1;
  embedder: string;
  dims: number;
  built_at: string;
  /** Present when chunks carry neural vectors (`nvector`). Queries must use exactly this space. */
  neural?: import("../embeddings/types").NeuralMeta;
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
  /** Best matching document that exists but is unverified (never used as evidence; only to explain an abstention). */
  unverified?: { document_id: string; title: string; category: string; source_path: string };
  hits: Hit[];
  /** 0..1 — how well the best hit answers the query (coverage + similarity). */
  confidence: number;
  diagnostics: { semantic?: "neural" | "hash"; missingEntities?: string[]; queryTerms: string[]; candidates: number; kept: number; durationMs: number; embedder: string; filter?: string };
}

export interface Source { title: string; path: string; section?: string; href?: string; verified: boolean }

export type NavAction = { type: "navigate"; id: string; label: string; href: string } | { type: "link"; label: string; href: string; external?: boolean };

export type AnswerMode = "faq" | "intent" | "cached" | "llm" | "local" | "abstain" | "blocked";

export interface ChatTurn { role: "user" | "assistant"; content: string }

/** Bounded, session-scoped memory: the active project (or the pair being compared) and the last topic. */
export interface ConversationState { project?: string; projects?: string[]; topic?: string }

export interface ChatRequest { message: string; history: ChatTurn[]; state?: ConversationState }

export interface ChatResult {
  text: string;
  mode: AnswerMode;
  sources: Source[];
  actions: NavAction[];
  suggestions: string[];
  state: ConversationState;
  notice?: string;
  /** Visitor-safe disclosures about source conflicts / unverified related facts. */
  notes?: string[];
  /** Expandable technical explanation (progressive disclosure). Always built from verified notes, never from model output. */
  details?: { title: string; markdown: string };
  level?: string;
  meta: { provider?: string; model?: string; latencyMs: number; retrievalMs?: number; chunks?: number; cacheHit?: boolean; fallback?: boolean; tokens?: { input: number; output: number; estimated: boolean } };
}
