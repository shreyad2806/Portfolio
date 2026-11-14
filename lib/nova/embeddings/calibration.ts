import type { Calibration } from "./types";

/** Hash space keeps the original fixed reference (cos 0.45 ≙ "strong match"). */
export const HASH_CALIBRATION: Calibration = { floor: 0, ref: 0.45 };

/**
 * Neural similarity is compressed (unrelated passages often score 0.4–0.6), so raw cosine cannot feed the confidence
 * formula directly. Estimate a floor/reference from the corpus itself: floor = median cosine between chunks of
 * different documents, ref = 95th percentile of that distribution (near-duplicate-topic pairs ≙ strong match).
 */
export function calibrate(vectors: number[][], docIds: string[], cosine: (a: number[], b: number[]) => number): Calibration {
  const sims: number[] = [];
  for (let i = 0; i < vectors.length; i++) for (let j = i + 1; j < vectors.length; j++) if (docIds[i] !== docIds[j]) sims.push(cosine(vectors[i], vectors[j]));
  if (sims.length < 20) return { floor: 0.3, ref: 0.75 };
  sims.sort((a, b) => a - b);
  const q = (p: number) => sims[Math.min(sims.length - 1, Math.floor(p * sims.length))];
  const floor = q(0.5);
  return { floor, ref: Math.max(floor + 0.08, q(0.95)) };
}

export const relevance = (cos: number, c: Calibration) => Math.min(1, Math.max(0, (cos - c.floor) / (c.ref - c.floor)));
