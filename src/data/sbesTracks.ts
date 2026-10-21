/** SBES tracks, each with its own call for papers and accepted-papers page
 *  (/sbes/<slug>/artigos-aceitos). Titles and descriptions live in
 *  common.json under `headerMenu.sbes.tracks.<id>`. */
export type SbesTrackId = 'research' | 'education' | 'ideas' | 'tools' | 'industry' | 'ctic' | 'ctd';

export interface AcceptedPaper {
  title: string;
  authors: string[];
}

export interface SbesTrack {
  id: SbesTrackId;
  /** URL segment, e.g. /sbes/pesquisa/artigos-aceitos. */
  slug: string;
  /** Accepted papers; empty until the 2027 notifications are out. */
  papers: AcceptedPaper[];
}

export const SBES_TRACKS: SbesTrack[] = [
  { id: 'research', slug: 'pesquisa', papers: [] },
  { id: 'education', slug: 'educacao', papers: [] },
  { id: 'ideas', slug: 'ideias-inovadoras', papers: [] },
  { id: 'tools', slug: 'ferramentas', papers: [] },
  { id: 'industry', slug: 'industria', papers: [] },
  { id: 'ctic', slug: 'ctic', papers: [] },
  { id: 'ctd', slug: 'ctd', papers: [] },
];

export const acceptedPapersPath = (track: SbesTrack) => `/sbes/${track.slug}/artigos-aceitos`;
