export interface Article {
  title: string;
  category: string;
  readTime: string;
}

export const upcomingArticles: Article[] = [
  {
    title: "Building TalentLens",
    category: "Case Study",
    readTime: "12 min",
  },
  {
    title: "Hybrid Retrieval Explained",
    category: "RAG",
    readTime: "8 min",
  },
  {
    title: "Cross Encoder Reranking",
    category: "Machine Learning",
    readTime: "7 min",
  },
  {
    title: "Production RAG Lessons",
    category: "Architecture",
    readTime: "10 min",
  },
  {
    title: "Building AI Systems with FastAPI",
    category: "Backend",
    readTime: "9 min",
  },
  {
    title: "Prompt Engineering in Real Applications",
    category: "LLMs",
    readTime: "6 min",
  },
];
