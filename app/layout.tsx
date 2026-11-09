import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./explorer-hero.css";
import "./world-theme.css";
import GlobalNova from "@/components/GlobalNova";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Shreya Dubey — Software Engineer | Backend Engineering | AI/ML Systems",
  description: "Shreya Dubey is a software engineer focused on backend engineering and AI/ML systems, building reliable APIs, intelligent workflows and production-oriented software.",
  openGraph: {
    title: "Shreya Dubey — SHREYA.EXE",
    description: "Software Engineer focused on Backend Engineering and AI/ML Systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-background text-text antialiased">{children}<GlobalNova /></body>
    </html>
  );
}
