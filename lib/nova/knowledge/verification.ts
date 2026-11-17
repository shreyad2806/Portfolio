import raw from "@/nova-knowledge/verification.json";

export type VerificationStatus = "verified" | "conflict" | "unverified" | "needs-human";
export interface VerificationRecord {
  id: string; status: VerificationStatus; docs: string[]; topic: string; statement: string; sources: string[];
  nova_behavior: string; public_note?: string; show_with?: string[]; action_for_human: string;
}
export const VERIFICATION = raw as unknown as { policy_version: number; records: VerificationRecord[] };

/**
 * Public, visitor-safe notes for the documents an answer cites. Conflicts and unverified-but-related facts are
 * disclosed instead of being silently resolved or silently dropped. Internal fields (statement, action) never leave the server.
 */
export function publicNotes(paths: string[]): string[] {
  const set = new Set(paths);
  const out: string[] = [];
  for (const r of VERIFICATION.records) {
    if (!r.public_note) continue;
    if ([...r.docs, ...(r.show_with ?? [])].some((d) => set.has(d)) && !out.includes(r.public_note)) out.push(r.public_note);
  }
  return out;
}
