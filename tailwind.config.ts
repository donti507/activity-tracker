import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          low: "var(--surface-low)",
          mid: "var(--surface-mid)",
          high: "var(--surface-high)",
          highest: "var(--surface-highest)",
        },
        border: {
          DEFAULT: "var(--border)",
          2: "var(--border2)",
        },
        text: {
          DEFAULT: "var(--text)",
          2: "var(--text2)",
          3: "var(--text3)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          dim: "var(--primary-dim)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dim: "var(--secondary-dim)",
        },
        amber: {
          DEFAULT: "var(--amber)",
          dim: "var(--amber-dim)",
        },
        tertiary: "var(--tertiary)",
        error: "var(--error)",
        green: "var(--green)",
      },
      fontFamily: {
        anton: ["var(--font-anton)", "sans-serif"],
        hanken: ["var(--font-hanken)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "speed-lines": "repeating-linear-gradient(-45deg, transparent, transparent 120px, rgba(255,192,129,0.02) 120px, rgba(255,192,129,0.02) 121px)",
      }
    },
  },
  plugins: [],
};
export default config;
