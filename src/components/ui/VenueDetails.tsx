import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { VENUE, type TransitIcon } from '@/data/venue';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const InfoIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <path d="M12 7.5h.01" />
  </svg>
);

const TRANSIT_ICONS: Record<TransitIcon, ReactNode> = {
  metro: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M12 3c-4 0-7 .8-7 4v8a3 3 0 0 0 3 3l-1.5 2.5M12 3c4 0 7 .8 7 4v8a3 3 0 0 1-3 3l1.5 2.5" />
      <path d="M5 13h14" />
      <path d="M8.5 17h.01M15.5 17h.01" />
    </svg>
  ),
  bus: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M5 6c0-1.5 2.5-2 7-2s7 .5 7 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
      <path d="M5 12h14" />
      <path d="M8 18v2M16 18v2" />
      <path d="M8.5 15h.01M15.5 15h.01" />
    </svg>
  ),
};

export function VenueDetails() {
  const { t } = useTranslation();
  const lang = useLang();
  const confirmed = Boolean(VENUE.name && VENUE.address);

  return (
    <>
      {confirmed && VENUE.address && (
        <address className="venue-address">{pick(VENUE.address, lang)}</address>
      )}
      <div className="venue-alert" role="note">
        <span className="venue-alert-icon" aria-hidden="true">{InfoIcon}</span>
        <div>
          <p className="venue-alert-title">
            {t(confirmed ? 'location.noticeTitle' : 'location.unconfirmed')}
          </p>
          <p className="venue-alert-text">
            {t(confirmed ? 'location.notice' : 'location.unconfirmedNotice')}
          </p>
        </div>
      </div>
      {confirmed && (
        <>
          <h2 className="venue-subhead">{t('location.transitHeading')}</h2>
          <ul className="venue-transit">
            {VENUE.transit.map((option) => (
              <li key={option.id}>
                <a className="venue-transit-item" href={option.url} target="_blank" rel="noopener noreferrer">
                  <span className="venue-transit-icon" aria-hidden="true">{TRANSIT_ICONS[option.icon]}</span>
                  <span className="venue-transit-body">
                    <span className="venue-transit-name">{pick(option.name, lang)}</span>
                    <span className="venue-transit-meta">{pick(option.meta, lang)}</span>
                    <span className="venue-transit-link">{t('location.consultTransport')}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="venue-source">
            <a href={VENUE.transitSourceUrl} target="_blank" rel="noopener noreferrer">{t('location.transitSource')}</a>
          </p>
          <p className="venue-alert-text">{t('location.transitNote')}</p>
        </>
      )}
    </>
  );
}
