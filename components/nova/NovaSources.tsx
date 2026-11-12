import { BadgeCheck, CircleHelp } from "lucide-react";
import type { Source } from "@/lib/nova/types";

export default function NovaSources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <details className="nv-sources">
      <summary>Sources ({sources.length})</summary>
      <ol>
        {sources.map((s, i) => (
          <li key={s.path}>
            <span className="nv-src-n">{i + 1}</span>
            <span className="nv-src-t">{s.title}{s.section ? ` › ${s.section}` : ""}</span>
            {s.verified ? <BadgeCheck size={13} aria-label="Verified" /> : <CircleHelp size={13} aria-label="Unverified" />}
          </li>
        ))}
      </ol>
    </details>
  );
}
