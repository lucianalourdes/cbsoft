import '@/styles/page-content.css';
import '@/styles/links.css';
import '@/components/ui/Button.css';

import './RegistrationPage.css';

import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { RegistrationFees } from '@/components/sections/Registration';
import { BrandBar } from '@/components/ui/BrandBar';
import { SBC_URL } from '@/data/registration';
import { PUBLICATION, registrationOpen } from '@/data/publication';

export function RegistrationPage() {
  const { t } = useTranslation();
  const open = registrationOpen();

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
            <BrandBar />
            {t('registrationPage.title')}
          </h1>

          {/* "Em breve" until fees, categories and the SBC link are approved
              in PUBLICATION.registration. */}
          <div className="registration-cta">
            {open ? (
              <a className="btn btn-accent" href={PUBLICATION.registration.url!} target="_blank" rel="noopener noreferrer">
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
            {open ? (
              <>
                <p>
                  <Trans i18nKey="registrationPage.p3" components={{ b: <strong /> }} />
                </p>
                <p>{t('registrationPage.p4')}</p>
                <p>
                  <Trans i18nKey="registrationPage.p5" components={{ b: <strong /> }} />
                </p>
              </>
            ) : (
              <p className="registration-soon" role="note">
                {t('registrationPage.soon')}
              </p>
            )}
          </div>

          {open && <RegistrationFees />}
        </div>
      </section>
    </main>
  );
}
