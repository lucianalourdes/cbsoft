import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HEADER_MENUS, type HeaderMenuId } from '@/data/headerMenu';
import { NAV_ITEMS } from '@/data/nav';
import { IMAGES } from '@/data/config';
import { useHideOnScrollDown } from '@/hooks/useHideOnScrollDown';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { HeaderMegaMenu } from './HeaderMegaMenu';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<HeaderMenuId | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusFirstLink = useRef(false);
  const scrolledDown = useHideOnScrollDown();
  // Keep the SBC strip in place while a menu is open, so nothing jumps.
  const sbcHidden = scrolledDown && activeMenu === null && !mobileMenuOpen;

  function cancelClose() {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function closeMegaMenu() {
    cancelClose();
    focusFirstLink.current = false;
    setActiveMenu(null);
  }

  function closeAllMenus() {
    closeMegaMenu();
    setMobileMenuOpen(false);
  }

  useOnClickOutside(headerRef, closeAllMenus, activeMenu !== null || mobileMenuOpen);

  useEffect(() => () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (activeMenu && focusFirstLink.current) {
      headerRef.current
        ?.querySelector<HTMLElement>(`#header-mega-menu-${activeMenu} a`)
        ?.focus();
      focusFirstLink.current = false;
    }
  }, [activeMenu]);

  useEffect(() => {
    const breakpoint = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      setActiveMenu(null);
      setMobileMenuOpen(false);
    };
    breakpoint.addEventListener('change', onChange);
    return () => breakpoint.removeEventListener('change', onChange);
  }, []);

  // Publish how far the fixed header reaches down the viewport (main bar,
  // plus the SBC strip while it is shown) as --site-header-offset, so sticky
  // content such as the call-page sidebars can stop just below it. Measured
  // from the main bar, not the header box, so an open mega menu is ignored.
  useEffect(() => {
    const header = headerRef.current;
    const strip = header?.querySelector<HTMLElement>('.site-header__sbc');
    const bar = header?.querySelector<HTMLElement>('.site-header__inner');
    if (!header || !strip || !bar) return;

    const update = () => {
      const style = getComputedStyle(header);
      const bottom =
        bar.offsetTop +
        bar.offsetHeight +
        parseFloat(style.paddingBottom) +
        parseFloat(style.borderBottomWidth) -
        (sbcHidden ? strip.offsetHeight : 0);
      document.documentElement.style.setProperty('--site-header-offset', `${bottom}px`);
    };

    update();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(update);
    observer.observe(strip);
    observer.observe(bar);
    return () => observer.disconnect();
  }, [sbcHidden]);

  return (
    <header
      ref={headerRef}
      className={`site-header${sbcHidden ? ' is-sbc-hidden' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && mobileMenuOpen) {
          event.preventDefault();
          closeAllMenus();
          mobileTriggerRef.current?.focus();
        }
      }}
    >
      {/* "Realização: SBC" strip — slides away while scrolling down. */}
      <div className="site-header__sbc" aria-hidden={sbcHidden || undefined}>
        <div className="site-header__sbc-inner">
          <span className="site-header__sbc-label">{t('header.organizedBy')}</span>
          <a
            href="https://www.sbc.org.br/"
            className="site-header__sbc-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('header.sbcAria')}
            tabIndex={sbcHidden ? -1 : undefined}
          >
            <img src={IMAGES.sbc_logo} alt="" width={1814} height={576} />
          </a>
        </div>
      </div>

      <div className="site-header__inner">
        <Link
          to="/"
          className="site-header__logo-link"
          aria-label={t('header.homeAria')}
          onClick={closeAllMenus}
        >
          {/* Brand manual: the full logo needs at least 220px, which only wide
              screens have room for. Smaller screens show just the symbol. */}
          <picture>
            <source media="(min-width: 1280px)" srcSet={IMAGES.logo_horizontal} />
            <img className="site-header__logo" src={IMAGES.grafismo_icon} alt="" />
          </picture>
        </Link>

        <nav className="site-header__nav" aria-label={t('header.navAria')}>
          {NAV_ITEMS.map((item) => {
            const open = activeMenu === item.id;

            return (
              <div
                key={item.id}
                className={`site-header__mega-root site-header__mega-root--${item.id}`}
                onPointerEnter={(event) => {
                  if (event.pointerType !== 'mouse') return;
                  cancelClose();
                  setActiveMenu(item.id);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType !== 'mouse') return;
                  cancelClose();
                  closeTimer.current = setTimeout(() => {
                    setActiveMenu((current) => current === item.id ? null : current);
                    closeTimer.current = null;
                  }, 150);
                }}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    closeMegaMenu();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape' && open) {
                    event.preventDefault();
                    event.stopPropagation();
                    closeMegaMenu();
                    event.currentTarget.querySelector('button')?.focus();
                  }
                }}
              >
                <button
                  id={`header-trigger-${item.id}`}
                  type="button"
                  className={`site-header__nav-item${open ? ' is-active' : ''}`}
                  aria-expanded={open}
                  aria-controls={`header-mega-menu-${item.id}`}
                  onClick={() => {
                    cancelClose();
                    setActiveMenu((current) => current === item.id ? null : item.id);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault();
                      cancelClose();
                      if (open) {
                        event.currentTarget.parentElement?.querySelector('a')?.focus();
                      } else {
                        focusFirstLink.current = true;
                        setActiveMenu(item.id);
                      }
                    }
                  }}
                >
                  <span>{t(item.key)}</span>
                  <img src={IMAGES.chevron_down} width={16} height={16} alt="" aria-hidden="true" />
                </button>

                {open && (
                  <HeaderMegaMenu
                    id={item.id}
                    menu={HEADER_MENUS[item.id]}
                    onNavigate={closeMegaMenu}
                  />
                )}
              </div>
            );
          })}
        </nav>
        <div className="language-switcher">
          <LanguageSwitcher />
        </div>

        <Link to="/inscricoes" className="site-header__register" onClick={closeAllMenus}>
          {t('header.register')}
        </Link>

        <button
          ref={mobileTriggerRef}
          id="menu-toggle"
          type="button"
          className={`site-header__mobile-toggle${mobileMenuOpen ? ' is-open' : ''}`}
          aria-label={t(mobileMenuOpen ? 'header.closeMenu' : 'header.openMenu')}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            closeMegaMenu();
            setMobileMenuOpen((open) => !open);
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
}
