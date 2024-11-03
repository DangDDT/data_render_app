/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      keyframes: {
        scale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        moveLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        moveRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        scale: "scale 1.5s ease-in-out infinite",
        scaleIn: "scaleIn 0.8s ease-in-out forwards",
      },
    },
    fontFamily: {
      sans: ["Kanit", "sans-serif"],
    },
  },
  plugins: [
    "prettier-plugin-tailwindcss",
    "@tailwindcss/typography",
    "tailwindcss-animated",
  ],
};
