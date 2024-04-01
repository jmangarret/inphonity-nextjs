import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-aeonik)'],
      },
      colors: {
        highlight: '#00DDBA',
        highlight2: '#FFAE39',
      },
      gridTemplateColumns: {
        '3': 'repeat(3, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
export default config;
