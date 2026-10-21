import { useTranslation } from 'react-i18next';
import { type Lang, toLang } from '@/lib/localized';

/** Current site language narrowed to 'pt' | 'en'. */
export function useLang(): Lang {
  const { i18n } = useTranslation();
  return toLang(i18n.language);
}
