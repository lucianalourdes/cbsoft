import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/DataTable';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { CFP_MILESTONES } from '@/data/cfp';

export function CallForPapers() {
  const { t } = useTranslation();
  const lang = useLang();

  const rows = CFP_MILESTONES.map((m) => [
    pick(m.milestone, lang),
    m.date ?? t('cfp.tbd'),
  ]);
  const strongRows = CFP_MILESTONES.map((m) => Boolean(m.strong));

  return (
    <Reveal id="cfp" className="py-20 md:py-28">
      <div className="container-xl">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionHeading
              number="03"
              eyebrow={t('cfp.eyebrow')}
              title={t('cfp.title')}
              titleClassName="text-3xl"
              intro={t('cfp.intro')}
              introClassName="mt-4 leading-relaxed"
            />
            <div className="flex flex-col gap-3 mt-7">
              <Button variant="accent" href="#" className="!text-white justify-center">
                {t('cfp.guidelines')}
              </Button>
              <Button
                href="#"
                className="justify-center border"
                style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
              >
                {t('cfp.submit')}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <DataTable
              minWidth="560px"
              headStyle={{ background: 'var(--brand-ink)', color: 'var(--brand-on)' }}
              columns={[
                { header: t('cfp.colMilestone') },
                { header: t('cfp.colDate'), cellClassName: 'font-mono num-tabular font-medium' },
              ]}
              rows={rows}
              strongRows={strongRows}
            />
            <p className="text-xs mt-3" style={{ color: 'var(--slate-soft)' }}>
              {t('cfp.note')}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
