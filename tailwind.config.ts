import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        charcoal: "var(--charcoal)",
        "red-600": "var(--red-600)",
        "red-700": "var(--red-700)"
      }
    }
  },
  plugins: []
};
export default config;
