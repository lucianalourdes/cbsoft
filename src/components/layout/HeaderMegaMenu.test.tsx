import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { HEADER_MENUS } from '@/data/headerMenu';
import { HeaderMegaMenu } from './HeaderMegaMenu';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

function renderSbes(mobile = false) {
  return render(
    <MemoryRouter>
      <HeaderMegaMenu id="sbes" menu={HEADER_MENUS.sbes} onNavigate={() => {}} mobile={mobile} />
    </MemoryRouter>,
  );
}

describe('HeaderMegaMenu — SBES tracks', () => {
  it('lists the seven tracks without the special 40-year track', () => {
    const { container } = renderSbes();
    expect(container.querySelectorAll('.header-mega-menu__group-trigger')).toHaveLength(7);
    expect(container.textContent).not.toMatch(/Especial|40 Anos/);
  });

  it('opens a flyout with the call and accepted papers of the hovered track', () => {
    renderSbes();
    const trigger = screen.getByRole('button', { name: /Trilha de Educação/ });
    fireEvent.mouseEnter(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    const flyout = screen.getByRole('group', { name: 'Trilha de Educação' });
    const links = flyout.querySelectorAll('a');
    expect(links[0].textContent).toBe('Chamada de Trabalhos');
    expect(links[0].getAttribute('href')).toBe('/workshops/chamada');
    expect(links[1].getAttribute('href')).toBe('/artigos-aceitos');

    fireEvent.mouseEnter(screen.getByRole('link', { name: /Programação/ }));
    expect(screen.queryByRole('group')).toBeNull();
  });

  it('expands the links inline on mobile', () => {
    renderSbes(true);
    fireEvent.click(screen.getByRole('button', { name: /Trilha de Pesquisa/ }));
    expect(screen.getByRole('link', { name: 'Artigos Aceitos' }).getAttribute('href')).toBe('/artigos-aceitos');
  });
});
