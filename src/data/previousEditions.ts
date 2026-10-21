/** Historical editions from alinebrito/site-cbsoft2027 (previous-editions.yaml).
 *  2026 is now part of the history on the 2027 website. Keep archived URLs
 *  as published: older editions may no longer be maintained by their hosts. */
export interface PreviousEdition {
  year: number;
  url: string;
  location: string;
  online?: boolean;
}

export const PREVIOUS_EDITIONS: readonly PreviousEdition[] = [
  {
    "year": 2026,
    "url": "https://cbsoft.sbc.org.br/2026",
    "location": "São Paulo, São Paulo"
  },
  {
    "year": 2025,
    "url": "http://cbsoft.sbc.org.br/2025/",
    "location": "Recife, Pernambuco"
  },
  {
    "year": 2024,
    "url": "http://cbsoft.sbc.org.br/2024/",
    "location": "Curitiba, Paraná"
  },
  {
    "year": 2023,
    "url": "http://cbsoft.sbc.org.br/2023/",
    "location": "Campo Grande, Mato Grosso do Sul"
  },
  {
    "year": 2022,
    "url": "https://cbsoft2022.facom.ufu.br/",
    "location": "Uberlândia, Minas Gerais",
    "online": true
  },
  {
    "year": 2021,
    "url": "http://cbsoft2021.joinville.udesc.br",
    "location": "Joinville, Santa Catarina",
    "online": true
  },
  {
    "year": 2020,
    "url": "https://cbsoft.sbc.org.br/2020/",
    "location": "Natal, Rio Grande do Norte",
    "online": true
  },
  {
    "year": 2019,
    "url": "https://cbsoft.sbc.org.br/2019/",
    "location": "Salvador, Bahia"
  },
  {
    "year": 2018,
    "url": "https://cbsoft.sbc.org.br/2018/",
    "location": "São Carlos, São Paulo"
  },
  {
    "year": 2017,
    "url": "https://cbsoft.sbc.org.br/2017/",
    "location": "Fortaleza, Ceará"
  },
  {
    "year": 2016,
    "url": "https://cbsoft.sbc.org.br/2016/",
    "location": "Maringá, Paraná"
  },
  {
    "year": 2015,
    "url": "https://pt-br.facebook.com/cbsoft2015/",
    "location": "Belo Horizonte, Minas Gerais"
  },
  {
    "year": 2014,
    "url": "https://pt-br.facebook.com/cbsoft2014/",
    "location": "Maceió, Alagoas"
  },
  {
    "year": 2013,
    "url": "https://cbsoft.sbc.org.br/2013/",
    "location": "Brasília, Distrito Federal"
  },
  {
    "year": 2012,
    "url": "https://cbsoft.sbc.org.br/2012/",
    "location": "Natal, Rio Grande do Norte"
  },
  {
    "year": 2011,
    "url": "https://cbsoft.sbc.org.br/2011/",
    "location": "São Paulo"
  },
  {
    "year": 2010,
    "url": "https://cbsoft.sbc.org.br/2010/",
    "location": "Salvador, Bahia"
  }
];
