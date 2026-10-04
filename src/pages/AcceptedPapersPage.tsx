import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { BrandStripes } from '@/components/ui/BrandStripes';
import { SBES_TRACKS, acceptedPapersPath } from '@/data/sbesTracks';

/** Accepted papers: the shared page (/artigos-aceitos) every menu link uses
 *  for now, or one SBES track (/sbes/:track/artigos-aceitos). */
export function AcceptedPapersPage() {
  const { t } = useTranslation();
  const { track: slug } = useParams();
  const track = SBES_TRACKS.find((item) => item.slug === slug);
  const trackTitle = track ? t(`headerMenu.sbes.tracks.${track.id}.title`) : '';

  useEffect(() => {
    const previous = document.title;
    if (!slug) document.title = t('acceptedPapersPage.generalMetaTitle');
    else if (track) document.title = t('acceptedPapersPage.metaTitle', { track: trackTitle });
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, [t, slug, track, trackTitle]);

  return (
    <main className="about-page" id="artigos-aceitos">
      <section className="about-section about-top" aria-labelledby="artigos-titulo">
        <div className="container-xl">
          {!slug ? (
            <>
              <p className="about-eyebrow">{t('acceptedPapersPage.generalEyebrow')}</p>
              <h1 id="artigos-titulo" className="about-title papers-title">
                {t('acceptedPapersPage.title')}
              </h1>
              <p className="papers-pending">{t('acceptedPapersPage.generalPending')}</p>
            </>
          ) : track ? (
            <>
              <p className="about-eyebrow">
                {t('acceptedPapersPage.eyebrow')} · {trackTitle}
              </p>
              <h1 id="artigos-titulo" className="about-title papers-title">
                {t('acceptedPapersPage.title')}
              </h1>

              {track.papers.length > 0 ? (
                <ol className="papers-list">
                  {track.papers.map((paper) => (
                    <li key={paper.title}>
                      <strong>{paper.title}</strong>
                      <span>{paper.authors.join(', ')}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="papers-pending">{t('acceptedPapersPage.pending')}</p>
              )}

              <h2 className="about-h2 wcall-h2">
                <BrandStripes className="wcall-mark" />
                {t('acceptedPapersPage.otherTracks')}
              </h2>
              <ul className="papers-tracks">
                {SBES_TRACKS.filter((item) => item.id !== track.id).map((item) => (
                  <li key={item.id}>
                    <Link to={acceptedPapersPath(item)} className="wcall-link">
                      {t(`headerMenu.sbes.tracks.${item.id}.title`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h1 id="artigos-titulo" className="about-title">
              {t('acceptedPapersPage.notFound')}
            </h1>
          )}
        </div>
      </section>
    </main>
  );
}
