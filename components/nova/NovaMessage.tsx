import { Info, RotateCcw, TriangleAlert } from "lucide-react";
import type { UiMessage } from "./useNova";
import NovaMarkdown from "./NovaMarkdown";
import NovaNavigationAction from "./NovaNavigationAction";
import NovaSources from "./NovaSources";

export default function NovaMessage({ m, onNavigate, onRetry }: { m: UiMessage; onNavigate: () => void; onRetry?: (q: string) => void }) {
  if (m.role === "user") return <div className="nv-msg nv-msg--user">{m.text}</div>;
  return (
    <div className={`nv-msg nv-msg--assistant ${m.error ? "nv-msg--error" : ""}`}>
      <div className="nv-md"><NovaMarkdown text={m.text} /></div>
      {m.interrupted && <p className="nv-notice nv-notice--warn"><TriangleAlert size={13} aria-hidden="true" /> This answer was interrupted.</p>}
      {m.retry && onRetry && <button type="button" className="nv-retry" onClick={() => onRetry(m.retry!)}><RotateCcw size={13} aria-hidden="true" /> Try again</button>}
      {m.details && (
        <details className="nv-more">
          <summary>{m.details.title}</summary>
          <div className="nv-md"><NovaMarkdown text={m.details.markdown} /></div>
        </details>
      )}
      {m.notes?.map((n) => <p key={n} className="nv-note"><Info size={13} aria-hidden="true" /> {n}</p>)}
      {m.notice && <p className="nv-notice"><Info size={13} aria-hidden="true" /> {m.notice}</p>}
      {m.actions && m.actions.length > 0 && <div className="nv-actions">{m.actions.map((a) => <NovaNavigationAction key={a.href + a.label} action={a} onNavigate={onNavigate} />)}</div>}
      {m.sources && <NovaSources sources={m.sources} onNavigate={onNavigate} />}
    </div>
  );
}
