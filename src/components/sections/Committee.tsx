import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import {
  GENERAL_CHAIRS,
  LOCAL_COMMITTEE_ROLES,
  PC_CHAIR_SYMPOSIA,
} from '@/data/committee';

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3
        className="font-mono text-xs uppercase tracking-[.12em] pb-3 mb-4 border-b"
        style={{ borderColor: 'var(--line)', color: 'var(--purple)' }}
      >
        {title}
      </h3>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}

export function Committee() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <Reveal id="comite" className="py-20 md:py-28" style={{ background: 'var(--surface-alt)' }}>
      <div className="container-xl">
        <SectionHeading number="06" eyebrow={t('committee.eyebrow')} title={t('committee.title')} />
        <p className="mt-3 max-w-2xl text-sm" style={{ color: 'var(--slate-soft)' }}>
          {t('committee.note')}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <Group title={t('committee.generalChairs')}>
            {GENERAL_CHAIRS.map((person, i) => (
              <li key={i}>
                <span className="font-medium">{pick(person.name, lang)}</span>
                <br />
                <span style={{ color: 'var(--slate)' }}>{pick(person.detail, lang)}</span>
              </li>
            ))}
          </Group>

          <Group title={t('committee.pcChairs')}>
            {PC_CHAIR_SYMPOSIA.map((acronym) => (
              <li key={acronym}>
                <span className="font-medium">{acronym}</span>{' '}
                — <span style={{ color: 'var(--slate)' }}>{t('committee.chairTbc')}</span>
              </li>
            ))}
          </Group>

          <Group title={t('committee.localCommittee')}>
            {LOCAL_COMMITTEE_ROLES.map((role) => (
              <li key={role.en}>
                <span className="font-medium">{pick(role, lang)}</span>{' '}
                — <span style={{ color: 'var(--slate)' }}>{t('committee.tbc')}</span>
              </li>
            ))}
          </Group>
        </div>
      </div>
    </Reveal>
  );
}
