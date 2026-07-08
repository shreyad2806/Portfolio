import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/blog/AnimatedBackground";
import BlogHero from "@/components/blog/BlogHero";
import ComingSoonCard from "@/components/blog/ComingSoonCard";
import QuoteCard from "@/components/blog/QuoteCard";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Navbar />
      <main className="container-px mx-auto max-w-4xl py-12">
        <BlogHero />
        <ComingSoonCard />
        <div className="mt-12">
          <QuoteCard />
        </div>
      </main>
    </div>
  );
}
