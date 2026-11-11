import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useHeroWave } from './useHeroWave';

function Hero({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const ref = useHeroWave(reducedMotion);
  return <section ref={ref} data-testid="hero"><div className="home-hero__wave" /></section>;
}

describe('useHeroWave', () => {
  let intersect: (visible: boolean) => void;
  let top: number;
  let height: number;
  let viewportHeight: number;
  let frames: Map<number, FrameRequestCallback>;
  let nextFrame: number;
  const disconnect = vi.fn();

  function flush() {
    act(() => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(0));
    });
  }

  beforeEach(() => {
    top = 0;
    height = 800;
    viewportHeight = 800;
    frames = new Map();
    nextFrame = 0;
    disconnect.mockClear();
    vi.spyOn(window, 'innerHeight', 'get').mockImplementation(() => viewportHeight);
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => (
      { top, height } as DOMRect
    ));
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => { frames.delete(id); });
    vi.stubGlobal('IntersectionObserver', vi.fn((callback: IntersectionObserverCallback) => {
      intersect = (visible) => act(() => callback(
        [{ isIntersecting: visible } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ));
      return { observe: vi.fn(), disconnect };
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('batches scroll events and stops updating when the Hero leaves the viewport', () => {
    render(<Hero />);
    const hero = screen.getByTestId('hero');
    fireEvent.scroll(window);
    expect(frames.size).toBe(0);

    intersect(true);
    flush();
    expect(hero.style.getPropertyValue('--hero-wave-progress')).toBe('0.2000');
    top = -300;
    fireEvent.scroll(window);
    fireEvent.scroll(window);
    fireEvent.scroll(window);
    expect(frames.size).toBe(1);
    flush();
    expect(hero.style.getPropertyValue('--hero-wave-progress')).toBe('0.5000');

    intersect(false);
    top = -900;
    fireEvent.scroll(window);
    expect(frames.size).toBe(0);
    intersect(true);
    flush();
    expect(hero.style.getPropertyValue('--hero-wave-progress')).toBe('1.0000');
  });

  it('keeps the graphic static and responds to reduced motion changes', () => {
    const { rerender } = render(<Hero reducedMotion />);
    expect(IntersectionObserver).not.toHaveBeenCalled();
    fireEvent.scroll(window);
    expect(frames.size).toBe(0);

    rerender(<Hero />);
    intersect(true);
    top = -300;
    flush();
    const hero = screen.getByTestId('hero');
    expect(hero.style.getPropertyValue('--hero-wave-progress')).toBe('0.5000');

    rerender(<Hero reducedMotion />);
    expect(hero.style.getPropertyValue('--hero-wave-progress')).toBe('');
    expect(disconnect).toHaveBeenCalledOnce();
    fireEvent.scroll(window);
    expect(frames.size).toBe(0);
  });

  it('tracks the visible wave band in a tall Hero, reverses on scroll up and recalculates on resize', () => {
    height = 1800;
    render(<Hero />);
    const hero = screen.getByTestId('hero');
    intersect(true);
    flush();
    expect(hero.style.getPropertyValue('--hero-wave-progress')).toBe('0.0000');

    for (const [position, expected] of [
      [-800, '0.0000'],
      [-1300, '0.5000'],
      [-1800, '1.0000'],
      [-1300, '0.5000'],
    ] as const) {
      top = position;
      fireEvent.scroll(window);
      flush();
      expect(hero.style.getPropertyValue('--hero-wave-progress')).toBe(expected);
    }

    viewportHeight = 600;
    fireEvent.resize(window);
    flush();
    expect(hero.style.getPropertyValue('--hero-wave-progress')).toBe('0.3750');
  });

  it('cancels pending work on unmount and supports browsers without IntersectionObserver', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { unmount } = render(<Hero />);
    expect(frames.size).toBe(1);
    top = 300;
    flush();
    expect(screen.getByTestId('hero').style.getPropertyValue('--hero-wave-progress')).toBe('0.0000');
    fireEvent.scroll(window);
    expect(frames.size).toBe(1);
    unmount();
    expect(frames.size).toBe(0);
    fireEvent.scroll(window);
    expect(frames.size).toBe(0);
  });
});
