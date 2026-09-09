import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { asset } from '@/data/config';
import { ORGANIZERS, REALIZATION, type OrgEntry } from '@/data/sponsors';

/** Logo tile that falls back to the entry's name if the image is missing. */
function LogoTile({ entry }: { entry: OrgEntry }) {
  const [broken, setBroken] = useState(false);

  const inner = broken ? (
    <span className="font-mono text-xs uppercase tracking-[.12em] text-center px-3">
      {entry.name}
    </span>
  ) : (
    <img
      src={asset(entry.logo)}
      alt={entry.name}
      loading="lazy"
      className="max-h-20 max-w-[85%] object-contain"
      onError={() => setBroken(true)}
    />
  );

  const className =
    'sponsor-tile rounded-md h-32 w-full flex items-center justify-center p-5';

  return entry.url ? (
    <a
      href={entry.url}
      target="_blank"
      rel="noreferrer"
      className={`${className} transition-opacity hover:opacity-80`}
    >
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

function Group({ title, entries }: { title: string; entries: OrgEntry[] }) {
  return (
    <div>
      <h3
        className="font-mono text-xs uppercase tracking-[.12em] pb-3 mb-4 border-b"
        style={{ borderColor: 'var(--line)', color: 'var(--purple)' }}
      >
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3 max-w-md">
        {entries.map((entry) => (
          <LogoTile key={entry.id} entry={entry} />
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
        <SectionHeading
          number="07"
          eyebrow={t('sponsorship.eyebrow')}
          title={t('sponsorship.title')}
          intro={t('sponsorship.intro')}
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Group title={t('sponsorship.organization')} entries={ORGANIZERS} />
          <Group title={t('sponsorship.realization')} entries={REALIZATION} />
        </div>

        <div className="mt-16">
          <h3
            className="font-mono text-xs uppercase tracking-[.12em] pb-3 mb-4 border-b"
            style={{ borderColor: 'var(--line)', color: 'var(--purple)' }}
          >
            {t('sponsorship.support')}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {(['sponsor', 'supporter'] as const).map((kind) => (
              <a
                key={kind}
                href="#comite"
                className="sponsor-tile rounded-md p-6 flex flex-col gap-2 transition-colors hover:border-[var(--purple)]"
              >
                <span className="font-display text-lg font-semibold" style={{ color: 'var(--ink)' }}>
                  {t(`sponsorship.cta.${kind}.title`)}
                </span>
                <span className="text-sm" style={{ color: 'var(--slate)' }}>
                  {t(`sponsorship.cta.${kind}.text`)}
                </span>
                <span
                  className="font-mono text-xs uppercase tracking-[.12em] mt-2"
                  style={{ color: 'var(--purple)' }}
                >
                  {t('sponsorship.cta.action')} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
