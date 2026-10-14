import { useEffect, type RefObject } from 'react';

/**
 * Publish how far the fixed header reaches down the viewport (main bar,
 * plus the SBC strip while it is shown) as --site-header-offset, so sticky
 * content such as the call-page sidebars and anchored sections can stop just
 * below it. Measured from the main bar, not the header box, so an open mega
 * menu is ignored.
 */
export function useSiteHeaderOffset(headerRef: RefObject<HTMLElement>, sbcHidden: boolean) {
  useEffect(() => {
    const header = headerRef.current;
    const strip = header?.querySelector<HTMLElement>('.site-header__sbc');
    const bar = header?.querySelector<HTMLElement>('.site-header__inner');
    if (!header || !strip || !bar) return;

    const update = () => {
      const style = getComputedStyle(header);
      const bottom =
        bar.offsetTop +
        bar.offsetHeight +
        parseFloat(style.paddingBottom) +
        parseFloat(style.borderBottomWidth) -
        (sbcHidden ? strip.offsetHeight : 0);
      document.documentElement.style.setProperty('--site-header-offset', `${bottom}px`);
    };

    update();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(update);
    observer.observe(strip);
    observer.observe(bar);
    return () => observer.disconnect();
  }, [headerRef, sbcHidden]);
}
