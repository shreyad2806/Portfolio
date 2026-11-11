import { Sparkles } from "lucide-react";

export default function NovaLauncher({ onOpen }: { onOpen: () => void }) {
  return (
    <button type="button" className="nv-launcher" onClick={onOpen} aria-label="Open Nova, Shreya's AI assistant" aria-haspopup="dialog">
      <Sparkles size={20} aria-hidden="true" />
      <span className="nv-launcher-ring" aria-hidden="true" />
    </button>
  );
}
