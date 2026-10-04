import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import i18n from '@/i18n';
import { App } from '@/App';
import { VENUE } from '@/data/venue';
import { LocationPage } from './LocationPage';

const confirmedName = VENUE.name;
const confirmedAddress = VENUE.address;

beforeEach(async () => {
  await i18n.changeLanguage('pt');
  window.history.replaceState(null, '', import.meta.env.BASE_URL);
});

afterEach(() => {
  VENUE.name = confirmedName;
  VENUE.address = confirmedAddress;
  vi.restoreAllMocks();
  window.history.replaceState(null, '', import.meta.env.BASE_URL);
});

function renderPage() {
  return render(<MemoryRouter><LocationPage /></MemoryRouter>);
}

describe('event locality', () => {
  it('navigates from the home section to the venue route and provides a real map destination', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Endereço, orientações e mapa' }));
    expect(window.location.pathname).toBe(`${import.meta.env.BASE_URL}local`);
    expect(screen.getByRole('heading', { level: 1, name: 'Local do evento' })).toBeTruthy();
    expect(screen.getByText(/Av\. Dom José Gaspar, 500/)).toBeTruthy();
    const map = screen.getByRole('link', { name: /Traçar rota no Google Maps/ });
    const destination = new URL(map.getAttribute('href')!).searchParams.get('destination');
    expect(destination).toContain('Coração Eucarístico');
    expect(destination).toContain('500');
    expect(screen.queryByText(/Campus Lourdes|Estação Central|Linha 4403|Raul Soares/)).toBeNull();
  });

  it('loads the approved player only on demand and retains its YouTube fallback after poster failure', () => {
    const { container } = renderPage();
    expect(container.querySelector('iframe')).toBeNull();
    fireEvent.error(container.querySelector('.yt-poster')!);
    expect(container.querySelector('.yt-poster')).toBeNull();
    const fallback = screen.getByRole('link', { name: /Assistir no YouTube/ });
    expect(fallback.getAttribute('href')).toBe('https://www.youtube.com/watch?v=HPzwyRFs37I');
    fireEvent.click(screen.getByRole('button', { name: 'Reproduzir o vídeo do CBSOFT 2027' }));
    const player = screen.getByTitle('CBSOFT 2027 em Belo Horizonte');
    expect(player.getAttribute('src')).toContain('youtube-nocookie.com/embed/HPzwyRFs37I');
    expect(player.getAttribute('loading')).toBe('lazy');
    expect(screen.getByRole('link', { name: /Assistir no YouTube/ })).toBeTruthy();
  });

  it('provides English directions and preserves pending event access details', async () => {
    renderPage();
    await act(async () => { await i18n.changeLanguage('en'); });
    expect(screen.getByRole('heading', { level: 1, name: 'Event venue' })).toBeTruthy();
    expect(screen.getByText('Event access details to be confirmed')).toBeTruthy();
    expect(screen.getByText(/Gameleira station/)).toBeTruthy();
    expect(screen.getByRole('link', { name: /Get directions on Google Maps/ })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Play the CBSOFT 2027 video' })).toBeTruthy();
  });

  it('hides address, transport and navigation if the venue is no longer confirmed', () => {
    VENUE.name = null;
    VENUE.address = null;
    const { container } = renderPage();
    expect(screen.getAllByText('Local a confirmar').length).toBeGreaterThan(0);
    expect(container.querySelector('address')).toBeNull();
    expect(container.querySelector('.venue-transit')).toBeNull();
    expect(screen.queryByRole('link', { name: /Traçar rota/ })).toBeNull();
  });

  it('opens the map section from the desktop or mobile navigation without exposing unapproved accommodation or social events', () => {
    const scroll = vi.fn();
    const previous = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scroll;
    render(<App />);
    fireEvent.click(screen.getAllByRole('button', { name: "CBSOFT'27" })[0]);
    expect(screen.queryByRole('link', { name: /Hospedagem|Acomodação|Eventos sociais/i })).toBeNull();
    fireEvent.click(screen.getByRole('link', { name: /^Mapa/ }));
    expect(window.location.hash).toBe('#mapa');
    expect(screen.getByRole('heading', { name: 'Mapa e navegação' })).toBeTruthy();
    expect(scroll).toHaveBeenCalled();
    Element.prototype.scrollIntoView = previous;
  });
});
