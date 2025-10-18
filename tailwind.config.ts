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
      colors: {
        // Light mode
        light: {
          bg: '#ffffff',
          text: '#111111',
          accent: '#0070f3',
          border: '#e5e5e5',
          'code-bg': '#f6f6f6',
        },
        // Dark mode
        dark: {
          bg: '#0a0a0a',
          text: '#ededed',
          accent: '#3b82f6',
          border: '#262626',
          'code-bg': '#1e1e1e',
        },
      },
      maxWidth: {
        container: '1280px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#111111',
            a: {
              color: '#0070f3',
              '&:hover': {
                color: '#0051b3',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              backgroundColor: '#f6f6f6',
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#f6f6f6',
              code: {
                backgroundColor: 'transparent',
                padding: '0',
              },
            },
          },
        },
        dark: {
          css: {
            color: '#ededed',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#60a5fa',
              },
            },
            h1: {
              color: '#ededed',
            },
            h2: {
              color: '#ededed',
            },
            h3: {
              color: '#ededed',
            },
            h4: {
              color: '#ededed',
            },
            code: {
              backgroundColor: '#1e1e1e',
            },
            pre: {
              backgroundColor: '#1e1e1e',
            },
            strong: {
              color: '#ededed',
            },
            blockquote: {
              color: '#a3a3a3',
              borderLeftColor: '#404040',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
