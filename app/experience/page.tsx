"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import ExperienceContent from "@/components/experience/ExperienceContent";
import { experienceData } from "@/data/experience";

export default function ExperiencePage() {
  const [selectedId, setSelectedId] = useState("current");

  const selectedData = experienceData.find((item) => item.id === selectedId);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container-px mx-auto max-w-7xl py-12">
        <div className="grid lg:grid-cols-[30%_70%] gap-8">
          {/* Left Panel - Timeline */}
          <div className="lg:order-1 order-2">
            <ExperienceTimeline selectedId={selectedId} onSelect={setSelectedId} />
          </div>

          {/* Right Panel - Content */}
          <div className="lg:order-2 order-1">
            {selectedData && <ExperienceContent data={selectedData} />}
          </div>
        </div>
      </main>
    </div>
  );
}
