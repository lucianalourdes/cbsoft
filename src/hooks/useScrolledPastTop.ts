import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled more than `offset` pixels from the top;
 * false only while it is (back) at the top.
 */
export function useScrolledPastTop(offset = 8): boolean {
  const [scrolled, setScrolled] = useState(() => window.scrollY > offset);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > offset);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [offset]);

  return scrolled;
}
