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
  oneLiner: "An end-to-end Retrieval-Augmented Generation platform that intelligently ranks resumes using semantic search, hybrid retrieval, reranking and LLM reasoning.",
  description: "TalentLens transforms traditional resume screening by leveraging advanced RAG techniques to understand candidate qualifications beyond simple keyword matching.",
  github: "https://github.com/shreyad2806/TalentLens",
  techStack: ["Python", "FastAPI", "Sentence Transformers", "Pinecone", "OpenAI", "RAG", "Redis", "Docker"],
  heroImage: "/placeholder-hero.png",
  
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
  oneLiner: "An AI-powered application that recommends complete technology stacks, architecture, deployment strategies, and implementation roadmaps from a natural language project idea.",
  description: "This platform uses LLM reasoning to generate complete, practical technology recommendations in seconds, helping developers make informed decisions about their tech stack.",
  github: "https://github.com/shreyad2806/AI-Tech-Stack-Recommender",
  techStack: ["React", "Vite", "Tailwind CSS", "FastAPI", "Python", "Google Gemini", "PostgreSQL", "SQLAlchemy", "JWT Authentication"],
  heroImage: "/placeholder-hero.png",
  
  problem: {
    title: "What problem does this solve?",
    points: [
      "Choosing a technology stack for a new project is difficult and time-consuming.",
      "Developers often spend hours comparing frameworks, databases, cloud services, authentication methods, and deployment platforms.",
      "Beginners frequently select incompatible technologies or overcomplicate their architecture.",
      "Existing solutions don't provide comprehensive, context-aware recommendations.",
      "This platform uses LLM reasoning to generate complete, practical technology recommendations in seconds."
    ]
  },
  
  motivations: [
    {
      icon: "🧠",
      title: "Understanding LLM Applications",
      description: "Deep dive into how LLMs can be used for practical, real-world applications beyond simple chat interfaces."
    },
    {
      icon: "⚙️",
      title: "Learning Full Stack AI Development",
      description: "Experience building end-to-end AI applications with both frontend and backend components."
    },
    {
      icon: "🚀",
      title: "Building an AI Product Beyond Chat Interfaces",
      description: "Create a practical tool that solves a real developer problem using AI reasoning capabilities."
    }
  ],
  
  architecture: {
    steps: [
      { label: "Project Idea", description: "Natural language project description input" },
      { label: "Frontend (React)", description: "User interface for project input and visualization" },
      { label: "FastAPI Backend", description: "High-performance API server handling requests" },
      { label: "Prompt Engineering", description: "Structured prompts for consistent AI responses" },
      { label: "Gemini API", description: "Google Gemini LLM for reasoning and recommendations" },
      { label: "Recommendation Engine", description: "AI-powered technology stack generation" },
      { label: "Response Formatter", description: "Structured JSON response formatting" },
      { label: "Frontend Visualization", description: "Beautiful display of recommendations" }
    ]
  },
  
  features: [
    { icon: "💬", title: "Natural Language Project Input", description: "Describe your project in plain English and get tailored recommendations." },
    { icon: "🎯", title: "Technology Recommendation", description: "AI suggests optimal frameworks, libraries, and tools for your specific use case." },
    { icon: "🏗️", title: "Architecture Suggestion", description: "Get system architecture recommendations based on project requirements." },
    { icon: "⚛️", title: "Frontend & Backend Selection", description: "Complete stack recommendations including both frontend and backend technologies." },
    { icon: "🗄️", title: "Database Recommendation", description: "SQL vs NoSQL recommendations based on data patterns and scale." },
    { icon: "🔐", title: "Authentication Strategy", description: "Security-first authentication and authorization recommendations." },
    { icon: "☁️", title: "Deployment Recommendation", description: "Cloud platform and deployment strategy suggestions." },
    { icon: "📈", title: "Scalable System Design", description: "Architecture patterns for handling growth and scale." }
  ],
  
  decisions: [
    {
      problem: "Frontend framework?",
      decision: "React + Vite",
      why: "Fast development, modular architecture, and excellent ecosystem for modern web applications."
    },
    {
      problem: "Backend framework?",
      decision: "FastAPI",
      why: "High-performance Python APIs with async support, automatic documentation, and type hints."
    },
    {
      problem: "Database choice?",
      decision: "PostgreSQL",
      why: "Reliable relational database with advanced features and strong data integrity."
    },
    {
      problem: "Authentication method?",
      decision: "JWT",
      why: "Secure, stateless authentication that scales well for modern web applications."
    },
    {
      problem: "LLM provider?",
      decision: "Google Gemini",
      why: "Natural language reasoning capabilities with strong performance and cost-effectiveness."
    },
    {
      problem: "ORM choice?",
      decision: "SQLAlchemy",
      why: "Clean database abstraction with excellent Python integration and type safety."
    },
    {
      problem: "Deployment strategy?",
      decision: "Render + Vercel",
      why: "Simple production deployment with managed services and excellent developer experience."
    }
  ],
  
  challenges: [
    {
      problem: "Prompt Engineering",
      solution: "Developed structured prompts with few-shot examples to ensure consistent, high-quality recommendations.",
      learning: "Prompt engineering is critical; structure and examples significantly improve LLM output quality."
    },
    {
      problem: "Maintaining recommendation consistency",
      solution: "Implemented response validation and standardized output formats for predictable results.",
      learning: "LLMs need guardrails; always validate and structure outputs for production use."
    },
    {
      problem: "Handling incomplete user inputs",
      solution: "Built intelligent fallback mechanisms and follow-up questions to gather missing information.",
      learning: "User experience matters; handle edge cases gracefully and guide users to better inputs."
    },
    {
      problem: "Designing structured AI responses",
      solution: "Created JSON schemas and validation to ensure AI responses match expected format.",
      learning: "Structured outputs require careful design; schemas and validation are essential."
    },
    {
      problem: "Managing API latency",
      solution: "Implemented caching strategies and optimized prompt design to reduce response times.",
      learning: "Performance optimization is key; cache aggressively and optimize prompts."
    },
    {
      problem: "Improving frontend responsiveness",
      solution: "Added loading states, optimistic UI updates, and smooth animations for better UX.",
      learning: "Perceived performance matters; loading states and animations improve user experience."
    }
  ],
  
  journey: [
    { phase: "Idea", description: "Identified the problem with tech stack selection and researched LLM-based solutions." },
    { phase: "Prototype", description: "Built initial MVP with basic LLM integration and simple recommendations." },
    { phase: "Frontend Design", description: "Designed and implemented React frontend with modern UI and animations." },
    { phase: "Backend APIs", description: "Built FastAPI backend with authentication and database integration." },
    { phase: "Gemini Integration", description: "Integrated Google Gemini API with structured prompt engineering." },
    { phase: "Authentication", description: "Implemented JWT-based authentication for secure user access." },
    { phase: "Database Integration", description: "Added PostgreSQL with SQLAlchemy for data persistence." },
    { phase: "Production Deployment", description: "Deployed to Render and Vercel with CI/CD pipeline." }
  ],
  
  results: [
    { label: "AI Recommendations Generated", value: "1000+", description: "Technology stack recommendations provided" },
    { label: "Technology Categories Covered", value: "50+", description: "Different technologies and frameworks" },
    { label: "Response Time", value: "< 3s", description: "Average recommendation generation time" },
    { label: "Production Ready Architecture", value: "Complete", description: "Full-stack deployment ready" },
    { label: "Modern Full Stack Design", value: "Premium", description: "Beautiful, responsive UI" }
  ],
  
  learnings: [
    {
      title: "Prompt Engineering",
      description: "Effective prompt engineering is the foundation of building reliable LLM applications."
    },
    {
      title: "LLM Integration",
      description: "Integrating LLMs into products requires careful consideration of latency, cost, and quality."
    },
    {
      title: "Full Stack Development",
      description: "Building complete full-stack applications requires understanding both frontend and backend concerns."
    },
    {
      title: "Production Deployment",
      description: "Production deployment involves CI/CD, monitoring, and handling real-world edge cases."
    }
  ],
  
  roadmap: [
    { feature: "Multiple LLM Support", status: "planned" },
    { feature: "OpenAI Integration", status: "planned" },
    { feature: "Claude Integration", status: "planned" },
    { feature: "Architecture Diagrams", status: "planned" },
    { feature: "Cost Estimation", status: "planned" },
    { feature: "Team Collaboration", status: "planned" },
    { feature: "Cloud Architecture Generator", status: "planned" },
    { feature: "Export to PDF", status: "planned" }
  ],
  
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

export const projectDataMap: Record<string, ProjectDetailData> = {
  talentlens: talentLensData,
  "ai-tech-stack-recommender": aiTechStackRecommenderData,
  "lawgpt-crm": lawGPTCRMData,
  complytai: complytAIData,
};
