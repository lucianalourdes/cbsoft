import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AboutSbc } from '@/components/sections/AboutSbc';
import { VisualIdentity } from '@/components/sections/VisualIdentity';
import { BrandStripes } from '@/components/ui/BrandStripes';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { ABOUT_SYMPOSIA } from '@/data/about';

export function AboutPage() {
  const { t } = useTranslation();
  const lang = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // "…; " between items, "…; e" before the last one, "." at the end.
  const last = ABOUT_SYMPOSIA.length - 1;
  const listSeparator = (index: number) =>
    index === last ? '.' : index === last - 1 ? t('aboutPage.listAnd') : ';';

  return (
    <main className="about-page" id="sobre-cbsoft">
      {/* Sobre o CBSoft — further sections of the page go below this one. */}
      <section className="about-section about-top" aria-labelledby="sobre-titulo">
        <div className="container-xl">
          <h1 id="sobre-titulo" className="about-title">
            <BrandStripes className="wcall-mark" />
            {t('aboutPage.title')}
          </h1>
          <div className="about-prose about-text">
            <p>{t('aboutPage.p1')}</p>
            <p>{t('aboutPage.p2')}</p>
            <ul className="about-symposia">
              {ABOUT_SYMPOSIA.map((symposium, index) => (
                <li key={symposium.id}>
                  <strong>{pick(symposium.name, lang)}</strong>
                  {`, ${pick(symposium.description, lang)}${listSeparator(index)}`}
                </li>
              ))}
            </ul>
            <p>{t('aboutPage.program')}</p>
          </div>
        </div>
      </section>

      <VisualIdentity />
      <AboutSbc />
    </main>
  );
}
