import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n, { LANG_STORAGE_KEY } from '@/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

describe('LanguageSwitcher', () => {
  it('pairs each visible code with a decorative local flag and an explicit language name', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('group', { name: 'Selecionar idioma' })).toBeTruthy();
    for (const [name, code, country] of [
      ['Português (Brasil) — PT', 'PT', 'br'],
      ['English — EN', 'EN', 'gb'],
    ]) {
      const button = screen.getByRole('button', { name });
      expect(within(button).getByText(code)).toBeTruthy();
      const flag = button.querySelector('img')!;
      expect(flag.getAttribute('src')).toBe(`${import.meta.env.BASE_URL}assets/icons/flag-${country}.svg`);
      expect(flag.getAttribute('alt')).toBe('');
      expect(flag.getAttribute('aria-hidden')).toBe('true');
    }
  });

  it('keeps desktop/mobile selections, persistence and document language in sync in both directions', async () => {
    render(<><LanguageSwitcher /><LanguageSwitcher /></>);
    await act(async () => {
      fireEvent.click(screen.getAllByRole('button', { name: 'English — EN' })[0]);
    });
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    for (const group of screen.getAllByRole('group', { name: 'Select language' })) {
      expect(within(group).getByRole('button', { name: 'English — EN' }).getAttribute('aria-pressed')).toBe('true');
      expect(within(group).getByRole('button', { name: 'Português (Brasil) — PT' }).getAttribute('aria-pressed')).toBe('false');
    }
    await act(async () => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Português (Brasil) — PT' })[1]);
    });
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('pt');
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(screen.getAllByRole('group', { name: 'Selecionar idioma' })).toHaveLength(2);
  });
});
