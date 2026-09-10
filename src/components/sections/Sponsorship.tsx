import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { asset } from '@/data/config';
import { ORGANIZERS, REALIZATION, type OrgEntry } from '@/data/sponsors';

/** A single partner mark, sitting directly on the page — no card, no frame.
 *  Falls back to the institution's name if the logo file is missing. */
function Logo({ entry }: { entry: OrgEntry }) {
  const [broken, setBroken] = useState(false);

  const inner = broken ? (
    <span className="contrib-logo__fallback">{entry.name}</span>
  ) : (
    <img
      src={asset(entry.logo)}
      alt={entry.name}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );

  const className = `contrib-logo contrib-logo--${entry.id}`;

  return entry.url ? (
    <a href={entry.url} target="_blank" rel="noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

/** One line of the partner grid: small purple label + the marks it covers. */
function Row({ label, entries }: { label: string; entries: OrgEntry[] }) {
  return (
    <div className="contrib-row">
      <p className="contrib-row__label">{label}</p>
      <div className="contrib-row__logos">
        {entries.map((entry) => (
          <Logo key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export function Sponsorship() {
  const { t } = useTranslation();

  return (
    <Reveal id="patrocinio" className="py-20 md:py-28">
      <div className="container-xl">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <SectionHeading
            className="md:col-span-5"
            titleClassName="text-4xl md:text-5xl"
            title={t('sponsorship.title')}
          />
          <div className="md:col-span-7">
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: 'var(--slate)' }}
            >
              {t('sponsorship.intro')}
            </p>
          </div>
        </div>

        <div className="contrib-inst">
          <Row label={t('sponsorship.organization')} entries={ORGANIZERS} />
          <Row label={t('sponsorship.realization')} entries={REALIZATION} />
        </div>

        <div className="contrib-patron">
          <div className="contrib-patron__body">
            <p className="contrib-patron__kicker">{t('sponsorship.support')}</p>
            <p className="contrib-patron__title">{t('sponsorship.cta.sponsor.title')}</p>
            <p className="contrib-patron__text">{t('sponsorship.cta.sponsor.text')}</p>
          </div>
          <a href="#comite" className="contrib-cta">
            {t('sponsorship.cta.action')}
            <span className="contrib-cta__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}
