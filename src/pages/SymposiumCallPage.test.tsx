import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { SBES_TRACK_CALLS, SYMPOSIUM_CALLS, type SymposiumCall } from '@/data/symposiumCalls';
import type { SymposiumId } from '@/data/symposia';
import type { SbesTrackId } from '@/data/sbesTracks';
import { SymposiumCallPage } from './SymposiumCallPage';

beforeEach(async () => {
  await act(async () => { await i18n.changeLanguage('pt'); });
});

const memberCount = (call: SymposiumCall) =>
  call.committees.reduce((total, committee) => total + committee.members.length, 0);

function renderPage(id: SymposiumId, track?: SbesTrackId) {
  return render(
    <MemoryRouter>
      <SymposiumCallPage id={id} track={track} />
    </MemoryRouter>,
  );
}

describe('SymposiumCallPage', () => {
  it('shows the SAST call with its sections, dates and committee', () => {
    const call = SYMPOSIUM_CALLS.sast!;
    renderPage('sast');
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Simpósio Brasileiro de Teste de Software Sistemático e Automatizado (SAST)',
      }),
    ).toBeTruthy();
    for (const section of call.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title.pt })).toBeTruthy();
    }
    expect(screen.getByRole('heading', { level: 2, name: 'Comitê de Programa' })).toBeTruthy();
    expect(screen.getAllByText('A definir')).toHaveLength(call.milestones.length);
    expect(screen.queryByText('Roberta Coelho')).toBeNull();
    expect(screen.getAllByText('xxxxxx')).toHaveLength((call.chairs.length + memberCount(call)) * 2);
    expect(
      screen.getByRole('link', { name: /Código de Conduta para Autores/ }).getAttribute('href'),
    ).toBe('https://sol.sbc.org.br/index.php/indice/conduta');
  });

  it('shows the SBCARS call with bold labels and no 2026 leftovers', () => {
    const call = SYMPOSIUM_CALLS.sbcars!;
    const { container } = renderPage('sbcars');
    for (const section of call.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title.pt })).toBeTruthy();
    }
    expect(screen.getByText('Artigos de Dados:').tagName).toBe('STRONG');
    expect(screen.getByRole('link', { name: 'Anonymous GitHub' }).getAttribute('href')).toBe(
      'https://anonymous.4open.science/',
    );
    expect(container.textContent).not.toMatch(/2026|São Paulo/);
  });

  it('switches the call text to English', async () => {
    await act(async () => { await i18n.changeLanguage('en'); });
    renderPage('sast');
    expect(screen.getByRole('heading', { level: 2, name: 'Topics of Interest' })).toBeTruthy();
    expect(screen.getByText('AI-assisted software testing')).toBeTruthy();
  });

  it('shows the SBLP call with its dates note and no named contact', () => {
    const call = SYMPOSIUM_CALLS.sblp!;
    const { container } = renderPage('sblp');
    for (const section of call.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title.pt })).toBeTruthy();
    }
    expect(screen.getByText(call.datesNote!.pt)).toBeTruthy();
    expect(container.textContent).not.toMatch(/2026|Anderson|afsilva/);
  });

  it('shows the SBES Research Track call under the track name', () => {
    const call = SBES_TRACK_CALLS.research!;
    const { container } = renderPage('sbes', 'research');
    expect(screen.getByRole('heading', { level: 1, name: 'Trilha de Pesquisa' })).toBeTruthy();
    for (const section of call.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title.pt })).toBeTruthy();
    }
    expect(container.textContent).toContain('41st Brazilian Symposium on Software Engineering');
    expect(container.textContent).not.toMatch(/São Paulo|forms\.gle|Monalessa/);
  });

  it('shows the SBES Education Track call with the shared SBES sections', () => {
    const call = SBES_TRACK_CALLS.education!;
    const { container } = renderPage('sbes', 'education');
    expect(screen.getByRole('heading', { level: 1, name: 'Trilha de Educação' })).toBeTruthy();
    for (const section of call.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title.pt })).toBeTruthy();
    }
    expect(container.textContent).toContain('A Trilha de Educação do SBES 2027 adota um processo de revisão duplo-anônimo');
    expect(container.textContent).not.toMatch(/2026|São Paulo|Awdren|Carla Bezerra/);
  });

  it('shows the SBES Ideas Track call', () => {
    const call = SBES_TRACK_CALLS.ideas!;
    const { container } = renderPage('sbes', 'ideas');
    for (const section of call.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title.pt })).toBeTruthy();
    }
    expect(container.textContent).toContain('no máximo 6 (seis) páginas');
    expect(container.textContent).not.toMatch(/São Paulo|SBES 2025|Thelma|Cleidson/);
  });

  it('shows the SBES Tools Track call without the anonymous option', () => {
    const call = SBES_TRACK_CALLS.tools!;
    const { container } = renderPage('sbes', 'tools');
    for (const section of call.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title.pt })).toBeTruthy();
    }
    expect(screen.getByText('\\documentclass[sigconf]{acmart}')).toBeTruthy();
    expect(container.textContent).not.toMatch(/sigconf,anonymous|São Paulo|SBES 2026|Edna/);
  });

  it('shows the SBES Industry Track call with three placeholder chairs', () => {
    const call = SBES_TRACK_CALLS.industry!;
    const { container } = renderPage('sbes', 'industry');
    for (const section of call.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title.pt })).toBeTruthy();
    }
    expect(screen.getByText(call.datesNote!.pt)).toBeTruthy();
    expect(screen.getAllByText('xxxxxx')).toHaveLength((call.chairs.length + memberCount(call)) * 2);
    expect(container.textContent).not.toMatch(/2026|Aniche|Alura|Nubank/);
  });

  it('shows the CTIC-ES call without an organisation card or named organisers', () => {
    const call = SBES_TRACK_CALLS.ctic!;
    const { container } = renderPage('sbes', 'ctic');
    for (const section of call.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title.pt })).toBeTruthy();
    }
    expect(screen.queryByRole('heading', { name: 'Organização' })).toBeNull();
    expect(container.textContent).toContain('VIII CTIC-ES');
    expect(container.textContent).not.toMatch(/VII CTIC|Accioly|phyllipe|setembro de 2026/);
  });

  it('shows the CTD-ES call with its two evaluation committees', () => {
    const call = SBES_TRACK_CALLS.ctd!;
    const { container } = renderPage('sbes', 'ctd');
    for (const section of call.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.title.pt })).toBeTruthy();
    }
    expect(screen.getByRole('heading', { level: 2, name: 'Comitê Avaliador das Dissertações' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: 'Comitê Avaliador das Teses' })).toBeTruthy();
    expect(screen.getAllByText('xxxxxx')).toHaveLength((call.chairs.length + memberCount(call)) * 2);
    expect(container.textContent).not.toMatch(/2025|SBES 2026|\bII Mostra|Felizardo|Travassos/);
  });

  it('announces a call that is not out yet', () => {
    renderPage('sbes');
    expect(screen.getByText('A chamada de trabalhos do SBES 2027 será divulgada em breve.')).toBeTruthy();
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
  });
});
