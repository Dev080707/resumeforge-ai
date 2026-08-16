/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Monochrome palette (previously indigo/blue). The key names
        // (brand-50 ... brand-900) are unchanged on purpose, so every
        // existing "bg-brand-600" / "text-brand-700" / etc. class in the
        // app repoints to gray/black/white automatically — no other
        // files need to change.
        brand: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#27272a",
          700: "#18181b",
          800: "#111113",
          900: "#09090b",
        },
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(0,0,0,0.04), 0 1px 3px 0 rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
