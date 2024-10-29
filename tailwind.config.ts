/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",

  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
  },
  daisyui: {
    themes: [
      {
        viftheme: {
          primary: "#6750A4",
          "primary-content": "#ffffff",
          secondary: "#958DA5",
          "secondary-content": "#3d4451",
          accent: "#B58392",
          neutral: "#939094",
          "base-100": "#ffffff",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
  },
  plugins: [
    "prettier-plugin-tailwindcss",
    require("@tailwindcss/typography"),
    require("tailwindcss-animated"),
    require("daisyui"),
  ],
};
