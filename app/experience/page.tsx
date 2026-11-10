"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import ExperienceContent from "@/components/experience/ExperienceContent";
import { experienceData } from "@/data/experience";
import PageHero from "@/components/theme/PageHero";
import NextDestinations from "@/components/theme/NextDestinations";

export default function ExperiencePage() {
  const [selectedId, setSelectedId] = useState("current");
  const selectedIndex = Math.max(0, experienceData.findIndex((item) => item.id === selectedId));
  const selectedData = experienceData[selectedIndex];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-px mx-auto max-w-[1400px] pb-20">
        <PageHero
          place="journey"
          title={
            <>
              The <span className="th-accent-text" style={{ "--accent": "#ffc46e" } as React.CSSProperties}>Journey</span>
            </>
          }
          description="Internships, hackathons, leadership and open-source work — a timeline of how I've grown as an engineer and what I've shipped along the way."
          stats={[
            { value: String(experienceData.length), label: "chapters" },
            { value: "SIH", label: "national runner-up" },
          ]}
        />

        <div className="jr-layout">
          <div>
            <ExperienceTimeline selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <div className="min-w-0">{selectedData && <ExperienceContent data={selectedData} index={selectedIndex} total={experienceData.length} prev={experienceData[selectedIndex - 1]} next={experienceData[selectedIndex + 1]} onNavigate={setSelectedId} />}</div>
        </div>

        <NextDestinations current="journey" />
      </main>
    </div>
  );
}
