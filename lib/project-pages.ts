import { UniversalProject } from "@/components/projects/UniversalProjectPage";

export const universalProjects: Record<string, UniversalProject> = {
  /* =========================================================
     COMPLYTAI
  ========================================================= */

  complytai: {
    slug: "complytai",
    name: "ComplytAI",
    status: "completed",

    badge: "Enterprise Compliance Intelligence Platform",

    oneLiner:
      "Compliance intelligence platform that turns regulatory documents into searchable, explainable risk insights.",

    description:
      "ComplytAI helps compliance teams work with large collections of regulatory documents, policies, audit material, and internal controls through document intelligence, semantic retrieval, risk analysis, and AI-assisted workflows.",

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
      "PostgreSQL",
      "Docker",
    ],

    problem: {
      title: "What problem does ComplytAI solve?",
      points: [
        "Compliance teams work with large volumes of regulations, policies, contracts, and audit documents.",
        "Manually searching through documents is slow and makes important information easy to miss.",
        "Compliance analysis requires connecting evidence across multiple documents and sources.",
        "Teams need faster ways to identify potential risks and retrieve supporting evidence.",
        "Repeated compliance workflows consume time that could be spent on higher-value review.",
        "ComplytAI centralizes document intelligence, retrieval, risk analysis, and workflow execution.",
      ],
    },

    motivations: [
      {
        title: "Enterprise AI",
        description:
          "Explore how retrieval, LLM reasoning, and workflow orchestration can be combined into a practical enterprise system.",
      },
      {
        title: "Production RAG",
        description:
          "Build a complete document intelligence pipeline instead of a simple conversational AI interface.",
      },
      {
        title: "Agentic Workflows",
        description:
          "Use CrewAI to coordinate specialized compliance tasks and turn analysis into an actionable workflow.",
      },
    ],

    architecture: [
      {
        label: "Enterprise Documents",
        description:
          "Regulations, policies, contracts, audit reports, and compliance material.",
      },
      {
        label: "Document Processing",
        description:
          "Extract and normalize document content for downstream processing.",
      },
      {
        label: "Semantic Chunking",
        description:
          "Split documents into retrieval-friendly contextual units.",
      },
      {
        label: "Embedding Generation",
        description:
          "Generate semantic vectors using nomic-embed-text.",
      },
      {
        label: "Pinecone",
        description:
          "Store and retrieve document vectors through scalable semantic search.",
      },
      {
        label: "Hybrid Retrieval",
        description:
          "Combine semantic and lexical signals to improve retrieval quality.",
      },
      {
        label: "CrewAI",
        description:
          "Coordinate specialized agents for compliance analysis and workflow execution.",
      },
      {
        label: "LLM Reasoning",
        description:
          "Use Qwen2.5 through Ollama for grounded analysis and structured responses.",
      },
      {
        label: "Risk Analysis",
        description:
          "Identify compliance risks and surface supporting evidence.",
      },
      {
        label: "Compliance Dashboard",
        description:
          "Present findings, evidence, risk signals, and workflow outputs.",
      },
    ],

    features: [
      {
        title: "Document Upload",
        description:
          "Ingest compliance documents and prepare them for semantic retrieval.",
      },
      {
        title: "Semantic Search",
        description:
          "Find relevant compliance information using meaning rather than exact keyword matching.",
      },
      {
        title: "Risk Detection",
        description:
          "Identify potential compliance issues from retrieved evidence and document context.",
      },
      {
        title: "RAG Question Answering",
        description:
          "Ask questions about compliance material and receive context-grounded responses.",
      },
      {
        title: "Policy Retrieval",
        description:
          "Retrieve relevant policies and regulatory information for a specific scenario.",
      },
      {
        title: "Agentic Analysis",
        description:
          "CrewAI coordinates specialized analysis tasks instead of relying on a single monolithic prompt.",
      },
      {
        title: "Audit Assistance",
        description:
          "Support evidence discovery and structured compliance review.",
      },
      {
        title: "Knowledge Base",
        description:
          "Centralized semantic access to compliance documents and regulatory knowledge.",
      },
      {
        title: "Structured Reports",
        description:
          "Convert model output into consistent compliance report structures.",
      },
    ],

    decisions: [
      {
        problem: "Workflow orchestration?",
        decision: "CrewAI",
        why:
          "Provides an agent-oriented orchestration layer for coordinating specialized compliance analysis tasks.",
      },
      {
        problem: "LLM deployment?",
        decision: "Ollama + Qwen2.5",
        why:
          "Supports local model execution and avoids requiring every workflow step to depend on a hosted model API.",
      },
      {
        problem: "Embedding model?",
        decision: "nomic-embed-text",
        why:
          "Provides semantic embeddings suitable for document retrieval.",
      },
      {
        problem: "Vector database?",
        decision: "Pinecone",
        why:
          "Provides managed vector storage and scalable semantic retrieval.",
      },
      {
        problem: "Backend?",
        decision: "FastAPI",
        why:
          "Provides typed, asynchronous REST APIs for the application backend.",
      },
      {
        problem: "Frontend?",
        decision: "Next.js",
        why:
          "Provides a production-oriented React application architecture for the compliance dashboard.",
      },
    ],

    challenges: [
      {
        problem: "Large document collections",
        solution:
          "Designed document processing, chunking, embeddings, and vector retrieval as separate stages.",
      },
      {
        problem: "Retrieval quality",
        solution:
          "Used semantic embeddings and retrieval strategies designed around document context.",
      },
      {
        problem: "LLM reliability",
        solution:
          "Structured prompts and validated downstream outputs before presenting compliance results.",
      },
      {
        problem: "Workflow orchestration",
        solution:
          "Moved workflow coordination toward CrewAI-based agent orchestration.",
      },
      {
        problem: "Grounding analysis",
        solution:
          "Kept retrieved document context central to the compliance reasoning pipeline.",
      },
    ],

    screenshots: [
      {
        src: "/images/comp1.png",
        caption: "ComplytAI Dashboard",
      },
      {
        src: "/images/comp2.png",
        caption: "Semantic Search",
      },
      {
        src: "/images/comp3.png",
        caption: "Compliance Analysis",
      },
      {
        src: "/images/comp4.png",
        caption: "Compliance Insights",
      },
    ],

    results: [
      {
        label: "Document Intelligence",
        value: "End-to-End",
      },
      {
        label: "Retrieval",
        value: "Semantic",
      },
      {
        label: "Orchestration",
        value: "CrewAI",
      },
      {
        label: "LLM",
        value: "Local",
      },
    ],

    learnings: [
      {
        title: "Production RAG",
        description:
          "RAG quality depends on document preparation, chunking, embeddings, retrieval, and output validation together.",
      },
      {
        title: "Agentic Systems",
        description:
          "Agent orchestration becomes useful when responsibilities are clearly separated instead of simply adding more agents.",
      },
      {
        title: "Enterprise Architecture",
        description:
          "Enterprise AI applications need clear boundaries between ingestion, retrieval, reasoning, and presentation.",
      },
      {
        title: "Reliable AI Outputs",
        description:
          "Structured schemas and validation are critical when downstream application logic depends on model output.",
      },
    ],

    roadmap: [
      {
        feature: "Regulation Change Detection",
        status: "planned",
      },
      {
        feature: "Multi-Agent Compliance Review",
        status: "planned",
      },
      {
        feature: "Real-time Compliance Monitoring",
        status: "planned",
      },
      {
        feature: "Role-based Enterprise Access",
        status: "planned",
      },
      {
        feature: "Document Version Tracking",
        status: "planned",
      },
    ],
  },

  /* =========================================================
     ARCHITECTIQ
  ========================================================= */

  architectiq: {
    slug: "architectiq",
    name: "ArchitectIQ",
    status: "completed",

    badge: "Repository Intelligence & Architecture Review",

    oneLiner:
      "Repository intelligence platform that analyzes software architecture, detects design issues, and produces actionable engineering insights.",

    description:
      "ArchitectIQ examines software repositories as systems rather than isolated files, helping developers understand architecture, dependencies, design patterns, and potential engineering issues.",

    github: "https://github.com/shreyad2806/ArchitectIQ",

    techStack: [
      "Python",
      "FastAPI",
      "OpenAI",
      "Repository Analysis",
      "System Design",
      "AST Analysis",
      "Dependency Graphs",
    ],

    problem: {
      title: "What problem does ArchitectIQ solve?",
      points: [
        "Large repositories are difficult to understand quickly.",
        "Architecture knowledge is often distributed across files, modules, and documentation.",
        "Developers spend significant time manually tracing dependencies and system boundaries.",
        "Design problems can remain hidden until a codebase becomes difficult to change.",
        "AI-generated repositories can contain unnecessary duplication and architectural inconsistencies.",
        "ArchitectIQ turns repository structure into actionable engineering insights.",
      ],
    },

    motivations: [
      {
        title: "Repository Intelligence",
        description:
          "Explore how AI can reason over an entire repository instead of only a selected code snippet.",
      },
      {
        title: "System Design",
        description:
          "Build a tool focused on architecture, dependencies, boundaries, and maintainability.",
      },
      {
        title: "Developer Productivity",
        description:
          "Reduce the time required to understand unfamiliar codebases and identify design problems.",
      },
    ],

    architecture: [
      {
        label: "Repository Input",
        description:
          "Accept a software repository as the analysis source.",
      },
      {
        label: "Repository Scanner",
        description:
          "Discover files, modules, services, and project structure.",
      },
      {
        label: "Code Analysis",
        description:
          "Inspect source structure and implementation relationships.",
      },
      {
        label: "Dependency Analysis",
        description:
          "Map dependencies and relationships between components.",
      },
      {
        label: "Architecture Model",
        description:
          "Build a system-level representation of the repository.",
      },
      {
        label: "AI Reasoning",
        description:
          "Analyze architecture and identify potential design problems.",
      },
      {
        label: "Engineering Insights",
        description:
          "Generate actionable findings and recommendations.",
      },
    ],

    features: [
      {
        title: "Repository Analysis",
        description:
          "Analyze project structure and identify major application components.",
      },
      {
        title: "Architecture Detection",
        description:
          "Infer architectural boundaries and relationships from repository structure.",
      },
      {
        title: "Dependency Analysis",
        description:
          "Trace dependencies between modules and components.",
      },
      {
        title: "Design Issue Detection",
        description:
          "Surface potential architectural and maintainability issues.",
      },
      {
        title: "Engineering Recommendations",
        description:
          "Turn analysis findings into actionable engineering suggestions.",
      },
      {
        title: "System-Level Reasoning",
        description:
          "Reason about the repository as a connected software system.",
      },
    ],

    decisions: [
      {
        problem: "Backend framework?",
        decision: "FastAPI",
        why:
          "Provides a lightweight, typed API layer suitable for repository analysis workflows.",
      },
      {
        problem: "Analysis scope?",
        decision: "Repository-level",
        why:
          "Architecture problems often cannot be identified from isolated snippets.",
      },
      {
        problem: "AI role?",
        decision: "Engineering reasoning",
        why:
          "The model is used to interpret structured repository context rather than simply generate code.",
      },
    ],

    challenges: [
      {
        problem: "Understanding large repositories",
        solution:
          "Break repository analysis into structured stages instead of sending an entire codebase directly to an LLM.",
      },
      {
        problem: "Preserving architecture context",
        solution:
          "Represent modules, dependencies, and relationships before generating higher-level insights.",
      },
      {
        problem: "Actionable recommendations",
        solution:
          "Focus output on concrete engineering findings rather than generic AI-generated advice.",
      },
    ],

    screenshots: [
      {
        src: "/images/architectiq.png",
        caption: "ArchitectIQ Repository Analysis",
      },
    ],

    results: [
      {
        label: "Analysis",
        value: "Repository-level",
      },
      {
        label: "Focus",
        value: "Architecture",
      },
      {
        label: "Output",
        value: "Actionable",
      },
      {
        label: "Status",
        value: "Completed",
      },
    ],

    learnings: [
      {
        title: "Repository Context",
        description:
          "Useful developer AI needs structured context from the repository rather than isolated source snippets.",
      },
      {
        title: "System Design",
        description:
          "Architecture decisions become easier to evaluate when dependencies and system boundaries are explicit.",
      },
      {
        title: "AI Engineering",
        description:
          "LLMs are most useful when combined with deterministic analysis and structured inputs.",
      },
      {
        title: "Developer Tools",
        description:
          "Developer-facing AI should produce outputs that directly support engineering decisions.",
      },
    ],

    roadmap: [
      {
        feature: "Dependency Graph Visualization",
        status: "completed",
      },
      {
        feature: "Architecture Drift Detection",
        status: "planned",
      },
      {
        feature: "Automated Architecture Reports",
        status: "planned",
      },
      {
        feature: "Pull Request Architecture Review",
        status: "planned",
      },
    ],
  },

  /* =========================================================
     FALCON AIRLINES
  ========================================================= */

  "falcon-airlines": {
    slug: "falcon-airlines",
    name: "Falcon Airlines",
    status: "completed",

    badge: "Full-Stack Airline Reservation Platform",

    oneLiner:
      "Full-stack airline reservation platform covering flight search, booking, ticketing, and boarding workflows.",

    description:
      "Falcon Airlines is a full-stack travel application designed around realistic airline reservation workflows, from flight discovery and passenger information to ticket generation and boarding.",

    github: "https://github.com/shreyad2806/Falcon-Airlines",

    techStack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "REST APIs",
      "Docker",
      "JWT",
      "React",
    ],

    problem: {
      title: "What problem does Falcon Airlines solve?",
      points: [
        "Travel applications require multiple connected workflows rather than a single CRUD interface.",
        "Flight search, booking, passengers, payments, tickets, and boarding documents need consistent state.",
        "Reservation systems need secure authentication and authorization.",
        "Generated tickets and boarding passes must remain connected to booking information.",
        "Users need a simple interface across a complex backend workflow.",
      ],
    },

    motivations: [
      {
        title: "Full-Stack Engineering",
        description:
          "Build a complete application spanning frontend, backend, database, authentication, and APIs.",
      },
      {
        title: "Backend Architecture",
        description:
          "Work with structured business logic and stateful reservation workflows.",
      },
      {
        title: "Real-World Domain",
        description:
          "Model a realistic travel domain with passengers, flights, bookings, tickets, and boarding passes.",
      },
    ],

    architecture: [
      {
        label: "Client",
        description:
          "Responsive frontend for flight discovery and reservation workflows.",
      },
      {
        label: "Authentication",
        description:
          "Secure user authentication and authorization.",
      },
      {
        label: "REST API",
        description:
          "Backend endpoints for flights, users, bookings, and tickets.",
      },
      {
        label: "Business Logic",
        description:
          "Reservation and ticketing rules implemented in the service layer.",
      },
      {
        label: "PostgreSQL",
        description:
          "Persistent storage for flights, passengers, bookings, and documents.",
      },
      {
        label: "Ticket Generation",
        description:
          "Generate travel ticket information after successful booking.",
      },
      {
        label: "Boarding Pass",
        description:
          "Generate boarding information and QR-based travel documents.",
      },
    ],

    features: [
      {
        title: "Flight Search",
        description:
          "Search available flights using route and travel information.",
      },
      {
        title: "Authentication",
        description:
          "Secure account and session management.",
      },
      {
        title: "Reservation Management",
        description:
          "Create and manage passenger flight reservations.",
      },
      {
        title: "Passenger Management",
        description:
          "Associate passenger details with reservations.",
      },
      {
        title: "Ticket Generation",
        description:
          "Generate ticket information for confirmed bookings.",
      },
      {
        title: "Boarding Pass",
        description:
          "Provide boarding information and travel documents.",
      },
      {
        title: "QR Generation",
        description:
          "Generate QR-based boarding information.",
      },
      {
        title: "REST APIs",
        description:
          "Expose structured backend services for the application.",
      },
    ],

    decisions: [
      {
        problem: "Backend architecture?",
        decision: "Spring Boot",
        why:
          "Provides a structured framework for enterprise-style backend services and business logic.",
      },
      {
        problem: "Database?",
        decision: "PostgreSQL",
        why:
          "Relational modeling fits flights, passengers, bookings, and ticket relationships.",
      },
      {
        problem: "Authentication?",
        decision: "Spring Security + JWT",
        why:
          "Provides secure authentication and authorization for reservation workflows.",
      },
      {
        problem: "API design?",
        decision: "REST",
        why:
          "Provides clean separation between frontend workflows and backend services.",
      },
    ],

    challenges: [
      {
        problem: "Reservation state",
        solution:
          "Model booking and ticket state explicitly so downstream travel documents depend on confirmed reservations.",
      },
      {
        problem: "Authentication",
        solution:
          "Separate authentication and authorization from reservation business logic.",
      },
      {
        problem: "Travel documents",
        solution:
          "Generate ticket and boarding information from persistent booking data.",
      },
    ],

    screenshots: [
      {
        src: "/images/falcon-airlines.png",
        caption: "Falcon Airlines Platform",
      },
    ],

    results: [
      {
        label: "Application",
        value: "Full-Stack",
      },
      {
        label: "Backend",
        value: "Spring Boot",
      },
      {
        label: "Database",
        value: "PostgreSQL",
      },
      {
        label: "Domain",
        value: "Travel",
      },
    ],

    learnings: [
      {
        title: "Backend Engineering",
        description:
          "Real applications require clear separation between API, business logic, persistence, and authentication.",
      },
      {
        title: "Relational Modeling",
        description:
          "A relational database works well for strongly connected reservation and passenger entities.",
      },
      {
        title: "REST API Design",
        description:
          "Well-defined API boundaries make complex frontend workflows easier to maintain.",
      },
      {
        title: "Business Logic",
        description:
          "Domain rules should remain explicit instead of being scattered across UI components.",
      },
    ],

    roadmap: [
      {
        feature: "Payment Integration",
        status: "planned",
      },
      {
        feature: "Live Flight Status",
        status: "planned",
      },
      {
        feature: "Seat Selection",
        status: "planned",
      },
      {
        feature: "Email Notifications",
        status: "planned",
      },
    ],
  },

  /* =========================================================
     DEVFORGE
  ========================================================= */

  devforge: {
    slug: "devforge",
    name: "DevForge",
    status: "completed",

    badge: "Full-Stack SaaS Platform",

    oneLiner:
      "Full-stack SaaS platform for discovering, evaluating, and accessing developer-focused starter kits.",

    description:
      "DevForge was built as a complete SaaS product with authentication, product discovery, premium feature gating, subscription workflows, billing, and a responsive dashboard.",

    github: "https://github.com/shreyad2806/DevForge",

    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "shadcn/ui",
    ],

    problem: {
      title: "What problem does DevForge solve?",
      points: [
        "Developers repeatedly rebuild common application foundations.",
        "Starter kits need a clear discovery and evaluation experience.",
        "SaaS products require authentication, subscriptions, billing, and access control.",
        "Premium functionality needs to be protected based on subscription state.",
        "A product needs more than a frontend — it needs complete application flows.",
      ],
    },

    motivations: [
      {
        title: "Full-Stack SaaS",
        description:
          "Build a complete SaaS product rather than only a landing page or frontend prototype.",
      },
      {
        title: "Product Engineering",
        description:
          "Understand how authentication, subscriptions, billing, databases, and UI fit together.",
      },
      {
        title: "Premium Access",
        description:
          "Implement subscription-aware feature gating and user-specific application state.",
      },
    ],

    architecture: [
      {
        label: "Next.js Application",
        description:
          "Responsive SaaS frontend and application routing.",
      },
      {
        label: "Authentication",
        description:
          "User signup, login, sessions, and protected application areas.",
      },
      {
        label: "Supabase",
        description:
          "Authentication and PostgreSQL-backed application data.",
      },
      {
        label: "Subscriptions",
        description:
          "Store subscription state and premium access information.",
      },
      {
        label: "Billing",
        description:
          "Connect subscription state with checkout and billing workflows.",
      },
      {
        label: "Feature Gating",
        description:
          "Restrict premium kits and functionality according to subscription state.",
      },
      {
        label: "Dashboard",
        description:
          "Authenticated workspace for exploring and managing kits.",
      },
    ],

    features: [
      {
        title: "Landing Page",
        description:
          "Product-focused marketing page explaining the SaaS offering.",
      },
      {
        title: "Authentication",
        description:
          "Signup and login flows for application users.",
      },
      {
        title: "Kit Discovery",
        description:
          "Browse developer-focused starter kits through a structured interface.",
      },
      {
        title: "Kit Details",
        description:
          "Evaluate kits before accessing or purchasing premium functionality.",
      },
      {
        title: "Premium Gating",
        description:
          "Restrict premium kits based on subscription state.",
      },
      {
        title: "Subscription Management",
        description:
          "Track active subscription information.",
      },
      {
        title: "Billing",
        description:
          "Provide a dedicated billing experience for users.",
      },
      {
        title: "Settings",
        description:
          "Manage account and application preferences.",
      },
      {
        title: "Responsive UI",
        description:
          "Responsive product experience using reusable UI components.",
      },
    ],

    decisions: [
      {
        problem: "Application framework?",
        decision: "Next.js",
        why:
          "Provides routing, server/client rendering, and a strong foundation for a full-stack SaaS application.",
      },
      {
        problem: "Database?",
        decision: "Supabase PostgreSQL",
        why:
          "Combines relational storage with authentication and a developer-friendly platform.",
      },
      {
        problem: "UI system?",
        decision: "Tailwind + shadcn/ui",
        why:
          "Allows fast construction of a consistent, reusable SaaS interface.",
      },
      {
        problem: "Premium access?",
        decision: "Subscription-based gating",
        why:
          "Allows product functionality to be controlled by user subscription state.",
      },
    ],

    challenges: [
      {
        problem: "Subscription state",
        solution:
          "Model subscription information separately so premium access can be evaluated consistently.",
      },
      {
        problem: "Premium feature gating",
        solution:
          "Connect application access checks to subscription state rather than hardcoded UI.",
      },
      {
        problem: "SaaS product completeness",
        solution:
          "Build the complete flow from landing page through authentication, dashboard, pricing, billing, and settings.",
      },
    ],

    screenshots: [
      {
        src: "/images/devforge.png",
        caption: "DevForge SaaS Platform",
      },
    ],

    results: [
      {
        label: "Product",
        value: "SaaS",
      },
      {
        label: "Frontend",
        value: "Next.js",
      },
      {
        label: "Database",
        value: "PostgreSQL",
      },
      {
        label: "Access",
        value: "Subscription",
      },
    ],

    learnings: [
      {
        title: "SaaS Architecture",
        description:
          "A SaaS application needs coordinated product, authentication, data, billing, and access-control layers.",
      },
      {
        title: "Database-backed UI",
        description:
          "Application state becomes much more useful when the interface is connected to persistent user data.",
      },
      {
        title: "Subscription Logic",
        description:
          "Premium access needs to be represented as application state rather than only frontend presentation.",
      },
      {
        title: "Product Engineering",
        description:
          "Building a product means completing user journeys, not just individual features.",
      },
    ],

    roadmap: [
      {
        feature: "Production Payments",
        status: "in-progress",
      },
      {
        feature: "Webhook-driven Subscription Sync",
        status: "planned",
      },
      {
        feature: "Team Workspaces",
        status: "planned",
      },
      {
        feature: "Kit Publishing",
        status: "planned",
      },
    ],
  },

  /* =========================================================
     CRM
  ========================================================= */

  "lawgpt-crm": {
    slug: "lawgpt-crm",
    name: "CRM",
    status: "completed",

    badge: "Full-Stack CRM & Marketing Automation",

    oneLiner:
      "Full-stack CRM platform for managing leads, customer workflows, and marketing automation.",

    description:
      "A business-focused CRM application designed around lead management, customer records, workflow automation, marketing operations, and AI-assisted productivity.",

    github: "https://github.com/shreyad2806/LawGPT-CRM",

    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "OpenAI",
    ],

    problem: {
      title: "What problem does the CRM solve?",
      points: [
        "Customer information is often spread across multiple tools.",
        "Lead follow-ups can be missed without centralized workflows.",
        "Marketing operations require repetitive manual work.",
        "Teams need a unified view of customer interactions.",
        "AI can assist with repetitive communication and content tasks.",
      ],
    },

    motivations: [
      {
        title: "Full-Stack Product",
        description:
          "Build a practical business application with frontend, backend, database, and authentication concerns.",
      },
      {
        title: "Business Workflows",
        description:
          "Model real lead and customer workflows instead of isolated CRUD screens.",
      },
      {
        title: "AI Integration",
        description:
          "Use AI as a supporting capability inside a conventional software product.",
      },
    ],

    architecture: [
      {
        label: "CRM Dashboard",
        description:
          "Central interface for customer and lead management.",
      },
      {
        label: "Authentication",
        description:
          "Secure access to user-specific CRM information.",
      },
      {
        label: "Application APIs",
        description:
          "Handle CRM business operations and data access.",
      },
      {
        label: "PostgreSQL",
        description:
          "Persist users, leads, contacts, tasks, and workflows.",
      },
      {
        label: "AI Services",
        description:
          "Assist with communication and content generation.",
      },
    ],

    features: [
      {
        title: "Lead Management",
        description:
          "Track prospects through the customer pipeline.",
      },
      {
        title: "Customer Profiles",
        description:
          "Centralize customer information and interaction history.",
      },
      {
        title: "Task Management",
        description:
          "Manage follow-ups and business tasks.",
      },
      {
        title: "Workflow Automation",
        description:
          "Reduce repetitive customer-management operations.",
      },
      {
        title: "Marketing Operations",
        description:
          "Support campaign and communication workflows.",
      },
      {
        title: "AI Assistance",
        description:
          "Use LLM capabilities for selected productivity workflows.",
      },
    ],

    decisions: [
      {
        problem: "Frontend framework?",
        decision: "Next.js",
        why:
          "Provides a strong foundation for a responsive full-stack web application.",
      },
      {
        problem: "Database?",
        decision: "PostgreSQL",
        why:
          "CRM entities have strong relationships that benefit from relational modeling.",
      },
      {
        problem: "Backend platform?",
        decision: "Supabase",
        why:
          "Provides database and authentication infrastructure while keeping application development streamlined.",
      },
      {
        problem: "AI integration?",
        decision: "OpenAI",
        why:
          "Provides language-generation capabilities for selected CRM productivity workflows.",
      },
    ],

    challenges: [
      {
        problem: "CRM data relationships",
        solution:
          "Structure customer, lead, task, and workflow information around relational entities.",
      },
      {
        problem: "Authentication",
        solution:
          "Separate user identity from CRM data access.",
      },
      {
        problem: "AI integration",
        solution:
          "Keep AI functionality modular so core CRM workflows remain deterministic.",
      },
    ],

    screenshots: [
      {
        src: "/images/crm.png",
        caption: "CRM Dashboard",
      },
    ],

    results: [
      {
        label: "Application",
        value: "Full-Stack",
      },
      {
        label: "Database",
        value: "PostgreSQL",
      },
      {
        label: "Platform",
        value: "Supabase",
      },
      {
        label: "AI",
        value: "Integrated",
      },
    ],

    learnings: [
      {
        title: "Business Applications",
        description:
          "Good business software depends on clear workflows and reliable state management.",
      },
      {
        title: "Relational Data",
        description:
          "CRM systems benefit from explicit relationships between customers, leads, tasks, and activities.",
      },
      {
        title: "AI as a Feature",
        description:
          "AI works best when it enhances an existing product workflow instead of replacing the application itself.",
      },
      {
        title: "Reusable UI",
        description:
          "Consistent components make large dashboard applications easier to maintain.",
      },
    ],

    roadmap: [
      {
        feature: "Advanced Analytics",
        status: "planned",
      },
      {
        feature: "Email Integration",
        status: "planned",
      },
      {
        feature: "Team Collaboration",
        status: "planned",
      },
      {
        feature: "Automated Lead Scoring",
        status: "planned",
      },
    ],
  },

  /* =========================================================
     STACKMIND
  ========================================================= */

  "ai-tech-stack-recommender": {
    slug: "ai-tech-stack-recommender",
    name: "AI Tech Stack Recommender",
    status: "completed",

    badge: "Developer Decision Intelligence",

    oneLiner:
      "Developer tool that recommends technology stacks, architecture, and deployment strategies from project requirements.",

    description:
      "StackMind helps developers move from a project idea to a practical technology plan by combining structured project requirements with LLM-assisted recommendations.",

    github:
      "https://github.com/shreyad2806/Ai-tech-stack-recommender",

    techStack: [
      "FastAPI",
      "Python",
      "React",
      "PostgreSQL",
      "LLM",
      "Tailwind CSS",
      "REST APIs",
    ],

    problem: {
      title: "What problem does StackMind solve?",
      points: [
        "Choosing a technology stack can require hours of research.",
        "Beginners often select technologies without understanding trade-offs.",
        "Different project requirements call for different architectural choices.",
        "Developers need recommendations across frontend, backend, database, infrastructure, and deployment.",
      ],
    },

    motivations: [
      {
        title: "Developer Tools",
        description:
          "Build an AI system that helps developers make technical decisions.",
      },
      {
        title: "Full-Stack AI",
        description:
          "Combine an LLM backend with a real web application and persistent data.",
      },
      {
        title: "Architecture Reasoning",
        description:
          "Explore how natural-language requirements can be converted into structured engineering recommendations.",
      },
    ],

    architecture: [
      {
        label: "Project Requirements",
        description:
          "User describes the application and constraints.",
      },
      {
        label: "FastAPI Backend",
        description:
          "Receives and validates project requirements.",
      },
      {
        label: "Prompt Layer",
        description:
          "Transforms requirements into structured recommendation tasks.",
      },
      {
        label: "LLM",
        description:
          "Reasons over requirements and generates recommendations.",
      },
      {
        label: "Validation",
        description:
          "Validate structured model output before returning it.",
      },
      {
        label: "Recommendation Dashboard",
        description:
          "Display stack, architecture, and deployment recommendations.",
      },
    ],

    features: [
      {
        title: "Project Analysis",
        description:
          "Analyze project requirements from natural language.",
      },
      {
        title: "Technology Recommendations",
        description:
          "Suggest frameworks, libraries, databases, and infrastructure.",
      },
      {
        title: "Architecture Suggestions",
        description:
          "Provide an architecture aligned with project requirements.",
      },
      {
        title: "Backend Recommendations",
        description:
          "Suggest suitable backend frameworks and API approaches.",
      },
      {
        title: "Frontend Recommendations",
        description:
          "Recommend frontend technologies based on product requirements.",
      },
      {
        title: "Deployment Strategy",
        description:
          "Suggest deployment and infrastructure options.",
      },
    ],

    decisions: [
      {
        problem: "Backend?",
        decision: "FastAPI",
        why:
          "Provides a lightweight and typed API layer suitable for LLM-backed workflows.",
      },
      {
        problem: "Frontend?",
        decision: "React",
        why:
          "Component-based architecture works well for interactive recommendation dashboards.",
      },
      {
        problem: "Persistence?",
        decision: "PostgreSQL",
        why:
          "Provides reliable relational storage for users and recommendation data.",
      },
    ],

    challenges: [
      {
        problem: "Inconsistent LLM output",
        solution:
          "Use structured prompts and validation before rendering recommendations.",
      },
      {
        problem: "Generic recommendations",
        solution:
          "Include project requirements and constraints directly in the recommendation context.",
      },
      {
        problem: "Complex results",
        solution:
          "Break recommendations into structured categories so users can evaluate them quickly.",
      },
    ],

    screenshots: [
      {
        src: "/images/stackmind.png",
        caption: "StackMind AI",
      },
    ],

    results: [
      {
        label: "Category",
        value: "Developer Tool",
      },
      {
        label: "Backend",
        value: "FastAPI",
      },
      {
        label: "Frontend",
        value: "React",
      },
      {
        label: "Output",
        value: "Structured",
      },
    ],

    learnings: [
      {
        title: "Structured LLM Outputs",
        description:
          "LLM applications become much more reliable when outputs follow predictable schemas.",
      },
      {
        title: "Developer Experience",
        description:
          "AI developer tools should reduce decision-making friction rather than create another complex interface.",
      },
      {
        title: "Full-Stack AI",
        description:
          "Useful AI products require backend validation, persistence, frontend state, and error handling.",
      },
      {
        title: "Prompt Design",
        description:
          "Recommendation quality depends heavily on how requirements and constraints are represented.",
      },
    ],

    roadmap: [
      {
        feature: "Architecture Diagram Generation",
        status: "planned",
      },
      {
        feature: "Cost Estimation",
        status: "planned",
      },
      {
        feature: "Stack Comparison",
        status: "planned",
      },
      {
        feature: "Project Templates",
        status: "planned",
      },
    ],
  },

  /* =========================================================
     REFLEX NINJA
  ========================================================= */

  "reflex-ninja": {
    slug: "reflex-ninja",
    name: "Reflex Ninja",
    status: "completed",

    badge: "Native Android Game",

    oneLiner:
      "Native Android reflex game built around timed gameplay, score tracking, and responsive touch interactions.",

    description:
      "Reflex Ninja is a lightweight Android game created to explore Kotlin, native Android UI, event handling, timers, and application state.",

    github: "https://github.com/shreyad2806/Reflex-Ninja",

    techStack: [
      "Kotlin",
      "Android Studio",
      "Jetpack",
      "XML Layouts",
      "Gradle",
    ],

    problem: {
      title: "What is Reflex Ninja?",
      points: [
        "Players have a limited amount of time to react to a moving target.",
        "The game requires responsive touch interaction.",
        "Score must update immediately after successful interactions.",
        "Game state needs to transition cleanly between active gameplay and game over.",
      ],
    },

    motivations: [
      {
        title: "Learning Kotlin",
        description:
          "Explore Kotlin through a complete interactive application.",
      },
      {
        title: "Android Development",
        description:
          "Understand native Android application structure and lifecycle.",
      },
      {
        title: "Interactive UI",
        description:
          "Work with touch events, timers, state, and responsive layouts.",
      },
    ],

    architecture: [
      {
        label: "User Input",
        description:
          "Capture touch interactions from the player.",
      },
      {
        label: "Game State",
        description:
          "Track active game, score, and game-over state.",
      },
      {
        label: "Random Position",
        description:
          "Generate target positions within screen bounds.",
      },
      {
        label: "Timer",
        description:
          "Control the limited gameplay duration.",
      },
      {
        label: "Score Manager",
        description:
          "Track successful interactions and update the score.",
      },
      {
        label: "Game Over",
        description:
          "Display the final score and restart option.",
      },
    ],

    features: [
      {
        title: "Timed Gameplay",
        description:
          "Players compete against a fixed countdown.",
      },
      {
        title: "Random Target",
        description:
          "Target location changes to keep gameplay unpredictable.",
      },
      {
        title: "Score Tracking",
        description:
          "Update the score in real time.",
      },
      {
        title: "Touch Detection",
        description:
          "Handle responsive touch interactions.",
      },
      {
        title: "Game Over",
        description:
          "Display the final score when the timer expires.",
      },
      {
        title: "Native Android UI",
        description:
          "Built as a native Android application.",
      },
    ],

    decisions: [
      {
        problem: "Language?",
        decision: "Kotlin",
        why:
          "Modern, concise language designed for Android development.",
      },
      {
        problem: "UI?",
        decision: "Native Android",
        why:
          "Provides direct experience with Android application development fundamentals.",
      },
      {
        problem: "Game logic?",
        decision: "Timer + state",
        why:
          "Simple state-driven architecture is sufficient for a focused reflex game.",
      },
    ],

    challenges: [
      {
        problem: "Timer management",
        solution:
          "Coordinate timer events with gameplay and game-over state.",
      },
      {
        problem: "Random positioning",
        solution:
          "Generate positions within valid screen boundaries.",
      },
      {
        problem: "Touch interactions",
        solution:
          "Connect touch events directly to score updates and game state.",
      },
    ],

    screenshots: [
      {
        src: "/images/reflexNinja.png",
        caption: "Reflex Ninja",
      },
    ],

    results: [
      {
        label: "Platform",
        value: "Android",
      },
      {
        label: "Language",
        value: "Kotlin",
      },
      {
        label: "Gameplay",
        value: "Real-time",
      },
      {
        label: "Application",
        value: "Native",
      },
    ],

    learnings: [
      {
        title: "Kotlin",
        description:
          "Built practical understanding of Kotlin syntax and application structure.",
      },
      {
        title: "Android Lifecycle",
        description:
          "Learned how application state and UI lifecycle affect interactive applications.",
      },
      {
        title: "Event Handling",
        description:
          "Touch events are central to responsive mobile experiences.",
      },
      {
        title: "State Management",
        description:
          "Even simple games require explicit state transitions.",
      },
    ],

    roadmap: [
      {
        feature: "Leaderboard",
        status: "planned",
      },
      {
        feature: "Difficulty Levels",
        status: "planned",
      },
      {
        feature: "Animations",
        status: "planned",
      },
      {
        feature: "Sound Effects",
        status: "planned",
      },
    ],
  },

  /* =========================================================
     KODEXA
  ========================================================= */

  kodexa: {
    slug: "kodexa",
    name: "Kodexa",
    status: "in-progress",

    badge: "Developer Tool • Active Development",

    oneLiner:
      "Developer tool that turns AI-generated code into reusable, maintainable software by detecting duplication, improving structure, and assisting debugging.",

    description:
      "Kodexa focuses on a practical problem in AI-assisted development: generated code may work initially but often contains duplication, unnecessary complexity, inconsistent patterns, and difficult-to-maintain implementations. Kodexa is being built to analyze that code and help transform it into reusable engineering components.",

    github: "https://github.com/shreyad2806/Kodexa",

    techStack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "PostgreSQL",
      "VS Code Extension",
      "LLM",
      "Code Analysis",
      "REST APIs",
    ],

    problem: {
      title: "What problem does Kodexa solve?",
      points: [
        "AI coding assistants can generate working code that is difficult to maintain.",
        "Generated implementations may duplicate existing functionality.",
        "Large AI-generated files can contain unnecessary logic and inconsistent abstractions.",
        "Developers need help turning generated code into reusable modules.",
        "Debugging should consider repository context rather than only one error message.",
        "Kodexa focuses on making AI-generated code more usable for long-term development.",
      ],
    },

    motivations: [
      {
        title: "Developer Tooling",
        description:
          "Build infrastructure that improves the software development workflow itself.",
      },
      {
        title: "AI-generated Code Quality",
        description:
          "Address the gap between code that works and code that is maintainable.",
      },
      {
        title: "Reusable Software",
        description:
          "Explore how AI can identify duplication and turn repeated implementation into reusable components.",
      },
    ],

    architecture: [
      {
        label: "Developer / VS Code",
        description:
          "Developer interacts with Kodexa from the coding environment.",
      },
      {
        label: "Repository Context",
        description:
          "Collect relevant files, symbols, and project context.",
      },
      {
        label: "Code Analysis",
        description:
          "Inspect generated code for structure, duplication, and maintainability.",
      },
      {
        label: "Debug Context",
        description:
          "Combine code context with terminal errors and execution information.",
      },
      {
        label: "LangGraph Workflow",
        description:
          "Coordinate analysis, reasoning, and improvement steps.",
      },
      {
        label: "LLM Reasoning",
        description:
          "Generate refactoring and debugging recommendations.",
      },
      {
        label: "Reusable Output",
        description:
          "Produce cleaner, modular code and actionable developer changes.",
      },
    ],

    features: [
      {
        title: "AI Code Analysis",
        description:
          "Analyze generated code for structure and maintainability issues.",
      },
      {
        title: "Duplicate Detection",
        description:
          "Identify repeated implementations that could become shared utilities or modules.",
      },
      {
        title: "Code Cleanup",
        description:
          "Surface unnecessary logic and opportunities to simplify implementation.",
      },
      {
        title: "Debugging Assistance",
        description:
          "Combine source code with terminal errors to investigate failures.",
      },
      {
        title: "Refactoring Suggestions",
        description:
          "Recommend changes that improve structure and reusability.",
      },
      {
        title: "Repository Context",
        description:
          "Use surrounding project context instead of treating a file as an isolated artifact.",
      },
    ],

    decisions: [
      {
        problem: "Developer integration?",
        decision: "VS Code",
        why:
          "The tool should fit naturally into the environment where developers already write and debug code.",
      },
      {
        problem: "Agent workflow?",
        decision: "LangGraph",
        why:
          "Graph-based orchestration makes multi-step analysis and debugging workflows easier to control.",
      },
      {
        problem: "Backend?",
        decision: "FastAPI",
        why:
          "Provides a lightweight service layer for code analysis and AI operations.",
      },
      {
        problem: "Memory/state?",
        decision: "PostgreSQL",
        why:
          "Provides persistent structured storage for long-running developer workflows.",
      },
    ],

    challenges: [
      {
        problem: "AI-generated duplication",
        solution:
          "Analyze repository context before recommending new implementations so existing functionality can be reused.",
      },
      {
        problem: "Debugging context",
        solution:
          "Combine terminal errors with source and repository context.",
      },
      {
        problem: "Maintainability",
        solution:
          "Focus recommendations on modularity, reuse, and long-term code structure instead of only fixing immediate errors.",
      },
    ],

    screenshots: [
      {
        src: "/images/kodexa.png",
        caption: "Kodexa Developer Tool",
      },
    ],

    results: [
      {
        label: "Focus",
        value: "Code Quality",
      },
      {
        label: "Workflow",
        value: "Agentic",
      },
      {
        label: "Integration",
        value: "VS Code",
      },
      {
        label: "Status",
        value: "In Progress",
      },
    ],

    learnings: [
      {
        title: "AI Code Quality",
        description:
          "Working code and maintainable code are different problems, especially when code is generated automatically.",
      },
      {
        title: "Repository Context",
        description:
          "Code improvement requires understanding existing modules and dependencies.",
      },
      {
        title: "Agent Workflows",
        description:
          "Multi-step developer workflows benefit from explicit state and orchestration.",
      },
      {
        title: "Developer Experience",
        description:
          "Developer tools should reduce friction and produce changes that can actually be reviewed and adopted.",
      },
    ],

    roadmap: [
      {
        feature: "VS Code Diff Preview",
        status: "in-progress",
      },
      {
        feature: "Accept / Reject Refactoring",
        status: "in-progress",
      },
      {
        feature: "Repository-wide Duplicate Detection",
        status: "planned",
      },
      {
        feature: "Persistent Debug Sessions",
        status: "planned",
      },
      {
        feature: "Code Quality Metrics",
        status: "planned",
      },
    ],
  },
};