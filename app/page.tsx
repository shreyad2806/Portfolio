import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EngineeringSnapshot from "@/components/EngineeringSnapshot";
import FeaturedProjects from "@/components/FeaturedProjects";
import CurrentFocus from "@/components/CurrentFocus";
import LatestBlog from "@/components/LatestBlog";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EngineeringSnapshot />
        <FeaturedProjects />
        <CurrentFocus />
        <LatestBlog />
        <ContactCTA />
      </main>
    </>
  );
}
