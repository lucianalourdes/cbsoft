import { useTranslation } from 'react-i18next';
import { IMAGES } from '@/data/config';
import { useHeroCarousel } from '@/hooks/useHeroCarousel';
import { Countdown } from './Countdown';

const PHOTOS = [IMAGES.praca, IMAGES.praca2, IMAGES.praca3];

export function Hero() {
  const { t } = useTranslation();
  const carousel = useHeroCarousel(PHOTOS.length);
  const controlsDisabled = carousel.failed.length >= PHOTOS.length - 1;

  return (
    <section
      className="home-hero"
      aria-labelledby="hero-countdown-title"
      onMouseEnter={() => carousel.setHovered(true)}
      onMouseLeave={() => carousel.setHovered(false)}
      onPointerDownCapture={() => carousel.setInteracting(true)}
      onFocusCapture={() => carousel.setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) carousel.setFocused(false);
      }}
    >
      <div className="home-hero__photos" id="hero-photos" aria-hidden="true">
        {PHOTOS.map((src, index) => carousel.requested.includes(index) && !carousel.failed.includes(index) && (
          <img
            key={src}
            className={`home-hero__photo${carousel.visible === index ? ' is-visible' : ''}`}
            src={src}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
            {...{ fetchpriority: index === 0 ? 'high' : 'low' }}
            decoding="async"
            onLoad={() => carousel.onLoad(index)}
            onError={() => carousel.onError(index)}
          />
        ))}
      </div>

      <div className="home-hero__shade" aria-hidden="true" />

      <div className="home-hero__content">
        <Countdown />

        <div className="home-hero__details">
          <p className="home-hero__description">
            {t('hero.launchDescription')}
          </p>

          <div className="home-hero__actions">
            <a className="home-hero__button" href="#sobre">
              {t('hero.learnMore')}
            </a>

            <a className="home-hero__button_2" href="#patrocinio">
              {t('sponsorship.cta.sponsor.title')}
            </a>
          </div>

          <img
            className="home-hero__logo"
            src={IMAGES.logo_text_white}
            width={2059}
            height={728}
            alt={t('header.homeAria')}
          />

          <div
            className="home-hero__controls"
            role="group"
            aria-label={t('hero.carousel.label')}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                carousel.move(event.key === 'ArrowLeft' ? -1 : 1);
              }
            }}
          >
            <button type="button" aria-label={t('hero.carousel.previous')} aria-controls="hero-photos"
              disabled={controlsDisabled} onClick={() => carousel.move(-1)}>
              <span aria-hidden="true">‹</span>
            </button>
            {PHOTOS.map((_, index) => (
              <button key={index} type="button" className="home-hero__indicator"
                aria-label={t('hero.carousel.goTo', { number: index + 1 })}
                aria-controls="hero-photos" aria-current={carousel.active === index ? 'true' : undefined}
                disabled={carousel.failed.includes(index)} onClick={() => carousel.select(index)}>
                <span aria-hidden="true" />
              </button>
            ))}
            <button type="button" aria-label={t('hero.carousel.next')} aria-controls="hero-photos"
              disabled={controlsDisabled} onClick={() => carousel.move(1)}>
              <span aria-hidden="true">›</span>
            </button>
            <button type="button" className="home-hero__rotation"
              disabled={carousel.reducedMotion || controlsDisabled}
              onClick={() => carousel.setPaused(!carousel.paused)}>
              {t(carousel.paused || carousel.reducedMotion ? 'hero.carousel.play' : 'hero.carousel.pause')}
            </button>
            <span className="sr-only" aria-live={carousel.rotating ? 'off' : 'polite'} aria-atomic="true">
              {t('hero.carousel.position', { number: carousel.active + 1, total: PHOTOS.length })}
            </span>
          </div>
        </div>
      </div>

      <div className="home-hero__wave" aria-hidden="true">
        <img src={IMAGES.grafismo_3} alt="" />
      </div>
    </section>
  );
}
