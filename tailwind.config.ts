import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#17191c',
        graphite: '#24272b',
        gold: '#c9963f',
        cream: '#f5f1ea',
        paper: '#faf8f4',
        smoke: '#e5e0d7'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Arial', 'sans-serif'],
        display: ['var(--font-oswald)', 'Arial Narrow', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(0,0,0,.16)'
      }
    }
  },
  plugins: []
};
export default config;
