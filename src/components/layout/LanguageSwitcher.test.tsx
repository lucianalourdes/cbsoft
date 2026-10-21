import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n, { LANG_STORAGE_KEY } from '@/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

describe('LanguageSwitcher', () => {
  it('shows only the flag of the language available on click', async () => {
    render(<LanguageSwitcher />);
    const group = screen.getByRole('group', { name: 'Selecionar idioma' });
    const button = within(group).getByRole('button', { name: 'English — EN' });
    expect(within(group).getAllByRole('button')).toHaveLength(1);
    expect(button.textContent).toBe('');
    expect(button.hasAttribute('aria-pressed')).toBe(false);
    const flag = button.querySelector('img')!;
    expect(flag.getAttribute('src')).toBe(`${import.meta.env.BASE_URL}assets/icons/flag-gb.svg`);
    expect(flag.getAttribute('alt')).toBe('');
    expect(flag.getAttribute('aria-hidden')).toBe('true');

    button.focus();
    await act(async () => {
      fireEvent.click(button);
    });

    const portuguese = screen.getByRole('button', { name: 'Português (Brasil) — PT' });
    expect(portuguese.querySelector('img')!.getAttribute('src')).toBe(
      `${import.meta.env.BASE_URL}assets/icons/flag-br.svg`,
    );
    expect(document.activeElement).toBe(portuguese);
  });

  it('syncs desktop/mobile flags, persistence and document language in both directions', async () => {
    render(<><LanguageSwitcher /><LanguageSwitcher /></>);
    await act(async () => {
      fireEvent.click(screen.getAllByRole('button', { name: 'English — EN' })[0]);
    });
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    for (const group of screen.getAllByRole('group', { name: 'Select language' })) {
      expect(within(group).getAllByRole('button')).toHaveLength(1);
      const button = within(group).getByRole('button', { name: 'Português (Brasil) — PT' });
      expect(button.querySelector('img')!.getAttribute('src')).toContain('flag-br.svg');
    }

    await act(async () => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Português (Brasil) — PT' })[1]);
    });
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('pt');
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(screen.getAllByRole('group', { name: 'Selecionar idioma' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'English — EN' })).toHaveLength(2);
  });

  it('normalizes regional languages and preserves wrapper props', async () => {
    await i18n.changeLanguage('en-US');
    const { container } = render(
      <LanguageSwitcher className="custom-switcher" groupAriaLabel="Custom languages" />,
    );
    expect(screen.getByRole('group', { name: 'Custom languages' })).toBeTruthy();
    expect(container.querySelector('.language-options.custom-switcher')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Português (Brasil) — PT' })).toBeTruthy();

    await act(async () => {
      await i18n.changeLanguage('pt-BR');
    });
    expect(screen.getByRole('button', { name: 'English — EN' })).toBeTruthy();
  });
});
