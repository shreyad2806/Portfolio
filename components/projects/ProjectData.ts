import { Project } from "@/types/project";

export const projects: Project[] = [
  // COMPLETED PROJECTS
  {
    id: "talentlens",
    name: "TalentLens",
    description:
      "Resume intelligence platform using semantic retrieval and candidate ranking.",
    tech: [
      "Python",
      "FastAPI",
      "RAG",
      "Sentence Transformers",
      "Pinecone",
    ],
    thumbnail: "/images/talentlens(thumbnail).png",
    github: "https://github.com/shreyad2806/TalentLens",
    status: "completed",
    slug: "talentlens",
  },
  {
    id: "complytai",
    name: "ComplytAI",
    description:
      "Compliance platform for document retrieval, risk analysis, and agent workflows.",
    tech: [
      "Next.js",
      "TypeScript",
      "RAG",
      "Pinecone",
      "CrewAI",
      "Ollama",
    ],
    thumbnail: "/images/comply(thumbnail).png",
    github: "https://github.com/shreyad2806/ComplytAI",
    status: "completed",
    slug: "complytai",
  },
  {
    id: "falcon-airlines",
    name: "Falcon Airlines",
    description:
      "Full-stack airline reservation system with booking, payments, and ticketing.",
    tech: [
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Redis",
      "Docker",
      "JWT",
    ],
    thumbnail: "/images/falcon(thumbnail).png",
    github: "https://github.com/shreyad2806/FalconAirlines",
    status: "completed",
    slug: "falcon-airlines",
  },
   {
    id: "architectiq",
    name: "ArchitectIQ",
    description:
      "Repository analysis platform for architecture and engineering insights.",
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React",
      "TypeScript",
      "System Design",
    ],
    thumbnail: "/images/architectiq(thumbnail).png",
    github: "https://github.com/shreyad2806/ArchitectIQ",
    status: "completed",
    slug: "architectiq",
  },
  {
    id: "devforge",
    name: "DevForge",
    description:
      "Full-stack SaaS platform for developer kits, workspaces, and subscriptions.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    thumbnail: "/images/devforge(thumbnail).png",
    github: "https://github.com/shreyad2806/DevForge",
    status: "completed",
    slug: "devforge",
  },
  {
    id: "lawgpt-crm",
    name: "CRM",
    description:
      "Full-stack CRM for lead management, content generation, and sales automation.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "OpenAI"],
    thumbnail: "/images/crm(thumbnail).png",
    github: "https://github.com/shreyad2806/LawGPT-CRM",
    status: "completed",
    slug: "lawgpt-crm",
  },
  {
    id: "ai-tech-stack-recommender",
    name: "AI Tech Stack Recommender",
    description:
      "LLM assistant for technology stack and architecture recommendations.",
    tech: ["FastAPI", "Gemini", "React", "PostgreSQL"],
    thumbnail: "/images/stack(thumbnail).png",
    github: "https://github.com/shreyad2806/Ai-tech-stack-recommender",
    status: "completed",
    slug: "ai-tech-stack-recommender",
  },
  {
    id: "reflex-ninja",
    name: "Reflex Ninja",
    description:
      "Kotlin Android reflex game with timed challenges, scoring, and game modes.",
    tech: ["Kotlin", "Android", "SQLite", "Game Development"],
    thumbnail: "/images/reflex(thumbnail).png",
    github: "https://github.com/shreyad2806/Reflex-Ninja",
    status: "completed",
    slug: "reflex-ninja",
  },

  // CURRENTLY BUILDING
  {
    id: "kodexa",
    name: "Kodexa",
    description:
      "Developer tool for turning AI-generated code into clean, reusable, maintainable, and scalable software.",
    tech: [
      "Python",
      "FastAPI",
      "LangGraph",
      "PostgreSQL",
      "VS Code Extension",
      "Agentic AI",
    ],
    thumbnail: "/images/kodexa(thumbnail).png",
    github: "https://github.com/shreyad2806/Kodexa",
    status: "in-progress",
    slug: "kodexa",
  },
];

export const categories = [
  "All Projects",
  "AI Systems",
  "RAG",
  "Agents",
  "Automation",
  "Developer Tools",
] as const;
