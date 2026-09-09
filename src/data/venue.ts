import type { Localized } from '@/lib/localized';

/** Which vector glyph fronts a transit option — keys map to the icon
 *  set in Location.tsx. */
export type TransitIcon = 'metro' | 'bus';

/** One public-transport option shown in the "Como chegar" list. */
export interface TransitOption {
  id: string;
  icon: TransitIcon;
  /** Line / station name — the primary, semibold label. */
  name: Localized;
  /** Route detail shown smaller under the name. */
  meta: Localized;
}

/** Host institution + how to get there. Provisional until the local
 *  committee confirms the 2027 venue and accreditation rooms. */
export const VENUE = {
  transit: [
    {
      id: 'metro',
      icon: 'metro',
      name: { pt: 'Estação Vilarinho', en: 'Vilarinho station' },
      meta: { pt: 'Linha 1 do Metrô', en: 'Metro Line 1' },
    },
    {
      id: 'bus-9110',
      icon: 'bus',
      name: { pt: 'Linha 9110', en: 'Bus 9110' },
      meta: { pt: 'Campus Pampulha — UFMG', en: 'Pampulha campus — UFMG' },
    },
    {
      id: 'bus-5106',
      icon: 'bus',
      name: { pt: 'Linha 5106', en: 'Bus 5106' },
      meta: {
        pt: 'Pampulha via Antônio Carlos',
        en: 'Pampulha via Antônio Carlos',
      },
    },
  ] satisfies TransitOption[],

  /** "Mais informações" target — swap for the real venue page. */
  infoUrl: '#',

  video: {
    /** TODO: substituir pelo ID real do vídeo de anúncio do CBSOFT'27. */
    id: 'aq5_9pMwkV0',
    channel: 'SBC — Sociedade Brasileira de Computação',
  },
} as const;
