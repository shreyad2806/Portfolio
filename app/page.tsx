import Navbar from "@/components/Navbar";
import ExplorerHero from "@/components/ExplorerHero";
import WorldCanvas from "@/components/WorldCanvas";
import EngineeringSnapshot from "@/components/EngineeringSnapshot";
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
      <main>
        <ExplorerHero />
        <WorldCanvas />
        <EngineeringSnapshot />
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
