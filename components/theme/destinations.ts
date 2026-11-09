import { FlaskConical, Home, Map, Radio, Telescope, type LucideIcon } from "lucide-react";

export type DestinationId = "basecamp" | "buildlab" | "journey" | "frontier" | "connection";

export interface WorldPlace {
  id: DestinationId;
  n: string;
  title: string;
  tagline: string;
  href: string;
  color: string;
  glow: string;
  icon: LucideIcon;
  island: string;
}

/* The five destinations of the SHREYA.EXE world and the page each one maps to. */
export const PLACES: Record<DestinationId, WorldPlace> = {
  basecamp: { id: "basecamp", n: "01", title: "The Basecamp", tagline: "About · Skills · Philosophy", href: "/", color: "#b49aff", glow: "180,154,255", icon: Home, island: "/images/island-basecamp.webp" },
  buildlab: { id: "buildlab", n: "02", title: "The Build Lab", tagline: "Projects · Systems · Demos", href: "/projects", color: "#66e9f4", glow: "102,233,244", icon: FlaskConical, island: "/images/island-buildlab.webp" },
  journey: { id: "journey", n: "03", title: "The Journey", tagline: "Experience · Hackathons · Impact", href: "/experience", color: "#ffc46e", glow: "255,196,110", icon: Map, island: "/images/island-journey.webp" },
  frontier: { id: "frontier", n: "04", title: "The Frontier", tagline: "Explore · Experiments · Learn", href: "/journal", color: "#78e5bd", glow: "120,229,189", icon: Telescope, island: "/images/island-frontier.webp" },
  connection: { id: "connection", n: "05", title: "The Connection Hub", tagline: "Contact · Collaborate · Opportunities", href: "/contact", color: "#f58dc8", glow: "245,141,200", icon: Radio, island: "/images/island-connection.webp" },
};

export const INTERIOR_ORDER: DestinationId[] = ["buildlab", "journey", "frontier", "connection"];
