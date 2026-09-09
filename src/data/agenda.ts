import type { Lang, Localized } from '@/lib/localized';
import type { SymposiumId } from './symposia';

export type AgendaKind = 'abstract' | 'full' | 'notification' | 'camera';

export interface AgendaEvent {
  symposium: SymposiumId;
  kind: AgendaKind;
  /** ISO 'YYYY-MM-DD' all-day deadline, or `null` while the date is
   *  still to be announced. */
  date: string | null;
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

function event(
  symposium: SymposiumId,
  acronym: string,
  kind: AgendaKind,
  date: string | null = null,
): AgendaEvent {
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

/** Key dates per symposium, in program order. Dates are still to be
 *  announced — every entry currently renders as "a definir". */
export const AGENDA: Record<SymposiumId, AgendaEvent[]> = {
  sbes: [
    event('sbes', 'SBES', 'abstract'),
    event('sbes', 'SBES', 'full'),
    event('sbes', 'SBES', 'notification'),
    event('sbes', 'SBES', 'camera'),
  ],
  sblp: [
    event('sblp', 'SBLP', 'abstract'),
    event('sblp', 'SBLP', 'full'),
    event('sblp', 'SBLP', 'notification'),
    event('sblp', 'SBLP', 'camera'),
  ],
  sbcars: [
    event('sbcars', 'SBCARS', 'abstract'),
    event('sbcars', 'SBCARS', 'full'),
    event('sbcars', 'SBCARS', 'notification'),
    event('sbcars', 'SBCARS', 'camera'),
  ],
  sast: [
    event('sast', 'SAST', 'abstract'),
    event('sast', 'SAST', 'full'),
    event('sast', 'SAST', 'notification'),
    event('sast', 'SAST', 'camera'),
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
