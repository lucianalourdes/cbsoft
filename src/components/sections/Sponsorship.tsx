import './Sponsorship.css';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { asset, CONTACT_EMAIL } from '@/data/config';
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
function Row({
  label,
  entries,
  modifier,
}: {
  label: string;
  entries: OrgEntry[];
  modifier?: string;
}) {
  return (
    <div className={`contrib-row${modifier ? ` contrib-row--${modifier}` : ''}`}>
      <p className="contrib-row__label">{label}</p>
      <div className="contrib-row__logos">
        {entries.map((entry) => (
          <Logo key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

/** Organização + Realização marks, also shown on the /organizacao page. */
export function PartnerRows() {
  const { t } = useTranslation();

  return (
    <div className="contrib-inst">
      <Row
        label={t('sponsorship.organization')}
        entries={ORGANIZERS}
        modifier="organizers"
      />
      <Row label={t('sponsorship.realization')} entries={REALIZATION} />
    </div>
  );
}

export function Sponsorship() {
  const { t } = useTranslation();

  return (
    <Reveal id="patrocinio" className="py-20 md:py-28">
      <div className="container-xl">
        <SectionHeading
          titleClassName="text-sm md:text-base uppercase tracking-[.04em]"
          title={t('sponsorship.title')}
        />

        <PartnerRows />

        <div className="contrib-patron">
          <div className="contrib-patron__body">
            <p className="contrib-patron__kicker">{t('sponsorship.support')}</p>
            <p className="contrib-patron__title">{t('sponsorship.cta.sponsor.title')}</p>
            <p className="contrib-patron__text">{t('sponsorship.cta.sponsor.text')}</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="contrib-cta">
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
