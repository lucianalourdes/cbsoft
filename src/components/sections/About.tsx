import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SymposiumCarousel } from './SymposiumCarousel';

/** "O que é o CBSoft?" and the symposia carousel, side by side on desktop. */
export function About() {
  const { t } = useTranslation();

  const stats = [
    { value: '04', label: t('about.statSymposia') },
    { value: '15+', label: t('about.statYears') },
    { value: 'X', label: t('about.statDays') },
  ];

  return (
    <Reveal id="sobre" className="home-about py-20 md:py-28" aria-labelledby="sobre-home-titulo">
      <div className="container-xl home-about__grid">
        <div className="home-about__intro">
          <SectionHeading title={<span id="sobre-home-titulo">{t('about.title')}</span>} />
          <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: 'var(--slate)' }}>
            {t('about.p1')}
          </p>

          <dl className="grid grid-cols-3 gap-6 mt-10 pt-8 rule">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-3xl font-semibold" style={{ color: 'var(--purple)' }}>
                  {stat.value}
                </dt>
                <dd className="text-sm mt-1" style={{ color: 'var(--slate)' }}>
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Keeps the #agenda anchor the header menus link to. */}
        <div id="agenda" className="home-about__symposia">
          <SymposiumCarousel />
        </div>
      </div>
    </Reveal>
  );
}
