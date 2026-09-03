import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SPONSOR_TIERS } from '@/data/sponsors';

export function Sponsorship() {
  const { t } = useTranslation();

  return (
    <Reveal id="patrocinio" className="py-20 md:py-28">
      <div className="container-xl">
        <SectionHeading
          number="07"
          eyebrow={t('sponsorship.eyebrow')}
          title={t('sponsorship.title')}
          intro={t('sponsorship.intro')}
        />

        <div className="mt-12 space-y-8">
          {SPONSOR_TIERS.map((tier) => (
            <div key={tier.id}>
              <p
                className="font-mono text-xs uppercase tracking-[.12em] mb-3"
                style={{ color: tier.colorVar }}
              >
                {t(`sponsorship.${tier.id}`)}
              </p>
              <div className={`grid ${tier.gridCols} gap-3`}>
                {Array.from({ length: tier.slots }).map((_, i) => (
                  <div
                    key={i}
                    className={`sponsor-tile rounded-md ${tier.tileHeight} flex items-center justify-center font-mono ${
                      tier.compact ? 'text-[11px]' : 'text-xs'
                    }`}
                  >
                    {t('sponsorship.slotAvailable')}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
