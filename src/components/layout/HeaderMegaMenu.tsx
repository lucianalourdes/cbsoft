import { useTranslation } from 'react-i18next';

interface MenuLink {
    href: string;
    titleKey: string;
    descriptionKey: string;
}

interface MenuSection {
    titleKey: string;
    links: MenuLink[];
}

interface HeaderMegaMenuProps {
    onNavigate: () => void;
}

const LEFT_SECTIONS: MenuSection[] = [
    {
        titleKey: 'headerMenu.event.title',
        links: [
            {
                href: '#sobre',
                titleKey: 'headerMenu.event.about.title',
                descriptionKey: 'headerMenu.event.about.description',
            },
            {
                href: '#comite',
                titleKey: 'headerMenu.event.organization.title',
                descriptionKey: 'headerMenu.event.organization.description',
            },
            {
                href: '#palestrantes',
                titleKey: 'headerMenu.event.speakers.title',
                descriptionKey: 'headerMenu.event.speakers.description',
            },
        ],
    },
    {
        titleKey: 'headerMenu.guide.title',
        links: [
            {
                href: '#local',
                titleKey: 'headerMenu.guide.venue.title',
                descriptionKey: 'headerMenu.guide.venue.description',
            },
            {
                href: '#mapa',
                titleKey: 'headerMenu.guide.map.title',
                descriptionKey: 'headerMenu.guide.map.description',
            },
            {
                href: '#acomodacoes',
                titleKey: 'headerMenu.guide.accommodation.title',
                descriptionKey:
                    'headerMenu.guide.accommodation.description',
            },
            {
                href: '#eventos-sociais',
                titleKey: 'headerMenu.guide.social.title',
                descriptionKey: 'headerMenu.guide.social.description',
            },
            {
                href: '#experiencias-bh',
                titleKey: 'headerMenu.guide.experiences.title',
                descriptionKey:
                    'headerMenu.guide.experiences.description',
            },
        ],
    },
    {
        titleKey: 'headerMenu.history.title',
        links: [
            {
                href: '#edicoes-anteriores',
                titleKey: 'headerMenu.history.previous.title',
                descriptionKey:
                    'headerMenu.history.previous.description',
            },
        ],
    },
];

const RIGHT_SECTIONS: MenuSection[] = [
    {
        titleKey: 'headerMenu.program.title',
        links: [
            {
                href: '#agenda',
                titleKey: 'headerMenu.program.schedule.title',
                descriptionKey:
                    'headerMenu.program.schedule.description',
            },
            {
                href: '#artigos-aceitos',
                titleKey: 'headerMenu.program.articles.title',
                descriptionKey:
                    'headerMenu.program.articles.description',
            },
            {
                href: '#eventos',
                titleKey: 'headerMenu.program.special.title',
                descriptionKey:
                    'headerMenu.program.special.description',
            },
        ],
    },
    {
        titleKey: 'headerMenu.participation.title',
        links: [
            {
                href: '#voluntarios',
                titleKey:
                    'headerMenu.participation.volunteers.title',
                descriptionKey:
                    'headerMenu.participation.volunteers.description',
            },
            {
                href: '#codigo-de-conduta',
                titleKey:
                    'headerMenu.participation.conduct.title',
                descriptionKey:
                    'headerMenu.participation.conduct.description',
            },
        ],
    },
];

function MenuColumn({
    sections,
    onNavigate,
}: {
    sections: MenuSection[];
    onNavigate: () => void;
}) {
    const { t } = useTranslation();

    return (
        <div className="header-mega-menu__column">
            {sections.map((section) => (
                <section
                    className="header-mega-menu__section"
                    key={section.titleKey}
                >
                    <h2>{t(section.titleKey)}</h2>

                    <div className="header-mega-menu__links">
                        {section.links.map((link) => (
                            <a
                                href={link.href}
                                key={link.href}
                                onClick={onNavigate}
                            >
                                <strong>{t(link.titleKey)}</strong>
                                <span>{t(link.descriptionKey)}</span>
                            </a>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

export function HeaderMegaMenu({
    onNavigate,
}: HeaderMegaMenuProps) {
    const { t } = useTranslation();

    return (
        <div
            id="header-mega-menu"
            className="header-mega-menu"
        >
            <span
                className="header-mega-menu__arrow"
                aria-hidden="true"
            />

            <div
                className="header-mega-menu__content"
                aria-label={t('headerMenu.ariaLabel')}
            >
                <MenuColumn
                    sections={LEFT_SECTIONS}
                    onNavigate={onNavigate}
                />

                <MenuColumn
                    sections={RIGHT_SECTIONS}
                    onNavigate={onNavigate}
                />
            </div>
        </div>
    );
}