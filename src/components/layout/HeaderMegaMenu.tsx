import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { HeaderMenuDefinition, HeaderMenuId } from '@/data/headerMenu';

interface HeaderMegaMenuProps {
    id: HeaderMenuId;
    menu: HeaderMenuDefinition;
    onNavigate: () => void;
    mobile?: boolean;
}

export function HeaderMegaMenu({
    id,
    menu,
    onNavigate,
    mobile = false,
}: HeaderMegaMenuProps) {
    const { t } = useTranslation();
    const prefix = mobile ? 'mobile-header' : 'header';

    return (
        <div
            id={`${prefix}-mega-menu-${id}`}
            className={`header-mega-menu header-mega-menu--${menu.variant}${mobile ? ' header-mega-menu--mobile' : ''
                }`}
            role="region"
            aria-labelledby={`${prefix}-trigger-${id}`}
        >
            {!mobile && <span className="header-mega-menu__arrow" aria-hidden="true" />}

            <div className="header-mega-menu__content">
                {menu.columns.map((sections, columnIndex) => (
                    <div className="header-mega-menu__column" key={`${id}-${columnIndex}`}>
                        {sections.map((section) => (
                            <section className="header-mega-menu__section" key={section.titleKey}>
                                <h2>{t(section.titleKey)}</h2>

                                <div className="header-mega-menu__links">
                                    {section.links.map((link) => {
                                        const label = (
                                            <>
                                                <strong>{t(link.titleKey)}</strong>
                                                <span>{t(link.descriptionKey)}</span>
                                            </>
                                        );

                                        // Route paths ("/sobre") navigate client-side;
                                        // hash anchors and external URLs stay plain links.
                                        return link.href.startsWith('/') ? (
                                            <Link key={link.titleKey} to={link.href} onClick={onNavigate}>
                                                {label}
                                            </Link>
                                        ) : (
                                            <a
                                                key={link.titleKey}
                                                href={link.href}
                                                onClick={onNavigate}
                                                target={link.external ? '_blank' : undefined}
                                                rel={link.external ? 'noopener noreferrer' : undefined}
                                            >
                                                {label}
                                            </a>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
