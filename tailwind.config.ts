import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kim: {
          teal: '#0D5C63',
          'teal-dark': '#094A50',
          'teal-light': '#E8F4F5',
          gold: '#C9973A',
          'gold-light': '#FDF3E3',
          cream: '#FAF7F2',
          charcoal: '#1C1C1E',
          stone: '#8C8277',
          success: '#2D7A4F',
          error: '#C0392B',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        amiri: ['var(--font-amiri)', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'geometric-pattern': "url('/images/geometric-pattern.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
