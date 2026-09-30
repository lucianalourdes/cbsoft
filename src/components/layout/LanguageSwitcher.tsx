import { useTranslation } from 'react-i18next';
import { useLang } from '@/hooks/useLang';
import { SUPPORTED_LANGS } from '@/i18n';

interface LanguageSwitcherProps {
  className?: string;
  groupAriaLabel?: string;
}

/** Flags are decorative; full language names remain available to assistive technology. */
export function LanguageSwitcher({
  className = '',
  groupAriaLabel,
}: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const current = useLang();

  return (
    <div
      className={`language-options ${className}`.trim()}
      role="group"
      aria-label={groupAriaLabel ?? t('language.selector')}
    >
      {SUPPORTED_LANGS.map((lng) => (
        <button
          key={lng}
          type="button"
          className={`lang-btn ${current === lng ? 'active' : ''}`.trim()}
          aria-label={t(`language.${lng}`)}
          title={t(`language.${lng}`)}
          lang={lng === 'pt' ? 'pt-BR' : 'en'}
          aria-pressed={current === lng}
          onClick={() => void i18n.changeLanguage(lng)}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/icons/flag-${lng === 'pt' ? 'br' : 'gb'}.svg`}
            className="lang-btn__flag"
            width={20}
            height={14}
            alt=""
            aria-hidden="true"
          />
          <span>{lng.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
