import type { Config } from 'tailwindcss';

// Ported from the inline tailwind.config that used to live in index.html's
// <head>. Brand hues resolve to the CSS custom properties defined in
// src/styles/tokens.css so Tailwind utilities track the light/dark themes.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        brandline: 'var(--line)',
        slate: 'var(--slate)',
      },
    },
  },
  plugins: [],
} satisfies Config;
