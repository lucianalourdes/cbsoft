import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLang } from '@/hooks/useLang';
import { pick } from '@/lib/localized';
import { ACCENT_VARS, COMPLEMENTARY_TRACKS, SYMPOSIA } from '@/data/symposia';

export function Symposia() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <Reveal id="eventos" className="py-20 md:py-28" style={{ background: 'var(--surface-alt)' }}>
      <div className="container-xl">
        <SectionHeading
          number="02"
          eyebrow={t('events.eyebrow')}
          title={t('events.title')}
          titleClassName="text-3xl md:text-4xl max-w-2xl"
          intro={t('events.intro')}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {SYMPOSIA.map((s) => {
            const accent = ACCENT_VARS[s.accent];
            return (
              <article key={s.id} className="card p-6 flex flex-col">
                <span
                  className="tag self-start"
                  style={{ borderColor: accent.border, color: accent.text }}
                >
                  MOD.{s.mod}
                </span>
                <h3 className="font-display text-xl font-semibold mt-4">{s.acronym}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--slate)' }}>
                  {pick(s.blurb, lang)}
                </p>
              </article>
            );
          })}
        </div>

        <p
          className="font-mono text-xs uppercase tracking-[.12em] mt-12 mb-4"
          style={{ color: 'var(--slate-soft)' }}
        >
          {t('events.complementary')}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMPLEMENTARY_TRACKS.map((track) => (
            <div
              key={track.en}
              className="border rounded-md p-5"
              style={{ borderColor: 'var(--line)' }}
            >
              <h4 className="font-semibold text-sm">{pick(track, lang)}</h4>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
