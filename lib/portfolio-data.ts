export type JournalResource = {
  name: string;
  description: string;
  url?: string;
  category: string;
  date?: string;
};

// Add discoveries here as you find useful repositories, tools or plugins.
const openSourceFinds: JournalResource[] = [];
const toolsAndPlugins: JournalResource[] = [];

export const portfolioData = {
  personal: {
    name: "Shreya Dubey",
    role: "Software Engineer",
    subtitle: "Backend Engineering • AI/ML Systems",
    tagline: "I build systems that move ideas into reality.",
    description: "Computer Science student and software engineer focused on backend engineering and AI/ML systems. I build API-driven applications, retrieval and agent workflows, and reliability-focused software—combining practical testing with a strong foundation in computer science.",
    email: "dubeyshreya2507@gmail.com",
    linkedin: "https://www.linkedin.com/in/shreya-dubey-544874289/",
    github: "https://github.com/shreyad2806",
    resume: "/SDE.pdf",
    stack: ["Agentic AI", "Backend Systems", "Developer Infrastructure", "Open Source"],
  },
  contact: {
    email: "mailto:dubeyshreya2507@gmail.com",
    linkedin: "https://www.linkedin.com/in/shreya-dubey-544874289/",
    github: "https://github.com/shreyad2806",
    resume: "/SDE.pdf",
  },
  metrics: [
    { value: "3", label: "Resume-Featured Projects", caption: "CloseLoop • Kavach • ComplytAI", icon: "Layers" },
    { value: "2", label: "Internship Experiences", caption: "Software Engineering • AI Engineering", icon: "Boxes" },
    { value: "8.24", label: "CGPA / 10", caption: "B.Tech Computer Science & Engineering", icon: "Wrench" },
    { value: "SIH", label: "National Runner-up", caption: "ET GenAI finalist • NandaHack participant", icon: "Trophy" },
  ],
  hackathons: [
    { icon: "Trophy", title: "Smart India Hackathon", subtitle: "Runner-up · 2025" },
    { icon: "Rocket", title: "ET GenAI Hackathon", subtitle: "Finalist · 2025" },
    { icon: "Globe", title: "NandaHack", subtitle: "HCLTech × MIT Media Lab" },
    { icon: "Github", title: "Technomech Club", subtitle: "President · Student leadership" },
  ],
  projects: [
    {
      id: "closeloop", name: "CloseLoop", description: "Financial reconciliation backend combining deterministic transaction matching, XGBoost-based exception classification, evidence retrieval and controlled resolution recommendations. A 17-node LangGraph workflow adds five fail-closed guardrail gates, approval checks, idempotency controls and independent post-resolution verification.",
      tech: ["Python", "FastAPI", "PostgreSQL", "XGBoost", "pgvector", "LangGraph", "MCP"],
      github: "https://github.com/shreyad2806/razorpay-closeloop", caseStudy: null, featured: true, status: "Featured build",
    },
    {
      id: "kavach", name: "Kavach", description: "Two-agent zero-trust runtime security platform combining AWS Fargate isolation, Docker sandboxing and capability-based authorization. Integrates Amazon Bedrock with four security scanners and fail-closed authorization across ten protected tool methods.",
      tech: ["Python", "FastAPI", "AWS Fargate", "Bedrock", "Docker", "Cedar"],
      github: "https://github.com/shreyad2806/Kavach", caseStudy: null, featured: true, status: "Featured build",
    },
    {
      id: "visionguard", name: "VisionGuard", description: "Image-quality assessment system using a RandomForest regression model and a FastAPI backend to evaluate image-quality metrics.",
      tech: ["Python", "Scikit-learn", "RandomForest", "FastAPI", "Computer Vision"],
      github: "https://github.com/shreyad2806/Vision-Guard", caseStudy: null, featured: false, status: "Additional build",
    },
    {
      id: "complytai", name: "ComplytAI", description: "Financial compliance and risk intelligence platform using document processing, retrieval-augmented generation and a five-agent CrewAI workflow for evidence-backed findings.",
      tech: ["Python", "FastAPI", "Next.js", "CrewAI", "Pinecone", "RAG", "Ollama", "Qwen2.5"],
      github: "https://github.com/shreyad2806/ComplytAI", caseStudy: null, featured: true, status: "Resume project",
    },
    {
      id: "talentlens", name: "TalentLens", description: "Resume intelligence and candidate discovery platform using semantic search, embeddings, vector retrieval and candidate ranking.",
      tech: ["FastAPI", "Python", "RAG", "Sentence Transformers", "Pinecone"],
      github: "https://github.com/shreyad2806/TalentLens", caseStudy: null, featured: false, status: "Completed",
    },
    {
      id: "lawgpt-crm", name: "LawGPT CRM", description: "AI-powered legal marketing CRM supporting lead discovery, qualification, engagement tracking, content generation and workflow automation.",
      tech: ["Next.js", "Python", "OCR", "NLP", "REST APIs", "Supabase"],
      github: "https://github.com/shreyad2806/LawGPT-CRM",
      externalLink: "https://drive.google.com/file/d/18RrSipRNnuMleit-CbmXPcd3z_zfen1G/view?usp=sharing",
      caseStudy: null, featured: false, status: "Completed",
    },
    {
      id: "architectiq", name: "ArchitectIQ", description: "AI-powered software architecture review platform that analyzes repositories, identifies architectural issues and produces actionable engineering insights.",
      tech: ["Python", "FastAPI", "Repository Analysis", "System Design", "OpenAI"],
      github: "https://github.com/shreyad2806/Architectiq", caseStudy: null, featured: false, status: "Completed",
    },
    {
      id: "devforge", name: "DevForge", description: "Full-stack SaaS platform for discovering, building and managing reusable developer kits.",
      tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "SaaS"],
      github: "https://github.com/shreyad2806/DevForge", caseStudy: null, featured: false, status: "Completed",
    },
  ],
  currentlyExploring: ["Agentic AI", "Agent harnesses", "AI infrastructure", "System design", "LLM evaluation", "Developer tooling"],
  currentFocus: {
    title: "Engineering with agentic systems",
    subtitle: "Software Engineer Intern · StartupCrafters",
    description: "Investigating repository-level failures, reproducing bugs, analyzing logs and PostHog events, and improving application reliability through code changes, pull requests and testing.",
    badge: "Currently exploring",
  },
  developerJournal: {
    title: "Engineering Field Notes",
    articles: [
      { title: "Building reliable agent workflows", category: "Agentic AI", readTime: "Draft" },
      { title: "Debugging production issues from signals to fixes", category: "Engineering", readTime: "Draft" },
      { title: "Designing fail-closed guardrails in CloseLoop", category: "Architecture", readTime: "Draft" },
      { title: "Runtime authorization for AI agents", category: "Security", readTime: "Draft" },
    ],
    note: "Notes from building, debugging and exploring the infrastructure behind intelligent software.",
  },
  blog: { title: "Engineering Field Notes", readingTime: "", href: null },
  journal: {
    buildNotes: [],
    openSourceFinds: [
      { name: "DeepSeek Harness", description: "Saved to explore and document. Notes coming soon.", category: "Agent tooling" },
      { name: "Paperclip", description: "Saved to explore and document. Notes coming soon.", category: "Developer tooling" },
      { name: "YCQM", description: "Saved to explore and document. Notes coming soon.", category: "Agentic AI" },
    ],
    toolsAndPlugins: [
      { name: "PostHog", description: "Product analytics and event insights encountered in software debugging workflows. More notes coming soon.", category: "Observability" },
    ],
    skillsInProgress: ["Agentic AI", "Agent harnesses", "AI infrastructure", "System design", "LLM evaluation", "Developer tooling"],
  },

  technicalExpertise: [
    { icon: "Cpu", category: "Core CS", skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "System Design Fundamentals"] },
    { icon: "Code", category: "Languages", skills: ["Python", "C++", "SQL"] },
    { icon: "Server", category: "Backend & Databases", skills: ["FastAPI", "REST APIs", "PostgreSQL", "pgvector"] },
    { icon: "Layout", category: "Software Engineering & Cloud", skills: ["Unit Testing", "Integration Testing", "API Testing", "CI/CD", "Next.js", "AWS", "Docker"] },
    { icon: "Brain", category: "AI & Intelligent Systems", skills: ["Machine Learning", "Scikit-learn", "XGBoost", "LLMs", "NLP", "RAG", "Embeddings", "Agentic AI"] },
    { icon: "Database", category: "Frameworks & Agent Systems", skills: ["LangGraph", "LangChain", "CrewAI", "MCP"] },
  ],
};
