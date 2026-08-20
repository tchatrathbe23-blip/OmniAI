/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.12)",
        input: "rgba(255, 255, 255, 0.08)",
        ring: "rgba(147, 51, 234, 0.5)",
        background: "#090A0F",
        foreground: "#F8FAFC",
        glass: {
          100: "rgba(255, 255, 255, 0.03)",
          200: "rgba(255, 255, 255, 0.06)",
          300: "rgba(255, 255, 255, 0.1)",
          400: "rgba(255, 255, 255, 0.15)",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: 0.4 },
          "100%": { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
};
