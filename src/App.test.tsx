import { act, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from './i18n';
import { App } from './App';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

describe('App', () => {
  it('renders every section anchor the nav points to', () => {
    const { container } = render(<App />);
    for (const id of [
      'agenda',
      'sobre',
      'eventos',
      'cfp',
      'inscricoes',
      'comite',
      'patrocinio',
    ]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it('shows Portuguese content by default and switches to English', async () => {
    render(<App />);
    expect(
      screen.getAllByText(
        'O principal fórum de Engenharia e Desenvolvimento de Software do Brasil',
      ).length,
    ).toBeGreaterThan(0);

    await act(async () => {
      await i18n.changeLanguage('en');
    });
    expect(
      await screen.findAllByText(
        'The main forum for Software Engineering & Development in Brazil',
      ),
    ).not.toHaveLength(0);
    expect(document.documentElement.lang).toBe('en');
  });

  it('renders the four registration categories with fees pending', () => {
    render(<App />);
    const registration = document.querySelector('#inscricoes') as HTMLElement;
    expect(within(registration).getByText('Estudante de Graduação (sócio SBC)')).toBeTruthy();
    expect(within(registration).getAllByText('A definir').length).toBeGreaterThanOrEqual(12);
  });

  it('renders the hero countdown timer', () => {
    render(<App />);
    expect(screen.getByRole('timer')).toBeTruthy();
  });
});
