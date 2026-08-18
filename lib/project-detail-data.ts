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
  screenshots?: { src: string; caption: string }[];
  architectureImage?: string;
  
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
  
  problem: {
    title: "What problem does TalentLens solve?",
    points: [
      "Resume screening is manual and time-consuming for recruiters.",
      "Keyword-based ATS systems miss qualified candidates with different terminology.",
      "Traditional systems lack semantic understanding of candidate skills and experience.",
      "Recruiters struggle to find the best candidates from large resume pools.",
      "Existing tools don't provide explainable ranking or evidence-based candidate matching."
    ]
  },
  
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
  heroImage: "/images/reflex1.jpeg",
  
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

export const falconAirlinesData: ProjectDetailData = {
  slug: "falcon-airlines",
  name: "Falcon Airlines",
  badge: "Full-Stack Airline Reservation System",
  oneLiner: "Full-stack airline reservation and ticketing platform with flight search, booking, payments, ticket generation, and boarding pass functionality.",
  description: "Falcon Airlines is a complete airline reservation system that handles flight search, passenger booking, payment processing, ticket generation with QR codes, and boarding pass creation. Built with Java Spring Boot backend and React frontend.",
  github: "https://github.com/shreyad2806/FalconAirlines",
  techStack: ["Java 21", "Spring Boot", "Spring Security", "PostgreSQL", "Redis", "Docker", "JWT", "React", "REST APIs", "PDF Generation", "QR Codes"],
  heroImage: "/images/falcon-airlines.png",
  
  problem: {
    title: "What problem does Falcon Airlines solve?",
    points: [
      "Airline reservation systems require complex booking workflows, passenger management, and ticketing infrastructure.",
      "Traditional systems often lack modern user interfaces and seamless booking experiences.",
      "Generating tickets and boarding passes with QR codes requires integration of multiple technologies.",
      "Managing flight schedules, availability, and real-time updates is challenging.",
      "Payment processing and secure transaction handling are critical for airline operations."
    ]
  },
  
  motivations: [
    {
      icon: "✈️",
      title: "Building Full-Stack Systems",
      description: "Understanding how to build complete end-to-end applications with complex business logic."
    },
    {
      icon: "🏗️",
      title: "Enterprise Java Development",
      description: "Deep dive into Spring Boot, Spring Security, and enterprise Java patterns."
    },
    {
      icon: "💳",
      title: "Payment Integration",
      description: "Learning to integrate secure payment processing and transaction workflows."
    }
  ],
  
  architecture: {
    steps: [
      { label: "User Interface", description: "React-based frontend for flight search and booking" },
      { label: "API Gateway", description: "Spring Boot REST APIs handling all business logic" },
      { label: "Authentication", description: "JWT-based authentication with Spring Security" },
      { label: "Flight Management", description: "Flight schedule, availability, and pricing management" },
      { label: "Booking Engine", description: "Reservation workflow with seat selection and passenger details" },
      { label: "Payment Processing", description: "Secure payment integration and transaction handling" },
      { label: "Ticket Generation", description: "PDF ticket generation with unique booking references" },
      { label: "QR Code System", description: "QR code generation for boarding passes and check-in" },
      { label: "Database", description: "PostgreSQL for structured data storage" },
      { label: "Caching Layer", description: "Redis for session management and caching" }
    ]
  },
  
  features: [
    { icon: "🔍", title: "Flight Search", description: "Search flights by origin, destination, date, and class." },
    { icon: "📅", title: "Schedule Management", description: "Manage flight schedules, routes, and availability." },
    { icon: "👤", title: "Passenger Management", description: "Handle passenger details, bookings, and history." },
    { icon: "💳", title: "Payment Processing", description: "Secure payment integration for booking transactions." },
    { icon: "🎫", title: "Ticket Generation", description: "Generate PDF tickets with booking details and references." },
    { icon: "📱", title: "QR Boarding Pass", description: "QR code-based boarding passes for check-in." },
    { icon: "🔐", title: "Secure Authentication", description: "JWT-based authentication for user accounts." },
    { icon: "⚡", title: "Real-time Updates", description: "Real-time flight status and booking updates." }
  ],
  
  decisions: [
    {
      problem: "Backend framework?",
      decision: "Spring Boot",
      why: "Enterprise-grade Java framework with excellent ecosystem for building scalable REST APIs."
    },
    {
      problem: "Security framework?",
      decision: "Spring Security",
      why: "Comprehensive security framework with JWT support and authentication patterns."
    },
    {
      problem: "Database choice?",
      decision: "PostgreSQL",
      why: "Reliable relational database with strong data integrity for booking transactions."
    },
    {
      problem: "Caching layer?",
      decision: "Redis",
      why: "Fast in-memory caching for sessions and frequently accessed flight data."
    },
    {
      problem: "Frontend framework?",
      decision: "React",
      why: "Component-based architecture for building responsive booking interfaces."
    },
    {
      problem: "Ticket generation?",
      decision: "PDF Libraries",
      why: "Reliable PDF generation for tickets with custom layouts and QR codes."
    },
    {
      problem: "Deployment strategy?",
      decision: "Docker",
      why: "Containerized deployment for consistent environments across development and production."
    }
  ],
  
  challenges: [
    {
      problem: "Managing concurrent bookings",
      solution: "Implemented database transactions and optimistic locking to handle concurrent reservations.",
      learning: "Concurrent access requires careful transaction management and locking strategies."
    },
    {
      problem: "Flight availability logic",
      solution: "Designed complex availability algorithms considering schedules, routes, and seat capacity.",
      learning: "Business logic can become complex; break it down into manageable components."
    },
    {
      problem: "QR code integration",
      solution: "Integrated QR code libraries with PDF generation for boarding passes.",
      learning: "Multiple technology integrations require careful testing and error handling."
    },
    {
      problem: "Payment security",
      solution: "Implemented secure payment flows with proper validation and error handling.",
      learning: "Payment processing requires strict security measures and compliance."
    },
    {
      problem: "State management",
      solution: "Used Redux for frontend state management across booking workflow.",
      learning: "Complex workflows need predictable state management."
    }
  ],
  
  journey: [
    { phase: "Idea", description: "Identified the complexity of airline reservation systems and researched requirements." },
    { phase: "Database Design", description: "Designed normalized schema for flights, bookings, passengers, and payments." },
    { phase: "Backend APIs", description: "Built Spring Boot REST APIs with Spring Security authentication." },
    { phase: "Flight Management", description: "Implemented flight schedule and availability management." },
    { phase: "Booking Engine", description: "Built the complete booking workflow with seat selection." },
    { phase: "Payment Integration", description: "Integrated payment processing with secure transaction handling." },
    { phase: "Ticket Generation", description: "Implemented PDF ticket generation with QR codes." },
    { phase: "Frontend Development", description: "Built React frontend with booking interface and user dashboard." },
    { phase: "Testing", description: "Tested complete booking workflow and edge cases." },
    { phase: "Deployment", description: "Deployed with Docker and configured production environment." }
  ],
  
  results: [
    { label: "Booking System", value: "Complete", description: "End-to-end flight booking workflow" },
    { label: "Ticket Generation", value: "Functional", description: "PDF tickets with QR codes" },
    { label: "Payment Processing", value: "Secure", description: "Integrated payment transactions" },
    { label: "Authentication", value: "JWT-based", description: "Secure user authentication" },
    { label: "Full Stack", value: "Production", description: "Complete Java + React application" }
  ],
  
  learnings: [
    {
      title: "Enterprise Java",
      description: "Spring Boot and Spring Security provide powerful tools for building enterprise applications."
    },
    {
      title: "Transaction Management",
      description: "Database transactions are critical for data integrity in booking systems."
    },
    {
      title: "Full-Stack Integration",
      description: "Integrating frontend and backend requires careful API design and state management."
    },
    {
      title: "Payment Security",
      description: "Payment processing requires strict security measures and compliance standards."
    }
  ],
  
  roadmap: [
    { feature: "Multi-city Booking", status: "planned" },
    { feature: "Loyalty Program", status: "planned" },
    { feature: "Mobile App", status: "planned" },
    { feature: "Real-time Notifications", status: "planned" },
    { feature: "Analytics Dashboard", status: "planned" }
  ],
  
  nextProject: {
    name: "DevForge",
    slug: "devforge",
    description: "Full-stack SaaS platform for developer kits."
  }
};

export const devForgeData: ProjectDetailData = {
  slug: "devforge",
  name: "DevForge",
  badge: "Full-Stack SaaS Platform",
  oneLiner: "Full-stack SaaS platform for discovering, building, and managing reusable developer kits with authentication, subscriptions, and billing.",
  description: "DevForge is a SaaS platform that enables developers to discover, build, and share reusable developer kits. It includes authentication, premium feature gating, subscription management, billing integration, and workspace functionality.",
  github: "https://github.com/shreyad2806/DevForge",
  techStack: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL", "Tailwind CSS", "Authentication", "Subscriptions", "SaaS"],
  heroImage: "/images/devforge.png",
  
  problem: {
    title: "What problem does DevForge solve?",
    points: [
      "Developers struggle to find and reuse high-quality developer kits and components.",
      "Building and sharing reusable components lacks a centralized platform.",
      "Monetizing developer tools and kits requires complex subscription and billing infrastructure.",
      "Managing workspaces, teams, and collaboration features is challenging for developer tools.",
      "SaaS applications require robust authentication, role-based access, and premium feature gating."
    ]
  },
  
  motivations: [
    {
      icon: "🏗️",
      title: "Building SaaS Products",
      description: "Understanding how to build scalable, multi-tenant SaaS applications."
    },
    {
      icon: "🔐",
      title: "Authentication & Authorization",
      description: "Implementing secure authentication with role-based access control."
    },
    {
      icon: "💳",
      title: "Subscription Management",
      description: "Learning to integrate billing and subscription workflows."
    }
  ],
  
  architecture: {
    steps: [
      { label: "Next.js Frontend", description: "React-based frontend with server-side rendering" },
      { label: "Authentication Layer", description: "Supabase Auth for user authentication and sessions" },
      { label: "API Layer", description: "REST APIs for kit management and user operations" },
      { label: "Business Logic", description: "Kit discovery, workspace management, and subscription logic" },
      { label: "Database Layer", description: "Supabase PostgreSQL for structured data storage" },
      { label: "File Storage", description: "Supabase Storage for kit files and assets" },
      { label: "Subscription Engine", description: "Premium feature gating and subscription management" },
      { label: "Billing Integration", description: "Integration with payment providers for subscriptions" },
      { label: "Admin Dashboard", description: "Admin interface for platform management" },
      { label: "User Dashboard", description: "User workspace for managing kits and subscriptions" }
    ]
  },
  
  features: [
    { icon: "🔍", title: "Kit Discovery", description: "Search and discover reusable developer kits and components." },
    { icon: "🛠️", title: "Kit Builder", description: "Tools to build and customize developer kits." },
    { icon: "👥", title: "Workspace Management", description: "Organize kits into workspaces for better organization." },
    { icon: "🔐", title: "Authentication", description: "Secure user authentication with Supabase Auth." },
    { icon: "💎", title: "Premium Features", description: "Premium feature gating for subscribed users." },
    { icon: "💳", title: "Subscription Management", description: "Manage subscriptions and billing cycles." },
    { icon: "📊", title: "Analytics Dashboard", description: "Track kit usage and platform analytics." },
    { icon: "👤", title: "User Profiles", description: "User profiles with activity history and preferences." }
  ],
  
  decisions: [
    {
      problem: "Frontend framework?",
      decision: "Next.js",
      why: "Fast, SEO-friendly, and excellent for building SaaS applications with server-side rendering."
    },
    {
      problem: "Backend/Database?",
      decision: "Supabase",
      why: "Provides PostgreSQL, authentication, storage, and real-time features in one platform."
    },
    {
      problem: "Authentication provider?",
      decision: "Supabase Auth",
      why: "Built-in authentication with social providers and session management."
    },
    {
      problem: "Styling approach?",
      decision: "Tailwind CSS",
      why: "Rapid UI development with utility-first approach and consistent design system."
    },
    {
      problem: "Type safety?",
      decision: "TypeScript",
      why: "Type safety across frontend and backend for better developer experience."
    },
    {
      problem: "Subscription management?",
      decision: "Custom Implementation",
      why: "Flexible subscription logic integrated with payment providers."
    }
  ],
  
  challenges: [
    {
      problem: "Designing SaaS database schema",
      solution: "Designed normalized schema with proper relationships for users, kits, workspaces, and subscriptions.",
      learning: "SaaS database design requires careful consideration of multi-tenancy and relationships."
    },
    {
      problem: "Implementing premium feature gating",
      solution: "Created middleware and hooks to check subscription status before granting access.",
      learning: "Feature gating needs to be implemented at multiple layers for security."
    },
    {
      problem: "Managing subscription state",
      solution: "Implemented webhooks and background jobs to sync subscription status from payment providers.",
      learning: "Subscription state management requires reliable sync mechanisms."
    },
    {
      problem: "Building reusable components",
      solution: "Created a component library with consistent design patterns and props interfaces.",
      learning: "Component reusability saves time; invest in a good component library."
    },
    {
      problem: "File upload and storage",
      solution: "Integrated Supabase Storage with proper validation and access controls.",
      learning: "File storage requires security considerations and access management."
    }
  ],
  
  journey: [
    { phase: "Idea", description: "Identified the need for a centralized platform for developer kits." },
    { phase: "Database Design", description: "Designed Supabase schema for users, kits, workspaces, and subscriptions." },
    { phase: "Authentication", description: "Implemented Supabase Auth with social providers." },
    { phase: "Core Features", description: "Built kit discovery and management features." },
    { phase: "Workspace System", description: "Implemented workspace organization and collaboration." },
    { phase: "Subscription Engine", description: "Built premium feature gating and subscription logic." },
    { phase: "Billing Integration", description: "Integrated payment providers for subscription billing." },
    { phase: "Admin Dashboard", description: "Built admin interface for platform management." },
    { phase: "Testing", description: "Tested subscription flows and edge cases." },
    { phase: "Production Deployment", description: "Deployed to production with monitoring and CI/CD." }
  ],
  
  results: [
    { label: "SaaS Platform", value: "Complete", description: "Full-stack SaaS application" },
    { label: "Authentication", value: "Secure", description: "Supabase Auth integration" },
    { label: "Subscriptions", value: "Functional", description: "Premium feature gating" },
    { label: "Database", value: "Supabase", description: "PostgreSQL with real-time features" },
    { label: "Production Ready", value: "Deployed", description: "Scalable SaaS architecture" }
  ],
  
  learnings: [
    {
      title: "SaaS Architecture",
      description: "Building SaaS requires understanding multi-tenancy, subscriptions, and billing."
    },
    {
      title: "Supabase Integration",
      description: "Supabase provides a powerful backend-as-a-service platform for rapid development."
    },
    {
      title: "Feature Gating",
      description: "Premium features need to be gated at multiple layers for security."
    },
    {
      title: "Subscription Management",
      description: "Subscription workflows require reliable state management and webhooks."
    }
  ],
  
  roadmap: [
    { feature: "Team Collaboration", status: "planned" },
    { feature: "API for Kits", status: "planned" },
    { feature: "Marketplace", status: "planned" },
    { feature: "Analytics", status: "planned" },
    { feature: "Mobile App", status: "planned" }
  ],
  
  nextProject: {
    name: "CRM",
    slug: "lawgpt-crm",
    description: "Full-stack CRM and marketing automation platform."
  }
};

export const crmData: ProjectDetailData = {
  slug: "lawgpt-crm",
  name: "CRM",
  badge: "Full-Stack CRM & Marketing Automation Platform",
  oneLiner: "Full-stack CRM and marketing automation platform for lead management, workflow automation, and sales operations.",
  description: "CRM is a full-stack platform that centralizes lead management, customer data, and marketing workflows. It includes dashboards, automation, authentication, and tools for managing sales operations efficiently.",
  github: "https://github.com/shreyad2806/LawGPT-CRM",
  liveDemo: "https://drive.google.com/file/d/18RrSipRNnuMleit-CbmXPcd3z_zfen1G/view?usp=sharing",
  techStack: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL", "Tailwind CSS", "Authentication", "Automation", "OpenAI"],
  heroImage: "/images/crm(thumbnail).png",
  screenshots: [
    { src: "/images/crm1.png", caption: "Dashboard Overview" },
    { src: "/images/crm2.png", caption: "Lead Management" },
    { src: "/images/crm3.png", caption: "Customer Profiles" },
    { src: "/images/crm4.png", caption: "Marketing Automation" },
    { src: "/images/crm5.png", caption: "Analytics Dashboard" },
    { src: "/images/crm6.png", caption: "Task Tracking" }
  ],
  architectureImage: "/images/crm-archi.png",
  
  problem: {
    title: "What problem does CRM solve?",
    points: [
      "Businesses manage leads manually using spreadsheets and disconnected tools.",
      "Following up with clients is repetitive and time-consuming, leading to missed opportunities.",
      "Marketing campaigns require manual effort and lack personalization at scale.",
      "Customer information is scattered across different platforms.",
      "Sales teams need centralized dashboards for tracking leads and opportunities."
    ]
  },
  
  motivations: [
    {
      icon: "🏗️",
      title: "Building CRM Systems",
      description: "Understanding how to build customer relationship management platforms."
    },
    {
      icon: "🤖",
      title: "Workflow Automation",
      description: "Learning to automate repetitive business tasks and workflows."
    },
    {
      icon: "📊",
      title: "Dashboard Development",
      description: "Building analytics dashboards for sales and marketing insights."
    }
  ],
  
  architecture: {
    steps: [
      { label: "Next.js Frontend", description: "React-based frontend with server-side rendering" },
      { label: "Authentication Layer", description: "Supabase Auth for secure user authentication" },
      { label: "CRM APIs", description: "REST APIs for lead and customer management" },
      { label: "Lead Management", description: "Lead tracking, scoring, and pipeline management" },
      { label: "Database Layer", description: "Supabase PostgreSQL for structured data storage" },
      { label: "Automation Engine", description: "Workflow automation for marketing and follow-ups" },
      { label: "AI Integration", description: "OpenAI integration for content generation" },
      { label: "Analytics Dashboard", description: "Real-time insights and performance metrics" },
      { label: "Notification System", description: "Email and in-app notifications" },
      { label: "User Dashboard", description: "Centralized interface for CRM operations" }
    ]
  },
  
  features: [
    { icon: "👥", title: "Lead Management", description: "Track and manage leads through the entire sales pipeline." },
    { icon: "👤", title: "Customer Profiles", description: "Comprehensive profiles with contact history and interactions." },
    { icon: "📢", title: "Marketing Automation", description: "Automate marketing campaigns with personalized messaging." },
    { icon: "✅", title: "Task Tracking", description: "Manage tasks, deadlines, and follow-ups with reminders." },
    { icon: "🔔", title: "Notification System", description: "Automated reminders and notifications for important events." },
    { icon: "📊", title: "Analytics Dashboard", description: "Real-time insights into sales performance and engagement." },
    { icon: "🔐", title: "Secure Authentication", description: "JWT-based authentication with role-based access." },
    { icon: "🤖", title: "AI Content Generation", description: "Generate personalized content using AI." }
  ],
  
  decisions: [
    {
      problem: "Frontend framework?",
      decision: "Next.js",
      why: "Fast, SEO-friendly, and excellent for building CRM dashboards."
    },
    {
      problem: "Backend/Database?",
      decision: "Supabase",
      why: "Provides PostgreSQL, authentication, and real-time features in one platform."
    },
    {
      problem: "Authentication provider?",
      decision: "Supabase Auth",
      why: "Built-in authentication with social providers and session management."
    },
    {
      problem: "AI integration?",
      decision: "OpenAI",
      why: "Powerful language models for content generation and automation."
    },
    {
      problem: "Styling approach?",
      decision: "Tailwind CSS",
      why: "Rapid UI development with utility-first approach."
    },
    {
      problem: "Type safety?",
      decision: "TypeScript",
      why: "Type safety across the application for better developer experience."
    }
  ],
  
  challenges: [
    {
      problem: "Designing CRM database relationships",
      solution: "Designed normalized schema with proper foreign keys for leads, customers, and interactions.",
      learning: "CRM database design requires understanding of complex relationships."
    },
    {
      problem: "Automating workflows reliably",
      solution: "Implemented robust error handling and retry mechanisms in automation workflows.",
      learning: "Automation needs resilience; always handle failures gracefully."
    },
    {
      problem: "Managing authentication securely",
      solution: "Implemented proper token validation, refresh tokens, and secure storage.",
      learning: "Authentication security is critical; follow best practices."
    },
    {
      problem: "Building analytics dashboards",
      solution: "Created efficient queries and aggregations for real-time analytics.",
      learning: "Analytics require optimized queries and proper data modeling."
    },
    {
      problem: "Integrating AI workflows",
      solution: "Created modular AI services that can be integrated into different workflows.",
      learning: "AI integration should be modular and reusable."
    }
  ],
  
  journey: [
    { phase: "Idea", description: "Identified pain points in manual CRM management." },
    { phase: "Database Design", description: "Designed Supabase schema for leads, customers, and interactions." },
    { phase: "Authentication", description: "Implemented Supabase Auth with secure session management." },
    { phase: "Lead Management", description: "Built lead tracking and pipeline management features." },
    { phase: "Dashboard Development", description: "Created analytics dashboard with real-time insights." },
    { phase: "Automation Engine", description: "Implemented workflow automation for marketing tasks." },
    { phase: "AI Integration", description: "Integrated OpenAI for content generation." },
    { phase: "Testing", description: "Tested CRM workflows and automation scenarios." },
    { phase: "Production Deployment", description: "Deployed with monitoring and CI/CD pipeline." }
  ],
  
  results: [
    { label: "Lead Management", value: "Centralized", description: "All lead data in one platform" },
    { label: "Workflow Automation", value: "Automated", description: "Repetitive tasks handled by system" },
    { label: "Analytics", value: "Real-time", description: "Dashboard with performance insights" },
    { label: "Authentication", value: "Secure", description: "Supabase Auth integration" },
    { label: "Production Ready", value: "Complete", description: "Full-stack CRM application" }
  ],
  
  learnings: [
    {
      title: "CRM Architecture",
      description: "Building CRM requires understanding of sales workflows and customer relationships."
    },
    {
      title: "Workflow Automation",
      description: "Automation can significantly reduce manual effort and improve efficiency."
    },
    {
      title: "Analytics Development",
      description: "Analytics dashboards require optimized queries and proper data modeling."
    },
    {
      title: "AI Integration",
      description: "AI should enhance user experience, not complicate it."
    }
  ],
  
  roadmap: [
    { feature: "Calendar Integration", status: "planned" },
    { feature: "Email Templates", status: "planned" },
    { feature: "Advanced Analytics", status: "planned" },
    { feature: "Mobile App", status: "planned" },
    { feature: "API Access", status: "planned" }
  ],
  
  nextProject: {
    name: "ComplytAI",
    slug: "complytai",
    description: "Financial compliance and risk intelligence platform."
  }
};

export const architectIQData: ProjectDetailData = {
  slug: "architectiq",
  name: "ArchitectIQ",
  badge: "AI-Powered Architecture Review Platform",
  oneLiner: "AI-powered software architecture review platform that analyzes repositories, identifies architectural and design issues, and produces actionable engineering insights.",
  description: "ArchitectIQ analyzes real software repositories to identify architectural issues, design patterns, and code quality problems. It uses AI-assisted analysis to generate actionable engineering insights and recommendations.",
  github: "https://github.com/shreyad2806/ArchitectIQ",
  techStack: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "OpenAI", "Repository Analysis", "System Design", "Code Intelligence"],
  heroImage: "/images/architectiq.png",
  
  problem: {
    title: "What problem does ArchitectIQ solve?",
    points: [
      "Reviewing software architecture manually is time-consuming and error-prone.",
      "Identifying architectural issues and design patterns requires deep expertise.",
      "Codebases grow complex, making it difficult to maintain architectural consistency.",
      "New team members struggle to understand existing architecture and design decisions.",
      "Automated tools often miss context-specific architectural problems."
    ]
  },
  
  motivations: [
    {
      icon: "🔍",
      title: "Repository Analysis",
      description: "Building tools to understand and analyze codebases at scale."
    },
    {
      icon: "🏗️",
      title: "System Design",
      description: "Applying system design principles to automated analysis."
    },
    {
      icon: "🤖",
      title: "AI-Assisted Engineering",
      description: "Using AI to generate actionable engineering insights."
    }
  ],
  
  architecture: {
    steps: [
      { label: "Repository Input", description: "Accept GitHub repository URLs or local codebases" },
      { label: "Code Analysis", description: "Parse and analyze code structure and dependencies" },
      { label: "Pattern Detection", description: "Identify design patterns and anti-patterns" },
      { label: "Architecture Analysis", description: "Analyze architectural decisions and structure" },
      { label: "AI Analysis Engine", description: "OpenAI integration for contextual analysis" },
      { label: "Insight Generation", description: "Generate actionable engineering recommendations" },
      { label: "Database Storage", description: "PostgreSQL for analysis results and history" },
      { label: "API Layer", description: "FastAPI backend for analysis services" },
      { label: "React Dashboard", description: "Frontend for viewing insights and recommendations" },
      { label: "Report Generation", description: "Generate detailed architecture reports" }
    ]
  },

  screenshots: [
  {
    src: "/images/archi1.png",
    caption: "Architecture Analysis Dashboard",
  },
  {
    src: "/images/archi2.png",
    caption: "Repository Analysis",
  },
  {
    src: "/images/archi3.png",
    caption: "AI-Generated Engineering Insights",
  },
  {
    src: "/images/archi4.png",
    caption: "Architecture Review Report",
  },
],
  
  features: [
    { icon: "📁", title: "Repository Analysis", description: "Analyze entire codebases for architectural issues." },
    { icon: "🔍", title: "Pattern Detection", description: "Identify design patterns and anti-patterns automatically." },
    { icon: "🏗️", title: "Architecture Review", description: "Review architectural decisions and structure." },
    { icon: "🤖", title: "AI Insights", description: "Generate actionable engineering insights using AI." },
    { icon: "📊", title: "Code Metrics", description: "Calculate code quality and complexity metrics." },
    { icon: "📋", title: "Detailed Reports", description: "Generate comprehensive architecture review reports." },
    { icon: "🔐", title: "Secure Analysis", description: "Secure handling of private repository data." },
    { icon: "📈", title: "Trend Analysis", description: "Track architectural quality over time." }
  ],
  
  decisions: [
    {
      problem: "Backend framework?",
      decision: "FastAPI",
      why: "High-performance Python APIs with async support for analysis tasks."
    },
    {
      problem: "AI provider?",
      decision: "OpenAI",
      why: "Strong reasoning capabilities for contextual architectural analysis."
    },
    {
      problem: "Database choice?",
      decision: "PostgreSQL",
      why: "Reliable storage for analysis results and repository metadata."
    },
    {
      problem: "Frontend framework?",
      decision: "React",
      why: "Component-based architecture for building analysis dashboards."
    },
    {
      problem: "Code parsing?",
      decision: "AST Analysis",
      why: "Accurate code structure analysis using abstract syntax trees."
    },
    {
      problem: "Type safety?",
      decision: "TypeScript",
      why: "Type safety across the application for better maintainability."
    }
  ],
  
  challenges: [
    {
      problem: "Analyzing large codebases",
      solution: "Implemented incremental analysis and caching for large repositories.",
      learning: "Large codebase analysis requires efficient algorithms and caching."
    },
    {
      problem: "Context-aware analysis",
      solution: "Used AI with repository context for more accurate architectural insights.",
      learning: "Context is critical for accurate code analysis."
    },
    {
      problem: "Pattern detection accuracy",
      solution: "Combined static analysis with AI for better pattern recognition.",
      learning: "Hybrid approaches often yield better results than single methods."
    },
    {
      problem: "Handling different languages",
      solution: "Built language-agnostic analysis with language-specific parsers.",
      learning: "Multi-language support requires modular architecture."
    },
    {
      problem: "Generating actionable insights",
      solution: "Structured AI prompts with engineering best practices as context.",
      learning: "AI outputs need structured prompts and validation."
    }
  ],
  
  journey: [
    { phase: "Idea", description: "Identified the need for automated architecture review." },
    { phase: "Research", description: "Researched code analysis techniques and tools." },
    { phase: "Code Parser", description: "Built parsers for multiple programming languages." },
    { phase: "Pattern Detection", description: "Implemented design pattern detection algorithms." },
    { phase: "AI Integration", description: "Integrated OpenAI for contextual analysis." },
    { phase: "Backend APIs", description: "Built FastAPI backend for analysis services." },
    { phase: "Frontend Dashboard", description: "Created React dashboard for viewing insights." },
    { phase: "Report Generation", description: "Implemented detailed architecture report generation." },
    { phase: "Testing", description: "Tested on various open-source repositories." },
    { phase: "Production", description: "Deployed as a completed production-ready system." }
  ],
  
  results: [
    { label: "Analysis Engine", value: "Complete", description: "Full repository analysis system" },
    { label: "AI Insights", value: "Actionable", description: "Context-aware engineering recommendations" },
    { label: "Pattern Detection", value: "Accurate", description: "Design pattern identification" },
    { label: "Reports", value: "Detailed", description: "Comprehensive architecture reports" },
    { label: "Status", value: "Completed", description: "Production-ready platform" }
  ],
  
  learnings: [
    {
      title: "Code Analysis",
      description: "Analyzing codebases requires understanding of language-specific patterns."
    },
    {
      title: "AI for Engineering",
      description: "AI can provide valuable insights when given proper context."
    },
    {
      title: "System Design",
      description: "Architecture review requires deep understanding of design principles."
    },
    {
      title: "Tool Building",
      description: "Building developer tools requires understanding of real workflows."
    }
  ],
  
  roadmap: [
    { feature: "Multi-language Support", status: "completed" },
    { feature: "Team Collaboration", status: "planned" },
    { feature: "CI/CD Integration", status: "planned" },
    { feature: "Historical Analysis", status: "planned" },
    { feature: "Custom Rules", status: "planned" }
  ],
  
  nextProject: {
    name: "Kodexa",
    slug: "kodexa",
    description: "AI developer tool for maintainable software."
  }
};

export const kodexaData: ProjectDetailData = {
  slug: "kodexa",
  name: "Kodexa",
  badge: "AI Developer Tool for Maintainable Software",
  oneLiner: "AI developer tool for turning agent-generated and rapidly evolving codebases into reusable, maintainable software through debugging, codebase analysis, and repository intelligence.",
  description: "Kodexa helps developers turn AI-generated code into cleaner, reusable, maintainable software. It focuses on debugging, codebase analysis, identifying duplicate/unnecessary code, improving reusability, and contextual code analysis for long-running software projects.",
  github: "https://github.com/shreyad2806/Kodexa",
  techStack: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "pgvector", "VS Code Extension", "Developer Tools", "Repository Intelligence", "Agentic AI"],
  heroImage: "/images/kodexa.png",
  
  problem: {
    title: "What problem does Kodexa solve?",
    points: [
      "AI coding agents can generate duplicated, inconsistent, difficult-to-maintain code.",
      "Rapidly evolving codebases accumulate technical debt and redundancy.",
      "Identifying duplicate and unnecessary code across large projects is challenging.",
      "AI-generated code often lacks proper structure and reusability patterns.",
      "Long-running software projects need tools to maintain code quality over time."
    ]
  },
  
  motivations: [
    {
      icon: "🔧",
      title: "Developer Tools",
      description: "Building tools that improve developer productivity and code quality."
    },
    {
      icon: "🔍",
      title: "Code Analysis",
      description: "Deep analysis of codebases for maintainability and reusability."
    },
    {
      icon: "🤖",
      title: "Agentic AI",
      description: "Using AI agents for intelligent code analysis and refactoring."
    }
  ],
  
  architecture: {
    steps: [
      { label: "VS Code Extension", description: "IDE extension for seamless developer workflow" },
      { label: "Code Analysis Engine", description: "Analyzes code structure and identifies issues" },
      { label: "Duplicate Detection", description: "Identifies duplicate and redundant code patterns" },
      { label: "Reusability Analysis", description: "Analyzes code for reusability opportunities" },
      { label: "LangGraph Agents", description: "AI agents for intelligent code analysis" },
      { label: "Context Engine", description: "Maintains context for codebase understanding" },
      { label: "Vector Database", description: "pgvector for semantic code search" },
      { label: "PostgreSQL", description: "Structured storage for analysis results" },
      { label: "FastAPI Backend", description: "API services for analysis operations" },
      { label: "Refactoring Suggestions", description: "Generates actionable refactoring recommendations" }
    ]
  },
  
  features: [
    { icon: "🔍", title: "Codebase Analysis", description: "Deep analysis of code structure and dependencies." },
    { icon: "📋", title: "Duplicate Detection", description: "Identify duplicate and redundant code automatically." },
    { icon: "♻️", title: "Reusability Analysis", description: "Find opportunities for code reuse and extraction." },
    { icon: "🤖", title: "AI Refactoring", description: "AI-powered refactoring suggestions and improvements." },
    { icon: "🔧", title: "VS Code Integration", description: "Seamless integration with VS Code workflow." },
    { icon: "📊", title: "Code Metrics", description: "Track code quality metrics over time." },
    { icon: "🎯", title: "Contextual Analysis", description: "Context-aware analysis considering project structure." },
    { icon: "📝", title: "Actionable Insights", description: "Generate specific, actionable improvement suggestions." }
  ],
  
  decisions: [
    {
      problem: "IDE integration?",
      decision: "VS Code Extension",
      why: "Most popular IDE with rich extension API for developer tools."
    },
    {
      problem: "Agent framework?",
      decision: "LangGraph",
      why: "Powerful framework for building agentic AI workflows."
    },
    {
      problem: "Vector database?",
      decision: "pgvector",
      why: "PostgreSQL extension for vector search, keeping everything in one database."
    },
    {
      problem: "Backend framework?",
      decision: "FastAPI",
      why: "High-performance Python APIs with async support."
    },
    {
      problem: "Code analysis approach?",
      decision: "AST + AI",
      why: "Combining static analysis with AI for better accuracy."
    },
    {
      problem: "Storage choice?",
      decision: "PostgreSQL",
      why: "Reliable database with pgvector for both structured and vector data."
    }
  ],
  
  challenges: [
    {
      problem: "Analyzing large codebases efficiently",
      solution: "Implemented incremental analysis and caching for performance.",
      learning: "Large codebase analysis requires optimization and caching strategies."
    },
    {
      problem: "Accurate duplicate detection",
      solution: "Combined semantic similarity with structural analysis.",
      learning: "Duplicate detection needs both semantic and structural analysis."
    },
    {
      problem: "Context-aware refactoring",
      solution: "Using LangGraph agents with full codebase context.",
      learning: "Context is critical for accurate refactoring suggestions."
    },
    {
      problem: "IDE integration complexity",
      solution: "Built modular extension architecture with clear APIs.",
      learning: "IDE extensions need careful API design and error handling."
    },
    {
      problem: "Balancing automation and control",
      solution: "Provided suggestions with manual approval workflow.",
      learning: "Developer tools should augment, not replace, developer control."
    }
  ],
  
  journey: [
    { phase: "Idea", description: "Identified the problem with AI-generated code quality." },
    { phase: "Research", description: "Researched code analysis and refactoring techniques." },
    { phase: "VS Code Extension", description: "Built initial VS Code extension framework." },
    { phase: "Analysis Engine", description: "Implemented code analysis and duplicate detection." },
    { phase: "LangGraph Integration", description: "Integrated AI agents for intelligent analysis." },
    { phase: "Vector Search", description: "Added pgvector for semantic code search." },
    { phase: "Backend APIs", description: "Built FastAPI backend for analysis services." },
    { phase: "Refactoring Logic", description: "Implemented refactoring suggestion generation." },
    { phase: "Current Development", description: "Actively developing and improving the platform." },
    { phase: "Future", description: "Planning additional features and integrations." }
  ],
  
  results: [
    { label: "VS Code Extension", value: "In Development", description: "IDE integration for developer workflow" },
    { label: "Analysis Engine", value: "Functional", description: "Code analysis and duplicate detection" },
    { label: "AI Agents", value: "Integrated", description: "LangGraph-powered analysis" },
    { label: "Vector Search", value: "Implemented", description: "pgvector semantic code search" },
    { label: "Status", value: "In Progress", description: "Active development phase" }
  ],
  
  learnings: [
    {
      title: "Developer Tools",
      description: "Building developer tools requires understanding of real workflows."
    },
    {
      title: "Agentic AI",
      description: "LangGraph enables powerful agentic workflows for code analysis."
    },
    {
      title: "Code Analysis",
      description: "Accurate code analysis requires multiple techniques combined."
    },
    {
      title: "IDE Integration",
      description: "VS Code extensions need careful API design and user experience."
    }
  ],
  
  roadmap: [
    { feature: "Advanced Duplicate Detection", status: "in-progress" },
    { feature: "Refactoring Automation", status: "planned" },
    { feature: "Multi-language Support", status: "planned" },
    { feature: "Team Features", status: "planned" },
    { feature: "CI/CD Integration", status: "planned" }
  ],
  
  nextProject: {
    name: "Reflex Ninja",
    slug: "reflex-ninja",
    description: "Native Android reflex game."
  }
};

export const projectDataMap: Record<string, ProjectDetailData> = {
  talentlens: talentLensData,
  "ai-tech-stack-recommender": aiTechStackRecommenderData,
  "lawgpt-crm": crmData,
  complytai: complytAIData,
  "falcon-airlines": falconAirlinesData,
  devforge: devForgeData,
  architectiq: architectIQData,
  "reflex-ninja": reflexNinjaData,
  kodexa: kodexaData,
};
