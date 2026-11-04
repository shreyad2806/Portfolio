"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";

const WorldScene = dynamic(() => import("./WorldScene"), {
  ssr: false,
  loading: () => null,
});

export default function WorldCanvas() {
  const handleSelect = useCallback((target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="world-canvas" aria-label="Interactive 3D explorer environment">
      <WorldScene onSelect={handleSelect} />
      <div className="world-canvas-hint" aria-hidden="true">Select a glowing marker to explore</div>
    </div>
  );
}
