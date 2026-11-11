import { Retriever } from "@/lib/nova/retrieval/search";
import { localIndex } from "@/lib/nova/knowledge/store";
import { ProviderManager } from "@/lib/nova/providers/manager";
import { TTLCache } from "@/lib/nova/cache";
import { createNova } from "@/lib/nova/engine";
import { novaConfig } from "@/lib/nova/config";
import type { LLMProvider, LLMRequest, Usage } from "@/lib/nova/providers/types";

export const retriever = new Retriever(localIndex);

export function sse(chunks: string[]): Response {
  const enc = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({ start(c) { for (const x of chunks) c.enqueue(enc.encode(`data: ${x}\n\n`)); c.close(); } });
  return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
}

export const fastCfg = { ...novaConfig, llm: { ...novaConfig.llm, disabled: false, maxRetries: 2, totalBudgetMs: 20000, timeoutMs: 5000 } };

export class FakeProvider implements LLMProvider {
  calls = 0; prompts: LLMRequest[] = [];
  constructor(public name: string, private script: (n: number) => string | Error, private configured = true) {}
  isConfigured() { return this.configured; }
  getModelInfo() { return { provider: this.name, model: `${this.name}-model` }; }
  async generate(): Promise<never> { throw new Error("unused"); }
  async healthCheck() { return { ok: true, detail: "ok" }; }
  async *stream(req: LLMRequest, onUsage?: (u: Usage) => void): AsyncGenerator<string, void, void> {
    this.calls++; this.prompts.push(req);
    const r = this.script(this.calls);
    if (r instanceof Error) throw r;
    onUsage?.({ input: 10, output: 5, estimated: false });
    for (const w of r.match(/[\s\S]{1,12}/g) ?? []) yield w;
  }
}

export function makeNova(providers: LLMProvider[], cfg = fastCfg) {
  const mgr = new ProviderManager(providers, cfg, async () => {});
  return { nova: createNova({ retriever, providers: mgr, cache: new TTLCache(50, 60_000), knowledgeVersion: "t" }), mgr };
}
