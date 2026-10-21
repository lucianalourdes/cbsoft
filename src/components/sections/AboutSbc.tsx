import { Trans, useTranslation } from 'react-i18next';
import { BrandStripes } from '@/components/ui/BrandStripes';
import { SBC_MEMBERSHIP_URL, SBC_SPECIAL_COMMITTEES_URL } from '@/data/about';

const externalLink = (href: string) => (
  <a href={href} className="wcall-link" target="_blank" rel="noopener noreferrer" />
);

/** "Sobre a SBC" — institutional text about the Brazilian Computer Society. */
export function AboutSbc() {
  const { t } = useTranslation();

  return (
    <section className="about-section" aria-labelledby="sobre-sbc-titulo">
      <div className="container-xl">
        <h2 id="sobre-sbc-titulo" className="about-h2">
          <BrandStripes className="wcall-mark" />
          {t('aboutSbc.title')}
        </h2>
        <div className="about-prose about-text">
          <p>
            <Trans i18nKey="aboutSbc.p1" components={{ b: <strong /> }} />
          </p>
          <p>{t('aboutSbc.p2')}</p>
          <p>{t('aboutSbc.p3')}</p>
          <p>
            <Trans
              i18nKey="aboutSbc.p4"
              components={{
                b: <strong />,
                lists: externalLink(SBC_SPECIAL_COMMITTEES_URL),
                join: externalLink(SBC_MEMBERSHIP_URL),
              }}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
