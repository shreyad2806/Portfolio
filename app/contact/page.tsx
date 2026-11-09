import Navbar from "@/components/Navbar";
import AvailabilityCard from "@/components/contact/AvailabilityCard";
import ContactGrid from "@/components/contact/ContactGrid";
import QuickConnect from "@/components/contact/QuickConnect";
import PageHero from "@/components/theme/PageHero";
import NextDestinations from "@/components/theme/NextDestinations";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-px mx-auto max-w-[1400px] pb-20">
        <PageHero
          place="connection"
          title={
            <>
              Let&apos;s <span className="th-accent-text" style={{ "--accent": "#f58dc8" } as React.CSSProperties}>connect</span>.
            </>
          }
          description="I'm always open to discussing new opportunities, interesting projects, collaborations, or simply connecting with fellow developers."
          stats={[{ value: "Open", label: "to opportunities" }]}
        />

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_20rem]">
          <ContactGrid />
          <AvailabilityCard />
        </div>

        <div className="mt-8">
          <QuickConnect />
        </div>

        <NextDestinations current="connection" />
      </main>
    </div>
  );
}
