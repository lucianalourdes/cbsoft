import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import pt from '@/i18n/locales/pt/common.json';
import en from '@/i18n/locales/en/common.json';
import { WorkshopsCallPage } from './WorkshopsCallPage';

afterEach(async () => {
  await i18n.changeLanguage('pt');
});

function renderPage() {
  return render(
    <MemoryRouter>
      <WorkshopsCallPage />
    </MemoryRouter>,
  );
}

describe('WorkshopsCallPage', () => {
  it('marks each heading with the decorative four-colour bar, not the logo', () => {
    const { container } = renderPage();
    expect(container.querySelector('img[src*="grafismo"]')).toBeNull();
    const bars = container.querySelectorAll('.brand-bar');
    expect(bars).toHaveLength(5);
    bars.forEach((bar) => {
      expect(bar.getAttribute('aria-hidden')).toBe('true');
      expect(bar.closest('h1, h2')).not.toBeNull();
    });
  });

  it.each([
    ['pt', pt],
    ['en', en],
  ] as const)('keeps every call heading in %s', async (lang, strings) => {
    await act(async () => { await i18n.changeLanguage(lang); });
    renderPage();
    const call = strings.workshopsCallPage;
    expect(screen.getByRole('heading', { level: 1, name: call.contextTitle })).toBeTruthy();
    for (const title of [call.generalTitle, call.submissionTitle, call.preApprovedTitle, call.ethicsTitle]) {
      expect(screen.getByRole('heading', { level: 2, name: title })).toBeTruthy();
    }
  });
});
