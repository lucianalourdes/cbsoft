import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/shared/components/Reveal';
import { SectionHeading } from '@/shared/components/SectionHeading';
import { VenueDetails } from './VenueDetails';
import { YouTubeEmbed } from '@/shared/components/YouTubeEmbed';
import { useLang } from '@/shared/hooks/useLang';
import { pick } from '@/shared/utils/localized';
import { VENUE } from '@/features/venue/data/venue';
import { ArrowRightIcon, PinIcon } from '@/shared/components/icons/lineIcons';

export function LocationSection() {
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
          <PinIcon />
          <span>{t('location.city')}</span>
        </p>

        <div className="venue-panel">
          <div className="venue-grid">
            <div className="venue-info">
              <VenueDetails />

              <Link to={VENUE.infoUrl} className="btn btn-accent venue-cta text-brand-magenta">
                <span>{t('location.moreInfo')}</span>
                <ArrowRightIcon className="venue-cta-arrow" />
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
