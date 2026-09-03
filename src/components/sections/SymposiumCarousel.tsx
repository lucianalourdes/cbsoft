import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { SYMPOSIA } from '@/data/symposia';
import { AGENDA, formatAgendaDate, type AgendaEvent } from '@/data/agenda';
import { AddToCalendar } from './AddToCalendar';

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
          <h3 className="symp-title">{pick(symposium.name, lang)}</h3>
          <a href="#eventos" className="symp-more">
            <span>{t('agenda.readMore')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </a>
        </div>
        <div className="symp-right">
          <div className="cal-list">
            {events.map((event) => {
              const key = eventKey(event);
              return (
                <AddToCalendar
                  key={key}
                  event={event}
                  displayDate={formatAgendaDate(event.date, lang)}
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
        <a href="#cfp" className="symp-alldates">
          {t('agenda.allDates')}
        </a>
      </div>
    </div>
  );
}
