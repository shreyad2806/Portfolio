"use client";

import { usePathname } from "next/navigation";
import { Compass, FlaskConical, Home, Map, Radio, Telescope } from "lucide-react";
import NovaAssistant, { type NovaDestination } from "@/components/NovaAssistant";

const destinations: NovaDestination[] = [
  { id: "basecamp", n: "01", title: "The Basecamp", sub: "About · Skills · Philosophy", panelSub: "Get to know Shreya", target: "skills", color: "#b49aff", icon: Home, reply: "" },
  { id: "buildlab", n: "02", title: "The Build Lab", sub: "Projects · Systems · Demos", panelSub: "Explore her projects", target: "projects", color: "#66e9f4", icon: FlaskConical, reply: "" },
  { id: "journey", n: "03", title: "The Journey", sub: "Experience · Hackathons · Impact", panelSub: "Experience & achievements", target: "journey", color: "#ffc46e", icon: Map, reply: "" },
  { id: "frontier", n: "04", title: "The Frontier", sub: "Explore · Experiments · Learn", panelSub: "Current explorations", target: "focus", color: "#78e5bd", icon: Telescope, reply: "" },
  { id: "connection", n: "05", title: "The Connection Hub", sub: "Contact · Collaborate · Opportunities", panelSub: "Let's collaborate", target: "contact", color: "#f58dc8", icon: Radio, reply: "" },
];

export default function GlobalNova() {
  const pathname = usePathname();
  // The homepage already has Nova integrated into its hero. The navbar button
  // opens that instance; interior pages get this persistent floating instance.
  if (pathname === "/") return null;

  function navigate(id: string) {
    const target = destinations.find((destination) => destination.id === id)?.target ?? "skills";
    window.location.assign(`/#${target}`);
  }

  return (
    <div className="xh-global-nova">
      <NovaAssistant destinations={destinations} onNavigate={navigate} listenForOpen startClosed />
    </div>
  );
}
