import { describe, expect, it } from 'vitest';
import { buildCalendarLinks, type CalendarEvent } from './calendar';

const BASE = 'https://example.com/cbsoft/';

const allDay: CalendarEvent = {
  title: { pt: 'SBES — Submissão de artigos completos', en: 'SBES — Full paper submission' },
  description: {
    pt: 'Prazo para submissão dos artigos completos na Trilha de Pesquisa do SBES.',
    en: 'Full paper submission deadline for the SBES Research Track.',
  },
  start: '2027-03-15',
  allDay: true,
  url: '#cfp',
};

const timed: CalendarEvent = {
  title: { pt: 'Reunião', en: 'Meeting' },
  description: { pt: '', en: '' },
  start: '2027-03-15T12:00:00Z',
};

describe('buildCalendarLinks — all-day', () => {
  const links = buildCalendarLinks(allDay, 'en', BASE);

  it('targets the three calendar services', () => {
    expect(links.google).toMatch(/^https:\/\/calendar\.google\.com\/calendar\/render\?/);
    expect(links.office).toMatch(
      /^https:\/\/outlook\.office\.com\/calendar\/0\/deeplink\/compose\?/,
    );
    expect(links.live).toMatch(/^https:\/\/outlook\.live\.com\/calendar\/0\/deeplink\/compose\?/);
  });

  it('uses an exclusive end date (start + 1 day) for Google', () => {
    expect(links.google).toContain('action=TEMPLATE');
    expect(links.google).toContain('dates=20270315%2F20270316');
  });

  it('marks Outlook events all-day with dashed dates', () => {
    expect(links.office).toContain('allday=true');
    expect(links.office).toContain('startdt=2027-03-15');
    expect(links.office).toContain('enddt=2027-03-16');
  });

  it('carries the localized title and appends the resolved url to the body', () => {
    expect(links.google).toContain('text=' + encodeURIComponent('SBES — Full paper submission'));
    expect(links.google).toContain(encodeURIComponent(BASE + '#cfp'));
  });

  it('falls back to Portuguese for the pt language', () => {
    const pt = buildCalendarLinks(allDay, 'pt', BASE);
    expect(pt.google).toContain(
      'text=' + encodeURIComponent('SBES — Submissão de artigos completos'),
    );
  });
});

describe('buildCalendarLinks — timed', () => {
  const links = buildCalendarLinks(timed, 'en', BASE);

  it('spans one hour in UTC stamps for Google', () => {
    expect(links.google).toContain('dates=20270315T120000Z%2F20270315T130000Z');
  });

  it('uses ISO datetimes and no all-day flag for Outlook', () => {
    expect(links.office).toContain('startdt=' + encodeURIComponent('2027-03-15T12:00:00.000Z'));
    expect(links.office).not.toContain('allday=true');
  });
});
