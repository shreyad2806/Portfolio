import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
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

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projectDataMap[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <StickyNavigation />
      <main>
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
      </main>
    </>
  );
}
