/**
 * Confirmed facts about CBSoft 2027, shared by every page that names the
 * edition, city or year. The 2026 congress was the XVII edition, so 2027 is
 * the XVIII (18ª). Dates are NOT confirmed yet: they live in
 * app/config/publication.ts until approved.
 */
export const CONGRESS = {
  /** Roman-numeral form, e.g. used as "XVIII edição do CBSoft". */
  editionRoman: 'XVIII',
  /** Ordinal form, e.g. used as "18ª edição do CBSoft". */
  editionOrdinal: '18ª',
  year: 2027,
  city: 'Belo Horizonte',
  state: 'MG',
  stateName: 'Minas Gerais',
} as const;
