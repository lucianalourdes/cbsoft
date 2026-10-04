import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from './i18n';
import { App } from './App';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

describe('App', () => {
  it('renders the sections currently enabled on the home page', () => {
    const { container } = render(<App />);
    for (const id of [
      'agenda',
      'sobre',
      'local',
      'patrocinio',
    ]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
    // The Call for Papers section is currently hidden, and registration has its own page.
    expect(container.querySelector('#cfp')).toBeNull();
    expect(container.querySelector('#inscricoes')).toBeNull();
  });

  it('shows Portuguese content by default and switches to English', async () => {
    render(<App />);
    expect(
      screen.getAllByText(
        'O Que é o CBSoft?',
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

  it('renders the hero countdown timer', () => {
    render(<App />);
    expect(screen.getByRole('timer')).toBeTruthy();
  });
});
