export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  thumbnail?: string;
  badge?: "Featured" | "In Progress";
  github?: string;
  externalLink?: string;
  status: "done" | "upcoming";
  slug: string;
}

export type ProjectCategory = "All Projects" | "AI Systems" | "RAG" | "Agents" | "Automation" | "Developer Tools";

export type ViewMode = "grid" | "list";
