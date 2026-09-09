import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// GitHub Pages project site is served from /cbsoft/. Override with
// VITE_BASE=/ when deploying to a custom domain or user page.
const base = process.env.VITE_BASE ?? '/cbsoft/';

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
