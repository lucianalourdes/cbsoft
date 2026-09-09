import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable } from '@/components/ui/DataTable';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { REGISTRATION_ROWS, formatFee } from '@/data/registration';

export function Registration() {
  const { t } = useTranslation();
  const lang = useLang();

  const money = 'font-mono num-tabular';
  const rows = REGISTRATION_ROWS.map((r) => [
    pick(r.category, lang),
    formatFee(r.earlyBird),
    formatFee(r.regular),
    formatFee(r.onSite),
  ]);

  return (
    <Reveal id="inscricoes" className="py-20 md:py-28">
      <div className="container-xl">
        <SectionHeading
          number="04"
          eyebrow={t('registration.eyebrow')}
          title={t('registration.title')}
          intro={t('registration.intro')}
        />

        <div className="mt-10">
          <DataTable
            minWidth="640px"
            headStyle={{ background: 'var(--logo-purple)', color: '#fff' }}
            columns={[
              { header: t('registration.colCategory') },
              { header: t('registration.colEarly'), align: 'right', cellClassName: money },
              { header: t('registration.colRegular'), align: 'right', cellClassName: money },
              { header: t('registration.colOnsite'), align: 'right', cellClassName: money },
            ]}
            rows={rows}
          />
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--slate-soft)' }}>
          {t('registration.note')}
        </p>
      </div>
    </Reveal>
  );
}
