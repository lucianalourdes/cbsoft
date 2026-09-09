import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed';
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

const PinIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <path d="M12 21s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

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

export function Location() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <Reveal id="local" className="venue-section py-20 md:py-28">
      <div className="container-xl">
        <SectionHeading
          number="05"
          eyebrow={t('location.eyebrow')}
          title={t('location.title')}
          titleClassName="text-2xl md:text-3xl max-w-md"
        />
        <p className="venue-place">
          {PinIcon}
          <span>{t('location.city')}</span>
        </p>

        <div className="venue-panel">
          <div className="venue-grid">
            <div className="venue-info">
              <div className="venue-alert" role="note">
                <span className="venue-alert-icon" aria-hidden="true">
                  {InfoIcon}
                </span>
                <div>
                  <p className="venue-alert-title">{t('location.noticeTitle')}</p>
                  <p className="venue-alert-text">{t('location.notice')}</p>
                </div>
              </div>

              <p className="venue-subhead">{t('location.transitHeading')}</p>
              <ul className="venue-transit">
                {VENUE.transit.map((option) => (
                  <li key={option.id} className="venue-transit-item">
                    <span className="venue-transit-icon" aria-hidden="true">
                      {TRANSIT_ICONS[option.icon]}
                    </span>
                    <span className="venue-transit-body">
                      <span className="venue-transit-name">{pick(option.name, lang)}</span>
                      <span className="venue-transit-meta">{pick(option.meta, lang)}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <Button variant="accent" href={VENUE.infoUrl} className="venue-cta !text-white">
                <span>{t('location.moreInfo')}</span>
                <svg
                  className="venue-cta-arrow"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  {...stroke}
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Button>
            </div>

            <figure className="venue-media">
              <YouTubeEmbed
                id={VENUE.video.id}
                title={t('location.videoTitle')}
                playAria={t('location.playAria')}
              />
              <figcaption className="venue-video-cap">
                <span className="venue-video-org">{VENUE.video.channel}</span>
                <span className="venue-video-title">{t('location.videoTitle')}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
