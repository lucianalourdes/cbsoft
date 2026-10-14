/** Every route path of the site, in one place. The router, menus, search
 *  and links read from here, so a URL changes in a single line. */
export const ROUTES = {
  home: '/',
  venue: '/local',
  about: '/sobre',
  previousEditions: '/edicoes-anteriores',
  registration: '/inscricoes',
  conduct: '/codigo-de-conduta',
  volunteers: '/voluntarios',
  acceptedPapers: '/artigos-aceitos',
  sbesTrackPapers: '/sbes/:track/artigos-aceitos',
  workshopsCall: '/workshops/chamada',
} as const;

/** Accepted papers of one SBES track, e.g. /sbes/pesquisa/artigos-aceitos. */
export const sbesTrackPapersPath = (slug: string) =>
  ROUTES.sbesTrackPapers.replace(':track', slug);

/** Every "Chamada de Trabalhos" link points here for now — the only call
 *  page so far. Swap in per-symposium/track pages once they exist. */
export const CALL_FOR_PAPERS_PATH = ROUTES.workshopsCall;

/** Likewise, every "Artigos Aceitos" link shares one page for now; the
 *  per-track pages (/sbes/<slug>/artigos-aceitos) are ready for later. */
export const ACCEPTED_PAPERS_PATH = ROUTES.acceptedPapers;
