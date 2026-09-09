import type { Localized } from '@/lib/localized';

export interface RegistrationRow {
  category: Localized;
  /** Fee in BRL, or `null` while the amount is still to be announced. */
  earlyBird: number | null;
  regular: number | null;
  onSite: number | null;
}

export const REGISTRATION_ROWS: RegistrationRow[] = [
  {
    category: {
      pt: 'Estudante de Graduação (sócio SBC)',
      en: 'Undergraduate student (SBC member)',
    },
    earlyBird: null,
    regular: null,
    onSite: null,
  },
  {
    category: {
      pt: 'Estudante de Pós-Graduação (sócio SBC)',
      en: 'Graduate student (SBC member)',
    },
    earlyBird: null,
    regular: null,
    onSite: null,
  },
  {
    category: { pt: 'Profissional (sócio SBC)', en: 'Professional (SBC member)' },
    earlyBird: null,
    regular: null,
    onSite: null,
  },
  {
    category: { pt: 'Profissional (não sócio)', en: 'Professional (non-member)' },
    earlyBird: null,
    regular: null,
    onSite: null,
  },
];

const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

/** "R$ 450" / "R$ 1.200" — always BRL, as in the original site.
 *  Returns `null` when the fee is not set yet, so the caller can show
 *  a localized "a definir". */
export function formatFee(value: number | null): string | null {
  return value == null ? null : BRL.format(value).replace(/\s/g, ' ');
}
