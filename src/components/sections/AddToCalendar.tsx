import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLang } from '@/hooks/useLang';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { buildCalendarLinks, type CalendarEvent } from '@/lib/calendar';
import type { AgendaEvent } from '@/data/agenda';

const SERVICES: { key: keyof ReturnType<typeof buildCalendarLinks>; label: string }[] = [
  { key: 'google', label: 'Google Calendar' },
  { key: 'office', label: 'Outlook 365' },
  { key: 'live', label: 'Outlook Live' },
];

function CalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18M8 2v4M16 2v4" />
    </svg>
  );
}

interface AddToCalendarProps {
  event: AgendaEvent;
  displayDate: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

/** One expandable agenda row: a date button that reveals a menu of
 *  pre-filled "add to calendar" links. Ports the component that
 *  js/main.js used to inject into each `.cal-item`. */
export function AddToCalendar({ event, displayDate, isOpen, onToggle, onClose }: AddToCalendarProps) {
  const { t } = useTranslation();
  const lang = useLang();
  const itemRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(itemRef, onClose, isOpen);

  const calEvent: CalendarEvent = {
    title: event.title,
    description: event.description,
    start: event.date,
    allDay: true,
    url: event.url,
  };
  const links = buildCalendarLinks(calEvent, lang);

  return (
    <div className="cal-item" ref={itemRef}>
      <button
        type="button"
        className="cal-trigger"
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={onToggle}
      >
        <span className="cal-text">
          <span className="cal-date">{displayDate}</span>
          <span className="cal-desc">{event.displayDesc[lang]}</span>
        </span>
        <svg
          className="cal-chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="cal-menu" role="menu" aria-label={t('agenda.addToCalendarAria')}>
          {SERVICES.map((svc) => (
            <button
              key={svc.key}
              type="button"
              className="cal-opt"
              role="menuitem"
              onClick={() => {
                window.open(links[svc.key], '_blank', 'noopener');
                onClose();
                triggerRef.current?.focus();
              }}
            >
              <CalIcon />
              <span>{svc.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
