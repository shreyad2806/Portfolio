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
    year: "Current",
    title: "What I'm Building",
    subtitle: "Building production AI systems and developer tools.",
    icon: "Rocket",
    description: "Currently working on AI infrastructure, RAG systems, agentic workflows, portfolio improvements, and production AI engineering.",
    focusAreas: ["AI Infrastructure", "RAG Systems", "Agentic Workflows", "Production Engineering"],
    highlights: ["Kodexa - Developer Intelligence Tool", "ArchitectIQ - Architecture Analysis Platform", "Portfolio Improvements", "Open Source Contributions"],
    checklist: ["Build AI systems", "Learn continuously", "Share knowledge", "Ship products"],
    quote: "The only way to do great work is to love what you do."
  },
  {
    id: "lawgpt-intern",
    year: "May 2026 – Jun 2026",
    title: "AI Research Intern",
    subtitle: "LawGPT",
    icon: "Briefcase",
    description: "Developed a full-stack AI-powered legal marketing CRM covering lead discovery, qualification, trends, content, strategy, and analytics. Built AI workflows for lead qualification, content generation, and marketing insights, with Supabase-backed CRM data and content management for AI-generated content.",
    focusAreas: ["AI Engineering", "CRM Development", "Full Stack"],
    highlights: ["AI-powered CRM", "Lead qualification workflows", "Content generation", "Marketing insights"],
    checklist: ["Build AI workflows", "Develop CRM features", "Implement analytics", "Ship production features"],
    quote: "Experience is the teacher of all things."
  },
  {
    id: "bluestock-intern",
    year: "Nov 2025 – Dec 2025",
    title: "Software Development Intern",
    subtitle: "Bluestock",
    icon: "Briefcase",
    description: "Optimized REST APIs and SQL queries in an Agile development environment, improving backend response latency.",
    focusAreas: ["Backend Development", "API Optimization", "SQL"],
    highlights: ["REST API optimization", "SQL query tuning", "Agile development", "Backend performance"],
    checklist: ["Optimize APIs", "Improve queries", "Work in Agile", "Enhance performance"],
    quote: "Experience is the teacher of all things."
  },
  {
    id: "et-genai",
    year: "2026",
    title: "ET GenAI Hackathon",
    subtitle: "Finalist",
    icon: "Sparkles",
    description: "Built an AI-powered solution during the ET GenAI Hackathon and reached the finalist stage.",
    focusAreas: ["Problem Solving", "Rapid Prototyping", "AI Engineering", "Presentation"],
    highlights: ["AI-powered solution", "Finalist recognition", "Team collaboration", "Innovative approach"],
    checklist: ["Solve problems", "Build rapidly", "Present effectively", "Innovate"],
    quote: "Innovation distinguishes between a leader and a follower."
  },
  {
    id: "technomech-president",
    year: "2025–Present",
    title: "President",
    subtitle: "Technomech Club",
    icon: "Users",
    description: "Leading the university technical club, organizing events, mentoring students, managing teams, and building technical communities.",
    focusAreas: ["Leadership", "Management", "Public Speaking", "Mentorship"],
    highlights: ["Leading technical club", "Organizing events", "Mentoring students", "Building community"],
    checklist: ["Lead technical events", "Mentor students", "Build community", "Foster innovation"],
    quote: "Leadership is not about being in charge. It's about taking care of those in your charge."
  },
  {
    id: "rtc-member",
    year: "2025–Present",
    title: "RTC Member",
    subtitle: "Networking & Community",
    icon: "Network",
    description: "Actively participating in RTC networking events, connecting with industry professionals, attending technical sessions, and expanding professional relationships.",
    focusAreas: ["Networking", "Community", "Industry Exposure", "Professional Growth"],
    highlights: ["Networking events", "Industry connections", "Technical sessions", "Professional relationships"],
    checklist: ["Network actively", "Attend events", "Connect with professionals", "Learn from industry"],
    quote: "Your network is your net worth."
  },
  {
    id: "sih",
    year: "2025",
    title: "Smart India Hackathon",
    subtitle: "Runner-up",
    icon: "Trophy",
    description: "Built an innovative solution addressing real-world challenges as part of India's premier hackathon.",
    focusAreas: ["AI/ML", "Problem Solving", "Teamwork", "Innovation"],
    highlights: ["Solved real problems", "Built innovative solution", "Team collaboration", "National recognition"],
    checklist: ["Solve problems", "Build solutions", "Collaborate", "Innovate"],
    quote: "Innovation distinguishes between a leader and a follower."
  },
  {
    id: "projects",
    year: "2022–2026",
    title: "Projects & Learning",
    subtitle: "Building. Learning. Shipping.",
    icon: "FolderGit2",
    description: "Building AI applications, exploring new technologies, learning software engineering principles, participating in hackathons, and continuously improving.",
    focusAreas: ["AI Projects", "Full Stack", "Mobile Apps", "RAG", "Automation", "Open Source"],
    highlights: ["AI applications", "Full stack projects", "Mobile development", "RAG systems", "Automation tools"],
    checklist: ["Build products", "Learn technologies", "Solve problems", "Ship projects"],
    quote: "The best way to predict the future is to invent it."
  }
];
