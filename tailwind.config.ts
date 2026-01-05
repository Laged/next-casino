import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary casino green
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
          DEFAULT: "#10B981",
        },
        // Casino-specific colors
        casino: {
          // Background colors
          dark: "#0a0a0a",
          darker: "#050505",
          card: "#141414",
          // Accent colors
          gold: "#fbbf24",
          "gold-light": "#fcd34d",
          "gold-dark": "#d97706",
          // Status colors
          win: "#22c55e",
          lose: "#ef4444",
          draw: "#6b7280",
          // Table felt green
          felt: "#15803d",
          "felt-light": "#16a34a",
          "felt-dark": "#14532d",
          // Chip colors
          "chip-red": "#dc2626",
          "chip-blue": "#2563eb",
          "chip-green": "#16a34a",
          "chip-black": "#1f2937",
          "chip-white": "#f3f4f6",
          "chip-purple": "#7c3aed",
        },
        // Background
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "card-flip": "card-flip 0.6s ease-in-out",
        "chip-bounce": "chip-bounce 0.5s ease-out",
        "dice-roll": "dice-roll 1s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(16, 185, 129, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.8)",
          },
        },
        "card-flip": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        "chip-bounce": {
          "0%": { transform: "translateY(-100px)", opacity: "0" },
          "60%": { transform: "translateY(10px)" },
          "80%": { transform: "translateY(-5px)" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "dice-roll": {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "25%": { transform: "rotate(90deg) scale(1.1)" },
          "50%": { transform: "rotate(180deg) scale(1)" },
          "75%": { transform: "rotate(270deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
      },
      backgroundImage: {
        "casino-gradient": "linear-gradient(135deg, #064e3b 0%, #0a0a0a 50%, #1f2937 100%)",
        "gold-gradient": "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
        "card-pattern": "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
