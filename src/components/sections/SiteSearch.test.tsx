import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { SiteSearch } from './SiteSearch';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

function renderSearch() {
  render(
    <MemoryRouter>
      <SiteSearch />
    </MemoryRouter>,
  );
  return screen.getByPlaceholderText('O que você está procurando?') as HTMLInputElement;
}

describe('SiteSearch', () => {
  it('renders the heading and shows no results until the user types', () => {
    renderSearch();
    expect(screen.getByRole('heading', { level: 2, name: 'Não encontrou o que procurava?' })).toBeTruthy();
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('matches ignoring accents and links to the page', () => {
    const input = renderSearch();
    fireEvent.change(input, { target: { value: 'inscricao' } });
    const link = screen.getByRole('link', { name: /Inscrições/ });
    expect(link.getAttribute('href')).toBe('/inscricoes');
  });

  it('links home sections by anchor and reports empty searches', () => {
    const input = renderSearch();
    fireEvent.change(input, { target: { value: 'palestras' } });
    expect(screen.getByRole('link', { name: /Agenda/ }).getAttribute('href')).toBe('#agenda');

    fireEvent.change(input, { target: { value: 'xyzabc' } });
    expect(screen.getByText('Nenhum resultado para “xyzabc”.')).toBeTruthy();
  });

  it('focuses the field with Ctrl/⌘ + K', () => {
    const input = renderSearch();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(document.activeElement).toBe(input);
  });
});
