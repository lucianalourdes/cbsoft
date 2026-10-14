import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

/** Translation group holding each page's metaTitle (and metaDescription,
 *  when it has its own). Accepted papers sets its per-track title itself. */
const PAGE_KEYS: Record<string, string> = {
  [ROUTES.home]: 'homePage',
  [ROUTES.venue]: 'locationPage',
  [ROUTES.about]: 'aboutPage',
  [ROUTES.previousEditions]: 'previousEditionsPage',
  [ROUTES.registration]: 'registrationPage',
  [ROUTES.conduct]: 'conductPage',
  [ROUTES.volunteers]: 'volunteersPage',
  [ROUTES.workshopsCall]: 'workshopsCallPage',
};

/** Update metadata on both navigation and language changes, including returning home. */
export function PageMetadata() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const pageKey = PAGE_KEYS[pathname.replace(/\/+$/, '') || '/'] ?? 'homePage';

  useEffect(() => {
    document.title = t(`${pageKey}.metaTitle`);
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    // Pages without their own description keep the home page's.
    const descriptionKey = i18n.exists(`${pageKey}.metaDescription`)
      ? `${pageKey}.metaDescription`
      : 'homePage.metaDescription';
    if (description) description.content = t(descriptionKey);
  }, [pageKey, t, i18n]);

  return null;
}
