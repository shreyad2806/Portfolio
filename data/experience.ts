export interface ExperienceItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  focusAreas?: string[];
  highlights?: string[];
  quote?: string;
  contributions?: {
    title: string;
    description: string;
    date: string;
  }[];
  checklist?: string[];
  status?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "current",
    year: "2026 – Present",
    title: "Agentic AI & Inference Engineering",
    subtitle: "Current focus · Building reliable, production-oriented AI systems.",
    icon: "Rocket",
    description: "Hands-on with LangGraph, CrewAI, MCP, RAG and backend services. Currently going deeper into the engineering behind capable agents: harness design, tool execution, state and context management, evaluations, observability, and efficient model inference. The goal is to understand the full system around a model—not just the prompt.",
    focusAreas: [
      "Agent harness engineering",
      "Agent orchestration & tool use",
      "LLM inference & serving",
      "Evaluation & observability"
    ],
    highlights: [
      "Hands-on orchestration: LangGraph and CrewAI; frameworks being evaluated: OpenAI Agents SDK, Claude Agent SDK, Pydantic AI and Google ADK",
      "Agent harness concepts: LangChain Deep Agents, tool loops, context management, sandboxing, retries and human approval",
      "Workflow design: durable state, checkpoints, delegation and human-in-the-loop approvals",
      "Inference systems to explore: vLLM, SGLang, TensorRT-LLM, continuous batching, KV-cache, quantization and speculative decoding",
      "Tracing and evaluation: Langfuse, Arize Phoenix, OpenTelemetry and repeatable agent evaluations",
      "Interoperability: MCP and emerging agent-to-agent patterns"
    ],
    checklist: [
      "Build agents with explicit control over tools, state and failure paths",
      "Study safe execution, sandboxing and approval boundaries",
      "Understand latency, throughput, memory and serving trade-offs",
      "Measure agent quality with traces, evaluations and regression tests"
    ],
    quote: "A useful agent is not just intelligent. It is observable, bounded, and dependable."
  },
  {
    id: "startupcrafters-intern",
    year: "Aug 2026 – Present",
    title: "Software Engineer Intern",
    subtitle: "StartupCrafters",
    icon: "Briefcase",
    description: "Investigating repository-level failures, reproducing bugs, tracing root causes through logs and PostHog events, and improving application reliability through code changes, pull requests and testing.",
    focusAreas: [
      "Production debugging",
      "Root-cause analysis",
      "PostHog & application observability",
      "Testing & reliability"
    ],
    highlights: [
      "Reproduce and isolate bugs across application workflows",
      "Use logs and PostHog events to investigate production behaviour",
      "Trace failures to their underlying code paths and dependencies",
      "Implement fixes and submit reviewable GitHub pull requests",
      "Validate changes with focused tests and regression checks"
    ],
    checklist: [
      "Investigate real application issues",
      "Turn debugging findings into targeted fixes",
      "Collaborate through pull requests and code review",
      "Improve reliability through testing"
    ],
    quote: "Good engineering starts with understanding why something failed."
  },
  {
    id: "lawgpt-intern",
    year: "May 2026 – Jun 2026",
    title: "AI Engineer Intern",
    subtitle: "LawGPT",
    icon: "Briefcase",
    description: "Developed an AI-powered legal marketing CRM for lead discovery, qualification, engagement tracking, content generation and workflow automation. Worked across OCR, NLP, REST APIs and Supabase-backed application workflows.",
    focusAreas: [
      "Applied AI workflows",
      "OCR & NLP",
      "CRM and backend integration",
      "Workflow automation"
    ],
    highlights: [
      "Built workflows for lead discovery and qualification",
      "Worked on engagement tracking and CRM data flows",
      "Integrated OCR and NLP capabilities into application workflows",
      "Connected frontend features with REST APIs and Supabase",
      "Supported AI-assisted content generation and automation"
    ],
    checklist: [
      "Translate business workflows into AI-assisted features",
      "Integrate data and model-driven application flows",
      "Build and connect backend APIs",
      "Ship usable product functionality"
    ],
    quote: "AI becomes valuable when it fits into a workflow people already need."
  },
  {
    id: "sih",
    year: "2025",
    title: "Smart India Hackathon",
    subtitle: "National Runner-up",
    icon: "Trophy",
    description: "Recognized as a national runner-up at Smart India Hackathon 2025. The experience involved working with a team to turn a real-world problem statement into a practical solution under hackathon constraints.",
    focusAreas: [
      "Problem solving",
      "Rapid prototyping",
      "Team collaboration",
      "Solution design"
    ],
    highlights: [
      "National Runner-up · Smart India Hackathon 2025",
      "Collaborated to shape and present a solution",
      "Worked through rapid iteration and delivery constraints"
    ],
    checklist: [
      "Understand the problem before choosing a solution",
      "Prototype and iterate quickly",
      "Work effectively across a team",
      "Communicate technical decisions"
    ],
    quote: "The best ideas become meaningful when a team can execute them."
  },
  {
    id: "et-genai",
    year: "2025",
    title: "ET GenAI Hackathon",
    subtitle: "Finalist",
    icon: "Sparkles",
    description: "Reached the finalist stage of the ET GenAI Hackathon 2025, exploring how generative AI can be applied to solve practical problems and deliver a useful product experience.",
    focusAreas: [
      "Generative AI",
      "Rapid experimentation",
      "Product thinking",
      "Technical presentation"
    ],
    highlights: [
      "Finalist · ET GenAI Hackathon 2025",
      "Explored a practical generative-AI use case",
      "Worked through prototyping and solution communication"
    ],
    checklist: [
      "Identify a meaningful AI use case",
      "Prototype and validate the idea",
      "Balance technical feasibility with user value"
    ],
    quote: "Experimentation is how promising ideas become working systems."
  },
  {
    id: "nandahack",
    year: "2025",
    title: "NandaHack",
    subtitle: "HCLTech × MIT Media Lab",
    icon: "Sparkles",
    description: "Participated in NandaHack, an innovation and building experience associated with HCLTech and MIT Media Lab.",
    focusAreas: [
      "Innovation",
      "Collaborative building",
      "Rapid learning",
      "Problem exploration"
    ],
    highlights: [
      "NandaHack participant",
      "HCLTech × MIT Media Lab"
    ],
    checklist: [
      "Explore unfamiliar problem spaces",
      "Collaborate with other builders",
      "Learn through hands-on experimentation"
    ],
    quote: "New perspectives often come from building alongside other people."
  },
  {
    id: "opensource",
    year: "2025 – Present",
    title: "Open Source Contributor",
    subtitle: "Agentic AI & developer tooling",
    icon: "Github",
    description: "Exploring and contributing to collaborative codebases around agentic AI and developer tooling. Interested in how real projects are structured, reviewed, tested and maintained—not just how they work in a demo.",
    focusAreas: [
      "Agentic AI tooling",
      "Repository-level engineering",
      "Git & pull-request workflows",
      "Developer experience"
    ],
    highlights: [
      "Contributor to an agentic AI platform",
      "Work with collaborative GitHub workflows",
      "Focus on readable changes, testing and maintainability"
    ],
    checklist: [
      "Understand an existing codebase before changing it",
      "Make focused, reviewable contributions",
      "Learn from maintainers and code review"
    ],
    quote: "Open source is a way to learn in public and make software better together."
  },
  {
    id: "technomech-president",
    year: "2025 – Present",
    title: "President",
    subtitle: "Technomech Club · VIT Bhopal",
    icon: "Users",
    description: "Leading the university technical club, coordinating student teams, organizing technical activities and helping build a community around engineering and technology.",
    focusAreas: [
      "Technical leadership",
      "Community building",
      "Event coordination",
      "Mentorship"
    ],
    highlights: [
      "President of Technomech Club",
      "Coordinate technical activities and student participation",
      "Support peer learning and community initiatives"
    ],
    checklist: [
      "Coordinate people around shared goals",
      "Create opportunities for peer learning",
      "Communicate clearly and follow through"
    ],
    quote: "Leadership is creating the conditions for other people to do their best work."
  },
  {
    id: "education",
    year: "Sep 2023 – May 2027",
    title: "B.Tech · Computer Science & Engineering",
    subtitle: "VIT Bhopal University · CGPA 8.24 / 10",
    icon: "FolderGit2",
    description: "Building a foundation in computer science while exploring backend engineering, AI/ML systems, software architecture and the infrastructure behind intelligent applications.",
    focusAreas: [
      "Computer science fundamentals",
      "Algorithms & data structures",
      "Backend engineering",
      "AI/ML systems"
    ],
    highlights: [
      "B.Tech in Computer Science & Engineering",
      "VIT Bhopal University",
      "CGPA: 8.24 / 10"
    ],
    checklist: [
      "Strengthen computer science fundamentals",
      "Apply concepts through projects",
      "Connect theory with production engineering"
    ],
    quote: "The strongest foundation is one you keep putting to work."
  }
];
