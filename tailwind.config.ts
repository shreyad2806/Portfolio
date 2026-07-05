import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        card: "#111217",
        border: "#23242C",
        primary: "#8B5CF6",
        "primary-soft": "#A78BFA",
        text: "#F8FAFC",
        muted: "#94A3B8",
      },
      borderRadius: {
        xl2: "16px",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0, 0, 0, 0.35)",
        glow: "0 0 60px rgba(139, 92, 246, 0.15)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.08), transparent 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
