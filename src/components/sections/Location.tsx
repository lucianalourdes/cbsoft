import '@/styles/venue.css';
import '@/components/ui/Button.css';

import './Location.css';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { VenueDetails } from '@/components/ui/VenueDetails';
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { VENUE } from '@/data/venue';

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

export function Location() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <Reveal id="local" className="venue-section home-location py-20 md:py-28" aria-labelledby="home-location-title">
      <div className="container-xl home-location__grid">
        <div className="home-location__content">
          <p className="home-location__badge">
            {PinIcon}
            <span>{t('location.eyebrow')}</span>
          </p>
          <h2 id="home-location-title" className="home-location__title">
            {VENUE.name ? pick(VENUE.name, lang) : t('location.unconfirmed')}
          </h2>
          <p className="home-location__city">{t('location.city')}</p>

          <VenueDetails compact />

          <Link to={VENUE.infoUrl} className="btn home-location__cta">
            <span>{t('location.moreInfo')}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Link>
        </div>

        <figure className="home-location__media">
          <YouTubeEmbed
            id={VENUE.video.id}
            title={t('location.videoTitle')}
            playAria={t('location.playAria')}
            fallbackLabel={t('location.videoFallback')}
          />
        </figure>
      </div>
    </Reveal>
  );
}
