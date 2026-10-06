import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { App } from '@/App';
import { HEADER_MENUS } from '@/data/headerMenu';
import { HeaderMegaMenu } from '@/components/layout/HeaderMegaMenu';
import i18n from '@/i18n';
import { PreviousEditionsPage } from './PreviousEditionsPage';

beforeEach(async () => {
  window.history.replaceState(null, '', import.meta.env.BASE_URL);
  await i18n.changeLanguage('pt');
});

describe('PreviousEditionsPage', () => {
  it('shows every edition from 2026 to 2010 in descending order, with archived destinations', () => {
    render(<PreviousEditionsPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Edições Anteriores' })).toBeTruthy();
    const cards = screen.getAllByRole('link');
    expect(cards).toHaveLength(17);
    cards.forEach((card, index) => {
      expect(within(card).getByRole('heading', { name: `CBSoft ${2026 - index}` })).toBeTruthy();
      expect(card.getAttribute('target')).toBe('_blank');
      expect(card.getAttribute('rel')).toBe('noopener noreferrer');
    });
    expect(cards[0].getAttribute('href')).toBe('https://cbsoft.sbc.org.br/2026/');
    expect(cards[4].getAttribute('href')).toBe('https://cbsoft2022.facom.ufu.br/');
    expect(cards[8].getAttribute('href')).toBe('http://cbsoft2018.icmc.usp.br/#/cbsoft');
    expect(cards[16].getAttribute('href')).toBe('http://wiki.dcc.ufba.br/CBSOFT');
    expect(screen.getByText('São Paulo, São Paulo')).toBeTruthy();
    expect(screen.getByText('Campo Grande, Mato Grosso do Sul')).toBeTruthy();
    expect(screen.getAllByText('(Online)')).toHaveLength(3);
  });

  it('uses local images under the configured deployment base and keeps a usable card when an image fails', () => {
    const { container } = render(<PreviousEditionsPage />);
    const image = container.querySelector('img[src*="cbsoft2026"]')!;
    expect(image.getAttribute('src')).toBe(`${import.meta.env.BASE_URL}assets/images/previous-editions/cbsoft2026.svg`);
    fireEvent.error(image);
    expect(container.querySelector('img[src*="cbsoft2026"]')).toBeNull();
    const card = screen.getByRole('link', { name: /CBSoft 2026/ });
    expect(card.getAttribute('href')).toBe('https://cbsoft.sbc.org.br/2026/');
    expect(card.querySelector('.previous-edition__fallback')?.textContent).toBe('CBSoft 2026');
  });

  it('supports opening the route directly and translates content and metadata without changing the URL', async () => {
    window.history.replaceState(null, '', `${import.meta.env.BASE_URL}edicoes-anteriores`);
    const meta = document.createElement('meta');
    meta.name = 'description';
    document.head.append(meta);
    try {
      render(<App />);
      expect(document.title).toBe("Edições Anteriores - CBSOFT'27");
      await act(async () => { await i18n.changeLanguage('en'); });
      expect(screen.getByRole('heading', { level: 1, name: 'Previous Editions' })).toBeTruthy();
      expect(screen.getAllByText('Visit edition')).toHaveLength(17);
      expect(document.title).toBe("Previous Editions - CBSOFT'27");
      expect(meta.content).toContain('2010 to 2026');
      expect(window.location.pathname).toBe(`${import.meta.env.BASE_URL}edicoes-anteriores`);
    } finally {
      meta.remove();
    }
  });

  it('navigates from CBSOFT in the header and closes its menu', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: "CBSOFT'27" }));
    fireEvent.click(screen.getByRole('link', { name: /Edições anteriores/i }));
    expect(screen.getByRole('heading', { level: 1, name: 'Edições Anteriores' })).toBeTruthy();
    expect(window.location.pathname).toBe(`${import.meta.env.BASE_URL}edicoes-anteriores`);
    expect(screen.getByRole('button', { name: "CBSOFT'27" }).getAttribute('aria-expanded')).toBe('false');
  });

  it('offers the same dedicated route in the mobile CBSOFT menu', () => {
    render(
      <MemoryRouter>
        <HeaderMegaMenu id="cbsoft" menu={HEADER_MENUS.cbsoft} onNavigate={() => {}} mobile />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: /Edições anteriores/i }).getAttribute('href')).toBe('/edicoes-anteriores');
  });
});
