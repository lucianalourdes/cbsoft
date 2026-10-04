import type { Localized } from '@/lib/localized';

/** One destination the home-page search can suggest. `href` is a route
 *  ("/sobre") or a home-page anchor ("#agenda"). */
export interface SearchEntry {
  href: string;
  title: Localized;
  description: Localized;
  /** Extra terms that should match, beyond the title and description. */
  keywords: string[];
}

export const SEARCH_ENTRIES: SearchEntry[] = [
  {
    href: '/inscricoes',
    title: { pt: 'Inscrições', en: 'Registration' },
    description: {
      pt: 'Valores de inscrição, lotes e associação à SBC.',
      en: 'Registration fees, rates and SBC membership.',
    },
    keywords: ['inscrever', 'inscreva-se', 'valores', 'preço', 'lote', 'register', 'fees', 'price', 'combo'],
  },
  {
    href: '/workshops/chamada',
    title: { pt: 'Chamada de Workshops', en: 'Call for Workshops' },
    description: {
      pt: 'Como submeter propostas de workshops para o CBSoft 2027.',
      en: 'How to submit workshop proposals to CBSoft 2027.',
    },
    keywords: ['submissão', 'submissões', 'proposta', 'chamada', 'jems', 'submission', 'call', 'proposal'],
  },
  {
    href: '/artigos-aceitos',
    title: { pt: 'Artigos Aceitos', en: 'Accepted Papers' },
    description: {
      pt: 'Trabalhos aceitos nos simpósios e trilhas do CBSoft 2027.',
      en: 'Papers accepted in the CBSoft 2027 symposia and tracks.',
    },
    keywords: ['artigos', 'aceitos', 'trabalhos', 'papers', 'accepted', 'publicações'],
  },
  {
    href: '/voluntarios',
    title: { pt: 'Chamada para Voluntários', en: 'Call for Volunteers' },
    description: {
      pt: 'Benefícios, requisitos e como se inscrever como voluntário.',
      en: 'Benefits, requirements and how to apply as a volunteer.',
    },
    keywords: ['voluntário', 'voluntariado', 'aluno', 'estudante', 'volunteer', 'student'],
  },
  {
    href: '/codigo-de-conduta',
    title: { pt: 'Código de Conduta', en: 'Code of Conduct' },
    description: {
      pt: 'Regras de convivência e combate ao assédio no evento.',
      en: 'Rules of conduct and anti-harassment policy for the event.',
    },
    keywords: ['conduta', 'assédio', 'regras', 'conduct', 'harassment', 'rules'],
  },
  {
    href: '/sobre',
    title: { pt: 'Sobre o CBSoft', en: 'About CBSoft' },
    description: {
      pt: 'O congresso, seus simpósios, a identidade visual e a SBC.',
      en: 'The conference, its symposia, visual identity and SBC.',
    },
    keywords: ['sobre', 'sbes', 'sbmf', 'sbcars', 'sast', 'simpósio', 'sbc', 'identidade', 'about', 'symposium'],
  },
  {
    href: '#agenda',
    title: { pt: 'Agenda', en: 'Agenda' },
    description: {
      pt: 'Programação e datas do evento.',
      en: 'Event schedule and dates.',
    },
    keywords: ['programação', 'palestras', 'eventos', 'datas', 'program', 'schedule', 'talks', 'dates'],
  },
  {
    href: '#local',
    title: { pt: 'Local do evento', en: 'Venue' },
    description: {
      pt: 'Campus Lourdes da PUC Minas, em Belo Horizonte.',
      en: 'PUC Minas Lourdes Campus, in Belo Horizonte.',
    },
    keywords: ['localização', 'onde', 'endereço', 'mapa', 'puc', 'location', 'where', 'address', 'map'],
  },
  {
    href: '#patrocinio',
    title: { pt: 'Patrocínio e realização', en: 'Sponsorship and organizers' },
    description: {
      pt: 'Instituições que realizam e apoiam o CBSoft 2027.',
      en: 'Institutions that organize and support CBSoft 2027.',
    },
    keywords: ['patrocinadores', 'apoio', 'ufmg', 'puc', 'sponsors', 'support'],
  },
];
