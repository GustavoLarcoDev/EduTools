import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0B1020",
          900: "#0B1020",
          800: "#121831",
          700: "#1C2442",
          600: "#2A3358",
        },
        brand: {
          50: "#F3F1FF",
          100: "#E8E5FF",
          200: "#D3CDFF",
          300: "#B3A9FE",
          400: "#8F80FD",
          500: "#6D5DFC",
          600: "#5A45F0",
          700: "#4B36D6",
          800: "#3D2DAD",
          900: "#332A88",
          950: "#1E1852",
        },
        accent: {
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
        },
        surface: "#F7F8FC",
        line: "#E6E8F0",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,16,32,0.04), 0 4px 16px -4px rgba(11,16,32,0.08)",
        lift: "0 2px 4px rgba(11,16,32,0.04), 0 16px 40px -12px rgba(11,16,32,0.18)",
        glow: "0 10px 30px -10px rgba(109,93,252,0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 1.6s infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
