import { Minus, RotateCcw, Sparkles, X, ChevronUp } from "lucide-react";

interface Props { minimized: boolean; canClear: boolean; onMinimize: () => void; onClose: () => void; onClear: () => void; titleId: string }

export default function NovaHeader({ minimized, canClear, onMinimize, onClose, onClear, titleId }: Props) {
  return (
    <header className="nv-head">
      <span className="nv-avatar" aria-hidden="true"><Sparkles size={16} /></span>
      <div className="nv-title">
        <h2 id={titleId}>Nova</h2>
        <p><i aria-hidden="true" /> Shreya&apos;s AI companion</p>
      </div>
      <div className="nv-ctrl">
        <button type="button" onClick={onClear} disabled={!canClear} aria-label="Clear conversation" title="Clear conversation"><RotateCcw size={15} /></button>
        <button type="button" onClick={onMinimize} aria-label={minimized ? "Expand Nova" : "Minimize Nova"} title={minimized ? "Expand" : "Minimize"}>{minimized ? <ChevronUp size={16} /> : <Minus size={16} />}</button>
        <button type="button" onClick={onClose} aria-label="Close Nova" title="Close"><X size={16} /></button>
      </div>
    </header>
  );
}
