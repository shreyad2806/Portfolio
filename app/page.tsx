import Navbar from "@/components/Navbar";
import WorldExperience from "@/components/world/WorldExperience";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="portfolio-world-page">
        <WorldExperience />
      </main>
    </>
  );
}
