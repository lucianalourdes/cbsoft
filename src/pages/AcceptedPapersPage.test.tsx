import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { AcceptedPapersPage } from './AcceptedPapersPage';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/artigos-aceitos" element={<AcceptedPapersPage />} />
        <Route path="/sbes/:track/artigos-aceitos" element={<AcceptedPapersPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('AcceptedPapersPage', () => {
  it('renders the shared page used by every menu link', () => {
    renderAt('/artigos-aceitos');
    expect(screen.getByRole('heading', { level: 1, name: 'Artigos Aceitos' })).toBeTruthy();
    expect(screen.getByText('CBSoft 2027')).toBeTruthy();
    expect(screen.getByText(/será divulgada após a notificação/)).toBeTruthy();
  });

  it('shows the track and a pending notice while no papers are listed', () => {
    renderAt('/sbes/educacao/artigos-aceitos');
    expect(screen.getByRole('heading', { level: 1, name: 'Artigos Aceitos' })).toBeTruthy();
    expect(screen.getByText(/Trilha de Educação/)).toBeTruthy();
    expect(screen.getByText(/será divulgada após a notificação/)).toBeTruthy();
    // Links to the six other tracks.
    expect(screen.getByRole('link', { name: 'Trilha de Pesquisa' }).getAttribute('href')).toBe(
      '/sbes/pesquisa/artigos-aceitos',
    );
    expect(screen.getAllByRole('link')).toHaveLength(6);
  });

  it('handles an unknown track', () => {
    renderAt('/sbes/inexistente/artigos-aceitos');
    expect(screen.getByRole('heading', { level: 1, name: 'Trilha não encontrada.' })).toBeTruthy();
  });
});
