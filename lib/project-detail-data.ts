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
  badge: "Production AI Resume Intelligence Platform",
  oneLiner: "AI-powered resume screening platform that ranks candidates using semantic search, hybrid retrieval, and LLM reasoning.",
  description: "TalentLens transforms traditional resume screening by leveraging advanced RAG techniques to understand candidate qualifications beyond simple keyword matching.",
  github: "https://github.com/shreyad2806/TalentLens",
  techStack: ["FastAPI", "Python", "Sentence Transformers", "Pinecone", "RAG"],
  heroImage: "/images/talentlens.png",
  
  problem: {
    title: "What problem does TalentLens solve?",
    points: [
      "Recruiters manually screen hundreds of resumes, leading to fatigue and inconsistent evaluations.",
      "Keyword-based search misses qualified candidates who use different terminology.",
      "Resumes contain unstructured information that traditional ATS cannot effectively parse.",
      "Existing systems cannot understand semantic meaning or context in candidate profiles.",
      "Organizations need faster, more accurate candidate ranking to reduce time-to-hire."
    ]
  },
  
  motivations: [
    {
      icon: "🧠",
      title: "Learning RAG",
      description: "Deep dive into Retrieval-Augmented Generation and understand how to build production RAG systems that go beyond simple ChatGPT wrappers."
    },
    {
      icon: "⚙️",
      title: "Production AI Systems",
      description: "Experience building end-to-end AI applications that handle real-world data, scale, and production constraints."
    },
    {
      icon: "🚀",
      title: "Beyond ChatGPT",
      description: "Create something meaningful that solves actual problems rather than just demonstrating API integration."
    }
  ],
  
  architecture: {
    steps: [
      { label: "Resume Upload", description: "PDF/Word document ingestion" },
      { label: "Parser", description: "Extract text and structure data" },
      { label: "Chunking", description: "Semantic text segmentation" },
      { label: "Embeddings", description: "Vector representation generation" },
      { label: "Pinecone", description: "Vector database storage" },
      { label: "Retriever", description: "Multi-stage retrieval system" },
      { label: "Hybrid Search", description: "Dense + sparse retrieval" },
      { label: "Cross Encoder", description: "Reranking for precision" },
      { label: "LLM", description: "Reasoning and synthesis" },
      { label: "Ranked Candidates", description: "Final candidate ranking" }
    ]
  },
  
  features: [
    { icon: "📄", title: "Resume Parsing", description: "Intelligent extraction from PDF and Word documents with structured data output." },
    { icon: "🔍", title: "Semantic Search", description: "Find candidates based on meaning, not just keywords, using advanced embeddings." },
    { icon: "🎯", title: "Metadata Filtering", description: "Filter candidates by experience, skills, location, and other structured attributes." },
    { icon: "🔄", title: "Hybrid Retrieval", description: "Combine dense and sparse retrieval for improved recall and relevance." },
    { icon: "⚡", title: "Cross Encoder Reranking", description: "Re-rank retrieved documents using cross-encoder models for higher precision." },
    { icon: "📊", title: "Candidate Ranking", description: "AI-powered scoring that considers multiple factors for fair evaluation." },
    { icon: "💬", title: "Natural Language Queries", description: "Search using natural language descriptions of ideal candidates." },
    { icon: "💾", title: "Embedding Cache", description: "Redis-based caching for faster repeated queries and reduced costs." }
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
  badge: "Enterprise AI Compliance & Risk Intelligence Platform",
  oneLiner: "An AI-powered compliance intelligence platform that analyzes enterprise documents, retrieves relevant regulatory information using Retrieval-Augmented Generation (RAG), and automates compliance workflows.",
  description: "ComplytAI transforms compliance management using AI-powered document understanding, semantic search, and automated workflows for enterprise organizations.",
  github: "https://github.com/shreyad2806/ComplytAI",
  techStack: ["Next.js", "TypeScript", "Python", "FastAPI", "Ollama", "Qwen2.5", "nomic-embed-text", "Pinecone", "n8n", "PostgreSQL", "Docker"],
  heroImage: "/placeholder-hero.png",
  
  problem: {
    title: "What problem does ComplytAI solve?",
    points: [
      "Organizations manage thousands of compliance documents, contracts, internal policies, audit reports, and regulatory guidelines.",
      "Searching manually through these documents is slow and error-prone.",
      "Important risks are often overlooked due to the sheer volume of information.",
      "Compliance teams spend significant time reviewing repetitive documents and regulations.",
      "There is no centralized intelligent system to retrieve relevant regulations and automate compliance workflows.",
      "ComplytAI transforms compliance management using AI-powered document understanding and RAG-based retrieval."
    ]
  },
  
  motivations: [
    {
      icon: "🏢",
      title: "Learning Enterprise AI Systems",
      description: "Understanding how to build scalable AI systems that handle enterprise-grade workloads and security requirements."
    },
    {
      icon: "🔍",
      title: "Understanding Production RAG Pipelines",
      description: "Deep dive into Retrieval-Augmented Generation for real-world document intelligence applications."
    },
    {
      icon: "⚙️",
      title: "Building Workflow Automation with AI",
      description: "Integrating AI capabilities into automated workflows to reduce manual compliance review efforts."
    }
  ],
  
  architecture: {
    steps: [
      { label: "Enterprise Documents", description: "PDF, Word, and other document formats ingestion" },
      { label: "Document Processing", description: "Text extraction and preprocessing pipeline" },
      { label: "Chunking Pipeline", description: "Semantic text segmentation for optimal retrieval" },
      { label: "Embedding Generation", description: "Vector representation using nomic-embed-text" },
      { label: "Pinecone Vector Database", description: "Scalable semantic search and storage" },
      { label: "Hybrid Retrieval", description: "Dense + sparse retrieval for improved accuracy" },
      { label: "Ollama (Qwen2.5)", description: "Local LLM for reasoning and analysis" },
      { label: "Risk Analysis Engine", description: "AI-powered compliance risk detection" },
      { label: "n8n Workflow Automation", description: "Automated compliance workflows and notifications" },
      { label: "Compliance Dashboard", description: "Enterprise-grade analytics and insights" }
    ]
  },
  
  features: [
    { icon: "📄", title: "Document Upload", description: "Ingest and process enterprise documents with automatic parsing and indexing." },
    { icon: "🔍", title: "Semantic Search", description: "Find relevant compliance information using natural language queries." },
    { icon: "⚠️", title: "Compliance Risk Detection", description: "AI-powered analysis to identify potential compliance risks and violations." },
    { icon: "💬", title: "RAG-based Question Answering", description: "Ask questions about compliance documents and get accurate, sourced answers." },
    { icon: "📋", title: "Policy Retrieval", description: "Quickly retrieve relevant policies and regulations for specific scenarios." },
    { icon: "🔄", title: "Workflow Automation", description: "Automate compliance review processes using n8n workflows." },
    { icon: "📊", title: "Audit Assistance", description: "AI-assisted audit preparation with document analysis and evidence gathering." },
    { icon: "📚", title: "Knowledge Base", description: "Centralized repository of compliance documents and regulations." },
    { icon: "🎯", title: "Vector Search", description: "High-performance semantic search across millions of document chunks." },
    { icon: "🧠", title: "LLM Reasoning", description: "Local LLM reasoning for accurate compliance analysis without data leaving premises." }
  ],
  
  decisions: [
    {
      problem: "LLM choice?",
      decision: "Qwen2.5 via Ollama",
      why: "Runs locally with strong reasoning capabilities, ensuring data privacy and reducing API costs."
    },
    {
      problem: "Embedding model?",
      decision: "nomic-embed-text",
      why: "High-quality semantic embeddings optimized for document understanding and retrieval."
    },
    {
      problem: "Vector database?",
      decision: "Pinecone",
      why: "Scalable semantic retrieval with excellent performance and managed infrastructure."
    },
    {
      problem: "Automation platform?",
      decision: "n8n",
      why: "Flexible workflow orchestration with extensive integrations for enterprise automation."
    },
    {
      problem: "Backend framework?",
      decision: "FastAPI",
      why: "Async high-performance APIs with automatic documentation and type safety."
    },
    {
      problem: "Frontend framework?",
      decision: "Next.js",
      why: "Modern enterprise dashboard with server-side rendering and excellent performance."
    },
    {
      problem: "Deployment strategy?",
      decision: "Docker",
      why: "Portable and reproducible environment for consistent deployment across environments."
    }
  ],
  
  challenges: [
    {
      problem: "Designing document ingestion",
      solution: "Built a robust pipeline supporting multiple formats with error handling and validation.",
      learning: "Document processing requires careful handling of edge cases and format variations."
    },
    {
      problem: "Choosing embedding models",
      solution: "Evaluated multiple models and selected nomic-embed-text for optimal document understanding.",
      learning: "Embedding model choice significantly impacts retrieval quality; test thoroughly."
    },
    {
      problem: "Handling large document collections",
      solution: "Implemented efficient chunking and batch processing for scalable document ingestion.",
      learning: "Scalability requires careful design of processing pipelines and resource management."
    },
    {
      problem: "Improving retrieval quality",
      solution: "Implemented hybrid retrieval with dense and sparse search for better accuracy.",
      learning: "Hybrid retrieval often outperforms single-method approaches for complex queries."
    },
    {
      problem: "Reducing hallucinations",
      solution: "Implemented strict prompt engineering with source citation and confidence scoring.",
      learning: "LLM hallucinations can be mitigated with proper prompting and validation."
    },
    {
      problem: "Workflow orchestration",
      solution: "Designed modular n8n workflows with error handling and retry mechanisms.",
      learning: "Workflow automation needs resilience; always handle failures gracefully."
    },
    {
      problem: "Prompt engineering",
      solution: "Developed structured prompts with few-shot examples for consistent compliance analysis.",
      learning: "Prompt engineering is iterative; measure and test continuously for best results."
    }
  ],
  
  journey: [
    { phase: "Idea", description: "Identified the compliance management problem and researched AI-based solutions." },
    { phase: "Research Compliance Systems", description: "Studied existing compliance platforms and identified gaps in AI adoption." },
    { phase: "Document Processing", description: "Built document ingestion pipeline with support for multiple file formats." },
    { phase: "Embedding Pipeline", description: "Implemented embedding generation with nomic-embed-text model." },
    { phase: "Vector Database", description: "Set up Pinecone for scalable semantic search and retrieval." },
    { phase: "Local LLM Integration", description: "Integrated Ollama with Qwen2.5 for local LLM reasoning." },
    { phase: "Workflow Automation", description: "Built n8n workflows for automated compliance review processes." },
    { phase: "Dashboard", description: "Developed Next.js dashboard with enterprise-grade analytics and visualizations." },
    { phase: "Production Architecture", description: "Deployed with Docker, monitoring, and CI/CD pipeline for production use." }
  ],
  
  results: [
    { label: "Enterprise Architecture", value: "Scalable", description: "Handles enterprise-grade document volumes" },
    { label: "AI-powered Compliance Analysis", value: "Intelligent", description: "Automated risk detection and analysis" },
    { label: "Semantic Document Search", value: "Accurate", description: "High-precision retrieval across documents" },
    { label: "Workflow Automation", value: "Automated", description: "Reduced manual compliance review effort" },
    { label: "Vector Database Integration", value: "Production", description: "Scalable Pinecone deployment" },
    { label: "Production-ready AI Pipeline", value: "Complete", description: "End-to-end RAG system with local LLM" }
  ],
  
  learnings: [
    {
      title: "Production RAG",
      description: "Building production RAG systems requires careful consideration of latency, cost, and quality trade-offs."
    },
    {
      title: "Vector Search",
      description: "Vector search quality depends on embedding models, chunking strategies, and retrieval methods."
    },
    {
      title: "Enterprise AI Architecture",
      description: "Enterprise AI systems need security, scalability, and reliability built in from the start."
    },
    {
      title: "Workflow Automation",
      description: "Workflow automation can significantly reduce manual effort when designed properly."
    }
  ],
  
  roadmap: [
    { feature: "Multi-Agent Compliance Review", status: "planned" },
    { feature: "Regulation Change Detection", status: "planned" },
    { feature: "Real-time Compliance Monitoring", status: "planned" },
    { feature: "Fine-tuned Legal Models", status: "planned" },
    { feature: "Role-based Enterprise Access", status: "planned" },
    { feature: "Document Version Tracking", status: "planned" },
    { feature: "Enterprise Analytics", status: "planned" },
    { feature: "Multi-language Support", status: "planned" }
  ],
  
  nextProject: {
    name: "Reflex Ninja",
    slug: "reflex-ninja",
    description: "AI Coding Assistant for rapid development."
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
    name: "ContextOS",
    slug: "contextos",
    description: "AI Infrastructure Platform."
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

export const contextOSData: ProjectDetailData = {
  slug: "contextos",
  name: "ContextOS",
  badge: "AI Infrastructure Platform",
  oneLiner: "A modular infrastructure platform for building production AI systems with persistent memory, intelligent retrieval, observability, orchestration and scalable context management.",
  description: "ContextOS is the operating layer for context-aware AI systems, providing reusable infrastructure for memory, retrieval, context management, observability and orchestration.",
  github: "https://github.com/shreyad2806/ContextOS",
  techStack: ["FastAPI", "Python", "PostgreSQL", "pgvector", "Redis", "LangGraph", "Docker", "Ollama", "OpenAI", "Pinecone"],
  heroImage: "/placeholder-hero.png",
  
  problem: {
    title: "The Missing Infrastructure Layer",
    points: [
      "Every AI application rebuilds the same infrastructure: memory, retrieval, conversation history, prompt management, observability, tool execution, context handling.",
      "Without ContextOS: Every project rebuilds memory, manages prompts differently, retrieval pipelines vary, no observability, no reusable architecture.",
      "With ContextOS: Unified memory, shared retrieval, centralized prompt management, observability, reusable AI infrastructure.",
      "ContextOS aims to become the reusable operating system underneath modern AI applications.",
      "This infrastructure layer enables multiple AI products to share common capabilities while maintaining independence."
    ]
  },
  
  motivations: [
    {
      icon: "🏗️",
      title: "AI Infrastructure",
      description: "Building the foundational infrastructure layer that powers production AI systems at scale."
    },
    {
      icon: "🔄",
      title: "Reusable Architecture",
      description: "Creating reusable components that eliminate redundant development across AI applications."
    },
    {
      icon: "📊",
      title: "Observability",
      description: "Providing deep visibility into AI system behavior, performance, and decision-making."
    }
  ],
  
  architecture: {
    steps: [
      { label: "Applications", description: "AI applications built on ContextOS infrastructure" },
      { label: "API Gateway", description: "Unified entry point for all infrastructure services" },
      { label: "Context Router", description: "Intelligent routing and context management" },
      { label: "Memory Engine", description: "Persistent conversation and context memory" },
      { label: "Retrieval Engine", description: "Semantic and hybrid retrieval capabilities" },
      { label: "Embedding Service", description: "Vector generation and management" },
      { label: "Knowledge Store", description: "Vector database for semantic search" },
      { label: "Prompt Manager", description: "Centralized prompt template management" },
      { label: "LLM Layer", description: "Pluggable LLM abstraction layer" },
      { label: "Tool Execution", description: "Safe tool calling and execution" },
      { label: "Observability", description: "Comprehensive monitoring and tracing" },
      { label: "Analytics", description: "Performance insights and optimization" }
    ]
  },
  
  features: [
    { icon: "🧠", title: "Context Management", description: "Unified context handling across all AI applications with automatic routing and state management." },
    { icon: "💾", title: "Conversation Memory", description: "Persistent memory for conversations with configurable retention and retrieval strategies." },
    { icon: "🔢", title: "Embedding Service", description: "Centralized embedding generation with support for multiple models and providers." },
    { icon: "📝", title: "Prompt Templates", description: "Versioned prompt templates with variables, testing, and A/B capabilities." },
    { icon: "🤖", title: "Agent Registry", description: "Registry for AI agents with capabilities, configuration, and lifecycle management." },
    { icon: "📚", title: "Knowledge Base", description: "Unified knowledge store with vector search and hybrid retrieval." },
    { icon: "🎯", title: "Vector Store", description: "Scalable vector database integration with Pinecone and pgvector support." },
    { icon: "🔧", title: "Tool Registry", description: "Safe tool registration with validation, permissions, and execution monitoring." },
    { icon: "📊", title: "Observability Dashboard", description: "Real-time monitoring of AI system performance, costs, and behavior." },
    { icon: "⚡", title: "Caching Layer", description: "Redis-based caching for embeddings, responses, and frequently accessed data." },
    { icon: "⚙️", title: "Configuration Manager", description: "Centralized configuration with environment-specific overrides." },
    { icon: "🚪", title: "API Gateway", description: "Unified API layer with authentication, rate limiting, and request routing." }
  ],
  
  decisions: [
    {
      problem: "Memory storage?",
      decision: "PostgreSQL + pgvector",
      why: "Persistent semantic memory with relational capabilities and vector similarity search."
    },
    {
      problem: "Caching layer?",
      decision: "Redis",
      why: "Fast context retrieval and response caching for improved performance."
    },
    {
      problem: "API framework?",
      decision: "FastAPI",
      why: "Async infrastructure APIs with automatic documentation and type safety."
    },
    {
      problem: "Agent framework?",
      decision: "LangGraph",
      why: "Composable workflows for building complex agentic AI systems."
    },
    {
      problem: "Containerization?",
      decision: "Docker",
      why: "Portable deployment with consistent environment across development and production."
    },
    {
      problem: "Embedding models?",
      decision: "OpenAI / BGE",
      why: "Flexible architecture supporting multiple embedding providers and models."
    },
    {
      problem: "LLM integration?",
      decision: "Pluggable",
      why: "Model-agnostic design allowing easy switching between LLM providers."
    }
  ],
  
  challenges: [
    {
      problem: "Designing reusable architecture",
      solution: "Created modular, independent components with clear interfaces and dependency injection.",
      learning: "Reusable architecture requires careful abstraction and interface design."
    },
    {
      problem: "Making every module independent",
      solution: "Implemented service boundaries with message passing and event-driven communication.",
      learning: "Independence enables flexibility; design services that can evolve independently."
    },
    {
      problem: "Supporting multiple LLM providers",
      solution: "Created abstraction layer with unified interface for different LLM APIs.",
      learning: "Abstraction layers enable provider switching without changing application code."
    },
    {
      problem: "Managing context efficiently",
      solution: "Implemented context compression, summarization, and intelligent retrieval strategies.",
      learning: "Context management is critical for AI systems; optimize for relevance and efficiency."
    },
    {
      problem: "Scaling retrieval",
      solution: "Implemented hybrid retrieval with caching and parallel query execution.",
      learning: "Retrieval scaling requires both algorithmic and infrastructure optimization."
    },
    {
      problem: "Observability",
      solution: "Built comprehensive tracing, logging, and metrics collection across all components.",
      learning: "Observability is essential for production AI systems; instrument everything."
    }
  ],
  
  journey: [
    { phase: "Infrastructure Core", description: "Designed foundational architecture and service boundaries." },
    { phase: "Memory Engine", description: "Built persistent memory with PostgreSQL and pgvector integration." },
    { phase: "Retrieval Layer", description: "Implemented semantic and hybrid retrieval with vector databases." },
    { phase: "Prompt Management", description: "Created centralized prompt template system with versioning." },
    { phase: "Observability", description: "Added comprehensive monitoring, tracing, and analytics." },
    { phase: "Multi-Agent Runtime", description: "Integrated LangGraph for complex agentic workflows." },
    { phase: "SDK", description: "Developed client SDKs for easy integration with applications." },
    { phase: "Cloud Platform", description: "Deployed scalable cloud infrastructure with auto-scaling." }
  ],
  
  results: [
    { label: "Infrastructure Core", value: "Complete", description: "Foundational architecture designed and implemented" },
    { label: "Memory Engine", value: "Operational", description: "Persistent semantic memory system" },
    { label: "Retrieval Layer", value: "Building", description: "Advanced retrieval capabilities" },
    { label: "Prompt Management", value: "Building", description: "Centralized prompt system" },
    { label: "Observability", value: "Planned", description: "Comprehensive monitoring" },
    { label: "Multi-Agent Runtime", value: "Planned", description: "Agentic workflow engine" }
  ],
  
  learnings: [
    {
      title: "AI Infrastructure",
      description: "Building AI infrastructure requires understanding both AI capabilities and system design principles."
    },
    {
      title: "Distributed Systems",
      description: "Production AI systems are distributed systems; design for reliability and scalability."
    },
    {
      title: "Production RAG",
      description: "Production RAG requires careful attention to latency, cost, and quality trade-offs."
    },
    {
      title: "Agent Architectures",
      description: "Agentic AI systems need proper orchestration, state management, and error handling."
    },
    {
      title: "Observability",
      description: "Observability is critical for understanding and improving AI system behavior."
    },
    {
      title: "Scalable APIs",
      description: "API design impacts system performance and developer experience significantly."
    }
  ],
  
  roadmap: [
    { feature: "Infrastructure Core", status: "completed" },
    { feature: "Memory Engine", status: "completed" },
    { feature: "Retrieval Layer", status: "in-progress" },
    { feature: "Prompt Management", status: "in-progress" },
    { feature: "Observability", status: "planned" },
    { feature: "Multi-Agent Runtime", status: "planned" },
    { feature: "SDK", status: "planned" },
    { feature: "Cloud Platform", status: "planned" }
  ],
  
  nextProject: {
    name: "AI System Optimizer (AISO)",
    slug: "aiso",
    description: "Observability platform for production AI systems."
  }
};

export const aisoData: ProjectDetailData = {
  slug: "aiso",
  name: "AI System Optimizer (AISO)",
  badge: "AI Observability Platform",
  oneLiner: "A production-grade platform that provides observability, evaluation, monitoring, and performance optimization for AI systems.",
  description: "AISO monitors, analyzes, optimizes, and scales AI systems by providing comprehensive telemetry, evaluation frameworks, and optimization recommendations for production AI applications.",
  github: "https://github.com/shreyad2806/AISO",
  techStack: ["FastAPI", "Python", "PostgreSQL", "Redis", "LangGraph", "Docker", "OpenTelemetry", "Prometheus", "Grafana", "Pinecone", "OpenAI"],
  heroImage: "/placeholder-hero.png",
  
  problem: {
    title: "Why AI Systems Need Observability",
    points: [
      "Unlike traditional software, AI systems introduce unique challenges: LLM latency, hallucinations, token costs, prompt failures, retrieval failures, tool failures, and evaluation complexity.",
      "Without proper monitoring, teams have no idea why an AI application performs poorly or how to improve it.",
      "Traditional monitoring tools don't capture AI-specific metrics like retrieval accuracy, prompt effectiveness, or hallucination rates.",
      "AI systems are black boxes; observability provides the visibility needed to understand and optimize them.",
      "AISO fills this gap by providing AI-specific monitoring, evaluation, and optimization capabilities."
    ]
  },
  
  motivations: [
    {
      icon: "📊",
      title: "AI Observability",
      description: "Building comprehensive monitoring for AI systems to understand behavior and performance."
    },
    {
      icon: "🔍",
      title: "Evaluation Frameworks",
      description: "Creating systematic evaluation methods to measure AI system quality and accuracy."
    },
    {
      icon: "⚡",
      title: "Performance Optimization",
      description: "Identifying and resolving performance bottlenecks in AI applications."
    }
  ],
  
  architecture: {
    steps: [
      { label: "Applications", description: "AI applications being monitored and optimized" },
      { label: "API Gateway", description: "Unified entry point for telemetry collection" },
      { label: "Telemetry Collector", description: "Collects metrics, traces, and logs from AI systems" },
      { label: "Metrics Engine", description: "Processes and stores performance metrics" },
      { label: "Tracing Engine", description: "Tracks request flows across AI components" },
      { label: "Evaluation Engine", description: "Evaluates response quality and accuracy" },
      { label: "Analytics Database", description: "Stores historical data for analysis" },
      { label: "Optimization Engine", description: "Identifies improvement opportunities" },
      { label: "Dashboard", description: "Visual interface for monitoring and insights" }
    ]
  },
  
  features: [
    { icon: "🤖", title: "LLM Monitoring", description: "Track LLM performance, latency, and response quality across all models." },
    { icon: "⏱️", title: "Latency Tracking", description: "Monitor end-to-end latency and identify performance bottlenecks." },
    { icon: "📝", title: "Prompt Analytics", description: "Analyze prompt effectiveness, token usage, and cost efficiency." },
    { icon: "💰", title: "Token Usage", description: "Track token consumption across models and optimize costs." },
    { icon: "📈", title: "Cost Analysis", description: "Comprehensive cost breakdown for AI operations and optimization." },
    { icon: "⚠️", title: "Hallucination Detection", description: "Identify and track hallucination rates with confidence scoring." },
    { icon: "🔍", title: "RAG Evaluation", description: "Evaluate retrieval quality, context precision, and recall metrics." },
    { icon: "🎯", title: "Retriever Performance", description: "Monitor retriever accuracy, latency, and embedding quality." },
    { icon: "📊", title: "Embedding Drift Detection", description: "Detect embedding drift and re-indexing needs over time." },
    { icon: "✅", title: "Response Quality Metrics", description: "Measure faithfulness, relevance, and groundedness of responses." },
    { icon: "🔄", title: "Agent Workflow Tracking", description: "Trace agent execution paths, tool calls, and decision-making." },
    { icon: "🐛", title: "Error Logging", description: "Comprehensive error tracking with context and root cause analysis." }
  ],
  
  decisions: [
    {
      problem: "Telemetry standard?",
      decision: "OpenTelemetry",
      why: "Industry-standard for observability with broad language support and integration."
    },
    {
      problem: "Metrics storage?",
      decision: "Prometheus",
      why: "Powerful time-series database with excellent querying capabilities."
    },
    {
      problem: "Visualization?",
      decision: "Grafana",
      why: "Flexible visualization platform with extensive plugin ecosystem."
    },
    {
      problem: "Backend framework?",
      decision: "FastAPI",
      why: "High-performance async APIs for telemetry ingestion and processing."
    },
    {
      problem: "Primary storage?",
      decision: "PostgreSQL",
      why: "Reliable relational database for analytics data and historical records."
    },
    {
      problem: "Caching layer?",
      decision: "Redis",
      why: "Fast caching for frequently accessed metrics and real-time data."
    },
    {
      problem: "Tracing approach?",
      decision: "OpenTelemetry",
      why: "Distributed tracing with automatic instrumentation and span correlation." },
    {
      problem: "Evaluation method?",
      decision: "Custom Metrics",
      why: "AI-specific metrics require custom evaluation frameworks and scoring." },
    {
      problem: "Architecture pattern?",
      decision: "Modular Services",
      why: "Modular design enables independent scaling and evolution of components."
    }
  ],
  
  challenges: [
    {
      problem: "Collecting telemetry",
      solution: "Implemented OpenTelemetry instrumentation with automatic span propagation and context tracking.",
      learning: "Telemetry collection requires careful instrumentation to avoid performance impact."
    },
    {
      problem: "Tracking AI-specific metrics",
      solution: "Created custom metrics for retrieval quality, prompt effectiveness, and hallucination detection.",
      learning: "AI systems need domain-specific metrics beyond traditional observability."
    },
    {
      problem: "Designing evaluation pipelines",
      solution: "Built modular evaluation framework with pluggable metrics and scoring algorithms.",
      learning: "Evaluation frameworks need flexibility to accommodate different AI use cases."
    },
    {
      problem: "Optimizing retrieval",
      solution: "Implemented retrieval analytics with embedding quality monitoring and drift detection.",
      learning: "Retrieval optimization requires continuous monitoring and adaptation."
    },
    {
      problem: "Balancing latency vs quality",
      solution: "Created latency-quality tradeoff analysis with configurable optimization targets.",
      learning: "AI systems require balancing competing objectives; provide tunable parameters."
    },
    {
      problem: "Reducing token costs",
      solution: "Implemented cost analytics with prompt optimization recommendations and caching strategies.",
      learning: "Cost optimization requires understanding usage patterns and optimization opportunities." },
    {
      problem: "Scaling observability",
      solution: "Designed distributed architecture with horizontal scaling and efficient data aggregation.",
      learning: "Observability at scale requires careful architecture for data volume and processing."
    }
  ],
  
  journey: [
    { phase: "Telemetry", description: "Implemented OpenTelemetry instrumentation and data collection pipeline." },
    { phase: "Metrics Dashboard", description: "Built comprehensive dashboard with real-time metrics and visualizations." },
    { phase: "Prompt Evaluation", description: "Created prompt analytics with effectiveness scoring and optimization." },
    { phase: "RAG Analytics", description: "Implemented retrieval evaluation with precision, recall, and drift detection." },
    { phase: "Optimization Engine", description: "Built optimization recommendations for latency, cost, and quality." },
    { phase: "Cost Prediction", description: "Added cost forecasting and budget management capabilities." },
    { phase: "Cloud Dashboard", description: "Deployed scalable cloud infrastructure with multi-tenant support." }
  ],
  
  results: [
    { label: "Telemetry", value: "Complete", description: "OpenTelemetry-based data collection" },
    { label: "Metrics Dashboard", value: "Building", description: "Real-time monitoring interface" },
    { label: "Prompt Evaluation", value: "Building", description: "Prompt analytics and optimization" },
    { label: "RAG Analytics", value: "Planned", description: "Retrieval quality monitoring" },
    { label: "Optimization Engine", value: "Planned", description: "AI system optimization" },
    { label: "Cost Prediction", value: "Future", description: "Cost forecasting and management" }
  ],
  
  learnings: [
    {
      title: "AI Observability",
      description: "AI systems require specialized observability beyond traditional software monitoring."
    },
    {
      title: "OpenTelemetry",
      description: "OpenTelemetry provides a powerful foundation for distributed observability."
    },
    {
      title: "Distributed Monitoring",
      description: "Monitoring distributed AI systems requires careful design of telemetry and correlation."
    },
    {
      title: "Evaluation Frameworks",
      description: "Systematic evaluation is essential for understanding and improving AI quality."
    },
    {
      title: "Performance Engineering",
      description: "Performance optimization requires deep understanding of system behavior and bottlenecks." },
    {
      title: "Optimization Strategies",
      description: "Effective optimization requires identifying the right metrics and tradeoffs."
    }
  ],
  
  roadmap: [
    { feature: "Telemetry", status: "completed" },
    { feature: "Metrics Dashboard", status: "in-progress" },
    { feature: "Prompt Evaluation", status: "in-progress" },
    { feature: "RAG Analytics", status: "planned" },
    { feature: "Optimization Engine", status: "planned" },
    { feature: "Cost Prediction", status: "planned" },
    { feature: "Cloud Dashboard", status: "planned" }
  ],
  
  nextProject: {
    name: "ContextOS",
    slug: "contextos",
    description: "The operating layer for production AI systems."
  }
};

export const projectDataMap: Record<string, ProjectDetailData> = {
  talentlens: talentLensData,
  "ai-tech-stack-recommender": aiTechStackRecommenderData,
  "lawgpt-crm": lawGPTCRMData,
  complytai: complytAIData,
  "reflex-ninja": reflexNinjaData,
  kodexa: kodexaData,
  contextos: contextOSData,
  aiso: aisoData,
};
