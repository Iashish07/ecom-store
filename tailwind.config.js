/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#EDE6D6",   // page background — raw canvas fabric
        paper: "#FAF7F0",    // card / tag background
        ink: "#242220",      // primary text
        forest: "#2B3A2E",   // deep utility green, headers/nav
        brass: "#B8863A",    // hardware accent, CTAs
        rust: "#A34A28",     // stamped accent, sale/new tags
        line: "#D8CFB8",     // hairline borders on canvas
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-worksans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        tag: "2px",
      },
    },
  },
  plugins: [],
};
