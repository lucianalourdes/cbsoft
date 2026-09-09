import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HEADER_MENUS, type HeaderMenuId } from '@/data/headerMenu';
import { NAV_ITEMS } from '@/data/nav';
import { IMAGES } from '@/data/config';
import { HeaderMegaMenu } from './HeaderMegaMenu';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState<HeaderMenuId | null>(null);

  return (
    <nav id="mobile-menu" className="site-header__mobile-menu" aria-label={t('header.mobileNavAria')}>
      {NAV_ITEMS.map((item) => {
        const open = activeMenu === item.id;
        return (
          <div className="site-header__mobile-group" key={item.id}>
            <button
              id={`mobile-header-trigger-${item.id}`}
              type="button"
              className={`site-header__nav-item${open ? ' is-active' : ''}`}
              aria-expanded={open}
              aria-controls={`mobile-header-mega-menu-${item.id}`}
              onClick={() => setActiveMenu(open ? null : item.id)}
            >
              <span>{t(item.key)}</span>
              <img src={IMAGES.chevron_down} width={16} height={16} alt="" aria-hidden="true" />
            </button>
            {open && (
              <HeaderMegaMenu id={item.id} menu={HEADER_MENUS[item.id]} onNavigate={onClose} mobile />
            )}
          </div>
        );
      })}
      <a href="#inscricoes" className="site-header__mobile-register" onClick={onClose}>
        {t('header.register')}
      </a>
      <div className="site-header__mobile-language">
        <span>{t('header.langLabel')}</span>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
