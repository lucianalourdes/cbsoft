import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { AboutPage } from './AboutPage';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

function renderPage() {
  return render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>,
  );
}

describe('AboutPage', () => {
  it('renders a single "Sobre o CBSoft" section with the four symposia', () => {
    const { container } = renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Sobre o CBSoft' })).toBeTruthy();

    const items = container.querySelectorAll('.about-symposia li');
    expect(items).toHaveLength(4);
    expect(items[0].textContent).toMatch(/^XLI Simpósio Brasileiro de Engenharia de Software, .*;$/);
    expect(items[2].textContent).toMatch(/; e$/);
    expect(items[3].textContent).toMatch(/^XII Simpósio Brasileiro de Teste de Software.*\.$/);

    expect(screen.getByText(/A programação do CBSoft incluirá/)).toBeTruthy();
  });

  it('renders the visual identity section with the photo and logo', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Identidade Visual do CBSOFT 2027' }),
    ).toBeTruthy();
    expect(screen.getByAltText(/Edifício Niemeyer/)).toBeTruthy();
    expect(screen.getByAltText(/Logo oficial do CBSOFT'27/)).toBeTruthy();
  });

  it('renders the "Sobre a SBC" section with working SBC links', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 2, name: 'Sobre a SBC' })).toBeTruthy();
    expect(screen.getByText(/fundada em julho de 1978/)).toBeTruthy();
    expect(
      screen.getByRole('link', { name: 'listas de e-mail das Comissões Especiais (CE)' }).getAttribute('href'),
    ).toBe('https://www.sbc.org.br/comissoes-especiais/');
    expect(screen.getByRole('link', { name: 'clique aqui' }).getAttribute('href')).toBe(
      'https://centraldesistemas.sbc.org.br/mom',
    );
  });

  it('presents the 2027 edition without confirmed dates', () => {
    const { container } = renderPage();
    const text = container.textContent ?? '';
    expect(text).toMatch(/XVIII edição do CBSoft/);
    expect(text).toMatch(/Belo Horizonte/);
    expect(text).not.toMatch(/27 de setembro|1º de outubro|outubro de 2027/i);
  });
});
