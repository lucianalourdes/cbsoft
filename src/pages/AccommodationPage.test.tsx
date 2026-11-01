import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { App } from '@/App';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

afterEach(() => {
  window.history.replaceState(null, '', import.meta.env.BASE_URL);
});

describe('AccommodationPage', () => {
  it('opens from the CBSOFT\'27 menu and shows the waiting message', () => {
    window.history.replaceState(null, '', import.meta.env.BASE_URL);
    render(<App />);
    fireEvent.click(screen.getAllByRole('button', { name: "CBSOFT'27" })[0]);
    fireEvent.click(screen.getByRole('link', { name: /^Acomodações/ }));
    expect(window.location.pathname).toBe(`${import.meta.env.BASE_URL}acomodacoes`);
    expect(screen.getByRole('heading', { level: 1, name: 'Acomodações' })).toBeTruthy();
    expect(screen.getByText('Acomodações a serem divulgadas')).toBeTruthy();
  });

  it('renders on direct access in English', async () => {
    await act(async () => { await i18n.changeLanguage('en'); });
    window.history.replaceState(null, '', `${import.meta.env.BASE_URL}acomodacoes`);
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Accommodation' })).toBeTruthy();
    expect(screen.getByText('Accommodation to be announced')).toBeTruthy();
  });
});
