import { Project } from "@/types/project";

export const projects: Project[] = [
  // DONE PROJECTS
  {
    id: "talentlens",
    name: "TalentLens",
    description: "Production Resume Intelligence Platform",
    tech: ["RAG", "FastAPI", "Python", "Pinecone", "Sentence Transformers"],
    badge: "Featured",
    github: "https://github.com/shreyad2806/TalentLens",
    status: "done",
    slug: "talentlens",
  },
  {
    id: "ai-tech-stack-recommender",
    name: "AI Tech Stack Recommender",
    description: "LLM-powered technology recommendation platform.",
    tech: ["React", "FastAPI", "Gemini", "PostgreSQL", "JWT"],
    github: "https://github.com/shreyad2806/Ai-tech-stack-recommender",
    status: "done",
    slug: "ai-tech-stack-recommender",
  },
  {
    id: "lawgpt-crm",
    name: "LawGPT CRM",
    description: "AI-powered CRM & Marketing Automation Platform.",
    tech: ["Next.js", "PostgreSQL", "OpenAI", "n8n"],
    github: "https://github.com/shreyad2806/LawGPT-CRM",
    status: "done",
    slug: "lawgpt-crm",
  },
  {
    id: "kodexa",
    name: "Kodexa",
    description: "Workflow automation platform for business operations.",
    tech: ["Python", "n8n", "PostgreSQL", "Docker"],
    github: "https://github.com/shreyad2806/Kodexa",
    status: "done",
    slug: "kodexa",
  },
  {
    id: "complytai",
    name: "ComplytAI",
    description: "Financial Compliance & Risk Intelligence Platform.",
    tech: ["Next.js", "Pinecone", "Ollama", "Python"],
    github: "https://github.com/shreyad2806/ComplytAI",
    status: "done",
    slug: "complytai",
  },
  {
    id: "reflex-ninja",
    name: "Reflex Ninja",
    description: "AI Coding Assistant",
    tech: ["Python", "FastAPI", "VS Code", "Ollama"],
    github: "https://github.com/shreyad2806/Reflex-Ninja",
    status: "done",
    slug: "reflex-ninja",
  },
  // UPCOMING
  {
    id: "contextos",
    name: "ContextOS",
    description: "Building production AI infrastructure for context-aware systems.",
    tech: ["LangGraph", "PostgreSQL", "Redis"],
    badge: "In Progress",
    status: "upcoming",
    slug: "contextos",
  },
  {
    id: "aiso",
    name: "AI System Optimizer (AISO)",
    description: "Platform for monitoring, evaluating and optimizing AI systems in production.",
    tech: ["Python", "LangChain", "OpenTelemetry"],
    badge: "In Progress",
    status: "upcoming",
    slug: "aiso",
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
