import Navbar from "@/components/Navbar";
import ExplorerHero from "@/components/ExplorerHero";
import TechnicalExpertise from "@/components/TechnicalExpertise";
import FeaturedProjects from "@/components/FeaturedProjects";
import JourneySection from "@/components/JourneySection";
import CurrentFocus from "@/components/CurrentFocus";
import LatestBlog from "@/components/LatestBlog";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="portfolio-world-page">
        <ExplorerHero />
        <TechnicalExpertise />
        <FeaturedProjects />
        <JourneySection />
        <CurrentFocus />
        <LatestBlog />
        <ContactCTA />
      </main>
    </>
  );
}
