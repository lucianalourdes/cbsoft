import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { KEYNOTE_TRACKS } from '@/data/keynotes';

export function Keynotes() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <Reveal id="palestrantes" className="py-20 md:py-28" style={{ background: 'var(--brand-ink)' }}>
      <div className="container-xl">
        <SectionHeading
          number="04"
          eyebrow={t('keynotes.eyebrow')}
          title={t('keynotes.title')}
          tone="onDark"
          intro={t('keynotes.intro')}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {KEYNOTE_TRACKS.map((track) => (
            <article key={track.en} className="card !bg-white/[.04] !border-white/10 p-6">
              <div
                className="w-14 h-14 rounded-full avatar-ph !bg-white/10 !border-white/20 flex items-center justify-center font-mono text-sm"
                style={{ color: '#C6B7D9' }}
              >
                ?
              </div>
              <h3 className="font-display text-lg font-semibold text-white mt-4">
                {t('keynotes.speakerTbc')}
              </h3>
              <p className="text-sm mt-1" style={{ color: '#8A7A9E' }}>
                {t('keynotes.institutionTbc')}
              </p>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: '#C6B7D9' }}>
                {t('keynotes.trackLabel')} {pick(track, lang)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
