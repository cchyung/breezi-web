import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      borderWidth: {
        DEFAULT: "1px",
        1: "1px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        height: "height",
      },
      fontFamily: {
        "uxum-grotesque": "var(--uxum-grotesque-font)",
        inter: "var(--inter-font)",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        orchid: "var(--color-orchid)",
        "pale-blue": "var(--color-pale-blue)",
        snow: "var(--color-snow)",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
export default config;
