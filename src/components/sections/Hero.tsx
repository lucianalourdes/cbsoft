import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IMAGES } from '@/data/config';
import { Countdown } from './Countdown';

export function Hero() {
  const { t } = useTranslation();
  const [photoBroken, setPhotoBroken] = useState(false);

  return (
    <section className="home-hero" aria-labelledby="hero-countdown-title">
      {!photoBroken && (
        <img
          className="home-hero__photo"
          src={IMAGES.praca}
          alt=""
          aria-hidden="true"
          loading="eager"
          onError={() => setPhotoBroken(true)}
        />
      )}

      <div className="home-hero__shade" aria-hidden="true" />

      <div className="home-hero__content">
        <Countdown />

        <p className="home-hero__description">
          {t('hero.launchDescription')}
        </p>

        <a className="home-hero__button" href="#sobre">
          {t('hero.learnMore')}
        </a>

        <a className="home-hero__button_2" href="#patrocinio" >
          {t('sponsorship.cta.sponsor.title')}
        </a>

        <img
          className="home-hero__logo"
          src={IMAGES.logo_text_white}
          alt={t('header.homeAria')}
        />
      </div>

      <div className="home-hero__wave" aria-hidden="true">
        <img src={IMAGES.grafismo_3} alt="" />
      </div>
    </section >
  );
}