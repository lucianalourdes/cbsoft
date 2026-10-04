import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
    <Reveal id="local" className="venue-section py-20 md:py-28">
      <div className="container-xl">
        <SectionHeading
          number="05"
          eyebrow={t('location.eyebrow')}
          title={VENUE.name ? pick(VENUE.name, lang) : t('location.unconfirmed')}
          titleClassName="text-2xl md:text-3xl max-w-md"
        />
        <p className="venue-place">
          {PinIcon}
          <span>{t('location.city')}</span>
        </p>

        <div className="venue-panel">
          <div className="venue-grid">
            <div className="venue-info">
              <VenueDetails />

              <Link to={VENUE.infoUrl} className="btn btn-accent venue-cta !text-white">
                <span>{t('location.moreInfo')}</span>
                <svg
                  className="venue-cta-arrow"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  {...stroke}
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <figure className="venue-media">
              <YouTubeEmbed
                id={VENUE.video.id}
                title={t('location.videoTitle')}
                playAria={t('location.playAria')}
                fallbackLabel={t('location.videoFallback')}
              />
              <figcaption className="venue-video-cap">
                <span className="venue-video-title">{t('location.videoTitle')}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
