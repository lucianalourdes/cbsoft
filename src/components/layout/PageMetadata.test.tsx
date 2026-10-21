import { act, fireEvent, render, screen } from '@testing-library/react';
import { Link, MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { PageMetadata } from './PageMetadata';

let description: HTMLMetaElement;

beforeEach(async () => {
  await i18n.changeLanguage('pt');
  description = document.createElement('meta');
  description.name = 'description';
  description.content = 'Initial home description';
  document.head.append(description);
});

afterEach(() => description.remove());

describe('PageMetadata', () => {
  it.each([
    ['/sobre', "Sobre o CBSoft — CBSOFT'27", "About CBSoft — CBSOFT'27", 'Learn about CBSoft'],
    ['/workshops/chamada/', "Chamada de Trabalhos — Workshops — CBSOFT'27", "Call for Papers — Workshops — CBSOFT'27", 'Explore the call for papers'],
  ])('translates the title and description of %s on language changes', async (path, ptTitle, enTitle, enDescription) => {
    render(<MemoryRouter initialEntries={[path]}><PageMetadata /></MemoryRouter>);
    expect(document.title).toBe(ptTitle);
    expect(description.content).not.toBe('Initial home description');
    await act(async () => { await i18n.changeLanguage('en'); });
    expect(document.title).toBe(enTitle);
    expect(description.content).toContain(enDescription);
  });

  it('restores metadata in the active language when navigating between pages and back home', async () => {
    render(
      <MemoryRouter initialEntries={['/sobre']}>
        <PageMetadata />
        <Link to="/workshops/chamada">Workshops</Link>
        <Link to="/">Home</Link>
      </MemoryRouter>,
    );
    await act(async () => { await i18n.changeLanguage('en'); });
    fireEvent.click(screen.getByRole('link', { name: 'Workshops' }));
    expect(document.title).toBe("Call for Papers — Workshops — CBSOFT'27");
    expect(description.content).toContain('Explore the call for papers');
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(document.title).toBe("CBSOFT'27 — Brazilian Conference on Software");
    expect(description.content).toContain('Brazilian Computer Society');
    await act(async () => { await i18n.changeLanguage('pt'); });
    expect(document.title).toBe("CBSOFT'27 — Congresso Brasileiro de Software");
    expect(description.content).toContain('Sociedade Brasileira de Computação');
  });
});
