/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Figtree", "system-ui", "sans-serif"] },
      colors: {
        ink: "#14202B",
        mist: "#EEF1F4",
        line: "#D5DCE3",
        brand: { DEFAULT: "#0F6E8C", dark: "#0A5069", soft: "#DCEEF4" },
        doing: "#9A6700",
        done: "#2F7D4F",
        danger: "#B3261E",
      },
    },
  },
  plugins: [],
};
