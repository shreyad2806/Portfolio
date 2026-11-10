"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Quote } from "lucide-react";
import { ExperienceItem } from "@/data/experience";
import { iconOf, kindOf } from "./kinds";

interface ExperienceContentProps {
  data: ExperienceItem;
  index: number;
  total: number;
  prev?: ExperienceItem;
  next?: ExperienceItem;
  onNavigate: (id: string) => void;
}

const up = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: d } });

export default function ExperienceContent({ data, index, total, prev, next, onNavigate }: ExperienceContentProps) {
  const kind = kindOf(data.icon);
  const Icon = iconOf(data.icon);

  return (
    <motion.div key={data.id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="jr-detail" style={{ ["--kind" as string]: kind.color }}>
      <section className="jr-hero card-surface">
        <div className="jr-hero-copy">
          <div className="jr-chips">
            <span className="jr-chip jr-chip--kind"><i />{kind.label}</span>
            <span className="jr-chip">{data.year}</span>
            <span className="jr-chip jr-chip--count">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          </div>
          <h2>{data.title}</h2>
          <p className="jr-sub">{data.subtitle}</p>
          <p className="jr-desc">{data.description}</p>
        </div>
        <div className="jr-art" aria-hidden="true">
          <span className="jr-art-glow" /><span className="jr-art-ring jr-art-ring--a" /><span className="jr-art-ring jr-art-ring--b" />
          <span className="jr-art-core"><Icon size={46} strokeWidth={1.3} /></span>
          <i className="jr-art-dot jr-art-dot--1" /><i className="jr-art-dot jr-art-dot--2" />
        </div>
      </section>

      <div className="jr-two">
        {data.focusAreas && (
          <motion.section {...up(0.1)} className="jr-panel card-surface">
            <h3>Focus Areas</h3>
            <div className="jr-tags">{data.focusAreas.map((a) => <span key={a} className="chip">{a}</span>)}</div>
          </motion.section>
        )}
        {data.highlights && (
          <motion.section {...up(0.16)} className="jr-panel card-surface">
            <h3>Highlights</h3>
            <ol className="jr-hl">
              {data.highlights.map((h, i) => <li key={h}><b>{String(i + 1).padStart(2, "0")}</b>{h}</li>)}
            </ol>
          </motion.section>
        )}
      </div>

      {data.contributions && data.contributions.length > 0 && (
        <motion.section {...up(0.2)} className="jr-panel card-surface">
          <h3>Recent Contributions</h3>
          <ul className="jr-contrib">
            {data.contributions.map((c) => (
              <li key={c.title}>
                <span className="jr-contrib-dot" />
                <div><b>{c.title}</b><p>{c.description}</p><small>{c.date}</small></div>
                <ExternalLink size={14} />
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      <div className="jr-two">
        {data.checklist && (
          <motion.section {...up(0.24)} className="jr-panel card-surface">
            <h3>What I Do</h3>
            <ul className="jr-check">
              {data.checklist.map((c) => <li key={c}><span><Check size={13} strokeWidth={3} /></span>{c}</li>)}
            </ul>
          </motion.section>
        )}
        {data.quote && (
          <motion.section {...up(0.3)} className="jr-quote card-surface">
            <Quote size={26} />
            <p>{data.quote}</p>
            <small>— Shreya Dubey</small>
          </motion.section>
        )}
      </div>

      <motion.nav {...up(0.34)} className="jr-nav" aria-label="Journey navigation">
        <button type="button" disabled={!prev} onClick={() => prev && onNavigate(prev.id)} className="jr-nav-btn">
          <ArrowLeft size={16} /><span><small>Previous stop</small>{prev?.title ?? "Start of the journey"}</span>
        </button>
        <button type="button" disabled={!next} onClick={() => next && onNavigate(next.id)} className="jr-nav-btn jr-nav-btn--next">
          <span><small>Next stop</small>{next?.title ?? "You're up to date"}</span><ArrowRight size={16} />
        </button>
      </motion.nav>
    </motion.div>
  );
}
