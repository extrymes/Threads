import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        threads: {
          gray: "#0F0F0F",
          "gray-light": "#7A7A7A",
          "gray-dark": "#1E1E1E",
          modal: "#414040",
        },
      },
    },
  },
  plugins: [],
  darkMode: "selector",
} satisfies Config;
