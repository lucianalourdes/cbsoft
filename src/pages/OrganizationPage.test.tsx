import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import i18n from '@/i18n';
import { App } from '@/App';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

afterEach(() => {
  window.history.replaceState(null, '', import.meta.env.BASE_URL);
  vi.restoreAllMocks();
});

describe('OrganizationPage', () => {
  it('opens from the CBSOFT\'27 menu and shows partners and committee', () => {
    window.history.replaceState(null, '', import.meta.env.BASE_URL);
    render(<App />);
    fireEvent.click(screen.getAllByRole('button', { name: "CBSOFT'27" })[0]);
    fireEvent.click(screen.getByRole('link', { name: /^Organização/ }));
    expect(window.location.pathname).toBe(`${import.meta.env.BASE_URL}organizacao`);
    expect(screen.getByRole('heading', { level: 1, name: 'Organização' })).toBeTruthy();
    expect(screen.getByText('Realização')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Quem organiza o CBSOFT 2027' })).toBeTruthy();
  });

  it('renders on direct access in English', async () => {
    await act(async () => { await i18n.changeLanguage('en'); });
    window.history.replaceState(null, '', `${import.meta.env.BASE_URL}organizacao`);
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Organization' })).toBeTruthy();
    expect(screen.getByText('Promoted by')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Who is organizing CBSOFT 2027' })).toBeTruthy();
  });

  it('scrolls to the committee when opened with #comite', () => {
    const original = Element.prototype.scrollIntoView;
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    try {
      window.history.replaceState(null, '', `${import.meta.env.BASE_URL}organizacao#comite`);
      render(<App />);
      expect(scrollIntoView).toHaveBeenCalled();
    } finally {
      Element.prototype.scrollIntoView = original;
    }
  });
});
