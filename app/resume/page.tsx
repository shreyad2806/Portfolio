import type { Metadata } from "next";
import Link from "next/link";
import ResumePrintButton from "@/components/ResumePrintButton";
import "./resume.css";

export const metadata: Metadata = {
  title: "Resume | Shreya Dubey",
  description: "Software Engineer focused on Backend Engineering and AI/ML Systems.",
};

const skillGroups = [
  { label: "Languages", items: "Python, C++, SQL" },
  { label: "Backend & Databases", items: "FastAPI, REST APIs, PostgreSQL, pgvector" },
  { label: "Software Engineering", items: "Unit Testing, Integration Testing, API Testing, CI/CD" },
  { label: "AI/ML", items: "Machine Learning, Scikit-learn, XGBoost, LLMs, NLP, RAG, Embeddings, Agentic AI" },
  { label: "Frameworks & Cloud", items: "LangGraph, LangChain, CrewAI, MCP, Next.js, AWS, Docker" },
  { label: "Core CS", items: "Data Structures & Algorithms, DBMS, Operating Systems, System Design Fundamentals, OOP" },
];

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="resume-actions no-print">
        <Link href="/" className="resume-back">← Back to portfolio</Link>
        <ResumePrintButton />
      </div>
      <article className="resume-sheet">
        <header className="resume-header">
          <h1>SHREYA DUBEY</h1>
          <p className="resume-role">Software Engineer <span>|</span> Backend Engineering <span>|</span> AI/ML Systems</p>
          <div className="resume-contact">
            <a href="mailto:dubeyshreya2507@gmail.com">dubeyshreya2507@gmail.com</a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/shreya-dubey-544874289/" target="_blank" rel="noreferrer">LinkedIn</a>
            <span>·</span>
            <a href="https://github.com/shreyad2806" target="_blank" rel="noreferrer">GitHub</a>
            <span>·</span>
            <a href="/">Portfolio</a>
          </div>
        </header>

        <section className="resume-section">
          <h2>Education</h2>
          <div className="resume-row"><strong>Vellore Institute of Technology (VIT)</strong><span>Sep 2023 – May 2027</span></div>
          <div className="resume-row"><span>B.Tech in Computer Science and Engineering</span><strong>CGPA: 8.24/10</strong></div>
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          <div className="resume-skill-list">
            {skillGroups.map((group) => <p key={group.label}><strong>{group.label}:</strong> {group.items}</p>)}
          </div>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          <div className="resume-row"><strong>Software Engineer Intern – StartupCrafters</strong><span>Aug 2026 – Present</span></div>
          <ul>
            <li>Investigated software failures across GitHub repositories by reproducing bugs, analyzing logs and PostHog events, reviewing test results, and implementing fixes to improve application reliability.</li>
            <li>Contributed to backend and application development through pull requests, code reviews, unit and integration testing, and root-cause analysis to validate fixes and prevent regressions.</li>
          </ul>
          <div className="resume-row"><strong>AI Engineer Intern – LawGPT</strong><span>May 2026 – Jun 2026</span></div>
          <ul>
            <li>Developed an AI-powered legal marketing CRM supporting lead discovery, qualification, engagement tracking, content generation, and workflow automation.</li>
            <li>Implemented data workflows combining OCR, NLP, REST APIs, and Supabase-backed services for automated lead qualification and content generation.</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2>Projects</h2>
          <div className="resume-project">
            <div className="resume-row"><strong>CloseLoop – AI Financial Exception Resolution Platform</strong><a href="https://github.com/shreyad2806/razorpay-closeloop" target="_blank" rel="noreferrer">GitHub</a></div>
            <p className="resume-tech">Python, FastAPI, PostgreSQL, XGBoost, pgvector, LangGraph, MCP</p>
            <ul>
              <li>Engineered a financial reconciliation backend combining deterministic transaction matching, ML-based exception classification, evidence retrieval, and resolution recommendations.</li>
              <li>Orchestrated a 17-node LangGraph workflow with five fail-closed guardrail gates, approval checks, idempotency controls, controlled resolution execution, and post-resolution verification.</li>
              <li>Tested 30 curated financial exceptions across 9 exception types using synthetic fixtures, SQLite unit tests, and Docker-backed PostgreSQL integration tests.</li>
            </ul>
          </div>
          <div className="resume-project">
            <div className="resume-row"><strong>Kavach – Zero-Trust Runtime Security Platform</strong><a href="https://github.com/shreyad2806/Kavach" target="_blank" rel="noreferrer">GitHub</a></div>
            <p className="resume-tech">Python, FastAPI, AWS Fargate, Amazon Bedrock, Docker, Cedar</p>
            <ul>
              <li>Developed a two-agent security platform combining isolated execution environments, runtime authorization, and capability-based access controls.</li>
              <li>Connected Amazon Bedrock with four security scanners: Bandit, Semgrep, pip-audit, and Gitleaks, to identify code, dependency, and secret-exposure risks.</li>
              <li>Enforced fail-closed authorization across 10 protected tool methods and validated security controls and isolated execution through integration and payload stress tests up to 1 MB.</li>
            </ul>
          </div>
          <div className="resume-project">
            <div className="resume-row"><strong>ComplytAI – Financial Compliance and Risk Intelligence</strong><a href="https://github.com/shreyad2806/ComplytAI" target="_blank" rel="noreferrer">GitHub</a></div>
            <p className="resume-tech">Python, FastAPI, Next.js, CrewAI, Pinecone, RAG, Ollama, Qwen2.5</p>
            <ul>
              <li>Designed a five-agent CrewAI workflow for financial document analysis, anti-money laundering (AML), compliance assessment, risk auditing, and executive report synthesis.</li>
              <li>Implemented Pinecone-based RAG using semantic retrieval, embeddings, Pydantic-validated outputs, confidence scoring, and evidence citations for traceable compliance findings.</li>
              <li>Automated executive PDF report generation with risk scores, compliance gaps, audit flags, recommendations, and supporting document evidence.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Honors & Achievements</h2>
          <ul>
            <li>Runner-up: Smart India Hackathon 2025 | Finalist: ET GenAI Hackathon 2025</li>
            <li>Competitive Programming: Solved 203+ LeetCode problems; Codeforces participant.</li>
            <li>NandaHack – HCLTech × MIT Media Lab: Contributed to an open-source Agentic AI platform involving agents, memory, and trust workflows.</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2>Certifications</h2>
          <ul>
            <li>Generative AI with Large Language Models – Coursera</li>
            <li>Career Essentials in Generative AI – Microsoft and LinkedIn Learning</li>
          </ul>
        </section>
      </article>
    </main>
  );
}
