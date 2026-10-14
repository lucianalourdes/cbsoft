import { useTranslation } from 'react-i18next';
import { Reveal } from '@/shared/components/Reveal';
import { SectionHeading } from '@/shared/components/SectionHeading';
import { Button } from '@/shared/components/Button';
import { DataTable } from '@/shared/components/DataTable';
import { useLang } from '@/shared/hooks/useLang';
import { pick } from '@/shared/utils/localized';
import { CFP_MILESTONES } from '@/features/calls/data/cfp';
import { PUBLICATION } from '@/app/config/publication';

export function CallForPapers() {
  const { t } = useTranslation();
  const lang = useLang();

  const rows = CFP_MILESTONES.map((m) => [
    pick(m.milestone, lang),
    m.date ?? t('cfp.tbd'),
  ]);
  const strongRows = CFP_MILESTONES.map((m) => Boolean(m.strong));
  const { guidelinesUrl, submissionUrl } = PUBLICATION.callForPapers;

  return (
    <Reveal id="cfp" className="py-20 md:py-28">
      <div className="container-xl">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 min-w-0">
            <SectionHeading
              number="03"
              eyebrow={t('cfp.eyebrow')}
              title={t('cfp.title')}
              titleClassName="text-3xl"
              intro={t('cfp.intro')}
              introClassName="mt-4 leading-relaxed"
            />
            {/* Each CTA appears only once its URL is set in PUBLICATION. */}
            <div className="flex flex-col gap-3 mt-7">
              {guidelinesUrl && (
                <Button variant="accent" href={guidelinesUrl} className="!text-white justify-center" style={{ backgroundColor: 'var(--magenta)', color: 'var(--ink)' }}>
                  {t('cfp.guidelines')}
                </Button>
              )}
              {submissionUrl && (
                <Button
                  href={submissionUrl}
                  className="justify-center border"
                  style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}
                >
                  {t('cfp.submit')}
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 min-w-0">
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
