import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#4a90e2",
          50: "#eaf2fb",
          100: "#cddff6",
          200: "#aecded",
          300: "#8ebae4",
          400: "#6fa7dc",
          500: "#4a90e2",
          600: "#3a72b5",
          700: "#2b5588",
          800: "#1b375a",
          900: "#0c1a2d",
        },
        secondary: "#CBB0AA",
      },
    },
  },
  plugins: [],
} satisfies Config;
