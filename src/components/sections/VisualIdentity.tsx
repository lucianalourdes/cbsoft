import { useTranslation } from 'react-i18next';
import { BrandStripes } from '@/components/ui/BrandStripes';
import { IMAGES } from '@/data/config';

/** "Identidade Visual do CBSOFT 2027" — a short tour of the brand manual:
 *  concept (Edifício Niemeyer) and logo. */
export function VisualIdentity() {
  const { t } = useTranslation();

  return (
    <section className="about-section brand-id" aria-labelledby="identidade-visual-titulo">
      <div className="container-xl">
        <h2 id="identidade-visual-titulo" className="about-h2">
          <BrandStripes className="wcall-mark" />
          {t('visualIdentity.title')}
        </h2>
        <p className="about-prose brand-id__intro">{t('visualIdentity.intro')}</p>

        <div className="brand-id__layout">
          <figure className="brand-id__photo">
            <img
              src={IMAGES.edificio_niemeyer}
              alt={t('visualIdentity.photoAlt')}
              width={543}
              height={749}
              loading="lazy"
            />
            <figcaption>{t('visualIdentity.photoCaption')}</figcaption>
          </figure>

          <div className="brand-id__concept">
            <img
              className="brand-id__logo"
              src={IMAGES.logo_horizontal}
              alt={t('visualIdentity.logoAlt')}
              width={5196}
              height={1802}
              loading="lazy"
            />
            <h3 className="brand-id__h3">{t('visualIdentity.conceptTitle')}</h3>
            <div className="about-prose">
              <p>{t('visualIdentity.conceptP1')}</p>
              <p>{t('visualIdentity.conceptP2')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
