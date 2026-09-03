import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '@/data/nav';
import { IMAGES } from '@/data/config';
import { Wordmark } from '@/components/ui/Wordmark';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{ background: 'var(--brand-ink)', color: 'var(--brand-on)' }}
    >
      <div className="container-xl flex items-center justify-between h-16 md:h-[4.5rem]">
        <a href="#top" className="flex items-center gap-3 shrink-0" aria-label={t('header.homeAria')}>
          <img
            src={IMAGES.logo}
            alt=""
            aria-hidden="true"
            className="h-9 md:h-10 w-auto shrink-0"
          />
          <span className="flex flex-col leading-none">
            <Wordmark className="font-display text-lg font-bold tracking-tight" />
            <span
              className="font-mono text-[9px] tracking-[.1em] uppercase mt-0.5"
              style={{ color: '#C6B7D9' }}
            >
              {t('header.tagline')}
            </span>
            <span
              className="hidden sm:block font-mono text-[8px] tracking-[.1em] uppercase mt-0.5"
              style={{ color: '#8A7A9E' }}
            >
              {t('header.location')}
            </span>
          </span>
        </a>

        <nav
          className="hidden lg:flex items-center gap-7 font-medium text-sm"
          aria-label="Navegação principal"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[color:var(--logo-pink)] transition-colors"
              style={{ color: '#DCD2E8' }}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher
            withSeparator
            className="hidden sm:flex items-center border rounded overflow-hidden [border-color:rgba(255,255,255,.25)]"
          />
          <a
            href="#inscricoes"
            className="hidden md:inline-flex btn btn-accent text-xs !py-2 !px-4"
          >
            {t('header.register')}
          </a>
          <button
            id="menu-toggle"
            type="button"
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 -mr-2"
            aria-label={t('header.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="block w-6 h-[2px] bg-white mb-1.5 transition-transform"
              style={menuOpen ? { transform: 'translateY(8px) rotate(45deg)' } : undefined}
            />
            <span
              className="block w-6 h-[2px] bg-white mb-1.5 transition-opacity"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-[2px] bg-white transition-transform"
              style={menuOpen ? { transform: 'translateY(-8px) rotate(-45deg)' } : undefined}
            />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
