import { Fragment, type ReactNode } from "react";

/**
 * Tiny, safe Markdown subset renderer (paragraphs, lists, **bold**, *italic*, `code`, [n] citations).
 * It builds React elements directly — no innerHTML, no links — so model output can never inject markup.
 */
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*|\[\d{1,2}\])/g;
  let last = 0; let m: RegExpExecArray | null; let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0]; const k = `${keyBase}-${i++}`;
    if (tok.startsWith("**")) out.push(<strong key={k}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith("`")) out.push(<code key={k}>{tok.slice(1, -1)}</code>);
    else if (tok.startsWith("[")) out.push(<sup key={k} className="nv-cite" aria-label={`Source ${tok.slice(1, -1)}`}>{tok.slice(1, -1)}</sup>);
    else out.push(<em key={k}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function NovaMarkdown({ text }: { text: string }) {
  const blocks = text.replace(/\r/g, "").split(/\n{2,}/);
  return (
    <>
      {blocks.map((b, bi) => {
        const lines = b.split("\n").filter((l) => l.trim() !== "");
        if (!lines.length) return null;
        const bullets = lines.every((l) => /^\s*[-*]\s+/.test(l));
        const numbered = lines.every((l) => /^\s*\d+\.\s+/.test(l));
        if (bullets) return <ul key={bi}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^\s*[-*]\s+/, ""), `b${bi}l${i}`)}</li>)}</ul>;
        if (numbered) return <ol key={bi}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^\s*\d+\.\s+/, ""), `b${bi}l${i}`)}</li>)}</ol>;
        return <p key={bi}>{lines.map((l, i) => <Fragment key={i}>{i > 0 && <br />}{inline(l, `b${bi}l${i}`)}</Fragment>)}</p>;
      })}
    </>
  );
}
