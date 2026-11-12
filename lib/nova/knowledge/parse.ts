import type { Chunk, KnowledgeDoc } from "../types";
import { sha1Hex, slugify } from "./text";

/** Parse a Markdown document with a simple YAML-ish front-matter block. */
export function parseDocument(raw: string, sourcePath: string): KnowledgeDoc {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  let body = raw;
  if (m) {
    body = m[2];
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
      if (kv) meta[kv[1]] = kv[2].trim();
    }
  }
  const tags = (meta.tags ?? "").replace(/^\[|\]$/g, "").split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
  const h1 = body.match(/^#\s+(.+)$/m)?.[1];
  const title = meta.title || h1 || sourcePath;
  return {
    document_id: slugify(sourcePath.replace(/\.[a-z]+$/i, "")),
    title,
    category: meta.category || sourcePath.split("/")[0] || "general",
    source: meta.source || sourcePath,
    source_path: sourcePath,
    updated_at: meta.updated || "unknown",
    verified: (meta.verified ?? "false").toLowerCase() === "true",
    tags,
    body: body.trim(),
    hash: sha1Hex(raw),
  };
}

/** Strip Markdown noise but keep structure that matters (headings are handled by the chunker). */
export function cleanMarkdown(s: string): string {
  return s
    .replace(/```[\s\S]*?```/g, (b) => b.replace(/```\w*\n?/g, ""))
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const MAX = 900;
const MIN = 260;

interface Section { path: string[]; lines: string[] }

/**
 * Semantic chunking: split on Markdown headings first, then on paragraph / list-item boundaries.
 * Tiny sibling sections are merged; oversize sections are split without cutting a list item or sentence in half.
 */
export function chunkDocument(doc: KnowledgeDoc): Omit<Chunk, "vector">[] {
  const sections: Section[] = [];
  let stack: string[] = [];
  let cur: Section = { path: [], lines: [] };
  for (const line of doc.body.split(/\r?\n/)) {
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      if (cur.lines.join("").trim()) sections.push(cur);
      const depth = h[1].length;
      stack = stack.slice(0, depth - 1);
      stack[depth - 1] = cleanMarkdown(h[2]);
      cur = { path: stack.filter(Boolean), lines: [] };
    } else cur.lines.push(line);
  }
  if (cur.lines.join("").trim()) sections.push(cur);

  // Break each section into units (paragraphs / list items) then pack to <= MAX chars.
  const packed: { heading: string; text: string }[] = [];
  for (const s of sections) {
    const heading = s.path.slice(1).join(" › ");
    const units = cleanMarkdown(s.lines.join("\n")).split(/\n(?=\s*(?:[-*]|\d+\.)\s)|\n{2,}/).map((u) => u.trim()).filter(Boolean);
    let buf = "";
    for (const u of units) {
      if (buf && (buf + "\n" + u).length > MAX) { packed.push({ heading, text: buf }); buf = ""; }
      if (u.length > MAX) {
        for (const part of u.split(/(?<=[.!?])\s+/)) {
          if (buf && (buf + " " + part).length > MAX) { packed.push({ heading, text: buf }); buf = ""; }
          buf = buf ? buf + " " + part : part;
        }
      } else buf = buf ? buf + "\n" + u : u;
    }
    if (buf) packed.push({ heading, text: buf });
  }
  // Merge tiny neighbours that share a heading.
  const merged: { heading: string; text: string }[] = [];
  for (const p of packed) {
    const last = merged[merged.length - 1];
    if (last && (last.text.length < MIN || p.text.length < MIN / 2) && last.text.length + p.text.length < MAX) {
      last.text += "\n" + p.text;
      if (last.heading !== p.heading) last.heading = last.heading || p.heading;
    } else merged.push({ ...p });
  }
  return merged.map((m, i) => ({
    chunk_id: `${doc.document_id}#${String(i + 1).padStart(2, "0")}`,
    document_id: doc.document_id,
    title: doc.title,
    category: doc.category,
    source_path: doc.source_path,
    section_heading: m.heading,
    tags: doc.tags,
    verified: doc.verified,
    updated_at: doc.updated_at,
    text: m.text,
  }));
}

/** Text that is embedded / keyword-indexed: contextualised with title, heading and tags. */
export function indexText(c: Pick<Chunk, "title" | "section_heading" | "tags" | "text">): string {
  return `${c.title}. ${c.section_heading}. ${c.tags.join(" ")}. ${c.text}`;
}
