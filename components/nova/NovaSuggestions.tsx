export default function NovaSuggestions({ items, onPick, disabled }: { items: string[]; onPick: (q: string) => void; disabled?: boolean }) {
  if (!items.length) return null;
  return (
    <div className="nv-suggest" role="group" aria-label="Suggested questions">
      {items.map((q) => <button key={q} type="button" disabled={disabled} onClick={() => onPick(q)}>{q}</button>)}
    </div>
  );
}
