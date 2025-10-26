import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // All colors and styles are managed via CSS variables in globals.css
      // This keeps styling configuration in a single source of truth
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
