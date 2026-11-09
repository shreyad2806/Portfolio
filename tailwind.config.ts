import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070420",
        card: "#0e0a35",
        border: "#2a2166",
        primary: "#8b6bff",
        "primary-soft": "#b49aff",
        text: "#f1f3ff",
        muted: "#a3a9d6",
        aurora: { cyan: "#67e8f9", amber: "#ffc46e", mint: "#78e5bd", rose: "#f58dc8", violet: "#b49aff" },
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
        glow: "0 0 60px rgba(139, 92, 246, 0.25)",
        neon: "0 0 34px rgba(124, 92, 255, .45)",
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
