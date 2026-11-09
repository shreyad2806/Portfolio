import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./explorer-hero.css";
import "./world-theme.css";
import "./theme.css";
import "./skills.css";
import "./projects-home.css";
import GlobalNova from "@/components/GlobalNova";
import SiteBackdrop from "@/components/theme/SiteBackdrop";
import InteractionLayer from "@/components/theme/InteractionLayer";
import SiteFooter from "@/components/theme/SiteFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Shreya Dubey — AI & Backend Systems Engineer",
  description: "Explore the work of Shreya Dubey: agentic AI, backend engineering, developer infrastructure, and production-oriented software.",
  openGraph: {
    title: "Shreya Dubey — SHREYA.EXE",
    description: "An engineer exploring the frontier of intelligent software.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-background text-text antialiased">
        <SiteBackdrop />
        <InteractionLayer />
        {children}
        <SiteFooter />
        <GlobalNova />
      </body>
    </html>
  );
}
