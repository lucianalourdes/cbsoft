import { useTranslation } from 'react-i18next';
import { useCountdown } from '@/hooks/useCountdown';
import { COUNTDOWN_DEADLINE } from '@/data/config';

export function Countdown() {
  const { t } = useTranslation();
  const { d, h, m, s } = useCountdown(COUNTDOWN_DEADLINE);

  const cells = [
    { value: d, label: t('hero.units.days') },
    { value: h, label: t('hero.units.hours') },
    { value: m, label: t('hero.units.min') },
    { value: s, label: t('hero.units.sec') },
  ];

  return (
    <div className="mt-12 max-w-xl">
      <p
        className="font-mono text-xs uppercase tracking-[.14em]"
        style={{ color: 'var(--slate-soft)' }}
      >
        {t('hero.countdownLabel')}
      </p>
      <div
        id="countdown"
        className="mt-3 grid grid-cols-4 gap-3 sm:gap-4"
        role="timer"
        aria-live="polite"
        aria-label={t('hero.countdownAria')}
      >
        {cells.map((cell) => (
          <div key={cell.label} className="card rounded-md py-3 text-center">
            <div
              className="font-mono num-tabular text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--ink)' }}
            >
              {cell.value}
            </div>
            <div
              className="font-mono text-[10px] uppercase tracking-wider mt-1"
              style={{ color: 'var(--slate-soft)' }}
            >
              {cell.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
