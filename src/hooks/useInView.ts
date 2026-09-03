import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll: mirrors the IntersectionObserver block in the old
 * js/main.js. Returns a ref to attach and whether it has entered the
 * viewport at least once (it stays true afterwards).
 */
export function useInView<T extends Element = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.12 },
): { ref: React.RefObject<T>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(entry.target);
        }
      });
    }, options);
    io.observe(node);
    return () => io.disconnect();
    // options is expected to be a stable literal at call sites
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
