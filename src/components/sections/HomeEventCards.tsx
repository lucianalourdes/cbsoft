import './HomeEventCards.css';

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ABOUT_CONGRESS } from '@/data/about';
import { PUBLICATION } from '@/data/publication';
import { VENUE } from '@/data/venue';
import { useLang } from '@/hooks/useLang';
import { buildCalendarLinks } from '@/lib/calendar';

function CardIcon({ calendar = false }: { calendar?: boolean }) {
  return (
    <svg className="home-event-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {calendar ? (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 11h18M8 3v4M16 3v4m-8 9 2 2 5-5" />
        </>
      ) : (
        <>
          <path d="M12 22s7-6.3 7-13A7 7 0 0 0 5 9c0 6.7 7 13 7 13Z" />
          <circle cx="12" cy="9" r="2.5" />
        </>
      )}
    </svg>
  );
}

export function HomeEventCards() {
  const { t } = useTranslation();
  const lang = useLang();
  const calendarRef = useRef<HTMLDetailsElement>(null);
  const { start, end } = PUBLICATION.dates;
  const formatter = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
  const dateLabel = start && end
    ? formatter.formatRange(new Date(start), new Date(end))
    : t('agenda.tbd');
  const links = start && end && VENUE.name && VENUE.address
    ? buildCalendarLinks({
      title: {
        pt: t('about.calendarTitle', { lng: 'pt', year: ABOUT_CONGRESS.year }),
        en: t('about.calendarTitle', { lng: 'en', year: ABOUT_CONGRESS.year }),
      },
      description: {
        pt: t('about.p1', { lng: 'pt' }),
        en: t('about.p1', { lng: 'en' }),
      },
      start,
      end,
      allDay: true,
      location: `${VENUE.name[lang]} — ${VENUE.address[lang]}`,
      url: import.meta.env.BASE_URL,
    }, lang)
    : null;

  const locationContent = (
    <>
      <CardIcon />
      <span className="home-event-card__body">
        <span className="home-event-card__label">{t('about.locationLabel')}</span>
        <span className="home-event-card__value">{VENUE.name?.[lang] ?? t('location.unconfirmed')}</span>
        <span className="home-event-card__note">{t('location.city')}</span>
      </span>
    </>
  );
  const dateContent = (
    <>
      <CardIcon calendar />
      <span className="home-event-card__body">
        <span className="home-event-card__label">{t('about.dateLabel')}</span>
        <span className="home-event-card__value">{dateLabel}</span>
        <span className="home-event-card__note">
          {links ? t('agenda.addToCalendarAria') : t('about.calendarPending')}
        </span>
      </span>
    </>
  );

  return (
    <div className="home-event-cards">
      {VENUE.name ? (
        <Link to={VENUE.infoUrl} className="home-event-card home-event-card--location">
          {locationContent}
          <span className="home-event-card__arrow" aria-hidden="true">↗</span>
        </Link>
      ) : (
        <div className="home-event-card home-event-card--location">{locationContent}</div>
      )}

      {links ? (
        <details
          className="home-event-card home-event-card--date"
          ref={calendarRef}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && calendarRef.current?.open) {
              calendarRef.current.open = false;
              calendarRef.current.querySelector('summary')?.focus();
            }
          }}
        >
          <summary className="home-event-card__trigger">
            {dateContent}
            <svg className="home-event-card__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <ul className="home-event-card__calendars" aria-label={t('agenda.addToCalendarAria')}>
            <li><a href={links.google} target="_blank" rel="noopener noreferrer">Google Calendar</a></li>
            <li><a href={links.office} target="_blank" rel="noopener noreferrer">Outlook 365</a></li>
            <li><a href={links.live} target="_blank" rel="noopener noreferrer">Outlook Live</a></li>
          </ul>
        </details>
      ) : (
        <div className="home-event-card home-event-card--date home-event-card--pending">{dateContent}</div>
      )}
    </div>
  );
}
