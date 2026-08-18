export interface ProjectDetailData {
  slug: string;
  name: string;
  badge: string;
  oneLiner: string;
  description: string;
  liveDemo?: string;
  github: string;
  caseStudyPdf?: string;
  techStack: string[];
  heroImage: string;
  
  // Problem Section
  problem: {
    title: string;
    points: string[];
  };
  
  // Motivation Section
  motivations: {
    icon: string;
    title: string;
    description: string;
  }[];
  
  // Architecture Section
  architecture: {
    steps: {
      label: string;
      description: string;
    }[];
  };
  
  // Feature Showcase
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  
  // Engineering Decisions
  decisions: {
    problem: string;
    decision: string;
    why: string;
  }[];
  
  // Challenges
  challenges: {
    problem: string;
    solution: string;
    learning: string;
  }[];
  
  // Development Journey
  journey: {
    phase: string;
    description: string;
  }[];
  
  // Results
  results: {
    label: string;
    value: string;
    description: string;
  }[];
  
  // Learnings
  learnings: {
    title: string;
    description: string;
  }[];
  
  // Roadmap
  roadmap: {
    feature: string;
    status: "planned" | "in-progress" | "completed";
  }[];
  
  // Next Project
  nextProject?: {
    name: string;
    slug: string;
    description: string;
  };
}

export const talentLensData: ProjectDetailData = {
  slug: "talentlens",
  name: "TalentLens",
  badge: "AI Resume Intelligence Platform",
  oneLiner:
    "Resume intelligence platform that combines semantic search, hybrid retrieval, reranking, and structured candidate analysis to accelerate technical hiring.",
  description:
    "TalentLens is an end-to-end recruitment intelligence system that converts unstructured resumes into searchable candidate profiles. It combines document parsing, embeddings, vector search, metadata filtering, hybrid retrieval, and reranking to help recruiters identify relevant candidates faster.",
  github: "https://github.com/shreyad2806/TalentLens",
  techStack: [
    "Python",
    "FastAPI",
    "Sentence Transformers",
    "Pinecone",
    "RAG",
    "Hybrid Search",
    "Cross-Encoder",
    "Redis"
  ],
  heroImage: "/images/talentlens.png",
  
  motivations: [
  {
    icon: "🔍",
    title: "Building Production Retrieval Systems",
    description:
      "Designed a complete retrieval pipeline combining embeddings, vector search, metadata filtering, hybrid retrieval, and reranking."
  },
  {
    icon: "⚙️",
    title: "Engineering an End-to-End AI Product",
    description:
      "Built the ingestion, processing, retrieval, API, caching, and candidate-ranking layers as one integrated application."
  },
  {
    icon: "🚀",
    title: "Solving a Real Hiring Workflow",
    description:
      "Focused on reducing repetitive resume screening while improving candidate discovery beyond traditional keyword-based ATS systems."
  }
],
  
 architecture: {
  steps: [
    {
      label: "Resume Ingestion",
      description: "Upload and process PDF/Word resumes."
    },
    {
      label: "Document Parsing",
      description: "Extract structured candidate information from unstructured documents."
    },
    {
      label: "Semantic Chunking",
      description: "Split resume content into retrieval-friendly semantic sections."
    },
    {
      label: "Embedding Generation",
      description: "Generate dense vector representations using Sentence Transformers."
    },
    {
      label: "Pinecone",
      description: "Store and retrieve candidate vectors at scale."
    },
    {
      label: "Metadata Filtering",
      description: "Filter candidates using structured attributes such as skills and experience."
    },
    {
      label: "Hybrid Retrieval",
      description: "Combine semantic and keyword-based retrieval for better recall."
    },
    {
      label: "Cross-Encoder Reranking",
      description: "Rerank retrieved candidates to improve relevance and precision."
    },
    {
      label: "Candidate Analysis",
      description: "Generate structured candidate relevance and matching insights."
    },
    {
      label: "Recruiter Dashboard",
      description: "Present ranked candidates and search results through the application interface."
    }
  ]
},
  
  features: [
  {
    icon: "📄",
    title: "Resume Parsing",
    description:
      "Extract structured candidate information from PDF and Word resumes."
  },
  {
    icon: "🔎",
    title: "Semantic Candidate Search",
    description:
      "Search candidates by meaning rather than relying only on exact keyword matches."
  },
  {
    icon: "🧩",
    title: "Hybrid Retrieval",
    description:
      "Combine dense semantic retrieval with keyword matching to improve candidate recall."
  },
  {
    icon: "🎯",
    title: "Cross-Encoder Reranking",
    description:
      "Rerank retrieved candidates using a cross-encoder for higher precision."
  },
  {
    icon: "⚙️",
    title: "Metadata Filtering",
    description:
      "Filter candidates by structured attributes such as skills, experience, and location."
  },
  {
    icon: "📊",
    title: "Candidate Ranking",
    description:
      "Surface the most relevant candidates based on job-specific search criteria."
  },
  {
    icon: "💬",
    title: "Natural Language Search",
    description:
      "Describe the ideal candidate in natural language and retrieve matching profiles."
  },
  {
    icon: "⚡",
    title: "Retrieval Caching",
    description:
      "Cache repeated operations to reduce latency and unnecessary computation."
  }
],
  
  decisions: [
    {
      problem: "Which embedding model?",
      decision: "all-MiniLM-L6-v2",
      why: "Fast inference, low memory footprint, and good performance for resume text without the cost of larger models."
    },
    {
      problem: "Vector database choice?",
      decision: "Pinecone",
      why: "Managed service with excellent scalability, built-in hybrid search, and production-ready infrastructure."
    },
    {
      problem: "Backend framework?",
      decision: "FastAPI",
      why: "Async support, automatic API documentation, type hints, and excellent performance for I/O-bound operations."
    },
    {
      problem: "Chunking strategy?",
      decision: "Semantic chunking",
      why: "Preserves context better than fixed-size chunks, leading to more meaningful embeddings and retrieval."
    },
    {
      problem: "Retrieval approach?",
      decision: "Hybrid search",
      why: "Combines semantic understanding with keyword matching for improved recall across different query types."
    },
    {
      problem: "Reranking method?",
      decision: "Cross Encoder",
      why: "Significantly improves precision by re-scoring retrieved documents with a more accurate model."
    }
  ],
  
  challenges: [
    {
      problem: "Resume Parsing Inconsistencies",
      solution: "Built a robust parser with multiple fallback strategies and manual validation for edge cases.",
      learning: "Real-world data is messy; always design for exceptions and have validation pipelines."
    },
    {
      problem: "Embedding Quality Issues",
      solution: "Experimented with multiple models and fine-tuned chunking parameters for optimal representation.",
      learning: "Embedding quality depends on both model choice and how you prepare the input text."
    },
    {
      problem: "LLM Hallucinations",
      solution: "Implemented strict prompt engineering with few-shot examples and output validation.",
      learning: "LLMs need guardrails; always validate outputs and provide clear context in prompts."
    },
    {
      problem: "Slow Retrieval Times",
      solution: "Implemented Redis caching, optimized Pinecone queries, and added async processing.",
      learning: "Performance optimization is critical for user experience; cache aggressively."
    },
    {
      problem: "Prompt Engineering Complexity",
      solution: "Created a systematic approach to prompt design with A/B testing and iteration.",
      learning: "Prompt engineering is an iterative process; measure and test continuously."
    }
  ],
  
  journey: [
    { phase: "Idea", description: "Identified the problem with traditional resume screening and researched RAG solutions." },
    { phase: "Prototype", description: "Built initial MVP with basic semantic search using OpenAI embeddings." },
    { phase: "Basic RAG", description: "Implemented full RAG pipeline with Pinecone and simple retrieval." },
    { phase: "Hybrid Retrieval", description: "Added BM25 keyword search combined with semantic search for better recall." },
    { phase: "Cross Encoder", description: "Integrated cross-encoder reranking for improved precision in results." },
    { phase: "Production Architecture", description: "Built scalable architecture with caching, async processing, and error handling." },
    { phase: "Future Agentic Version", description: "Planning multi-agent system for autonomous candidate evaluation." }
  ],
  
  results: [
    { label: "Resume Search", value: "95% faster", description: "Compared to manual screening processes" },
    { label: "Hybrid Retrieval", value: "Higher relevance", description: "Improved candidate matching accuracy" },
    { label: "Architecture", value: "Production Ready", description: "Scalable and fault-tolerant design" },
    { label: "AI Stack", value: "End-to-End", description: "Complete RAG pipeline implementation" }
  ],
  
  learnings: [
    {
      title: "Production RAG",
      description: "Building RAG for production requires careful consideration of latency, cost, and quality trade-offs."
    },
    {
      title: "Retrieval Quality",
      description: "Retrieval quality is the foundation; invest time in chunking, embedding models, and reranking."
    },
    {
      title: "Evaluation",
      description: "Systematic evaluation with metrics is essential; intuition alone isn't enough for AI systems."
    },
    {
      title: "System Design",
      description: "Design for scale from the start; caching, async processing, and error handling are non-negotiable."
    }
  ],
  
  roadmap: [
    { feature: "Agent Memory", status: "planned" },
    { feature: "Multi-agent evaluation", status: "planned" },
    { feature: "Resume scoring", status: "in-progress" },
    { feature: "Interview simulation", status: "planned" },
    { feature: "Analytics dashboard", status: "planned" }
  ],
  
  nextProject: {
    name: "AI Tech Stack Recommender",
    slug: "ai-tech-stack-recommender",
    description: "LLM-powered technology recommendation platform."
  }
};

export const aiTechStackRecommenderData: ProjectDetailData = {
  slug: "ai-tech-stack-recommender",
  name: "AI Tech Stack Recommender",
  badge: "LLM-Powered Technology Recommendation Platform",
  oneLiner: "LLM-powered platform that recommends complete technology stacks, software architecture, deployment strategy and development roadmap from a natural language project idea.",
  description: "This platform uses LLM reasoning to generate complete, practical technology recommendations in seconds, helping developers make informed decisions about their tech stack.",
  github: "https://github.com/shreyad2806/AI-Tech-Stack-Recommender",
  techStack: ["FastAPI", "React", "Gemini", "Python", "PostgreSQL", "JWT Authentication", "Google Gemini", "Tailwind CSS"],
  heroImage: "/images/stackmind.png",
  
  problem: {
    title: "What problem does this solve?",
    points: [
      "Developers waste hours researching frameworks, databases and cloud services for every new project.",
      "Beginners often choose incompatible technologies or over-engineer simple systems.",
      "Generic tutorials don't account for project-specific requirements or constraints.",
      "Existing tools only answer one question instead of recommending a complete stack."
    ]
  },

  motivations: [
    {
      icon: "🧠",
      title: "Understanding LLM Applications",
      description: "Explore how LLMs can power practical developer tools beyond chat interfaces."
    },
    {
      icon: "⚙️",
      title: "End-to-End Full Stack Development",
      description: "Build a complete product with React, FastAPI, PostgreSQL and Gemini working together."
    },
    {
      icon: "🚀",
      title: "Building Practical Developer Tools",
      description: "Solve a real problem I face: picking the right tech stack quickly and confidently."
    }
  ],

  architecture: {
    steps: [
      { label: "Frontend (React + Tailwind)", description: "Modern responsive UI for project input and recommendations" },
      { label: "Backend (FastAPI APIs)", description: "High-performance Python API with typed endpoints" },
      { label: "LLM Engine (Gemini)", description: "Structured prompt engineering for consistent stack recommendations" }
    ]
  },

  features: [
    { icon: "🎯", title: "Technology Recommendation", description: "AI suggests optimal frameworks, libraries and tools for your use case." },
    { icon: "🏗️", title: "Architecture Suggestions", description: "Get a system design tailored to your project requirements." },
    { icon: "⚙️", title: "Backend Generation", description: "Receive complete backend technology and API design recommendations." },
    { icon: "⚛️", title: "Frontend Suggestions", description: "Get matched frontend frameworks and UI libraries." },
    { icon: "🗄️", title: "Database Selection", description: "Choose the right database based on data patterns and scale." },
    { icon: "☁️", title: "Deployment Strategy", description: "Receive cloud platform and deployment pipeline recommendations." }
  ],

  decisions: [
    {
      problem: "Frontend framework?",
      decision: "React",
      why: "Component-based architecture with a mature ecosystem for building responsive dashboards."
    },
    {
      problem: "Backend framework?",
      decision: "FastAPI",
      why: "Async Python APIs with automatic docs, type safety and excellent LLM integration."
    },
    {
      problem: "LLM provider?",
      decision: "Gemini",
      why: "Strong reasoning for structured recommendations with a cost-effective API."
    },
    {
      problem: "Database choice?",
      decision: "PostgreSQL",
      why: "Reliable relational storage for users, projects and structured recommendation data."
    }
  ],

  challenges: [
    {
      problem: "Prompt Engineering",
      solution: "Structured prompts with few-shot examples produced consistent JSON outputs.",
      learning: "Clear schemas and examples dramatically improve LLM reliability."
    },
    {
      problem: "Recommendation Consistency",
      solution: "Added response validation and fallback handling for malformed outputs.",
      learning: "Always validate LLM outputs before showing them to users."
    },
    {
      problem: "API Latency",
      solution: "Optimized prompts and added caching for common project types.",
      learning: "Caching and prompt tuning matter as much as model choice."
    },
    {
      problem: "Structured Responses",
      solution: "Defined strict JSON schemas that the LLM populates every time.",
      learning: "Schemas act as guardrails for production LLM features."
    }
  ],

  journey: [
    { phase: "Idea", description: "Defined the problem of time-consuming tech stack decisions." },
    { phase: "Prototype", description: "Built a minimal LLM prompt pipeline that returned JSON stacks." },
    { phase: "Frontend", description: "Implemented the React dashboard and recommendation views." },
    { phase: "Backend", description: "Built FastAPI endpoints with validation and JWT auth." },
    { phase: "LLM", description: "Integrated Gemini with structured prompt engineering." },
    { phase: "Deploy", description: "Deployed the full stack to production with CI/CD." }
  ],

  results: [
    { label: "Natural Language Input", value: "Yes", description: "Describe a project idea in plain English" },
    { label: "Complete Stack", value: "Full", description: "Frontend, backend, database and deployment recommendations" },
    { label: "Architecture", value: "Ready", description: "Production-ready architecture suggestions" },
    { label: "Dashboard", value: "Responsive", description: "Works across desktop and mobile devices" }
  ],

  learnings: [
    {
      title: "Prompt Engineering",
      description: "Structured prompts with clear schemas are essential for reliable LLM outputs."
    },
    {
      title: "LLM Integration",
      description: "Integrating an LLM means balancing latency, cost, response quality and validation."
    },
    {
      title: "FastAPI",
      description: "Type hints and automatic docs make Python backends fast to build and maintain."
    },
    {
      title: "React Architecture",
      description: "Component composition and state management keep complex UIs maintainable."
    }
  ],

  roadmap: [],
  
  nextProject: {
    name: "LawGPT CRM",
    slug: "lawgpt-crm",
    description: "AI-powered CRM and marketing automation platform."
  }
};

export const lawGPTCRMData: ProjectDetailData = {
  slug: "lawgpt-crm",
  name: "LawGPT CRM",
  badge: "AI-Powered CRM & Marketing Automation Platform",
  oneLiner: "An intelligent CRM platform that automates lead management, client communication, marketing workflows, and legal practice operations using AI.",
  description: "LawGPT CRM centralizes client management while using AI to automate repetitive workflows and improve productivity for law firms and small businesses.",
  github: "https://github.com/shreyad2806/LawGPT-CRM",
  techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "OpenAI", "n8n", "JWT Authentication"],
  heroImage: "/placeholder-hero.png",
  
  problem: {
    title: "What problem does LawGPT CRM solve?",
    points: [
      "Many law firms and small businesses manage leads manually using spreadsheets and multiple disconnected tools.",
      "Following up with clients is repetitive and time-consuming, often leading to missed opportunities.",
      "Marketing campaigns require manual effort and lack personalization at scale.",
      "Customer information is scattered across different platforms, making it difficult to get a complete view.",
      "LawGPT CRM centralizes client management while using AI to automate repetitive workflows and improve productivity."
    ]
  },
  
  motivations: [
    {
      icon: "🏗️",
      title: "Learning SaaS Architecture",
      description: "Understanding how to build scalable, multi-tenant SaaS applications with proper architecture patterns."
    },
    {
      icon: "🤖",
      title: "Building AI Business Applications",
      description: "Integrating AI capabilities into business workflows to automate repetitive tasks and enhance productivity."
    },
    {
      icon: "⚡",
      title: "Workflow Automation using AI",
      description: "Learning to design and implement automated workflows that reduce manual effort and improve efficiency."
    }
  ],
  
  architecture: {
    steps: [
      { label: "Client", description: "User interface for accessing CRM features" },
      { label: "Next.js Frontend", description: "React-based frontend with server-side rendering" },
      { label: "Authentication Layer", description: "JWT-based secure authentication system" },
      { label: "CRM Backend APIs", description: "Node.js API server handling business logic" },
      { label: "Database", description: "PostgreSQL for structured data storage" },
      { label: "AI Services", description: "OpenAI integration for intelligent content generation" },
      { label: "Workflow Automation (n8n)", description: "Visual workflow automation for business processes" },
      { label: "Email & Notification System", description: "Automated communication and reminders" },
      { label: "Analytics Dashboard", description: "Real-time insights and performance metrics" }
    ]
  },
  
  features: [
    { icon: "👥", title: "Lead Management", description: "Track and manage leads through the entire sales pipeline with automated follow-ups." },
    { icon: "👤", title: "Client Profiles", description: "Comprehensive client profiles with contact history, documents, and interaction tracking." },
    { icon: "✉️", title: "AI Email Generation", description: "Generate personalized emails and communications using AI for better engagement." },
    { icon: "📢", title: "Marketing Automation", description: "Automate marketing campaigns with personalized messaging and scheduling." },
    { icon: "✅", title: "Task Tracking", description: "Manage tasks, deadlines, and follow-ups with automated reminders and notifications." },
    { icon: "🔄", title: "Workflow Automation", description: "Design and execute automated workflows using n8n for business processes." },
    { icon: "🔔", title: "Reminder System", description: "Automated reminders for appointments, deadlines, and important follow-ups." },
    { icon: "📊", title: "Dashboard Analytics", description: "Real-time analytics and insights into sales performance and client engagement." },
    { icon: "🔐", title: "Secure Authentication", description: "JWT-based authentication with role-based access control for security." }
  ],
  
  decisions: [
    {
      problem: "Frontend framework?",
      decision: "Next.js",
      why: "Fast, SEO-friendly, and scalable with excellent performance and developer experience."
    },
    {
      problem: "Database choice?",
      decision: "PostgreSQL",
      why: "Reliable relational database with strong data integrity and advanced features."
    },
    {
      problem: "ORM choice?",
      decision: "Prisma",
      why: "Developer-friendly database access with type safety and excellent migration support."
    },
    {
      problem: "Automation platform?",
      decision: "n8n",
      why: "Visual workflow automation that's easy to use and integrates with many services."
    },
    {
      problem: "Authentication method?",
      decision: "JWT",
      why: "Secure session management that scales well for modern web applications."
    },
    {
      problem: "AI provider?",
      decision: "OpenAI",
      why: "Generate intelligent content with strong natural language understanding capabilities."
    },
    {
      problem: "Styling approach?",
      decision: "Tailwind CSS",
      why: "Rapid UI development with utility-first approach and consistent design system."
    }
  ],
  
  challenges: [
    {
      problem: "Designing CRM database relationships",
      solution: "Designed a normalized schema with proper foreign keys and constraints for data integrity.",
      learning: "Database design is critical; invest time in understanding relationships and constraints."
    },
    {
      problem: "Automating workflows reliably",
      solution: "Implemented robust error handling and retry mechanisms in n8n workflows.",
      learning: "Automation needs resilience; always handle failures and implement retry logic."
    },
    {
      problem: "Managing authentication securely",
      solution: "Implemented JWT with proper token validation, refresh tokens, and secure storage.",
      learning: "Security is non-negotiable; follow best practices for authentication and authorization."
    },
    {
      problem: "Integrating AI into existing workflows",
      solution: "Created modular AI services that can be easily integrated into different workflows.",
      learning: "AI integration should be modular; design services that can be reused across workflows."
    },
    {
      problem: "Building reusable UI components",
      solution: "Created a component library with consistent design patterns and props interfaces.",
      learning: "Component reusability saves time; invest in a good component library from the start."
    },
    {
      problem: "Handling asynchronous operations",
      solution: "Implemented proper async/await patterns with error handling and loading states.",
      learning: "Async operations require careful handling; always manage states and errors properly."
    }
  ],
  
  journey: [
    { phase: "Problem Discovery", description: "Identified the pain points in manual CRM management and researched solutions." },
    { phase: "Wireframes", description: "Designed user flows and wireframes for the CRM interface and features." },
    { phase: "Frontend Development", description: "Built Next.js frontend with React components and Tailwind styling." },
    { phase: "Backend APIs", description: "Developed Node.js APIs with Express for business logic and data handling." },
    { phase: "Database Design", description: "Designed PostgreSQL schema with Prisma ORM for data access." },
    { phase: "Authentication", description: "Implemented JWT-based authentication with secure token management." },
    { phase: "AI Integration", description: "Integrated OpenAI API for intelligent email generation and content creation." },
    { phase: "Workflow Automation", description: "Implemented n8n workflows for automated business processes and reminders." },
    { phase: "Production Deployment", description: "Deployed to production with monitoring and CI/CD pipeline." }
  ],
  
  results: [
    { label: "Client Management", value: "Centralized", description: "All client data in one unified platform" },
    { label: "Workflow Automation", value: "Automated", description: "Repetitive tasks handled by AI" },
    { label: "AI-Assisted Operations", value: "Intelligent", description: "Smart content generation and insights" },
    { label: "Production Ready", value: "Complete", description: "Full-stack SaaS application" },
    { label: "Responsive Design", value: "Premium", description: "Beautiful mobile-first interface" }
  ],
  
  learnings: [
    {
      title: "Building SaaS Products",
      description: "Building SaaS requires understanding user needs, scalability, and business logic."
    },
    {
      title: "Workflow Automation",
      description: "Workflow automation can significantly reduce manual effort and improve productivity."
    },
    {
      title: "Database Design",
      description: "Good database design is the foundation of any data-driven application."
    },
    {
      title: "AI Integration",
      description: "AI integration should enhance user experience, not complicate it."
    }
  ],
  
  roadmap: [
    { feature: "Calendar Integration", status: "planned" },
    { feature: "Client Portal", status: "planned" },
    { feature: "Document Management", status: "planned" },
    { feature: "Voice AI Assistant", status: "planned" },
    { feature: "Multi-user Teams", status: "planned" },
    { feature: "Role-Based Access Control", status: "planned" },
    { feature: "AI Legal Document Generation", status: "planned" },
    { feature: "CRM Analytics Dashboard", status: "planned" }
  ],
  
  nextProject: {
    name: "ComplytAI",
    slug: "complytai",
    description: "AI-powered compliance and regulatory automation platform."
  }
};

export const complytAIData: ProjectDetailData = {
  slug: "complytai",
  name: "ComplytAI",
  badge: "Enterprise Compliance & Risk Intelligence Platform",

  oneLiner:
    "Enterprise compliance platform that combines RAG, local LLMs, vector search, and CrewAI-based agent orchestration for document analysis and risk detection.",

  description:
    "ComplytAI is an end-to-end compliance intelligence system that processes enterprise documents, retrieves relevant regulatory context, and uses local LLM reasoning with CrewAI orchestration to identify compliance risks and generate actionable insights.",

  github: "https://github.com/shreyad2806/ComplytAI",

  techStack: [
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "CrewAI",
    "Ollama",
    "Qwen2.5",
    "nomic-embed-text",
    "Pinecone",
    "RAG",
    "PostgreSQL"
  ],

  heroImage: "/images/comply-thumbnail.png",

  // ============================================================
  // PROBLEM
  // ============================================================

  problem: {
    title: "What problem does ComplytAI solve?",

    points: [
      "Organizations manage thousands of compliance documents, policies, contracts, audit reports, and regulatory guidelines.",

      "Manually searching through large document collections is slow and makes it difficult to find relevant regulatory context quickly.",

      "Important compliance risks can be overlooked because analysts have to process large volumes of information.",

      "Compliance teams spend significant time reviewing repetitive documents and comparing policies against regulatory requirements.",

      "Traditional document search systems do not understand semantic relationships between compliance requirements, policies, and enterprise documents.",

      "ComplytAI combines document intelligence, RAG, local LLM reasoning, and agent orchestration to assist with compliance analysis and risk detection."
    ]
  },

  // ============================================================
  // MOTIVATIONS
  // ============================================================

  motivations: [
    {
      icon: "🏢",
      title: "Building Enterprise AI Systems",
      description:
        "Explore how AI systems can be designed around enterprise documents, privacy requirements, scalable retrieval, and structured analysis workflows."
    },

    {
      icon: "🔍",
      title: "Engineering Production RAG",
      description:
        "Build a complete retrieval pipeline covering document ingestion, chunking, embeddings, vector search, retrieval, and grounded generation."
    },

    {
      icon: "🤖",
      title: "Exploring Agentic AI",
      description:
        "Use CrewAI to coordinate specialized agents and separate responsibilities across compliance analysis and risk identification."
    },

    {
      icon: "🔒",
      title: "Privacy-Aware AI",
      description:
        "Use Ollama and Qwen2.5 for local inference so sensitive enterprise information can be processed without depending entirely on external LLM APIs."
    }
  ],

  // ============================================================
  // ARCHITECTURE
  // ============================================================

  architecture: {
    steps: [
      {
        label: "Enterprise Documents",
        description:
          "Ingest policies, contracts, audit reports, regulatory documents, and other compliance material."
      },

      {
        label: "Document Processing",
        description:
          "Extract, clean, normalize, and prepare documents for downstream retrieval."
      },

      {
        label: "Semantic Chunking",
        description:
          "Split documents into meaningful sections optimized for retrieval and contextual understanding."
      },

      {
        label: "Embedding Generation",
        description:
          "Generate dense vector representations using the nomic-embed-text embedding model."
      },

      {
        label: "Pinecone Vector Database",
        description:
          "Store document embeddings and provide scalable semantic retrieval."
      },

      {
        label: "Hybrid Retrieval",
        description:
          "Retrieve relevant regulatory and enterprise context using semantic and keyword-based signals."
      },

      {
        label: "Ollama + Qwen2.5",
        description:
          "Run local LLM inference for compliance reasoning and document analysis."
      },

      {
        label: "CrewAI Agent Orchestration",
        description:
          "Coordinate specialized agents responsible for compliance analysis, risk identification, and structured reasoning."
      },

      {
        label: "Risk Analysis Engine",
        description:
          "Analyze retrieved evidence and identify potential compliance risks and violations."
      },

      {
        label: "Compliance Dashboard",
        description:
          "Present compliance findings, risk signals, evidence, and analysis results through the web application."
      }
    ]
  },

  // ============================================================
  // FEATURES
  // ============================================================

  features: [
    {
      icon: "📄",
      title: "Document Ingestion",
      description:
        "Process enterprise policies, contracts, audit reports, and regulatory documents for analysis."
    },

    {
      icon: "🔍",
      title: "Semantic Search",
      description:
        "Find relevant compliance information using natural-language queries instead of relying only on exact keywords."
    },

    {
      icon: "🧠",
      title: "RAG Question Answering",
      description:
        "Generate context-grounded answers using retrieved regulatory and enterprise document evidence."
    },

    {
      icon: "🤖",
      title: "CrewAI Agent Orchestration",
      description:
        "Coordinate specialized agents for compliance analysis, risk identification, and structured reasoning."
    },

    {
      icon: "⚠️",
      title: "Compliance Risk Detection",
      description:
        "Analyze enterprise documentation to identify potential compliance risks and regulatory gaps."
    },

    {
      icon: "📋",
      title: "Policy Retrieval",
      description:
        "Retrieve relevant policies, requirements, and regulatory context for specific compliance scenarios."
    },

    {
      icon: "📊",
      title: "Compliance Dashboard",
      description:
        "Visualize analysis results, risk findings, and compliance insights through a centralized interface."
    },

    {
      icon: "🔒",
      title: "Local LLM Processing",
      description:
        "Run Qwen2.5 locally through Ollama for privacy-conscious document analysis."
    },

    {
      icon: "📚",
      title: "Enterprise Knowledge Base",
      description:
        "Maintain a searchable vector knowledge layer containing compliance documents and regulatory information."
    },

    {
      icon: "🎯",
      title: "Evidence-Grounded Analysis",
      description:
        "Connect compliance findings to retrieved document context rather than relying solely on model-generated information."
    }
  ],

  // ============================================================
  // ENGINEERING DECISIONS
  // ============================================================

  decisions: [
    {
      problem: "LLM choice?",
      decision: "Qwen2.5 via Ollama",
      why:
        "Provides local LLM inference for privacy-sensitive compliance workflows while reducing dependence on external model APIs."
    },

    {
      problem: "Embedding model?",
      decision: "nomic-embed-text",
      why:
        "Provides semantic embeddings suitable for document retrieval and enterprise knowledge search."
    },

    {
      problem: "Vector database?",
      decision: "Pinecone",
      why:
        "Provides scalable vector storage and efficient semantic retrieval for large document collections."
    },

    {
      problem: "Agent orchestration?",
      decision: "CrewAI",
      why:
        "Provides structured coordination between specialized agents while keeping individual compliance responsibilities modular."
    },

    {
      problem: "Backend framework?",
      decision: "FastAPI",
      why:
        "Provides high-performance Python APIs, asynchronous processing, type safety, and automatic API documentation."
    },

    {
      problem: "Frontend framework?",
      decision: "Next.js",
      why:
        "Provides a scalable React-based application architecture for the compliance dashboard and user-facing workflows."
    },

    {
      problem: "Primary database?",
      decision: "PostgreSQL",
      why:
        "Provides reliable relational storage for application data, metadata, users, and structured compliance information."
    },

    {
      problem: "Retrieval approach?",
      decision: "RAG + Hybrid Retrieval",
      why:
        "Combines semantic understanding with relevant document evidence to improve retrieval quality and reduce unsupported generation."
    }
  ],

  // ============================================================
  // CHALLENGES
  // ============================================================

  challenges: [
    {
      problem: "Designing document ingestion",

      solution:
        "Built a structured ingestion pipeline for extracting, cleaning, validating, and preparing enterprise documents for retrieval.",

      learning:
        "Enterprise document processing requires robust handling of inconsistent formats, missing information, and edge cases."
    },

    {
      problem: "Choosing embedding models",

      solution:
        "Evaluated the retrieval requirements and selected nomic-embed-text for the semantic document retrieval pipeline.",

      learning:
        "Embedding quality directly affects retrieval quality, making model selection and evaluation important parts of RAG engineering."
    },

    {
      problem: "Handling large document collections",

      solution:
        "Designed chunking and batch-processing stages to make document ingestion and indexing more manageable.",

      learning:
        "Scalable AI systems require careful consideration of processing cost, memory usage, indexing strategy, and throughput."
    },

    {
      problem: "Improving retrieval quality",

      solution:
        "Combined semantic retrieval with keyword-based signals to improve recall across compliance queries.",

      learning:
        "Hybrid retrieval can provide better coverage when queries contain both domain-specific terminology and semantic concepts."
    },

    {
      problem: "Reducing LLM hallucinations",

      solution:
        "Used retrieved document context, structured prompts, and evidence-oriented responses to keep generated analysis grounded.",

      learning:
        "Reliable LLM applications require grounding, validation, and clear boundaries around what the model is allowed to infer."
    },

    {
      problem: "Coordinating compliance analysis",

      solution:
        "Introduced CrewAI-based agent orchestration to separate responsibilities across compliance analysis and risk identification.",

      learning:
        "Agentic systems require clearly defined responsibilities, controlled context, and reliable coordination between specialized components."
    },

    {
      problem: "Running AI workloads privately",

      solution:
        "Integrated Ollama with Qwen2.5 to support local LLM inference for sensitive compliance workflows.",

      learning:
        "Enterprise AI architecture often requires balancing model quality, privacy, infrastructure cost, and operational complexity."
    },

    {
      problem: "Building a usable compliance interface",

      solution:
        "Connected the AI pipeline to a Next.js dashboard that presents analysis results and compliance findings in a structured format.",

      learning:
        "AI systems become useful products only when complex model output is converted into understandable user-facing workflows."
    }
  ],

  // ============================================================
  // DEVELOPMENT JOURNEY
  // ============================================================

  journey: [
    {
      phase: "Problem Discovery",
      description:
        "Identified the difficulty of manually reviewing large volumes of compliance documents and regulatory information."
    },

    {
      phase: "Compliance Research",
      description:
        "Studied document-heavy compliance workflows and identified opportunities for retrieval and AI-assisted analysis."
    },

    {
      phase: "Document Processing",
      description:
        "Built the document ingestion and preprocessing pipeline for enterprise compliance content."
    },

    {
      phase: "Embedding Pipeline",
      description:
        "Implemented semantic embedding generation using nomic-embed-text."
    },

    {
      phase: "Vector Database",
      description:
        "Integrated Pinecone to store document embeddings and support semantic retrieval."
    },

    {
      phase: "RAG Pipeline",
      description:
        "Connected retrieval with local LLM reasoning to generate context-aware compliance responses."
    },

    {
      phase: "Local LLM Integration",
      description:
        "Integrated Ollama and Qwen2.5 for local inference and privacy-conscious document analysis."
    },

    {
      phase: "Agent Orchestration",
      description:
        "Introduced CrewAI to coordinate specialized agents for compliance analysis and risk identification."
    },

    {
      phase: "Compliance Dashboard",
      description:
        "Built the Next.js interface for displaying document analysis, risk findings, and compliance insights."
    },

    {
      phase: "Production Architecture",
      description:
        "Containerized the system with Docker and structured the application for maintainability and deployment."
    }
  ],

  // ============================================================
  // RESULTS
  // ============================================================

  results: [
    {
      label: "AI Architecture",
      value: "End-to-End",
      description:
        "Complete document-to-analysis pipeline combining retrieval, LLM reasoning, and agent orchestration."
    },

    {
      label: "RAG Pipeline",
      value: "Production",
      description:
        "Document ingestion, embeddings, vector search, retrieval, and grounded generation."
    },

    {
      label: "Agentic Analysis",
      value: "CrewAI",
      description:
        "Specialized agent orchestration for structured compliance analysis."
    },

    {
      label: "LLM Infrastructure",
      value: "Local",
      description:
        "Qwen2.5 inference through Ollama for privacy-conscious AI processing."
    },

    {
      label: "Document Search",
      value: "Semantic",
      description:
        "Vector-based retrieval across enterprise compliance documents."
    },

    {
      label: "Application",
      value: "Full Stack",
      description:
        "Next.js frontend connected to Python/FastAPI AI services and supporting infrastructure."
    }
  ],

  // ============================================================
  // LEARNINGS
  // ============================================================

  learnings: [
    {
      title: "Production RAG",
      description:
        "Production RAG requires careful attention to document processing, chunking, embeddings, retrieval quality, latency, and grounding."
    },

    {
      title: "Agentic AI",
      description:
        "Agentic systems work best when responsibilities are clearly separated and agents operate within controlled context and workflows."
    },

    {
      title: "Vector Search",
      description:
        "Retrieval quality depends on embedding models, chunking strategies, indexing, query formulation, and retrieval techniques."
    },

    {
      title: "Enterprise AI Architecture",
      description:
        "Enterprise AI systems require privacy, reliability, scalability, observability, and maintainable service boundaries."
    },

    {
      title: "Local LLM Infrastructure",
      description:
        "Running models locally introduces important engineering trade-offs around hardware, latency, model size, and privacy."
    },

    {
      title: "AI Product Engineering",
      description:
        "A useful AI product requires more than model integration; the surrounding APIs, databases, interfaces, validation, and workflows are equally important."
    }
  ],

  // ============================================================
  // ROADMAP
  // ============================================================

  roadmap: [
    {
      feature: "Multi-Agent Compliance Review",
      status: "planned"
    },

    {
      feature: "Regulation Change Detection",
      status: "planned"
    },

    {
      feature: "Real-time Compliance Monitoring",
      status: "planned"
    },

    {
      feature: "Fine-tuned Compliance Models",
      status: "planned"
    },

    {
      feature: "Role-based Enterprise Access",
      status: "planned"
    },

    {
      feature: "Document Version Tracking",
      status: "planned"
    },

    {
      feature: "Enterprise Analytics",
      status: "planned"
    },

    {
      feature: "Multi-language Support",
      status: "planned"
    }
  ],

  // ============================================================
  // NEXT PROJECT
  // ============================================================

  nextProject: {
    name: "Reflex Ninja",
    slug: "reflex-ninja",
    description:
      "Native Android reflex game built with Kotlin while exploring mobile application development."
  }
};

export const reflexNinjaData: ProjectDetailData = {
  slug: "reflex-ninja",
  name: "Reflex Ninja",
  badge: "Android Learning Project",
  oneLiner: "A fast-paced reflex game built while learning native Android development with Kotlin.",
  description: "Reflex Ninja is a simple arcade-style game where players tap a randomly appearing ninja as many times as possible within 15 seconds. Built as a learning project to explore Kotlin and native Android development.",
  github: "https://github.com/shreyad2806/Reflex-Ninja",
  techStack: ["Kotlin", "Android Studio", "Jetpack", "XML Layouts", "Gradle"],
  heroImage: "/placeholder-hero.png",
  
  problem: {
    title: "What is Reflex Ninja?",
    points: [
      "Players have 15 seconds to tap a ninja that randomly appears at different locations on the screen.",
      "The objective is to tap the ninja as many times as possible before time runs out.",
      "The faster the player reacts, the higher the score.",
      "Simple arcade-style gameplay focused on speed and reflexes.",
      "Built as a learning project to understand native Android development fundamentals."
    ]
  },
  
  motivations: [
    {
      icon: "📱",
      title: "Learning Kotlin",
      description: "Exploring Kotlin as a modern programming language for Android development."
    },
    {
      icon: "🏗️",
      title: "Understanding Android App Development",
      description: "Learning the fundamentals of Android app architecture and lifecycle."
    },
    {
      icon: "🎨",
      title: "Exploring Mobile UI Development",
      description: "Building native Android UI using XML layouts and Jetpack components."
    }
  ],
  
  architecture: {
    steps: [
      { label: "User Input", description: "Touch events from user tapping the screen" },
      { label: "Game Engine", description: "Main game loop and state management" },
      { label: "Random Position Generator", description: "Calculates random coordinates for ninja spawn" },
      { label: "Score Manager", description: "Tracks and updates the player's score" },
      { label: "Countdown Timer", description: "15-second game timer" },
      { label: "Game Over Screen", description: "Displays final score and restart option" }
    ]
  },
  
  features: [
    { icon: "⏱️", title: "15 Second Timer", description: "Countdown timer that creates urgency and challenge." },
    { icon: "🎯", title: "Random Ninja Spawn", description: "Ninja appears at random positions for unpredictability." },
    { icon: "📊", title: "Real-time Score Counter", description: "Live score tracking as player taps the ninja." },
    { icon: "👆", title: "Touch Detection", description: "Responsive touch event handling for gameplay." },
    { icon: "🏁", title: "Game Over Screen", description: "Displays final score with option to play again." },
    { icon: "📱", title: "Simple UI", description: "Clean, minimal interface focused on gameplay." },
    { icon: "📐", title: "Responsive Layout", description: "Adapts to different screen sizes and orientations." },
    { icon: "🤖", title: "Native Android Experience", description: "Pure native Android app with smooth performance." }
  ],
  
  decisions: [
    {
      problem: "Programming language?",
      decision: "Kotlin",
      why: "Modern, concise language officially recommended for Android development."
    },
    {
      problem: "UI approach?",
      decision: "XML Layouts",
      why: "Learning native Android UI fundamentals and understanding layout system."
    },
    {
      problem: "Game logic?",
      decision: "Timer + Random Position",
      why: "Simple but effective approach for this type of reflex game."
    },
    {
      problem: "Development environment?",
      decision: "Android Studio",
      why: "Official Android development environment with excellent tooling."
    }
  ],
  
  challenges: [
    {
      problem: "Understanding Activity Lifecycle",
      solution: "Studied Android lifecycle methods and implemented proper state management.",
      learning: "Activity lifecycle is fundamental to Android development; understand it thoroughly."
    },
    {
      problem: "Managing Timer Events",
      solution: "Used Handler and Runnable for accurate countdown timer implementation.",
      learning: "Timer management requires careful handling to avoid memory leaks and UI issues."
    },
    {
      problem: "Randomizing Object Positions",
      solution: "Calculated random coordinates within screen bounds using Math.random().",
      learning: "Random positioning needs boundary checks to keep elements within the screen."
    },
    {
      problem: "Handling Touch Events",
      solution: "Implemented OnClickListener with hit detection for ninja taps.",
      learning: "Touch event handling is core to mobile app interactivity."
    },
    {
      problem: "Updating UI Efficiently",
      solution: "Used runOnUiThread to ensure UI updates happen on the main thread.",
      learning: "UI updates must always happen on the main thread in Android."
    }
  ],
  
  journey: [
    { phase: "Learn Kotlin Basics", description: "Studied Kotlin syntax and fundamentals for Android development." },
    { phase: "Create UI", description: "Designed the game interface using XML layouts and views." },
    { phase: "Implement Timer", description: "Added countdown timer with proper lifecycle management." },
    { phase: "Random Ninja Movement", description: "Implemented random position generation for ninja spawning." },
    { phase: "Score Tracking", description: "Added score counter with touch event detection." },
    { phase: "Testing", description: "Tested on different devices and screen sizes for compatibility." },
    { phase: "Final Game", description: "Polished the game with final UI tweaks and bug fixes." }
  ],
  
  results: [
    { label: "Kotlin Fundamentals", value: "Learned", description: "Solid understanding of Kotlin basics" },
    { label: "Android Lifecycle", value: "Understood", description: "Activity and fragment lifecycle management" },
    { label: "UI Development", value: "Explored", description: "Native Android UI with XML layouts" },
    { label: "Event Handling", value: "Mastered", description: "Touch events and user interactions" },
    { label: "Complete Game", value: "Functional", description: "Working Android game published to GitHub" }
  ],
  
  learnings: [
    {
      title: "Kotlin Fundamentals",
      description: "Kotlin is a modern, concise language that makes Android development more enjoyable."
    },
    {
      title: "Android Lifecycle",
      description: "Understanding the Android lifecycle is crucial for building stable apps."
    },
    {
      title: "UI Development",
      description: "XML layouts and Jetpack components provide a powerful way to build Android UIs."
    },
    {
      title: "Event Handling",
      description: "Touch events and user interactions are the core of mobile app interactivity."
    }
  ],
  
  roadmap: [
    { feature: "Leaderboard", status: "planned" },
    { feature: "Difficulty Levels", status: "planned" },
    { feature: "Animations", status: "planned" },
    { feature: "Sound Effects", status: "planned" },
    { feature: "Achievements", status: "planned" },
    { feature: "Power-ups", status: "planned" },
    { feature: "Better UI", status: "planned" }
  ],
  
  nextProject: {
    name: "Kodexa",
    slug: "kodexa",
    description: "AI-assisted code intelligence and debugging platform."
  }
};

export const kodexaData: ProjectDetailData = {
  slug: "kodexa",
  name: "Kodexa",
  badge: "Workflow Automation Platform",
  oneLiner: "A workflow automation platform that streamlines repetitive business operations by connecting services, automating tasks, and reducing manual effort.",
  description: "Kodexa reduces manual work by automating business processes, connecting different systems, and executing repetitive tasks automatically through a centralized automation platform.",
  github: "https://github.com/shreyad2806/Kodexa",
  techStack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "n8n", "REST APIs", "JWT"],
  heroImage: "/placeholder-hero.png",
  
  problem: {
    title: "What problem does Kodexa solve?",
    points: [
      "Many businesses still perform repetitive tasks manually, wasting valuable time and resources.",
      "Moving information between different systems wastes time and introduces errors.",
      "Employees repeatedly copy data between spreadsheets, CRMs, emails, and internal tools.",
      "Businesses need a centralized automation platform that connects workflows and executes repetitive tasks automatically.",
      "Kodexa reduces manual work by automating business processes and integrating disparate systems."
    ]
  },
  
  motivations: [
    {
      icon: "⚙️",
      title: "Understanding Workflow Automation",
      description: "Learning how to design and implement automated workflows that reduce manual effort."
    },
    {
      icon: "🏗️",
      title: "Building Production SaaS Systems",
      description: "Understanding the architecture and requirements of scalable SaaS applications."
    },
    {
      icon: "🔧",
      title: "Learning Backend Architecture",
      description: "Deep dive into backend system design, APIs, and database architecture."
    }
  ],
  
  architecture: {
    steps: [
      { label: "User", description: "Users interact with the platform through web interface" },
      { label: "Workflow Builder", description: "Visual interface for creating and editing workflows" },
      { label: "API Gateway", description: "Routes requests to appropriate backend services" },
      { label: "Automation Engine", description: "Core engine that executes workflow tasks" },
      { label: "Task Execution", description: "Individual task execution with error handling" },
      { label: "Third-party APIs", description: "Integration with external services and APIs" },
      { label: "Database", description: "PostgreSQL for workflow and execution data storage" },
      { label: "Execution Logs", description: "Detailed logs of workflow executions" },
      { label: "Analytics Dashboard", description: "Real-time insights into workflow performance" }
    ]
  },
  
  features: [
    { icon: "🔨", title: "Workflow Builder", description: "Visual drag-and-drop interface for creating automated workflows." },
    { icon: "🤖", title: "Task Automation", description: "Automate repetitive tasks with configurable triggers and actions." },
    { icon: "🔗", title: "API Integrations", description: "Connect with third-party services through REST APIs and webhooks." },
    { icon: "📜", title: "Execution History", description: "Track and review all workflow executions with detailed logs." },
    { icon: "🔐", title: "Authentication", description: "Secure JWT-based authentication for user access control." },
    { icon: "📅", title: "Scheduling", description: "Schedule workflows to run at specific times or intervals." },
    { icon: "🔔", title: "Notifications", description: "Receive alerts and notifications for workflow events." },
    { icon: "📊", title: "Dashboard Analytics", description: "Real-time analytics and insights into workflow performance." },
    { icon: "📋", title: "Workflow Logs", description: "Detailed execution logs for debugging and monitoring." },
    { icon: "⚡", title: "Scalable Backend", description: "High-performance backend built with FastAPI and async processing." }
  ],
  
  decisions: [
    {
      problem: "Frontend framework?",
      decision: "React",
      why: "Reusable UI components with excellent ecosystem and developer experience."
    },
    {
      problem: "Backend framework?",
      decision: "FastAPI",
      why: "High-performance APIs with async support and automatic documentation."
    },
    {
      problem: "Database choice?",
      decision: "PostgreSQL",
      why: "Reliable relational database with strong data integrity and advanced features."
    },
    {
      problem: "Authentication method?",
      decision: "JWT",
      why: "Secure login with stateless authentication that scales well."
    },
    {
      problem: "Automation platform?",
      decision: "n8n",
      why: "Flexible workflow orchestration with extensive integrations."
    },
    {
      problem: "Deployment strategy?",
      decision: "Docker",
      why: "Portable deployment with consistent environment across stages."
    },
    {
      problem: "API communication?",
      decision: "REST",
      why: "Easy service integration with standard HTTP methods and wide compatibility."
    }
  ],
  
  challenges: [
    {
      problem: "Designing workflow execution",
      solution: "Implemented a modular task execution engine with proper error handling and retry logic.",
      learning: "Workflow execution needs resilience; always handle failures gracefully."
    },
    {
      problem: "Managing API integrations",
      solution: "Created a unified API client with rate limiting and connection pooling.",
      learning: "API integration requires careful management of rate limits and connections."
    },
    {
      problem: "Handling authentication",
      solution: "Implemented JWT with refresh tokens and secure token storage.",
      learning: "Authentication security is critical; follow best practices for token management."
    },
    {
      problem: "Creating reusable backend modules",
      solution: "Designed modular services with clear interfaces and dependency injection.",
      learning: "Modularity makes code maintainable and testable; invest in good architecture."
    },
    {
      problem: "Database relationships",
      solution: "Designed normalized schema with proper foreign keys and constraints.",
      learning: "Good database design prevents data integrity issues and improves performance."
    },
    {
      problem: "Improving execution reliability",
      solution: "Implemented retry mechanisms, circuit breakers, and comprehensive logging.",
      learning: "Production systems need resilience; design for failures from the start."
    }
  ],
  
  journey: [
    { phase: "Idea", description: "Identified the problem with manual business processes and researched automation solutions." },
    { phase: "Workflow Research", description: "Studied existing automation platforms and identified key features." },
    { phase: "Database Design", description: "Designed PostgreSQL schema for workflows and execution data." },
    { phase: "Frontend Dashboard", description: "Built React dashboard with workflow builder interface." },
    { phase: "Backend APIs", description: "Developed FastAPI backend with REST endpoints and business logic." },
    { phase: "Authentication", description: "Implemented JWT-based authentication with secure token management." },
    { phase: "Automation Engine", description: "Built core workflow execution engine with task scheduling." },
    { phase: "Testing", description: "Tested workflows with various integrations and edge cases." },
    { phase: "Production Version", description: "Deployed with Docker, monitoring, and CI/CD pipeline." }
  ],
  
  results: [
    { label: "Automated Workflows", value: "Functional", description: "Complete workflow automation system" },
    { label: "API Integrations", value: "Connected", description: "Third-party service integrations" },
    { label: "Business Processes", value: "Streamlined", description: "Reduced manual effort significantly" },
    { label: "Authentication", value: "Secure", description: "JWT-based user authentication" },
    { label: "Production-ready Backend", value: "Complete", description: "Scalable FastAPI backend" },
    { label: "Scalable Architecture", value: "Designed", description: "Modular, maintainable system" }
  ],
  
  learnings: [
    {
      title: "Workflow Design",
      description: "Designing workflows requires understanding business processes and edge cases."
    },
    {
      title: "Backend Architecture",
      description: "Good backend architecture is the foundation of scalable applications."
    },
    {
      title: "REST APIs",
      description: "REST APIs need proper design, documentation, and error handling."
    },
    {
      title: "Scalable Software Development",
      description: "Scalability requires modular design, proper state management, and resilience."
    }
  ],
  
  roadmap: [
    { feature: "Visual Drag-and-Drop Workflow Builder", status: "planned" },
    { feature: "Webhook Support", status: "planned" },
    { feature: "AI Workflow Suggestions", status: "planned" },
    { feature: "Role-based Access Control", status: "planned" },
    { feature: "Workflow Templates", status: "planned" },
    { feature: "Monitoring Dashboard", status: "planned" },
    { feature: "Real-time Notifications", status: "planned" },
    { feature: "Cloud Deployment", status: "planned" }
  ],
  
  nextProject: {
    name: "Reflex Ninja",
    slug: "reflex-ninja",
    description: "Android Learning Project."
  }
};


export const projectDataMap: Record<string, ProjectDetailData> = {
  talentlens: talentLensData,
  "ai-tech-stack-recommender": aiTechStackRecommenderData,
  "lawgpt-crm": lawGPTCRMData,
  complytai: complytAIData,
  "reflex-ninja": reflexNinjaData,
  kodexa: kodexaData,
};
