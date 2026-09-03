import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '@/data/nav';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Collapsible navigation panel for narrow viewports (lg:hidden). */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    const panel = panelRef.current;
    setMaxHeight(open && panel ? `${panel.scrollHeight}px` : '0px');
  }, [open]);

  return (
    <nav
      id="mobile-menu"
      className="lg:hidden overflow-hidden"
      style={{ background: 'var(--brand-ink-soft)', maxHeight, opacity: open ? 1 : 0 }}
      aria-label="Navegação móvel"
    >
      <div ref={panelRef} className="container-xl flex flex-col py-4 gap-1 text-sm font-medium">
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className={i < NAV_ITEMS.length - 1 ? 'py-2.5 border-b' : 'py-2.5'}
            style={{ borderColor: 'rgba(255,255,255,.1)', color: '#DCD2E8' }}
            onClick={onClose}
          >
            {t(item.key)}
          </a>
        ))}
        <div
          className="flex items-center gap-3 pt-3 mt-1 border-t"
          style={{ borderColor: 'rgba(255,255,255,.1)' }}
        >
          <span className="font-mono text-[11px]" style={{ color: '#8A7A9E' }}>
            {t('header.langLabel')}
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
