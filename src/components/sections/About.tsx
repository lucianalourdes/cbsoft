import './About.css';

import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SymposiumCarousel } from './SymposiumCarousel';
import { HomeEventCards } from './HomeEventCards';

/** "O que é o CBSoft?" and the symposia carousel, side by side on desktop. */
export function About() {
  const { t } = useTranslation();

  return (
    <Reveal id="sobre" className="home-about py-20 md:py-28" aria-labelledby="sobre-home-titulo">
      <div className="container-xl home-about__grid">
        <div className="home-about__intro">
          <SectionHeading title={<span id="sobre-home-titulo">{t('about.title')}</span>} />
          <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: 'var(--slate)' }}>
            {t('about.p1')}
          </p>

          <HomeEventCards />
        </div>

        {/* Keeps the #agenda anchor the header menus link to. */}
        <div id="agenda" className="home-about__symposia">
          <SymposiumCarousel />
        </div>
      </div>
    </Reveal>
  );
}
