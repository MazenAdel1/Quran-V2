import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "450px",
        "2xl": "1400px",
      },
      fontFamily: {
        camel: "camel",
        amiri: "amiri",
      },
      colors: {
        "primary-white": "#e9eaec",
        "dark-navy": "#0e1420",
        navy: "#121C34",
        "light-navy": "#1B2B52",
        orange: "#F09D51",
        "dark-orange": "#CE690C",
        secondary: "#e1e0d6",
        accent: "#f06542",
      },
      backgroundColor: {
        "dark-navy": "#0e1420",
        navy: "#121C34",
        "light-navy": "#1B2B52",
        orange: "#F09D51",
        "dark-orange": "#CE690C",
        secondary: "#e1e0d6",
        accent: "#f06542",
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
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;

export default config;
