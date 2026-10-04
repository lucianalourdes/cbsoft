import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { VolunteersPage } from './VolunteersPage';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

describe('VolunteersPage', () => {
  it('renders the 2027 volunteer call with dates still to be announced', () => {
    const { container } = render(
      <MemoryRouter>
        <VolunteersPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Chamada para Voluntários' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: 'Benefícios' })).toBeTruthy();
    for (const name of ['Responsabilidades', 'Requisitos para participação', 'Procedimentos para inscrição']) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeTruthy();
    }
    // Both forms stay unlinked until the 2027 URLs exist.
    expect(screen.getAllByText('link a ser divulgado')).toHaveLength(2);
    expect(container.querySelector('a[href*="forms.gle"]')).toBeNull();
    // Sidebar + "Datas importantes" section, two milestones each.
    expect(screen.getAllByText('A definir')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 2, name: 'Coordenação de voluntários' })).toBeTruthy();
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();

    const text = container.textContent ?? '';
    expect(text).toMatch(/CBSoft 2027/);
    expect(text).toMatch(/encontrá-lo em Belo Horizonte!/);
    expect(text).not.toMatch(/2026|São Paulo|USP|dia 7/);
  });
});
