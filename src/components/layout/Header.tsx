import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HEADER_MENUS, type HeaderMenuId } from '@/data/headerMenu';
import { NAV_ITEMS } from '@/data/nav';
import { IMAGES } from '@/data/config';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { HeaderMegaMenu } from './HeaderMegaMenu';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<HeaderMenuId | null>(null);
  const desktopNavRef = useRef<HTMLElement>(null);

  useOnClickOutside(
    desktopNavRef,
    () => setActiveMenu(null),
    activeMenu !== null,
  );

  const closeMegaMenu = () => setActiveMenu(null);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          href="#top"
          className="site-header__logo-link"
          aria-label={t('header.homeAria')}
        >
          <img
            className="site-header__logo"
            src={IMAGES.logo_horizontal}
            alt=""
            aria-hidden="true"
          />
        </a>

        <nav
          ref={desktopNavRef}
          className="site-header__nav"
          aria-label={t('header.navAria')}
        >
          {NAV_ITEMS.map((item) => {
            const open = activeMenu === item.id;

            return (
              <div
                className={`site-header__mega-root site-header__mega-root--${item.id}`}
                key={item.id}
                onMouseEnter={() => setActiveMenu(item.id)}
                onMouseLeave={closeMegaMenu}
                onFocusCapture={() => setActiveMenu(item.id)}
                onBlurCapture={(event) => {
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget as Node | null,
                    )
                  ) {
                    closeMegaMenu();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    closeMegaMenu();
                    event.currentTarget.querySelector('button')?.focus();
                  }
                }}
              >
                <button
                  type="button"
                  className={`site-header__nav-item${open ? ' is-active' : ''}`}
                  aria-expanded={open}
                  aria-controls={`header-mega-menu-${item.id}`}
                  onClick={() => setActiveMenu(open ? null : item.id)}
                >
                  <span>{t(item.key)}</span>
                  <img src={IMAGES.chevron_down} alt="" aria-hidden="true" />
                </button>

                {open && (
                  <HeaderMegaMenu
                    id={item.id}
                    menu={HEADER_MENUS[item.key as HeaderMenuId]}
                    onNavigate={closeMegaMenu}
                  />
                )}
              </div>
            );
          })}
        </nav>

        <a href="#inscricoes" className="site-header__register">
          {t('header.register')}
        </a>

        <button
          id="menu-toggle"
          type="button"
          className={`site-header__mobile-toggle${mobileMenuOpen ? ' is-open' : ''}`}
          aria-label={t('header.openMenu')}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
