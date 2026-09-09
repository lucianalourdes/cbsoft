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

  const spokenTime = cells
    .map(({ value, label }) => `${value} ${label}`)
    .join(', ');

  return (
    <div className="launch-countdown">
      <h1
        id="hero-countdown-title"
        className="launch-countdown__title"
      >
        {t('hero.countdownTitle')}
      </h1>

      <div
        id="countdown"
        className="launch-countdown__clock"
        role="timer"
        aria-label={`${t('hero.countdownAria')}: ${spokenTime}`}
      >
        {cells.map((cell, index) => (
          <div
            className="launch-countdown__fragment"
            key={cell.label}
          >
            <div
              className="launch-countdown__unit"
              aria-hidden="true"
            >
              <span className="launch-countdown__label">
                {cell.label}
              </span>

              <span className="launch-countdown__value">
                {cell.value}
              </span>
            </div>

            {index < cells.length - 1 && (
              <span
                className="launch-countdown__separator"
                aria-hidden="true"
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}