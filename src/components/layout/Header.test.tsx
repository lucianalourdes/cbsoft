import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { Header } from './Header';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

function renderHeader(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><Header /></MemoryRouter>);
}

describe('Header current section', () => {
  it.each([
    ['/', "CBSOFT'27"],
    ['/local#mapa', "CBSOFT'27"],
    ['/sbes/educacao/chamada', 'SBES'],
    ['/sbes/pesquisa/artigos-aceitos', 'SBES'],
    ['/sblp/chamada', 'SBLP'],
    ['/sbcars/chamada', 'SBCARS'],
    ['/sast/chamada', 'SAST'],
    ['/workshops/chamada', 'WORKSHOPS'],
  ])('marks only the current section at %s', (path, label) => {
    const { container } = renderHeader(path);
    const current = screen.getByRole('button', { name: label });
    expect(current.classList.contains('is-current')).toBe(true);
    expect(current.getAttribute('aria-current')).toBe('location');
    expect(container.querySelectorAll('[aria-current]')).toHaveLength(1);
    expect(current.getAttribute('aria-expanded')).toBe('false');
  });

  it('keeps the current symposium highlighted when opening a different menu', () => {
    renderHeader('/sast/chamada');
    const current = screen.getByRole('button', { name: 'SAST' });
    const other = screen.getByRole('button', { name: 'SBLP' });
    fireEvent.click(other);
    expect(current.getAttribute('aria-current')).toBe('location');
    expect(other.hasAttribute('aria-current')).toBe(false);
    fireEvent.keyDown(other, { key: 'Escape' });
    expect(other.getAttribute('aria-expanded')).toBe('false');
    expect(current.classList.contains('is-current')).toBe(true);
  });

  it('updates the highlight after navigation and when returning home', () => {
    renderHeader('/sast/chamada');
    fireEvent.click(screen.getByRole('button', { name: 'SBLP' }));
    fireEvent.click(screen.getByRole('link', { name: /Chamada de Trabalhos/ }));
    expect(screen.getByRole('button', { name: 'SBLP' }).getAttribute('aria-current')).toBe('location');
    expect(screen.getByRole('button', { name: 'SAST' }).hasAttribute('aria-current')).toBe(false);
    fireEvent.click(screen.getByRole('link', { name: /página inicial/ }));
    expect(screen.getByRole('button', { name: "CBSOFT'27" }).getAttribute('aria-current')).toBe('location');
  });

  it('keeps the same current section on mobile after navigating', () => {
    renderHeader('/sbes/educacao/chamada');
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    const menu = screen.getByRole('navigation', { name: 'Navegação móvel' });
    expect(within(menu).getByRole('button', { name: 'SBES' }).getAttribute('aria-current')).toBe('location');
    fireEvent.click(within(menu).getByRole('button', { name: 'SBCARS' }));
    fireEvent.click(within(menu).getByRole('link', { name: /Chamada de Trabalhos/ }));
    expect(screen.queryByRole('navigation', { name: 'Navegação móvel' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    const updatedMenu = screen.getByRole('navigation', { name: 'Navegação móvel' });
    expect(within(updatedMenu).getByRole('button', { name: 'SBCARS' }).getAttribute('aria-current')).toBe('location');
    expect(within(updatedMenu).getByRole('button', { name: 'SBES' }).hasAttribute('aria-current')).toBe(false);
  });
});
