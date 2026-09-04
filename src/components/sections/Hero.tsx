import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IMAGES } from '@/data/config';
import { Button } from '@/components/ui/Button';
import { Wordmark } from '@/components/ui/Wordmark';
import { Countdown } from './Countdown';

export function Hero() {
  const { t } = useTranslation();
  const [photoBroken, setPhotoBroken] = useState(false);

  return (
    <section
      className="relative overflow-hidden pt-32 md:pt-44"
      style={{ background: 'linear-gradient(180deg, var(--surface) 0%, var(--paper) 100%)' }}
    >
      {/* Full-bleed photo — Praça da Liberdade, Belo Horizonte. */}
      <div className="hero-photo-bleed hidden lg:block" aria-hidden="true">
        <img
          src={IMAGES.praca}
          alt=""
          loading="lazy"
          className={photoBroken ? 'is-broken' : undefined}
          onError={() => setPhotoBroken(true)}
        />
        <div className="hero-photo-fallback">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          <p className="text-xs font-medium leading-relaxed">{t('hero.photoFallback')}</p>
        </div>
      </div>

      <div className="relative z-10 flex">
        <div className="flex-1 min-w-0">
          <div className="container-xl pb-28 md:pb-36">
            <div>
              <p className="eyebrow">{t('hero.eyebrow')}</p>

              <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 mt-4">
                <img
                  src={IMAGES.grafismo}
                  alt="Logotipo CBSOFT'27"
                  className="shrink-0 w-auto h-28 sm:h-48 md:h-56 lg:h-64 object-contain"
                />
                <div className="min-w-0 max-w-xl lg:max-w-2xl">
                  <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[0.98]">
                    <Wordmark />
                  </h1>
                  <p
                    className="font-display text-2xl md:text-3xl font-semibold mt-3"
                    style={{ color: 'var(--ink)' }}
                  >
                    {t('hero.subtitle')}
                  </p>
                  <p
                    className="mt-5 text-base md:text-lg max-w-xl leading-relaxed"
                    style={{ color: 'var(--slate)' }}
                  >
                    {t('hero.dates')}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button variant="accent" href="#cfp">
                      {t('hero.ctaCfp')}
                    </Button>
                    <Button variant="outline" href="#inscricoes">
                      {t('hero.ctaRegister')}
                    </Button>
                  </div>
                </div>
              </div>

              <Countdown />
            </div>
          </div>
        </div>

        {/* Reserved spacer, same width/breakpoint as .hero-photo-bleed. */}
        <div
          className="hero-spacer-fade hidden lg:block shrink-0"
          style={{ width: '44%', minWidth: '380px' }}
          aria-hidden="true"
        />
      </div>

      <div className="hero-wave z-20" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,64 C240,110 480,10 720,50 C960,90 1200,20 1440,64 L1440,120 L0,120 Z"
            style={{ fill: 'var(--logo-leaf)' }}
            opacity="0.5"
          />
          <path
            d="M0,80 C240,40 480,120 720,80 C960,40 1200,110 1440,72 L1440,120 L0,120 Z"
            style={{ fill: 'var(--logo-cyan)' }}
            opacity="0.55"
          />
          <path
            d="M0,96 C240,70 480,112 720,90 C960,70 1200,110 1440,88 L1440,120 L0,120 Z"
            style={{ fill: 'var(--logo-purple)' }}
            opacity="0.6"
          />
          <path
            d="M0,108 C240,96 480,118 720,104 C960,92 1200,116 1440,104 L1440,120 L0,120 Z"
            style={{ fill: 'var(--logo-pink)' }}
            opacity="0.75"
          />
        </svg>
      </div>
    </section>
  );
}
