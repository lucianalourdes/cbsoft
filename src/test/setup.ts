import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// The app mounts <BrowserRouter basename={BASE_URL}> and BASE_URL is "/cbsoft/"
// under Vite's config. Align jsdom's location so route "/" matches in tests.
window.history.replaceState(null, '', import.meta.env.BASE_URL);

// jsdom lacks these; the reveal hook and CSS media queries need stubs.
class IOStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
globalThis.IntersectionObserver =
  globalThis.IntersectionObserver ?? (IOStub as unknown as typeof IntersectionObserver);

// jsdom throws on window.scrollTo; pages call it to reset scroll on mount.
window.scrollTo = (() => {}) as typeof window.scrollTo;

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

afterEach(() => cleanup());
