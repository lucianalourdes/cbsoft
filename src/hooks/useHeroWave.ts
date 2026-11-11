import { useEffect, useRef } from 'react';

export function useHeroWave(reducedMotion: boolean) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || reducedMotion) return;
    const wave = hero.querySelector('.home-hero__wave');

    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const { top, height } = hero.getBoundingClientRect();
      const waveHeight = wave?.clientHeight ?? height;
      const distance = window.innerHeight + waveHeight;
      const progress = distance > 0
        ? Math.min(1, Math.max(0, (window.innerHeight - (top + height - waveHeight)) / distance))
        : 0;
      hero.style.setProperty('--hero-wave-progress', progress.toFixed(4));
    };

    const schedule = () => {
      if (listening && !frame) frame = window.requestAnimationFrame(update);
    };

    const stop = () => {
      listening = false;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const start = () => {
      if (listening) return;
      listening = true;
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      schedule();
    };

    const observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => entry.isIntersecting ? start() : stop())
      : null;
    if (observer) observer.observe(hero);
    else start();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(schedule)
      : null;
    resizeObserver?.observe(hero);

    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      stop();
      hero.style.removeProperty('--hero-wave-progress');
    };
  }, [reducedMotion]);

  return heroRef;
}
