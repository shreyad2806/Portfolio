import Navbar from "@/components/Navbar";
import ExplorerHero from "@/components/ExplorerHero";
import TechnicalExpertise from "@/components/TechnicalExpertise";
import FeaturedProjects from "@/components/FeaturedProjects";
import JourneySection from "@/components/JourneySection";
import CurrentFocus from "@/components/CurrentFocus";
import LatestBlog from "@/components/LatestBlog";
import ContactCTA from "@/components/ContactCTA";
import TechMarquee from "@/components/theme/TechMarquee";
import RouteDivider from "@/components/theme/RouteDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="portfolio-world-page">
        <ExplorerHero />
        <TechMarquee />
        <TechnicalExpertise />
        <RouteDivider from="#b49aff" to="#66e9f4" />
        <FeaturedProjects />
        <RouteDivider from="#66e9f4" to="#ffc46e" flip />
        <JourneySection />
        <RouteDivider from="#ffc46e" to="#78e5bd" />
        <CurrentFocus />
        <LatestBlog />
        <RouteDivider from="#78e5bd" to="#f58dc8" flip />
        <ContactCTA />
      </main>
    </>
  );
}
