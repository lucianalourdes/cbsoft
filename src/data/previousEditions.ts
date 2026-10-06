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
    "url": "https://cbsoft.sbc.org.br/2026/",
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
    "url": "https://cbsoft2020.imd.ufrn.br",
    "location": "Natal, Rio Grande do Norte",
    "online": true
  },
  {
    "year": 2019,
    "url": "http://cbsoft2019.ufba.br/",
    "location": "Salvador, Bahia"
  },
  {
    "year": 2018,
    "url": "http://cbsoft2018.icmc.usp.br/#/cbsoft",
    "location": "São Carlos, São Paulo"
  },
  {
    "year": 2017,
    "url": "http://www.lia.ufc.br/~cbsoft2017/",
    "location": "Fortaleza, Ceará"
  },
  {
    "year": 2016,
    "url": "http://cbsoft.org/cbsoft2016/vii-congresso-brasileiro-de-software-teoria-e-pratica-cbsoft-2016.html",
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
    "url": "http://cbsoft2013.unb.br",
    "location": "Brasília, Distrito Federal"
  },
  {
    "year": 2012,
    "url": "https://www.facebook.com/cbsoft.natal/",
    "location": "Natal, Rio Grande do Norte"
  },
  {
    "year": 2011,
    "url": "http://www.each.usp.br/cbsoft2011/",
    "location": "São Paulo"
  },
  {
    "year": 2010,
    "url": "http://wiki.dcc.ufba.br/CBSOFT",
    "location": "Salvador, Bahia"
  }
];
