import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { VenueDetails } from '@/components/ui/VenueDetails';
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed';
import { Button } from '@/components/ui/Button';
import { VENUE } from '@/data/venue';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';

export function LocationPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const { hash } = useLocation();
  const confirmed = Boolean(VENUE.name && VENUE.address);

  useEffect(() => {
    const previous = document.title;
    document.title = t('locationPage.metaTitle');
    return () => { document.title = previous; };
  }, [t]);

  useEffect(() => {
    if (hash === '#mapa') {
      document.getElementById('mapa')?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <main className="about-page location-page" id="local-evento">
      <section className="about-section about-header">
        <div className="container-xl">
          <p className="about-eyebrow">{t('location.eyebrow')}</p>
          <h1 className="about-title">{t('locationPage.title')}</h1>
          <p className="about-lead">
            {VENUE.name ? pick(VENUE.name, lang) : t('location.unconfirmed')}
          </p>
        </div>
      </section>
      <section className="about-section venue-section">
        <div className="container-xl">
          <div className="venue-panel venue-panel--page">
            <div className="venue-grid">
              <div className="venue-info"><VenueDetails /></div>
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
          {confirmed && (
            <section id="mapa" className="venue-map" aria-labelledby="venue-map-title">
              <h2 className="about-h2" id="venue-map-title">{t('locationPage.mapTitle')}</h2>
              <p className="about-prose">{t('locationPage.mapDescription')}</p>
              <div className="venue-map-actions">
                <Button variant="accent" href={VENUE.directionsUrl} target="_blank" rel="noopener noreferrer">
                  {t('locationPage.directions')}
                </Button>
                <Button variant="outline" href={VENUE.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {t('locationPage.openMap')}
                </Button>
              </div>
              <p className="venue-source">
                <a href={VENUE.officialUrl} target="_blank" rel="noopener noreferrer">
                  {t('locationPage.officialLocation')}
                </a>
              </p>
            </section>
          )}
          <Link to="/" className="about-back">
            <span aria-hidden="true">&larr;</span> {t('locationPage.backHome')}
          </Link>
        </div>
      </section>
    </main>
  );
}
