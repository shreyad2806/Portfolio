import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import TalentLensPage from "@/components/projects/TalentLensPage";
import AITechStackRecommenderPage from "@/components/projects/AITechStackRecommenderPage";
import ComplytaiPage from "@/components/projects/ComplytaiPage";
import ProjectDetailHero from "@/components/projects/ProjectDetailHero";
import ProblemSection from "@/components/projects/ProblemSection";
import MotivationSection from "@/components/projects/MotivationSection";
import ArchitectureSection from "@/components/projects/ArchitectureSection";
import FeatureShowcase from "@/components/projects/FeatureShowcase";
import EngineeringDecisions from "@/components/projects/EngineeringDecisions";
import ChallengesSection from "@/components/projects/ChallengesSection";
import DevelopmentJourney from "@/components/projects/DevelopmentJourney";
import ScreenshotsGallery from "@/components/projects/ScreenshotsGallery";
import DemoSection from "@/components/projects/DemoSection";
import ResultsSection from "@/components/projects/ResultsSection";
import LearningsSection from "@/components/projects/LearningsSection";
import RoadmapSection from "@/components/projects/RoadmapSection";
import GitHubCTA from "@/components/projects/GitHubCTA";
import NextProject from "@/components/projects/NextProject";
import ReadingProgress from "@/components/projects/ReadingProgress";
import StickyNavigation from "@/components/projects/StickyNavigation";
import { projectDataMap } from "@/lib/project-detail-data";

export async function generateStaticParams() {
  return Object.keys(projectDataMap).map((slug) => ({
    slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projectDataMap[slug];

  if (!project) {
    notFound();
  }

  const isTalentLens = slug === "talentlens";
  const isAITechStackRecommender =
    slug === "ai-tech-stack-recommender";
  const isComplytai = slug === "complytai";

  return (
    <>
      <ReadingProgress />
      <Navbar />
      {!isTalentLens && <StickyNavigation />}
      <main>
        {isTalentLens ? (
          <TalentLensPage data={project} />
        ) : isAITechStackRecommender ? (
          <AITechStackRecommenderPage data={project} />
        ) : isComplytai ? (
          <ComplytaiPage data={project} />
        ) : (
          <>
            <ProjectDetailHero data={project} />
            <ProblemSection data={project} />
            <MotivationSection data={project} />
            <ArchitectureSection data={project} />
            <FeatureShowcase data={project} />
            <EngineeringDecisions data={project} />
            <ChallengesSection data={project} />
            <DevelopmentJourney data={project} />
            <ScreenshotsGallery data={project} />
            <DemoSection data={project} />
            <ResultsSection data={project} />
            <LearningsSection data={project} />
            <RoadmapSection data={project} />
            <GitHubCTA data={project} />
            <NextProject data={project} />
          </>
        )}
      </main>
    </>
  );
}