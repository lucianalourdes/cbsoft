import '@/styles/page-content.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Committee } from '@/components/sections/Committee';
import { PartnerRows } from '@/components/sections/Sponsorship';
import { BrandBar } from '@/components/ui/BrandBar';

export function OrganizationPage() {
  const { t } = useTranslation();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#comite') {
      document.getElementById('comite')?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <main className="about-page" id="organizacao">
      <section className="about-section about-top" aria-labelledby="organizacao-titulo">
        <div className="container-xl">
          <h1 id="organizacao-titulo" className="about-title">
            <BrandBar />
            {t('organizationPage.title')}
          </h1>
          <PartnerRows />
        </div>
      </section>

      <Committee />
    </main>
  );
}
