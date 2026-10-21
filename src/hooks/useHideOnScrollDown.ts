import { useEffect, useState } from 'react';

/**
 * True while the user is scrolling down past `offset` pixels; false at the
 * top of the page and as soon as they scroll back up. A small `tolerance`
 * ignores jitter from trackpads and momentum scrolling.
 */
export function useHideOnScrollDown(offset = 80, tolerance = 6): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y <= offset) {
        setHidden(false);
      } else if (y > lastY + tolerance) {
        setHidden(true);
      } else if (y < lastY - tolerance) {
        setHidden(false);
      } else {
        return;
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [offset, tolerance]);

  return hidden;
}
