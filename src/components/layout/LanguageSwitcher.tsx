import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useLang } from '@/hooks/useLang';
import { SUPPORTED_LANGS } from '@/i18n';

interface LanguageSwitcherProps {
  withSeparator?: boolean;
  className?: string;
  groupAriaLabel?: string;
}

/** PT / EN toggle — swaps the active language via react-i18next. */
export function LanguageSwitcher({
  withSeparator = false,
  className = '',
  groupAriaLabel = 'Seletor de idioma / Language selector',
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const current = useLang();

  return (
    <div className={className} role="group" aria-label={groupAriaLabel}>
      {SUPPORTED_LANGS.map((lng, i) => (
        <Fragment key={lng}>
          {withSeparator && i > 0 && (
            <span style={{ color: 'rgba(255,255,255,.25)' }} aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            className={`lang-btn ${current === lng ? 'active' : ''}`.trim()}
            style={{ color: '#fff' }}
            aria-pressed={current === lng}
            onClick={() => void i18n.changeLanguage(lng)}
          >
            {lng.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
