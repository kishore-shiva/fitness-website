/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Barlow Condensed", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      colors: {
        background: "#09090B",
        foreground: "#FAFAFA",
        primary: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#27272A",
          foreground: "#A1A1AA",
        },
        muted: {
          DEFAULT: "#18181B",
          foreground: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        border: "#27272A",
        input: "#27272A",
        ring: "#DC2626",
        card: {
          DEFAULT: "#18181B",
          foreground: "#FAFAFA",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
