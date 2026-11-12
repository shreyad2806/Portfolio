import { Info } from "lucide-react";
import type { UiMessage } from "./useNova";
import NovaMarkdown from "./NovaMarkdown";
import NovaNavigationAction from "./NovaNavigationAction";
import NovaSources from "./NovaSources";

export default function NovaMessage({ m, onNavigate }: { m: UiMessage; onNavigate: () => void }) {
  if (m.role === "user") return <div className="nv-msg nv-msg--user">{m.text}</div>;
  return (
    <div className={`nv-msg nv-msg--assistant ${m.error ? "nv-msg--error" : ""}`}>
      <div className="nv-md"><NovaMarkdown text={m.text} /></div>
      {m.notice && <p className="nv-notice"><Info size={13} aria-hidden="true" /> {m.notice}</p>}
      {m.actions && m.actions.length > 0 && <div className="nv-actions">{m.actions.map((a) => <NovaNavigationAction key={a.href + a.label} action={a} onNavigate={onNavigate} />)}</div>}
      {m.sources && <NovaSources sources={m.sources} />}
    </div>
  );
}
