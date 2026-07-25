import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: '#4361ee',
        accent: '#00c2ff',
        'mafy-bg': '#080918',
        'mafy-card': '#0e0f1e',
        'mafy-card2': '#12142a',
        'mafy-sidebar': '#0a0b1c',
        'mafy-border': 'rgba(255,255,255,0.08)'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
