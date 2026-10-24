import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { SYMPOSIA } from '@/data/symposia';
import { SBES_TRACKS } from '@/data/sbesTracks';
import { sbesTrackCallPath, symposiumCallPath } from '@/data/symposiumCalls';

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
  const path = pathname.replace(/\/+$/, '') || '/';
  const callFor = SYMPOSIA.find((s) => symposiumCallPath(s.id) === path);
  const trackCall = SBES_TRACKS.find((track) => sbesTrackCallPath(track.id) === path);
  const pageKey = callFor || trackCall ? 'symposiumCallPage' : PAGE_KEYS[path] ?? 'homePage';
  const acronym = trackCall
    ? `SBES — ${t(`headerMenu.sbes.tracks.${trackCall.id}.title`)}`
    : callFor?.acronym;

  useEffect(() => {
    document.title = t(`${pageKey}.metaTitle`, { acronym });
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = t(`${pageKey}.metaDescription`, { acronym });
  }, [pageKey, acronym, t]);

  return null;
}
