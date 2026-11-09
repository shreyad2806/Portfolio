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
  const selectedData = experienceData.find((item) => item.id === selectedId);

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

        <div className="grid gap-8 lg:grid-cols-[30%_70%]">
          <div className="order-2 lg:order-1">
            <ExperienceTimeline selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <div className="order-1 lg:order-2">{selectedData && <ExperienceContent data={selectedData} />}</div>
        </div>

        <NextDestinations current="journey" />
      </main>
    </div>
  );
}
