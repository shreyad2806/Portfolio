"use client";
import { useState } from "react";
import { Brain, Code2, Database, FlaskConical, Layers, Terminal, type LucideIcon } from "lucide-react";
import { PROFILE, SKILL_DOMAINS } from "@/lib/world/content";
import SceneHeader from "./SceneHeader";

const ICONS: Record<string, LucideIcon> = { Code: Code2, Terminal, Database, FlaskConical, Brain, Layers };
const TONES = ["#b49aff", "#8fa8ff", "#c6a8ff", "#7fe3ee", "#d79bff", "#9ab4ff"];

/** Skill domains are holographic modules around a central observatory. Selection (click / tap / keyboard) reveals the skills — nothing depends on hover. */
export default function BasecampScene({ mode }: { mode: "pinned" | "stacked" }) {
  const [active, setActive] = useState(0);
  const d = SKILL_DOMAINS[active];
  void mode;
  return (
    <section aria-labelledby="wx-h-basecamp" className="wx-scene wx-basecamp">
      <SceneHeader id="basecamp" blurb="Profile, education and the toolkit — the base every build launches from." />
      <div className="wx-bc-grid">
        <div data-reveal className="wx-profile">
          <p className="wx-profile-name">{PROFILE.name}</p>
          <p className="wx-profile-role">{PROFILE.role} · {PROFILE.subtitle}</p>
          <dl>
            <dt>Education</dt>
            <dd>{PROFILE.education.degree}<br /><span>{PROFILE.education.school} · {PROFILE.education.dates}</span></dd>
          </dl>
        </div>
        <div className="wx-observatory" role="group" aria-label="Skill domains">
          <span className="wx-obs-core" aria-hidden="true"><i /></span>
          <ul className="wx-modules">
            {SKILL_DOMAINS.map((s, i) => { const Icon = ICONS[s.icon] ?? Code2; return (
              <li key={s.category} data-reveal>
                <button type="button" aria-pressed={active === i} aria-controls="wx-skill-detail" onClick={() => setActive(i)} onFocus={() => setActive(i)} className="wx-module" style={{ ["--accent" as string]: TONES[i % TONES.length] }}>
                  <Icon size={18} strokeWidth={1.6} aria-hidden="true" /><span>{s.category}</span><small>{s.skills.length}</small>
                </button>
              </li>
            ); })}
          </ul>
        </div>
        <div id="wx-skill-detail" data-reveal className="wx-detail" role="region" aria-live="polite" aria-label={`${d.category} skills`} style={{ ["--accent" as string]: TONES[active % TONES.length] }}>
          <h3>{d.category}</h3>
          <ul className="wx-chips">{d.skills.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
