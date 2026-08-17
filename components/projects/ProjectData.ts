import { Project } from "@/types/project";

export const projects: Project[] = [
  // COMPLETED PROJECTS
  {
    id: "talentlens",
    name: "TalentLens",
    description:
      "AI-powered resume intelligence platform using RAG, hybrid retrieval, semantic search, and vector databases to intelligently rank candidates.",
    tech: ["FastAPI", "Python", "Sentence Transformers", "Pinecone", "RAG"],
    thumbnail: "/images/talentlens.png",
    github: "https://github.com/shreyad2806/TalentLens",
    status: "completed",
    slug: "talentlens",
  },
  {
    id: "ai-tech-stack-recommender",
    name: "AI Tech Stack Recommender",
    description:
      "LLM-powered application that recommends technology stacks, architecture, deployment strategies, and development roadmaps from a project idea.",
    tech: ["FastAPI", "Gemini", "React", "PostgreSQL"],
    thumbnail: "/images/stackmind.png",
    github: "https://github.com/shreyad2806/Ai-tech-stack-recommender",
    status: "completed",
    slug: "ai-tech-stack-recommender",
  },
  {
    id: "lawgpt-crm",
    name: "LawGPT CRM",
    description:
      "AI-powered CRM and marketing automation platform with intelligent lead management, content generation, insights, and workflow automation.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "OpenAI"],
    thumbnail: "/images/crm.png",
    github: "https://github.com/shreyad2806/LawGPT-CRM",
    status: "completed",
    slug: "lawgpt-crm",
  },
  {
    id: "complytai",
    name: "ComplytAI",
    description:
      "AI-powered financial compliance and risk intelligence platform using RAG, document analysis, vector search, and workflow orchestration.",
    tech: ["Next.js", "TypeScript", "Pinecone", "n8n", "Ollama"],
    thumbnail: "/images/complytai.png",
    github: "https://github.com/shreyad2806/ComplytAI",
    status: "completed",
    slug: "complytai",
  },
  {
    id: "falcon-airlines",
    name: "Falcon Airlines",
    description:
      "Enterprise airline reservation system with authentication, booking, ticketing, payments, passenger management, caching, testing, and CI/CD.",
    tech: [
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Redis",
      "Docker",
      "JWT",
    ],
    thumbnail: "/portfolio/images/falcon-airlines.png",
    github: "https://github.com/shreyad2806/FalconAirlines",
    status: "completed",
    slug: "falcon-airlines",
  },
  {
    id: "devforge",
    name: "DevForge",
    description:
      "Full-stack SaaS platform for discovering and building developer kits with authentication, dashboards, premium feature gating, billing, subscriptions, and workspace functionality.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    thumbnail: "/portfolio/images/devforge.png",
    github: "https://github.com/shreyad2806/DevForge",
    status: "completed",
    slug: "devforge",
  },
  {
    id: "reflex-ninja",
    name: "Reflex Ninja",
    description:
      "A native Android reflex game built while learning Kotlin, featuring timed gameplay and real-time score updates.",
    tech: ["Kotlin", "SQLite", "Android Studio"],
    thumbnail: "/images/reflexNinja.png",
    github: "https://github.com/shreyad2806/Reflex-Ninja",
    status: "completed",
    slug: "reflex-ninja",
  },

  // CURRENTLY BUILDING
  {
    id: "kodexa",
    name: "Kodexa",
    description:
      "AI-powered developer tool for repository intelligence, debugging, code comprehension, and context-aware engineering workflows.",
    tech: [
      "Python",
      "FastAPI",
      "LangGraph",
      "PostgreSQL",
      "VS Code Extension",
      "LLMs",
      "Agentic AI",
    ],
    thumbnail: "/images/kodexa.png",
    github: "https://github.com/shreyad2806/Kodexa",
    status: "in-progress",
    slug: "kodexa",
  },

  {
    id: "architectiq",
    name: "ArchitectIQ",
    description:
      "AI-powered platform that reviews software repositories, analyzes backend architecture, detects design issues, and generates actionable engineering insights.",
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React",
      "TypeScript",
      "AI",
      "System Design",
    ],
    thumbnail: "/images/architectiq.png",
    github: "https://github.com/shreyad2806/ArchitectIQ",
    status: "completed",
    slug: "architectiq",
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
