"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BUILDING_NOW, EXPLORING_NOW, INTERESTS, JOURNAL } from "@/lib/world/content";
import SceneHeader from "./SceneHeader";

/** Observatory: what is being explored right now, kept apart from standing interests and from the notes/journal. */
export default function FrontierScene({ mode }: { mode: "pinned" | "stacked" }) {
  void mode;
  return (
    <section aria-labelledby="wx-h-frontier" className="wx-scene wx-frontier">
      <SceneHeader id="frontier" blurb="Where the curiosity is pointed right now — and the field notes that come out of it." />
      <div className="wx-fr-grid">
        <div data-reveal className="wx-fr-col">
          <h3>Currently exploring</h3>
          <ul className="wx-chips wx-chips--live">{EXPLORING_NOW.map((x) => <li key={x}>{x}</li>)}</ul>
          <h3>Currently building</h3>
          <ul className="wx-plain">{BUILDING_NOW.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div data-reveal className="wx-fr-col">
          <h3>Standing interests</h3>
          <ul className="wx-plain">{INTERESTS.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div data-reveal className="wx-fr-col">
          <h3>{JOURNAL.title}</h3>
          <p className="wx-fr-note">{JOURNAL.note}</p>
          <ul className="wx-plain">{JOURNAL.articles.map((a) => <li key={a.title}>{a.title} <small>· {a.category} · {a.readTime}</small></li>)}</ul>
          <Link href="/journal" className="wx-link">Open the journal <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
