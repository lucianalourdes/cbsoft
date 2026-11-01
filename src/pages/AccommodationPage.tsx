import '@/styles/page-content.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrandBar } from '@/components/ui/BrandBar';

/** Placeholder until the 2027 accommodation options are announced. */
export function AccommodationPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-page" id="acomodacoes">
      <section className="about-section about-top" aria-labelledby="acomodacoes-titulo">
        <div className="container-xl">
          <h1 id="acomodacoes-titulo" className="about-title">
            <BrandBar />
            {t('accommodationPage.title')}
          </h1>
          <div className="about-prose about-text">
            <p>{t('accommodationPage.pending')}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
