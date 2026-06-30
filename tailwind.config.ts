import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom CAM CAM vintage palette
        "paper-warm": "#F4EFDC",
        "beige-vintage": "#E6DEC6",
        "olive-primary": "#546A39",
        "moss-dark": "#3F542A",
        "espresso-dark": "#443A2A",
        "taupe-gray": "#6C6352",
        "border-taupe": "#A79F89",
        "latte-light": "#D8CDB2",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif-vintage)", "serif"],
      },
      boxShadow: {
        "vintage-sm": "0 2px 4px rgba(68, 58, 42, 0.05)",
        "vintage-md": "0 4px 12px rgba(68, 58, 42, 0.08)",
        "vintage-lg": "0 8px 24px rgba(68, 58, 42, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
