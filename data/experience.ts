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
    highlights: ["ContextOS - AI Infrastructure Platform", "AISO - AI Observability Platform", "Portfolio Improvements", "Open Source Contributions"],
    checklist: ["Build AI systems", "Learn continuously", "Share knowledge", "Ship products"],
    quote: "The only way to do great work is to love what you do."
  },
  {
    id: "internships",
    year: "2026",
    title: "Internships",
    subtitle: "Industry Experience",
    icon: "Briefcase",
    description: "Worked on real-world AI applications, backend systems, automation workflows, and production software.",
    focusAreas: ["AI Engineering", "Backend Development", "Production Systems", "Team Collaboration"],
    highlights: ["LawGPT CRM", "ComplytAI", "AI Tech Stack Recommender", "Portfolio"],
    checklist: ["Build production systems", "Collaborate with teams", "Learn industry practices", "Ship features"],
    quote: "Experience is the teacher of all things."
  },
  {
    id: "opensource",
    year: "2026",
    title: "Open Source",
    subtitle: "Contributing. Learning. Building for Everyone.",
    icon: "Github",
    description: "I enjoy contributing to open-source projects, sharing knowledge and learning from the developer community.",
    focusAreas: ["AI", "Developer Tools", "Automation", "Libraries"],
    highlights: ["Helping developers", "Learning in public", "Open source", "Knowledge sharing"],
    github: "github.com/shreyad2806",
    contributions: [
      { title: "LangChain", description: "Fixed documentation issues", date: "2 weeks ago" },
      { title: "LlamaIndex", description: "Added integration guide", date: "3 weeks ago" },
      { title: "Streamlit", description: "Improved components", date: "1 month ago" },
      { title: "Open Source RAG Starter", description: "Initial template", date: "1 month ago" }
    ],
    checklist: ["Contribute to projects", "Fix bugs", "Build developer tools", "Share knowledge"],
    quote: "Open source is not just code. It's collaboration, learning and impact."
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
