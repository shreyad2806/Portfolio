import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
      <body className="font-sans bg-background text-text antialiased">{children}</body>
    </html>
  );
}
