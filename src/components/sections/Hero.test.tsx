import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import i18n from '@/i18n';
import { HERO_SLIDE_INTERVAL } from '@/hooks/useHeroCarousel';
import { Hero } from './Hero';

let motion: MediaQueryList;
let motionChange: () => void;

beforeEach(async () => {
  await i18n.changeLanguage('pt');
  vi.useFakeTimers();
  motion = {
    matches: false,
    addEventListener: vi.fn((_, listener) => { motionChange = listener as () => void; }),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList;
  vi.spyOn(window, 'matchMedia').mockReturnValue(motion);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function advance() {
  act(() => vi.advanceTimersByTime(HERO_SLIDE_INTERVAL));
}

function currentPhoto() {
  return document.querySelector('.home-hero__indicator[aria-current="true"]')?.getAttribute('aria-label');
}

function photos() {
  return document.querySelectorAll<HTMLImageElement>('.home-hero__photo');
}

describe('Hero carousel', () => {
  it('prioritizes only the first decorative image and preserves the timer and CTAs', () => {
    render(<Hero />);
    expect(photos()).toHaveLength(1);
    expect(photos()[0].getAttribute('src')).toContain('praca-liberdade.jpg');
    expect(photos()[0].getAttribute('fetchpriority')).toBe('high');
    expect(photos()[0].getAttribute('loading')).toBe('eager');
    expect(photos()[0].alt).toBe('');
    expect(photos()[0].parentElement?.getAttribute('aria-hidden')).toBe('true');
    expect(screen.getByRole('timer')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Saiba mais' }).getAttribute('href')).toBe('#sobre');
    expect(screen.getByRole('link', { name: 'Seja nosso patrocinador' }).getAttribute('href')).toBe('#patrocinio');
  });

  it('advances automatically through all three photos and wraps around', () => {
    render(<Hero />);
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 2');
    expect(photos()[1].getAttribute('src')).toContain('praca-liberdade-2.jpg');
    expect(photos()[1].getAttribute('loading')).toBe('lazy');
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 3');
    expect(photos()[2].getAttribute('src')).toContain('praca-liberdade-3.jpg');
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 1');
  });

  it('supports previous, next, direct selection and keyboard arrows', () => {
    render(<Hero />);
    fireEvent.click(screen.getByRole('button', { name: 'Foto anterior' }));
    expect(currentPhoto()).toBe('Mostrar foto 3');
    fireEvent.click(screen.getByRole('button', { name: 'Próxima foto' }));
    expect(currentPhoto()).toBe('Mostrar foto 1');
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar foto 2' }));
    expect(currentPhoto()).toBe('Mostrar foto 2');
    const next = screen.getByRole('button', { name: 'Próxima foto' });
    fireEvent.keyDown(next, { key: 'ArrowRight' });
    expect(currentPhoto()).toBe('Mostrar foto 3');
    fireEvent.keyDown(next, { key: 'ArrowLeft' });
    expect(currentPhoto()).toBe('Mostrar foto 2');
  });

  it('keeps the previous image visible until the selected photo loads', () => {
    render(<Hero />);
    fireEvent.load(photos()[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Próxima foto' }));
    expect(photos()[0].classList.contains('is-visible')).toBe(true);
    expect(photos()[1].classList.contains('is-visible')).toBe(false);
    fireEvent.load(photos()[1]);
    expect(photos()[1].classList.contains('is-visible')).toBe(true);
    expect(photos()[0].classList.contains('is-visible')).toBe(false);
  });

  it('pauses while hovering the hero, then waits a full interval before resuming', () => {
    render(<Hero />);
    const hero = screen.getByRole('region', { name: 'Faltam' });
    fireEvent.mouseEnter(hero);
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 1');
    fireEvent.mouseLeave(hero);
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 2');
  });

  it('pauses while a CTA or control has focus, including focus moving inside the hero', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: 'Saiba mais' });
    const next = screen.getByRole('button', { name: 'Próxima foto' });
    fireEvent.focus(link);
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 1');
    fireEvent.blur(link, { relatedTarget: next });
    fireEvent.focus(next);
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 1');
    fireEvent.blur(next, { relatedTarget: document.body });
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 2');
  });

  it('allows an explicit pause and resume', () => {
    render(<Hero />);
    fireEvent.click(screen.getByRole('button', { name: 'Pausar' }));
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 1');
    fireEvent.click(screen.getByRole('button', { name: 'Reproduzir' }));
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 2');
  });

  it('pauses during touch or pointer interaction and resumes after release', () => {
    render(<Hero />);
    fireEvent.pointerDown(screen.getByRole('region', { name: 'Faltam' }));
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 1');
    fireEvent.pointerUp(window);
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 2');
  });

  it('disables autoplay for reduced motion while preserving manual navigation', () => {
    Object.defineProperty(motion, 'matches', { value: true, configurable: true });
    render(<Hero />);
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 1');
    expect((screen.getByRole('button', { name: 'Reproduzir' }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Próxima foto' }));
    expect(currentPhoto()).toBe('Mostrar foto 2');
    Object.defineProperty(motion, 'matches', { value: false });
    act(() => motionChange());
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 3');
  });

  it('pauses in hidden tabs and resumes when visible', () => {
    render(<Hero />);
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    fireEvent(document, new Event('visibilitychange'));
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 1');
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    fireEvent(document, new Event('visibilitychange'));
    advance();
    expect(currentPhoto()).toBe('Mostrar foto 2');
  });

  it('skips a broken photo and keeps the countdown visible', () => {
    render(<Hero />);
    fireEvent.click(screen.getByRole('button', { name: 'Próxima foto' }));
    fireEvent.error(photos()[1]);
    expect(currentPhoto()).toBe('Mostrar foto 3');
    expect((screen.getByRole('button', { name: 'Mostrar foto 2' }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByRole('timer')).toBeTruthy();
  });

  it('translates controls into English', async () => {
    render(<Hero />);
    await act(async () => { await i18n.changeLanguage('en'); });
    expect(screen.getByRole('button', { name: 'Previous photo' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Next photo' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Pause' })).toBeTruthy();
  });
});
