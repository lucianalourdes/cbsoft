import type { Lang, Localized } from '@/lib/localized';
import type { SymposiumId } from './symposia';

export type AgendaKind = 'abstract' | 'full' | 'notification' | 'camera';

export interface AgendaEvent {
  symposium: SymposiumId;
  kind: AgendaKind;
  /** ISO 'YYYY-MM-DD' — every agenda entry is an all-day deadline. */
  date: string;
  title: Localized;
  description: Localized;
  displayDesc: Localized;
  url: string;
}

const TEMPLATES: Record<AgendaKind, { title: Localized; desc: Localized; displayDesc: Localized }> = {
  abstract: {
    title: {
      pt: '{A} — Registro de artigos (Trilha de Pesquisa)',
      en: '{A} — Abstract registration (Research Track)',
    },
    desc: {
      pt: 'Prazo para registro de artigos (resumo) na Trilha de Pesquisa do {A}.',
      en: 'Abstract registration deadline for the {A} Research Track.',
    },
    displayDesc: {
      pt: 'Trilha de Pesquisa — Registro de artigos',
      en: 'Research Track — Abstract registration',
    },
  },
  full: {
    title: {
      pt: '{A} — Submissão de artigos completos',
      en: '{A} — Full paper submission',
    },
    desc: {
      pt: 'Prazo para submissão dos artigos completos na Trilha de Pesquisa do {A}.',
      en: 'Full paper submission deadline for the {A} Research Track.',
    },
    displayDesc: {
      pt: 'Trilha de Pesquisa — Submissão de artigos completos',
      en: 'Research Track — Full paper submission',
    },
  },
  notification: {
    title: {
      pt: '{A} — Notificação de aceite',
      en: '{A} — Acceptance notification',
    },
    desc: {
      pt: 'Divulgação dos resultados da avaliação dos artigos do {A}.',
      en: 'Release of the review results for {A} papers.',
    },
    displayDesc: {
      pt: 'Notificação de aceite',
      en: 'Acceptance notification',
    },
  },
  camera: {
    title: {
      pt: '{A} — Versão camera-ready',
      en: '{A} — Camera-ready version',
    },
    desc: {
      pt: 'Prazo para envio da versão final dos artigos aceitos no {A}.',
      en: 'Deadline to submit the final version of accepted {A} papers.',
    },
    displayDesc: {
      pt: 'Versão camera-ready',
      en: 'Camera-ready version',
    },
  },
};

function fill(value: Localized, acronym: string): Localized {
  return {
    pt: value.pt.replaceAll('{A}', acronym),
    en: value.en.replaceAll('{A}', acronym),
  };
}

function event(symposium: SymposiumId, acronym: string, kind: AgendaKind, date: string): AgendaEvent {
  const tpl = TEMPLATES[kind];
  return {
    symposium,
    kind,
    date,
    title: fill(tpl.title, acronym),
    description: fill(tpl.desc, acronym),
    displayDesc: tpl.displayDesc,
    url: '#cfp',
  };
}

/** Key dates per symposium, in program order. */
export const AGENDA: Record<SymposiumId, AgendaEvent[]> = {
  sbes: [
    event('sbes', 'SBES', 'abstract', '2027-03-08'),
    event('sbes', 'SBES', 'full', '2027-03-15'),
    event('sbes', 'SBES', 'notification', '2027-05-15'),
    event('sbes', 'SBES', 'camera', '2027-06-15'),
  ],
  sbmf: [
    event('sbmf', 'SBMF', 'abstract', '2027-03-15'),
    event('sbmf', 'SBMF', 'full', '2027-03-22'),
    event('sbmf', 'SBMF', 'notification', '2027-05-22'),
    event('sbmf', 'SBMF', 'camera', '2027-06-19'),
  ],
  sbcars: [
    event('sbcars', 'SBCARS', 'abstract', '2027-03-22'),
    event('sbcars', 'SBCARS', 'full', '2027-03-29'),
    event('sbcars', 'SBCARS', 'notification', '2027-05-29'),
    event('sbcars', 'SBCARS', 'camera', '2027-06-22'),
  ],
  sast: [
    event('sast', 'SAST', 'abstract', '2027-03-29'),
    event('sast', 'SAST', 'full', '2027-04-05'),
    event('sast', 'SAST', 'notification', '2027-06-02'),
    event('sast', 'SAST', 'camera', '2027-06-25'),
  ],
};

const DATE_FORMATTERS: Record<Lang, Intl.DateTimeFormat> = {
  pt: new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }),
  en: new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }),
};

/** "8 de março de 2027" / "March 8, 2027" from an ISO date. */
export function formatAgendaDate(iso: string, lang: Lang): string {
  return DATE_FORMATTERS[lang].format(new Date(iso));
}
