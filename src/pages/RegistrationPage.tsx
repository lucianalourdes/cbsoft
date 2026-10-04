import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { RegistrationFees } from '@/components/sections/Registration';
import { BrandStripes } from '@/components/ui/BrandStripes';
import { REGISTRATION_URL, SBC_URL } from '@/data/registration';

export function RegistrationPage() {
  const { t } = useTranslation();

  useEffect(() => {
    const previous = document.title;
    document.title = t('registrationPage.metaTitle');
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, [t]);

  return (
    <main className="about-page" id="inscricoes-cbsoft">
      <section className="about-section about-top" aria-labelledby="inscricoes-titulo">
        <div className="container-xl">
          <h1 id="inscricoes-titulo" className="about-title">
            <BrandStripes className="wcall-mark" />
            {t('registrationPage.title')}
          </h1>

          {/* Until the SBC system opens, show the CTA as a disabled placeholder. */}
          <div className="registration-cta">
            {REGISTRATION_URL ? (
              <a className="btn btn-accent" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
                {t('registrationPage.cta')}
              </a>
            ) : (
              <span className="btn btn-accent is-disabled" aria-disabled="true">
                {t('registrationPage.ctaSoon')}
              </span>
            )}
          </div>

          <div className="about-prose about-text">
            <p>
              <Trans
                i18nKey="registrationPage.p1"
                components={{
                  sbc: <a href={SBC_URL} className="wcall-link" target="_blank" rel="noopener noreferrer" />,
                }}
              />
            </p>
            <p>{t('registrationPage.p2')}</p>
            <p>
              <Trans i18nKey="registrationPage.p3" components={{ b: <strong /> }} />
            </p>
            <p>{t('registrationPage.p4')}</p>
            <p>
              <Trans i18nKey="registrationPage.p5" components={{ b: <strong /> }} />
            </p>
          </div>

          <RegistrationFees />
        </div>
      </section>
    </main>
  );
}
