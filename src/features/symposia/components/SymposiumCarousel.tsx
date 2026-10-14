import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLang } from '@/shared/hooks/useLang';
import { pick } from '@/shared/utils/localized';
import { SYMPOSIA } from '@/features/symposia/data/symposia';
import { AGENDA, formatAgendaDate, type AgendaEvent } from '@/features/symposia/data/agenda';
import { AddToCalendar } from './AddToCalendar';
import { CALL_FOR_PAPERS_PATH, ROUTES } from '@/shared/constants/routes';

const eventKey = (e: AgendaEvent) => `${e.symposium}-${e.kind}`;

export function SymposiumCarousel() {
  const { t } = useTranslation();
  const lang = useLang();
  const [index, setIndex] = useState(0);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const symposium = SYMPOSIA[index];
  const events = AGENDA[symposium.id];

  function go(delta: number) {
    setIndex((i) => (i + delta + SYMPOSIA.length) % SYMPOSIA.length);
    setOpenKey(null);
  }

  return (
    <div className="symp-card" data-symp={symposium.id}>
      <span className="symp-tab">{t('agenda.tab')}</span>

      <div className="symp-slide">
        <div className="symp-left">
          <h3 className="symp-title" aria-live="polite">{pick(symposium.name, lang)}</h3>
          <Link to={ROUTES.about} className="symp-more">
            <span>{t('agenda.readMore')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Link>
        </div>
        <div className="symp-right">
          <div className="cal-list">
            {events.map((event) => {
              const key = eventKey(event);
              return (
                <AddToCalendar
                  key={key}
                  event={event}
                  displayDate={
                    event.date ? formatAgendaDate(event.date, lang) : t('agenda.tbd')
                  }
                  isOpen={openKey === key}
                  onToggle={() => setOpenKey((k) => (k === key ? null : key))}
                  onClose={() => setOpenKey((k) => (k === key ? null : k))}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="symp-footer">
        <div className="symp-nav">
          <button
            type="button"
            className="symp-arrow"
            aria-label={t('agenda.prevAria')}
            aria-controls="agenda"
            onClick={() => go(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="symp-arrow"
            aria-label={t('agenda.nextAria')}
            aria-controls="agenda"
            onClick={() => go(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
        <Link to={CALL_FOR_PAPERS_PATH} className="symp-alldates">
          {t('agenda.allDates')}
        </Link>
      </div>
    </div>
  );
}
