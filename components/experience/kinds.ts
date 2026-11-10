import { Briefcase, FolderGit2, Github, Network, Rocket, Sparkles, Target, Trophy, Users, type LucideIcon } from "lucide-react";

export const ICONS: Record<string, LucideIcon> = { Rocket, Briefcase, Github, Sparkles, Users, Network, Trophy, FolderGit2 };

type Kind = { label: string; color: string };
const KINDS: Record<string, Kind> = {
  Rocket: { label: "Now", color: "#55d6ff" },
  Briefcase: { label: "Internship", color: "#8b6bff" },
  Sparkles: { label: "Hackathon", color: "#ffc46e" },
  Trophy: { label: "Hackathon", color: "#ffc46e" },
  Users: { label: "Leadership", color: "#6ee7b7" },
  Network: { label: "Community", color: "#7aa2ff" },
  FolderGit2: { label: "Learning", color: "#c084fc" },
  Github: { label: "Open Source", color: "#5eeaff" },
};
export const kindOf = (icon: string): Kind => KINDS[icon] ?? { label: "Milestone", color: "#8b6bff" };
export const iconOf = (icon: string): LucideIcon => ICONS[icon] ?? Target;
