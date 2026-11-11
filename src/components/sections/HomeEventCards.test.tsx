import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { PUBLICATION } from '@/data/publication';
import { VENUE } from '@/data/venue';
import { About } from './About';
import { HomeEventCards } from './HomeEventCards';

const originalDates = { ...PUBLICATION.dates };
const originalVenue = { ...VENUE };

afterEach(async () => {
  Object.assign(PUBLICATION.dates, originalDates);
  Object.assign(VENUE, originalVenue);
  await i18n.changeLanguage('pt');
});

function renderCards() {
  return render(<MemoryRouter><HomeEventCards /></MemoryRouter>);
}

describe('Home event cards', () => {
  it.each(['pt', 'en'])('replaces the statistics with location followed by dates (%s)', async (lang) => {
    await i18n.changeLanguage(lang);
    const { container } = render(<MemoryRouter><About /></MemoryRouter>);
    expect(container.querySelector('dl')).toBeNull();
    expect(container.textContent).not.toContain(i18n.t('about.statYears'));
    const cards = container.querySelector('.home-event-cards')!;
    expect(cards.children[0].textContent).toContain(i18n.t('about.locationLabel'));
    expect(cards.children[1].textContent).toContain(i18n.t('about.dateLabel'));
    expect(cards.textContent).toContain(lang === 'pt' ? '27 de setembro' : 'September 27');
    expect(cards.textContent).toContain(lang === 'pt' ? '1 de outubro de 2027' : 'October 1, 2027');
    expect(cards.querySelector('a')?.getAttribute('href')).toBe(VENUE.infoUrl);
    expect(cards.textContent).toContain(VENUE.name![lang as 'pt' | 'en']);
    expect(cards.querySelector('details')).not.toBeNull();
    fireEvent.click(cards.querySelector('summary')!);
    const google = new URL(screen.getByRole('link', { name: 'Google Calendar' }).getAttribute('href')!);
    expect(google.searchParams.get('dates')).toBe('20270927/20271002');
    for (const name of ['Outlook 365', 'Outlook Live']) {
      const outlook = new URL(screen.getByRole('link', { name }).getAttribute('href')!);
      expect(outlook.searchParams.get('startdt')).toBe('2027-09-27');
      expect(outlook.searchParams.get('enddt')).toBe('2027-10-02');
      expect(outlook.searchParams.get('allday')).toBe('true');
    }
  });

  it('does not publish calendar links for an incomplete period or unconfirmed venue', () => {
    PUBLICATION.dates.start = '2027-12-31';
    PUBLICATION.dates.end = null;
    const view = renderCards();
    expect(view.container.querySelector('details')).toBeNull();
    expect(view.container.textContent).toContain(i18n.t('agenda.tbd'));
    PUBLICATION.dates.end = '2028-01-02';
    VENUE.name = null;
    view.rerender(<MemoryRouter><HomeEventCards /></MemoryRouter>);
    expect(view.container.querySelector('details')).toBeNull();
    expect(view.container.querySelector('a')).toBeNull();
  });

  it.each(['pt', 'en'])('fills calendars with the full inclusive period and localized event data (%s)', async (lang) => {
    await i18n.changeLanguage(lang);
    PUBLICATION.dates.start = '2027-12-31';
    PUBLICATION.dates.end = '2028-01-02';
    const { container } = renderCards();
    fireEvent.click(container.querySelector('summary')!);
    const google = new URL(screen.getByRole('link', { name: 'Google Calendar' }).getAttribute('href')!);
    expect(google.searchParams.get('dates')).toBe('20271231/20280103');
    expect(google.searchParams.get('text')).toBe(i18n.t('about.calendarTitle', { year: 2027 }));
    expect(google.searchParams.get('location')).toBe(`${VENUE.name![lang as 'pt' | 'en']} — ${VENUE.address![lang as 'pt' | 'en']}`);
    expect(google.searchParams.get('details')).toContain(i18n.t('about.p1'));
    expect(google.searchParams.get('details')).toContain(new URL(import.meta.env.BASE_URL, window.location.href).href);
    for (const name of ['Outlook 365', 'Outlook Live']) {
      const outlook = new URL(screen.getByRole('link', { name }).getAttribute('href')!);
      expect(outlook.searchParams.get('startdt')).toBe('2027-12-31');
      expect(outlook.searchParams.get('enddt')).toBe('2028-01-03');
      expect(outlook.searchParams.get('allday')).toBe('true');
      expect(outlook.searchParams.get('subject')).toBe(google.searchParams.get('text'));
      expect(outlook.searchParams.get('location')).toBe(google.searchParams.get('location'));
    }
    expect(container.textContent).toContain(lang === 'pt' ? 'dezembro' : 'December');
    expect(container.textContent).toContain(lang === 'pt' ? 'janeiro' : 'January');
  });

  it('includes the entire day for a single-day event and returns focus on Escape', async () => {
    PUBLICATION.dates.start = PUBLICATION.dates.end = '2027-09-01';
    const { container } = renderCards();
    const summary = container.querySelector('summary')!;
    fireEvent.click(summary);
    const google = new URL(screen.getByRole('link', { name: 'Google Calendar' }).getAttribute('href')!);
    expect(google.searchParams.get('dates')).toBe('20270901/20270902');
    fireEvent.keyDown(screen.getByRole('link', { name: 'Google Calendar' }), { key: 'Escape' });
    expect(container.querySelector('details')!.open).toBe(false);
    expect(document.activeElement).toBe(summary);
    await act(async () => { await i18n.changeLanguage('en'); });
    expect(container.textContent).toContain('September 1, 2027');
  });
});
