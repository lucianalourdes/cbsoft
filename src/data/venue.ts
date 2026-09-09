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
      name: { pt: 'Estação Central', en: 'Central station' },
      meta: { pt: 'Linha 1 do Metrô', en: 'Metro Line 1' },
    },
    {
      id: 'move-raul-soares',
      icon: 'bus',
      name: { pt: 'Move — Praça Raul Soares', en: 'Move BRT — Praça Raul Soares' },
      meta: { pt: 'Corredores da Área Central', en: 'Downtown BRT corridors' },
    },
    {
      id: 'bus-4403',
      icon: 'bus',
      name: { pt: 'Linha 4403', en: 'Bus 4403' },
      meta: {
        pt: 'Lourdes / Savassi via Av. Brasil',
        en: 'Lourdes / Savassi via Av. Brasil',
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
