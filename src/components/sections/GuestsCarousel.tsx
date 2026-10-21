import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { GUESTS } from '@/data/guests';
import { GuestAvatar } from '@/components/ui/GuestAvatar';

export function GuestsCarousel() {
  const { t } = useTranslation();
  const lang = useLang();
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.guest-card');
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  }

  return (
    <div className="guests">
      <div className="guests-track" ref={trackRef}>
        {GUESTS.map((guest) => (
          <article key={guest.id} className="guest-card">
            <GuestAvatar name={guest.name} tone={guest.tone} photo={guest.photo} />
            <h3 className="guest-name font-display">{guest.name}</h3>
            <p className="guest-affil">{pick(guest.affiliation, lang)}</p>
          </article>
        ))}
      </div>

      <div className="guests-nav">
        <button
          type="button"
          className="guests-arrow"
          aria-label={t('guests.prevAria')}
          aria-controls="convidados"
          onClick={() => scroll(-1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className="guests-arrow"
          aria-label={t('guests.nextAria')}
          aria-controls="convidados"
          onClick={() => scroll(1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
