import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const PAGE_KEYS: Record<string, string> = {
  '/': 'homePage',
  '/sobre': 'aboutPage',
  '/edicoes-anteriores': 'previousEditionsPage',
  '/workshops/chamada': 'workshopsCallPage',
};

/** Update metadata on both navigation and language changes, including returning home. */
export function PageMetadata() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const pageKey = PAGE_KEYS[pathname.replace(/\/+$/, '') || '/'] ?? 'homePage';

  useEffect(() => {
    document.title = t(`${pageKey}.metaTitle`);
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = t(`${pageKey}.metaDescription`);
  }, [pageKey, t]);

  return null;
}
