import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/contact/AnimatedBackground";
import ContactHero from "@/components/contact/ContactHero";
import AvailabilityCard from "@/components/contact/AvailabilityCard";
import ContactGrid from "@/components/contact/ContactGrid";
import QuickConnect from "@/components/contact/QuickConnect";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Navbar />
      <main className="container-px mx-auto max-w-7xl py-12">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Left - Hero */}
          <div className="flex-1">
            <ContactHero />
          </div>

          {/* Right - Availability Card */}
          <div className="lg:w-80">
            <AvailabilityCard />
          </div>
        </div>

        {/* Contact Grid */}
        <ContactGrid />

        {/* Quick Connect CTA */}
        <QuickConnect />
      </main>
    </div>
  );
}
