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
    id: "startupcrafters-intern",
    year: "Aug 2026 – Present",
    title: "Software Engineer Intern",
    subtitle: "StartupCrafters",
    icon: "Briefcase",
    description: "Investigate software failures across GitHub repositories by reproducing bugs, analyzing logs and PostHog events, reviewing test results, and implementing fixes. Contribute to backend and application development through pull requests, code reviews, unit and integration testing, and root-cause analysis to validate fixes and prevent regressions.",
    focusAreas: ["Bug reproduction & root-cause analysis", "Backend and application workflows", "Testing & reliability"],
    highlights: ["Log and PostHog event analysis", "GitHub pull requests and code reviews", "Unit and integration testing"],
    checklist: ["Reproduce reported failures", "Trace root causes using logs and events", "Implement and review fixes", "Validate changes and prevent regressions"],
    quote: "Reliable software comes from understanding not only what failed, but why."
  },
  {
    id: "lawgpt-intern",
    year: "May 2026 – Jun 2026",
    title: "AI Engineer Intern",
    subtitle: "LawGPT",
    icon: "Briefcase",
    description: "Developed an AI-powered legal marketing CRM supporting lead discovery, qualification, engagement tracking, content generation, and workflow automation. Implemented data workflows combining OCR, NLP, REST APIs, and Supabase-backed services for automated lead qualification and content generation.",
    focusAreas: ["AI engineering & workflow automation", "OCR, NLP & structured data processing", "Backend APIs & Supabase"],
    highlights: ["Legal marketing CRM workflows", "Automated lead qualification", "AI-assisted content generation"],
    checklist: ["Build lead discovery and qualification workflows", "Integrate OCR and NLP processing", "Connect REST APIs and Supabase services", "Support content generation and engagement tracking"],
    quote: "Build useful workflows by connecting the right pieces."
  }
];
