import type { Localized } from '@/lib/localized';

export type TransitIcon = 'metro' | 'bus';

export interface TransitOption {
  id: string;
  icon: TransitIcon;
  name: Localized;
  meta: Localized;
  url: string;
}

interface Venue {
  /** Set to null if the venue confirmation is withdrawn. */
  name: Localized | null;
  address: Localized | null;
  infoUrl: string;
  officialUrl: string;
  mapsUrl: string;
  directionsUrl: string;
  transitSourceUrl: string;
  transit: TransitOption[];
  video: { id: string };
}

const destination = encodeURIComponent(
  'PUC Minas Coração Eucarístico, Avenida Dom José Gaspar, 500, Belo Horizonte, MG, Brasil',
);

/** Campus and video confirmed by the organizing team in issue #9.
 * Address: PUC Minas, Localização e Acesso.
 * Regional transit: PUC Minas, Concertos Dominicais Peter Lund (28/05/2026).
 * Buildings, rooms and the event entrance remain unconfirmed.
 */
export const VENUE: Venue = {
  name: {
    pt: 'PUC Minas — Campus Coração Eucarístico',
    en: 'PUC Minas — Coração Eucarístico Campus',
  },
  address: {
    pt: 'Av. Dom José Gaspar, 500 — Coração Eucarístico, Belo Horizonte — MG, CEP 30535-901, Brasil',
    en: 'Av. Dom José Gaspar, 500 — Coração Eucarístico, Belo Horizonte — MG, 30535-901, Brazil',
  },
  infoUrl: '/local',
  officialUrl: 'https://www.pucminas.br/central/Paginas/localizacao.aspx',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${destination}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
  transitSourceUrl: 'https://www.pucminas.br/sala-imprensa/eventos/Paginas/Concertos-Dominicais-Peter-Lund-1.aspx',
  transit: [
    {
      id: 'metro',
      icon: 'metro',
      name: { pt: 'Metrô — Estação Gameleira', en: 'Metro — Gameleira station' },
      meta: {
        pt: 'Referência para a região do campus. Consulte a operação do metrô e planeje o trecho até o endereço do evento.',
        en: 'A reference for the campus area. Check metro services and plan the onward journey to the event address.',
      },
      url: 'https://www.metrobh.com.br/va-de-metro/',
    },
    {
      id: 'bus',
      icon: 'bus',
      name: { pt: 'Ônibus — 5401, 9410, 4110 e 4111', en: 'Bus — 5401, 9410, 4110 and 4111' },
      meta: {
        pt: 'Linhas indicadas pela PUC Minas para a região. Consulte os pontos e itinerários atualizados na Prefeitura de Belo Horizonte.',
        en: 'Routes listed by PUC Minas for the area. Check current stops and routes with Belo Horizonte City Hall.',
      },
      url: 'https://prefeitura.pbh.gov.br/sumob/onibus/pontos-de-onibus',
    },
  ],
  video: { id: 'HPzwyRFs37I' },
};
