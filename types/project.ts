export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  thumbnail?: string;
  github?: string;
  externalLink?: string;
  status: "completed" | "in-progress" | "upcoming";
  slug: string;
}

export type ProjectCategory = "All Projects" | "AI Systems" | "RAG" | "Agents" | "Automation" | "Developer Tools";

export type ViewMode = "grid" | "list";
