"use client";

import { usePathname, useRouter } from "next/navigation";
import { BadgeCheck, Briefcase, FolderGit2, GraduationCap, Trophy, UserRound, FileText } from "lucide-react";
import type { Source } from "@/lib/nova/types";

const icon = (path: string) => {
  const c = path.split("/")[0];
  if (c === "projects") return FolderGit2;
  if (c === "experience") return Briefcase;
  if (c === "education") return GraduationCap;
  if (c === "achievements") return Trophy;
  if (c === "profile") return UserRound;
  return FileText;
};
const kind = (s: Source) => (s.path.startsWith("projects/") ? "Project notes" : s.path.startsWith("experience/") ? "Resume · experience" : s.path.startsWith("education/") ? "Resume · education" : s.path.startsWith("achievements/") ? "Resume · achievements" : s.path.startsWith("skills/") ? "Resume · skills" : "Portfolio notes");

/** Compact numbered chips; expand for source cards that link to the page the notes came from. */
export default function NovaSources({ sources, onNavigate }: { sources: Source[]; onNavigate?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  if (!sources.length) return null;
  function open(e: React.MouseEvent, href?: string) {
    if (!href || href.startsWith("http")) return;
    e.preventDefault(); onNavigate?.();
    const [path, hash] = href.split("#");
    if (hash && (path === "" || path === pathname)) { document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    router.push(href);
  }
  return (
    <details className="nv-sources">
      <summary><span>Sources</span>{sources.map((s, i) => <b key={s.path} className="nv-chip" aria-hidden="true">{i + 1}</b>)}</summary>
      <ol className="nv-cards">
        {sources.map((s, i) => {
          const Icon = icon(s.path);
          const body = (<>
            <span className="nv-card-n">{i + 1}</span>
            <Icon size={15} aria-hidden="true" />
            <span className="nv-card-t"><b>{s.title}</b><small>{kind(s)}{s.section ? ` · ${s.section}` : ""}</small></span>
            {s.verified && <BadgeCheck size={14} className="nv-ok" aria-label="Verified" />}
          </>);
          return <li key={s.path}>{s.href ? <a href={s.href} onClick={(e) => open(e, s.href)} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{body}</a> : <div>{body}</div>}</li>;
        })}
      </ol>
    </details>
  );
}
