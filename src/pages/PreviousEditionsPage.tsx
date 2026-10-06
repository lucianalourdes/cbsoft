import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrandStripes } from '@/components/ui/BrandStripes';
import { asset } from '@/data/config';
import { PREVIOUS_EDITIONS, type PreviousEdition } from '@/data/previousEditions';

function EditionCard({ edition }: { edition: PreviousEdition }) {
  const { t } = useTranslation();
  const [imageFailed, setImageFailed] = useState(false);
  const name = `CBSoft ${edition.year}`;
  const image = asset(`assets/images/previous-editions/cbsoft${edition.year}.${edition.year === 2026 ? 'svg' : 'png'}`);

  return (
    <li>
      <a
        className="previous-edition"
        href={edition.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="previous-edition__image">
          {imageFailed ? (
            <span className="previous-edition__fallback" aria-hidden="true">{name}</span>
          ) : (
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              width={500}
              height={300}
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
        <div className="previous-edition__content">
          <h2>{name}</h2>
          <p>{edition.location}</p>
          {edition.online && <span className="previous-edition__online">{t('previousEditionsPage.online')}</span>}
          <span className="previous-edition__visit">
            {t('previousEditionsPage.visit')}
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path d="M14 3h7v7M21 3l-9 9M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
            </svg>
          </span>
          <span className="previous-edition__sr-only">{t('previousEditionsPage.newTab')}</span>
        </div>
      </a>
    </li>
  );
}

export function PreviousEditionsPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="previous-editions-page" id="edicoes-anteriores">
      <section className="container-xl" aria-labelledby="previous-editions-title">
        <header className="previous-editions-page__heading">
          <BrandStripes className="wcall-mark" />
          <h1 id="previous-editions-title" className="about-title">{t('previousEditionsPage.title')}</h1>
          <p>{t('previousEditionsPage.description')}</p>
        </header>
        <ul className="previous-editions-grid">
          {PREVIOUS_EDITIONS.map((edition) => <EditionCard key={edition.year} edition={edition} />)}
        </ul>
      </section>
    </main>
  );
}
