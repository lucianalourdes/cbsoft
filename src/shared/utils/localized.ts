export type Lang = 'pt' | 'en';

/** A value that exists in both site languages. */
export type Localized<T = string> = { pt: T; en: T };

/** Narrow i18next's language string (`pt-BR`, `en`, …) to our two codes. */
export function toLang(language: string | undefined): Lang {
  return language?.toLowerCase().startsWith('en') ? 'en' : 'pt';
}

/** Pick the current-language side of a Localized pair. */
export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang];
}
