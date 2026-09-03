import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function About() {
  const { t } = useTranslation();

  const stats = [
    { value: '04', label: t('about.statSymposia') },
    { value: '20+', label: t('about.statYears') },
    { value: '5', label: t('about.statDays') },
  ];

  return (
    <Reveal id="sobre" className="py-20 md:py-28">
      <div className="container-xl">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <SectionHeading
            className="md:col-span-5"
            number="01"
            eyebrow={t('about.eyebrow')}
            title={t('about.title')}
          />
          <div className="md:col-span-7">
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--slate)' }}>
              {t('about.p1')}
            </p>
            <p
              className="mt-4 text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--slate)' }}
            >
              {t('about.p2')}
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
        </div>
      </div>
    </Reveal>
  );
}
