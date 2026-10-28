import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Production site is served from https://icei.pucminas.br/cbsoft27/. Override
// with VITE_BASE (e.g. /cbsoft/ for GitHub Pages, / for Vercel).
const base = process.env.VITE_BASE ?? '/cbsoft27/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/test/setup.ts'],
    // Full-App renders in jsdom sit around 2–5s each; give them headroom
    // so the suite doesn't flake on a loaded machine.
    testTimeout: 15000,
  },
});
