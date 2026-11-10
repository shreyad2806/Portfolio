export type NovaDestinationId = "basecamp" | "buildlab" | "journey" | "frontier" | "connection";
export type NovaReply = { text: string; destinationId?: NovaDestinationId; suggestions: string[] };

const defaultSuggestions = ["Show me the featured projects", "Tell me about Shreya's experience", "What is she exploring now?", "How can I contact her?"];
const makeReply = (text: string, destinationId?: NovaDestinationId, suggestions: string[] = defaultSuggestions): NovaReply => ({ text, destinationId, suggestions });

export function answerNova(rawQuestion: string): NovaReply {
  const q = rawQuestion.trim().toLowerCase().replace(/[’']/g, "'");
  if (!q) return makeReply("Ask me about a project, Shreya's experience, her technical background, or where to find something in this portfolio.");
  if (/^(hi|hello|hey|hiya|good morning|good afternoon|good evening)\b/.test(q))
    return makeReply("Hey! I'm Nova, your guide to Shreya's engineering world. I can walk you through projects, experience, technical interests, or help you get in touch.", undefined, ["Start with the projects", "Meet Shreya", "Explore her experience", "Contact Shreya"]);
  if (/\b(basecamp|about|who is shreya|who's shreya|profile|background|introduction|meet shreya)\b/.test(q))
    return makeReply("Shreya Dubey is a Computer Science student at VIT Bhopal University (2023–2027), focused on software engineering, backend systems, and AI/ML. She enjoys understanding how systems work end to end—from APIs and data models to agent workflows, security boundaries, and reliability.", "basecamp", ["Show me her technical skills", "What has she built?", "Tell me about her education"]);
  if (/\b(closeloop|close loop|reconciliation|payment exception)\b/.test(q))
    return makeReply("CloseLoop is an AI-assisted financial exception resolution platform. It ingests payment and settlement records, reconciles them deterministically, investigates exceptions with evidence, classifies candidate resolutions, checks guardrails, and verifies the resulting financial state before closure. Its architecture uses FastAPI, PostgreSQL, SQLAlchemy, LangGraph, and XGBoost. Its core principle: an LLM can assist investigation, but financial state changes must pass deterministic checks and verification.", "buildlab", ["Explain the CloseLoop architecture", "Show me Kavach", "What other projects are featured?"]);
  if (/\b(kavach|agent.?shield|zero.?trust|runtime security)\b/.test(q))
    return makeReply("Kavach is a zero-trust security platform for AI-agent tool execution. Its design centers on two focused agents: a scanner agent and an authorization agent. It combines isolated execution, capability-based permissions, policy checks, and fail-closed authorization so an agent cannot simply grant itself access.", "buildlab", ["Explain its security architecture", "Tell me about CloseLoop", "Show me ComplytAI"]);
  if (/\b(complyt.?ai|compliance|regulatory|risk intelligence)\b/.test(q))
    return makeReply("ComplytAI is a compliance and risk-intelligence project built around document understanding and evidence-backed analysis. It combines retrieval-augmented generation with a multi-agent workflow, structured outputs, confidence scoring, and evidence citations so findings remain traceable to source material.", "buildlab", ["Compare the featured projects", "Show me CloseLoop", "Show me Kavach"]);
  if (/\b(vision.?guard|image quality|random.?forest)\b/.test(q))
    return makeReply("VisionGuard is a machine-learning image-quality assessment project. It uses a RandomForest regressor to estimate image-quality metrics and exposes the workflow through a FastAPI backend.", "buildlab");
  if (/\b(project|projects|built|builds|portfolio work|github repos|case stud(y|ies))\b/.test(q))
    return makeReply("I'd start with three substantial builds: CloseLoop, a guarded financial exception-resolution system; Kavach, a zero-trust runtime security layer for AI agents; and ComplytAI, an evidence-backed compliance workflow. Other work includes VisionGuard, TalentLens, LawGPT CRM, ArchitectIQ, and DevForge. The Build Lab contains project summaries, technical stacks, and repository links.", "buildlab", ["Walk me through CloseLoop", "Explain Kavach", "Tell me about ComplytAI"]);
  if (/\b(experience|internship|intern|startup.?crafters|law.?gpt|worked|career|journey)\b/.test(q))
    return makeReply("Shreya's experience includes a Software Engineer internship at StartupCrafters, where she works on repository-level debugging, reproducing issues, investigating logs and product signals, and validating fixes through code changes and tests. She previously worked as an AI Engineer Intern at LawGPT, contributing to an AI-powered legal marketing CRM with OCR/NLP workflows, REST APIs, and Supabase.", "journey", ["What hackathons has she participated in?", "Tell me about her open-source work", "What is her education?"]);
  if (/\b(hackathon|smart india|sih|et genai|nandahack|award|achievement|recognition|runner.?up|finalist)\b/.test(q))
    return makeReply("A few milestones stand out: National Runner-up at Smart India Hackathon 2025, finalist at ET GenAI Hackathon 2025, and participation in NandaHack (HCLTech × MIT Media Lab). Shreya has also led the Technomech technical club as President and contributed to open-source projects.", "journey", ["Tell me about her internships", "What has she contributed to open source?", "Meet Shreya"]);
  if (/\b(open.?source|contributor|github contribution)\b/.test(q))
    return makeReply("Open-source engineering is part of Shreya's current journey. Her portfolio highlights contributions to agentic-AI tooling alongside project work and collaborative development. You can explore her public repositories and activity on GitHub.", "journey", ["Open the GitHub profile", "Show me her projects", "What is she exploring now?"]);
  if (/\b(skill|skills|tech stack|technology|technologies|programming language|backend|database|framework)\b/.test(q))
    return makeReply("Her technical foundation spans Python, C++, SQL, data structures and algorithms, OOP, DBMS, operating systems, and system-design fundamentals. Her backend and product work includes FastAPI, REST APIs, PostgreSQL, Next.js, Docker, and AWS. Her AI work touches machine learning, NLP, LLMs, RAG, embeddings, LangGraph, LangChain, CrewAI, and MCP.", "basecamp", ["Which AI technologies does she use?", "Explain her backend experience", "Show me projects using this stack"]);
  if (/\b(education|college|university|vit|cgpa|degree|btech|b.tech)\b/.test(q))
    return makeReply("Shreya is pursuing a B.Tech in Computer Science at VIT Bhopal University, with an expected graduation in 2027.", "journey", ["Tell me about her internships", "Show me her achievements", "Meet Shreya"]);
  if (/\b(frontier|explor|learning|currently|current focus|what('s| is) she (doing|learning)|agentic|harness|inference|observability|evaluation|mcp)\b/.test(q))
    return makeReply("Shreya is exploring the engineering foundations behind reliable AI products: agent harnesses and tool execution, context/state management, multi-agent orchestration, inference infrastructure, evaluation and observability, MCP, and developer tooling. The emphasis is on understanding how these systems behave in production—not only how to call a model API.", "frontier", ["What is agent harness engineering?", "Explain MCP", "Show me projects in this area"]);
  if (/\b(contact|email|linkedin|hire|hiring|collaborat|connect|reach|opportunit|resume|cv)\b/.test(q))
    return makeReply("You can reach Shreya by email at dubeyshreya2507@gmail.com, connect on LinkedIn at linkedin.com/in/shreya-dubey-544874289, or explore her work at github.com/shreyad2806. The Connection Hub has direct links, and the resume is available from the main navigation.", "connection", ["Open the Connection Hub", "Show me her resume", "Browse her GitHub projects"]);
  if (/\b(navigate|where|take me|go to|show me the|open the)\b/.test(q)) {
    if (/project|build/.test(q)) return makeReply("Let's head to the Build Lab. That's where the projects and repositories are organized.", "buildlab");
    if (/experience|hackathon|journey|intern/.test(q)) return makeReply("The Journey is the right stop for internships, hackathons, education, and leadership.", "journey");
    if (/skill|about|profile|basecamp/.test(q)) return makeReply("Let's start at Basecamp for Shreya's profile and technical foundations.", "basecamp");
    if (/frontier|learn|explor|focus/.test(q)) return makeReply("The Frontier covers current explorations and engineering interests.", "frontier");
    if (/contact|email|connect/.test(q)) return makeReply("The Connection Hub has all the direct contact links.", "connection");
  }
  if (/\b(help|what can you do|how do i use|guide me)\b/.test(q))
    return makeReply("I can guide you through five places: Basecamp (profile and skills), Build Lab (projects), Journey (experience and milestones), Frontier (current explorations), and Connection Hub (contact). Ask a question in your own words or choose a destination.", undefined, ["Meet Shreya", "Explore projects", "Explore experience", "Contact Shreya"]);
  return makeReply("I can help you discover Shreya's projects, experience, technical skills, education, achievements, and current engineering interests. Try asking “What is CloseLoop?”, “Tell me about her internship”, or “How can I contact her?”");
}

export const novaDestinations = [
  { id: "basecamp" as const, number: "01", title: "Basecamp", description: "Profile & skills", target: "skills", color: "#b49aff" },
  { id: "buildlab" as const, number: "02", title: "Build Lab", description: "Projects & systems", target: "projects", color: "#66e9f4" },
  { id: "journey" as const, number: "03", title: "Journey", description: "Experience & milestones", target: "journey", color: "#ffc46e" },
  { id: "frontier" as const, number: "04", title: "Frontier", description: "Exploration & learning", target: "focus", color: "#78e5bd" },
  { id: "connection" as const, number: "05", title: "Connection Hub", description: "Contact & collaboration", target: "contact", color: "#f58dc8" },
] satisfies Array<{ id: NovaDestinationId; number: string; title: string; description: string; target: string; color: string }>;
