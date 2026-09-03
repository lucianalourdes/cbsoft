import type { Localized } from '@/lib/localized';

export interface CfpMilestone {
  milestone: Localized;
  /** Not localized in the original site — a short PT-style date label. */
  date: string;
  /** The closing "Conference" row is emphasised. */
  strong?: boolean;
}

export const CFP_MILESTONES: CfpMilestone[] = [
  {
    milestone: { pt: 'Submissão de artigos completos', en: 'Full paper submission' },
    date: '15 mar 2027',
  },
  {
    milestone: { pt: 'Período de resposta aos revisores', en: 'Rebuttal period' },
    date: '06–10 abr 2027',
  },
  {
    milestone: { pt: 'Notificação de aceite', en: 'Acceptance notification' },
    date: '15 mai 2027',
  },
  {
    milestone: { pt: 'Versão camera-ready', en: 'Camera-ready version' },
    date: '15 jun 2027',
  },
  {
    milestone: {
      pt: 'Prazo de inscrição com desconto (early-bird)',
      en: 'Early-bird registration deadline',
    },
    date: '31 ago 2027',
  },
  {
    milestone: { pt: 'Congresso', en: 'Conference' },
    date: '27 set – 01 out 2027',
    strong: true,
  },
];
