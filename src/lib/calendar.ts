import type { Lang, Localized } from './localized';

export interface CalendarEvent {
  title: Localized;
  description: Localized;
  /** 'YYYY-MM-DD' for all-day, or an ISO date-time string. */
  start: string;
  /** Same shape as `start`. Optional — defaults to `start`. */
  end?: string;
  allDay?: boolean;
  location?: string;
  /** May be relative (e.g. '#cfp'); resolved against `baseUrl`. */
  url?: string;
}

export interface CalendarLinks {
  google: string;
  office: string;
  live: string;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}
function stampUTC(d: Date): string {
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}
function stampDay(d: Date): string {
  return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate());
}
function dashDay(d: Date): string {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
}
function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * 86400000);
}
function query(obj: Record<string, string>): string {
  return Object.keys(obj)
    .map((k) => k + '=' + encodeURIComponent(obj[k]))
    .join('&');
}

function resolveUrl(url: string | undefined, baseUrl: string | undefined): string {
  if (!url) return '';
  try {
    return baseUrl ? new URL(url, baseUrl).href : new URL(url).href;
  } catch {
    return url;
  }
}

/**
 * Ports js/main.js `buildLinks()` — returns one ready-to-open URL per
 * calendar service, with the event details already filled in for the
 * given language.
 */
export function buildCalendarLinks(
  event: CalendarEvent,
  lang: Lang,
  baseUrl: string | undefined = typeof location !== 'undefined' ? location.href : undefined,
): CalendarLinks {
  const title = event.title[lang] || event.title.pt || '';
  const desc = event.description[lang] || event.description.pt || '';
  const loc = event.location || '';
  const url = resolveUrl(event.url, baseUrl);
  const details = desc + (url ? (desc ? '\n\n' : '') + url : '');

  const allDay = event.allDay ?? event.start.indexOf('T') === -1;
  const start = new Date(event.start);
  let end = event.end ? new Date(event.end) : new Date(event.start);
  if (!allDay && !event.end) end = new Date(start.getTime() + 3600000);

  let gDates: string;
  let oStart: string;
  let oEnd: string;
  if (allDay) {
    const endEx = addDays(end, 1); // exclusive end (Google + Outlook)
    gDates = stampDay(start) + '/' + stampDay(endEx);
    oStart = dashDay(start);
    oEnd = dashDay(endEx);
  } else {
    gDates = stampUTC(start) + '/' + stampUTC(end);
    oStart = start.toISOString();
    oEnd = end.toISOString();
  }

  const google =
    'https://calendar.google.com/calendar/render?' +
    query({ action: 'TEMPLATE', text: title, dates: gDates, details, location: loc });

  const oParams: Record<string, string> = {
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: title,
    body: details,
    location: loc,
    startdt: oStart,
    enddt: oEnd,
  };
  if (allDay) oParams.allday = 'true';
  const oQuery = query(oParams);

  return {
    google,
    office: 'https://outlook.office.com/calendar/0/deeplink/compose?' + oQuery,
    live: 'https://outlook.live.com/calendar/0/deeplink/compose?' + oQuery,
  };
}
