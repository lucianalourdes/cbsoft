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
  it('renders the header, the four symposia cards and the activity cards', () => {
    const { container } = renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Sobre o CBSoft' })).toBeTruthy();

    expect(container.querySelectorAll('.about-facts .about-fact')).toHaveLength(4);
    expect(container.querySelectorAll('.about-grid--2 .about-card')).toHaveLength(4);
    expect(container.querySelectorAll('.about-grid--3 .about-actcard')).toHaveLength(4);

    expect(screen.getByText(/XLI Simpósio Brasileiro de Engenharia de Software/)).toBeTruthy();
    expect(screen.getByText(/XII Simpósio Brasileiro de Teste de Software/)).toBeTruthy();
    expect(screen.getByText('Sessões técnicas')).toBeTruthy();
    expect(screen.getByRole('link', { name: /Voltar para a página inicial/ })).toBeTruthy();
  });

  it('makes the 18th edition prominent and keeps every date "A definir"', () => {
    const { container } = renderPage();
    expect(screen.getByText('18ª')).toBeTruthy();
    expect(screen.getByText('18ª edição')).toBeTruthy();
    expect(screen.getByText('XVIII edição do CBSoft')).toBeTruthy();
    expect(screen.getAllByText('A definir').length).toBeGreaterThanOrEqual(2);

    const text = container.textContent ?? '';
    expect(text).not.toMatch(/27 de setembro|1º de outubro|1\.? de outubro/i);
    expect(text).not.toMatch(/\bde 27\b|\boutubro de 2027\b/i);
  });
});
