import { Project } from "@/types/project";

export const projects: Project[] = [
  // COMPLETED PROJECTS
  {
    id: "talentlens",
    name: "TalentLens",
    description:
      "Resume intelligence and candidate discovery platform using semantic search, embeddings, vector retrieval, and candidate ranking.",
    tech: [
      "FastAPI",
      "Python",
      "RAG",
      "Sentence Transformers",
      "Pinecone",
      "Semantic Search",
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
      "Financial compliance and risk intelligence platform using document processing, RAG, semantic search, and CrewAI-based agent orchestration.",
    tech: [
      "Python",
      "FastAPI",
      "CrewAI",
      "RAG",
      "Pinecone",
      "PostgreSQL",
      "Document Processing",
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
      "Full-stack airline reservation and ticketing platform with flight search, booking, payments, ticket generation, and boarding pass functionality.",
    tech: [
      "Java",
      "Spring Boot",
      "React",
      "PostgreSQL",
      "REST APIs",
      "Docker",
      "JWT",
      "PDF/QR",
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
      "AI-powered software architecture review platform that analyzes repositories, identifies architectural issues, and produces actionable engineering insights.",
    tech: [
      "Python",
      "FastAPI",
      "Repository Analysis",
      "System Design",
      "OpenAI",
      "Code Intelligence",
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
      "Full-stack SaaS platform for discovering, building, and managing reusable developer kits with authentication, subscriptions, and billing.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Supabase",
      "PostgreSQL",
      "SaaS",
      "Authentication",
      "Subscriptions",
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
      "Full-stack CRM and marketing automation platform for lead management, workflow automation, and sales operations.",
    tech: ["Next.js", "TypeScript", "React", "PostgreSQL", "Supabase", "OpenAI", "Automation"],
    thumbnail: "/images/crm(thumbnail).png",
    github: "https://github.com/shreyad2806/LawGPT-CRM",
    externalLink: "https://drive.google.com/file/d/18RrSipRNnuMleit-CbmXPcd3z_zfen1G/view?usp=sharing",
    status: "completed",
    slug: "lawgpt-crm",
  },
  {
    id: "ai-tech-stack-recommender",
    name: "AI Tech Stack Recommender",
    description:
      "Technology stack recommendation platform that analyzes application requirements and recommends suitable technologies and architecture choices.",
    tech: ["FastAPI", "React", "Gemini", "Python", "PostgreSQL"],
    thumbnail: "/images/stack(thumbnail).png",
    github: "https://github.com/shreyad2806/Ai-tech-stack-recommender",
    status: "completed",
    slug: "ai-tech-stack-recommender",
  },
  {
    id: "reflex-ninja",
    name: "Reflex Ninja",
    description:
      "Native Android reflex game built with Kotlin, featuring timed gameplay, scoring, and interactive game mechanics.",
    tech: ["Kotlin", "Android", "Android Studio", "Game Development"],
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
      "AI developer tool for turning agent-generated and rapidly evolving codebases into reusable, maintainable software through debugging, codebase analysis, and repository intelligence.",
    tech: [
      "Python",
      "FastAPI",
      "LangGraph",
      "PostgreSQL",
      "pgvector",
      "Developer Tools",
      "Repository Intelligence",
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
