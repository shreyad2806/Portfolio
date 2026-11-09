import Navbar from "@/components/Navbar";
import ComingSoonCard from "@/components/blog/ComingSoonCard";
import QuoteCard from "@/components/blog/QuoteCard";
import PageHero from "@/components/theme/PageHero";
import NextDestinations from "@/components/theme/NextDestinations";

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-px mx-auto max-w-[1400px] pb-20">
        <PageHero
          place="frontier"
          title={
            <>
              Writing about what <span className="th-accent-text" style={{ "--accent": "#78e5bd" } as React.CSSProperties}>I build</span>.
            </>
          }
          description="I enjoy documenting my journey of building software, experimenting with AI systems, backend engineering, and sharing the lessons I learn along the way."
          stats={[{ value: "Soon", label: "first articles" }]}
        />
        <div className="mx-auto max-w-4xl">
          <ComingSoonCard />
          <div className="mt-12">
            <QuoteCard />
          </div>
        </div>
        <NextDestinations current="frontier" />
      </main>
    </div>
  );
}
