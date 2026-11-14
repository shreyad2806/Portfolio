import { localIndex } from "@/lib/nova/knowledge/store";
import { metrics } from "@/lib/nova/observability";
import { getRetrievalStatus } from "@/lib/nova/engine";
import { getProviderManager } from "@/lib/nova/providers/manager";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Operational status. Contains no secrets and no visitor content. */
export async function GET() {
  const providers = getProviderManager().status();
  const docs = localIndex.documents;
  const body = {
    status: "ok",
    offlineCapable: true,
    llmAvailable: providers.some((p) => p.configured && p.breaker !== "open") && process.env.NOVA_DISABLE_LLM !== "1",
    providers,
    knowledge: { documents: docs.length, chunks: localIndex.chunks.length, verifiedDocuments: docs.filter((d) => d.verified).length, unverifiedDocuments: docs.filter((d) => !d.verified).length, embedder: localIndex.embedder, builtAt: localIndex.built_at },
    retrieval: getRetrievalStatus(),
    metrics: metrics.snapshot(),
  };
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
