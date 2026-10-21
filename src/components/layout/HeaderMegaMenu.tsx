import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type {
    HeaderMenuDefinition,
    HeaderMenuId,
    HeaderMenuLink,
    HeaderMenuSubLink,
} from '@/data/headerMenu';

interface HeaderMegaMenuProps {
    id: HeaderMenuId;
    menu: HeaderMenuDefinition;
    onNavigate: () => void;
    mobile?: boolean;
}

/** Route paths ("/sobre") navigate client-side; hash anchors and external
 *  URLs stay plain links. */
function MenuLink({
    link,
    onNavigate,
    onMouseEnter,
    children,
}: {
    link: HeaderMenuSubLink & { external?: boolean };
    onNavigate: () => void;
    onMouseEnter?: () => void;
    children: ReactNode;
}) {
    return link.href.startsWith('/') ? (
        <Link to={link.href} onClick={onNavigate} onMouseEnter={onMouseEnter}>
            {children}
        </Link>
    ) : (
        <a
            href={link.href}
            onClick={onNavigate}
            onMouseEnter={onMouseEnter}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
        >
            {children}
        </a>
    );
}

export function HeaderMegaMenu({
    id,
    menu,
    onNavigate,
    mobile = false,
}: HeaderMegaMenuProps) {
    const { t } = useTranslation();
    const prefix = mobile ? 'mobile-header' : 'header';
    const rootRef = useRef<HTMLDivElement>(null);
    const flyoutRef = useRef<HTMLDivElement>(null);
    // Group (e.g. an SBES track) whose links are showing, and — on desktop —
    // how far down the menu its side flyout should sit.
    const [openGroup, setOpenGroup] = useState<HeaderMenuLink | null>(null);
    const [flyoutTop, setFlyoutTop] = useState(0);
    const flyoutId = `${prefix}-mega-menu-${id}-flyout`;

    function showGroup(link: HeaderMenuLink, trigger: HTMLElement) {
        const root = rootRef.current;
        if (root) {
            setFlyoutTop(trigger.getBoundingClientRect().top - root.getBoundingClientRect().top);
        }
        setOpenGroup(link);
    }

    function onGroupClick(link: HeaderMenuLink, event: MouseEvent<HTMLButtonElement>) {
        if (mobile) {
            setOpenGroup(openGroup === link ? null : link);
            return;
        }
        showGroup(link, event.currentTarget);
        // Keyboard activation (detail 0): move focus into the flyout.
        if (event.detail === 0) {
            requestAnimationFrame(() => flyoutRef.current?.querySelector<HTMLElement>('a')?.focus());
        }
    }

    return (
        <div
            ref={rootRef}
            id={`${prefix}-mega-menu-${id}`}
            className={`header-mega-menu header-mega-menu--${menu.variant}${mobile ? ' header-mega-menu--mobile' : ''
                }`}
            role="region"
            aria-labelledby={`${prefix}-trigger-${id}`}
        >
            {!mobile && <span className="header-mega-menu__arrow" aria-hidden="true" />}

            <div className="header-mega-menu__content" onScroll={() => setOpenGroup(null)}>
                {menu.columns.map((sections, columnIndex) => (
                    <div className="header-mega-menu__column" key={`${id}-${columnIndex}`}>
                        {sections.map((section) => (
                            <section className="header-mega-menu__section" key={section.titleKey}>
                                <h2>{t(section.titleKey)}</h2>

                                <div className="header-mega-menu__links">
                                    {section.links.map((link) => {
                                        if (link.children) {
                                            const open = openGroup === link;
                                            return (
                                                <div className="header-mega-menu__group" key={link.titleKey}>
                                                    <button
                                                        type="button"
                                                        className={`header-mega-menu__group-trigger${open ? ' is-open' : ''}`}
                                                        aria-expanded={open}
                                                        aria-controls={flyoutId}
                                                        onMouseEnter={(event) => !mobile && showGroup(link, event.currentTarget)}
                                                        onClick={(event) => onGroupClick(link, event)}
                                                    >
                                                        <strong>{t(link.titleKey)}</strong>
                                                        <span aria-hidden="true">›</span>
                                                    </button>
                                                    {mobile && open && (
                                                        <div id={flyoutId} className="header-mega-menu__sublinks">
                                                            {link.children.map((child) => (
                                                                <MenuLink key={child.href} link={child} onNavigate={onNavigate}>
                                                                    {t(child.titleKey)}
                                                                </MenuLink>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        return (
                                            <MenuLink
                                                key={link.titleKey}
                                                link={link}
                                                onNavigate={onNavigate}
                                                onMouseEnter={() => setOpenGroup(null)}
                                            >
                                                <strong>{t(link.titleKey)}</strong>
                                                <span>{t(link.descriptionKey)}</span>
                                            </MenuLink>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                ))}
            </div>

            {/* Side flyout, outside the scrollable panel so it is not clipped. */}
            {!mobile && openGroup?.children && (
                <div
                    ref={flyoutRef}
                    id={flyoutId}
                    className="header-mega-menu__flyout"
                    style={{ top: flyoutTop }}
                    role="group"
                    aria-label={t(openGroup.titleKey)}
                >
                    {openGroup.children.map((child) => (
                        <MenuLink key={child.href} link={child} onNavigate={onNavigate}>
                            {t(child.titleKey)}
                        </MenuLink>
                    ))}
                </div>
            )}
        </div>
    );
}
