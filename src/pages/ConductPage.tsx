import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BrandStripes } from '@/components/ui/BrandStripes';

export function ConductPage() {
  const { t } = useTranslation();

  useEffect(() => {
    const previous = document.title;
    document.title = t('conductPage.metaTitle');
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, [t]);

  return (
    <main className="about-page" id="codigo-de-conduta">
      <section className="about-section about-top" aria-labelledby="conduta-titulo">
        <div className="container-xl">
          <h1 id="conduta-titulo" className="about-title">
            <BrandStripes className="wcall-mark" />
            {t('conductPage.title')}
          </h1>
          <div className="about-prose about-text">
            <p>{t('conductPage.p1')}</p>
            <p>
              <Trans i18nKey="conductPage.p2" components={{ b: <strong /> }} />
            </p>
            <p>
              <Trans i18nKey="conductPage.p3" components={{ b: <strong /> }} />
            </p>
            <p>{t('conductPage.p4')}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
