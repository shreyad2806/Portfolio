import { Fragment, type ReactNode } from "react";

/**
 * Small, safe Markdown subset: headings, paragraphs, bullet / numbered lists (mixed with paragraphs), **bold**,
 * *italic* / _italic_, `code`, [n] citations. Builds React elements directly — no innerHTML, no links — so model
 * output can never inject markup.
 */
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|(?<![\w*])\*[^*\s][^*]*\*(?![\w*])|(?<![\w])_[^_\s][^_]*_(?![\w])|\[\d{1,2}\])/g;
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

type Block = { t: "p"; lines: string[] } | { t: "ul"; items: string[] } | { t: "ol"; items: string[] } | { t: "h"; text: string };

function parse(text: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of text.replace(/\r/g, "").split("\n")) {
    const line = raw.trimEnd();
    const last = blocks[blocks.length - 1];
    if (!line.trim()) { blocks.push({ t: "p", lines: [] }); continue; }
    const h = line.match(/^#{1,4}\s+(.*)$/);
    const ul = line.match(/^\s*[-*•]\s+(.*)$/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (h) blocks.push({ t: "h", text: h[1] });
    else if (ul) { if (last?.t === "ul") last.items.push(ul[1]); else blocks.push({ t: "ul", items: [ul[1]] }); }
    else if (ol) { if (last?.t === "ol") last.items.push(ol[1]); else blocks.push({ t: "ol", items: [ol[1]] }); }
    else if (last?.t === "p" && last.lines.length) last.lines.push(line.trim());
    else blocks.push({ t: "p", lines: [line.trim()] });
  }
  return blocks.filter((b) => !(b.t === "p" && !b.lines.length));
}

export default function NovaMarkdown({ text }: { text: string }) {
  return (
    <>
      {parse(text).map((b, bi) => {
        if (b.t === "h") return <h4 key={bi}>{inline(b.text, `h${bi}`)}</h4>;
        if (b.t === "ul") return <ul key={bi}>{b.items.map((l, i) => <li key={i}>{inline(l, `u${bi}${i}`)}</li>)}</ul>;
        if (b.t === "ol") return <ol key={bi}>{b.items.map((l, i) => <li key={i}>{inline(l, `o${bi}${i}`)}</li>)}</ol>;
        return <p key={bi}>{b.lines.map((l, i) => <Fragment key={i}>{i > 0 && <br />}{inline(l, `p${bi}${i}`)}</Fragment>)}</p>;
      })}
    </>
  );
}
