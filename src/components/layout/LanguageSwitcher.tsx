import { useTranslation } from 'react-i18next';
import { useLang } from '@/hooks/useLang';

interface LanguageSwitcherProps {
  className?: string;
  groupAriaLabel?: string;
}

/** The flag shows the language that will be activated on click. */
export function LanguageSwitcher({
  className = '',
  groupAriaLabel,
}: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const current = useLang();
  const target = current === 'pt' ? 'en' : 'pt';
  const label = t(`language.${target}`);

  return (
    <div
      className={`language-options ${className}`.trim()}
      role="group"
      aria-label={groupAriaLabel ?? t('language.selector')}
    >
      <button
        type="button"
        className="language-toggle"
        aria-label={label}
        title={label}
        lang={target === 'pt' ? 'pt-BR' : 'en'}
        onClick={() => void i18n.changeLanguage(target)}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/icons/flag-${target === 'pt' ? 'br' : 'gb'}.svg`}
          className="language-toggle__flag"
          width={32}
          height={22}
          alt=""
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
