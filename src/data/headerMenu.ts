export type HeaderMenuId =
    | 'cbsoft'
    | 'sbes'
    | 'sblp'
    | 'sbcars'
    | 'sast'
    | 'workshops'
    | 'more';

export type HeaderMenuVariant = 'cbsoft' | 'wide' | 'compact' | 'more';

export interface HeaderMenuLink {
    href: string;
    titleKey: string;
    descriptionKey?: string;
    external?: boolean;
}

export interface HeaderMenuSection {
    titleKey: string;
    links: HeaderMenuLink[];
}

export interface HeaderMenuDefinition {
    ariaLabelKey: string;
    variant: HeaderMenuVariant;
    columns: HeaderMenuSection[][];
}

const callLink = (prefix: string, href = '#cfp'): HeaderMenuLink => ({
    href,
    titleKey: `${prefix}.call.title`,
    descriptionKey: 'headerMenus.common.callDescription',
});

const papersLink = (prefix: string, href = '#artigos-aceitos'): HeaderMenuLink => ({
    href,
    titleKey: `${prefix}.papers.title`,
    descriptionKey: 'headerMenus.common.papersDescription',
});

const programLink = (prefix: string, href = '#agenda'): HeaderMenuLink => ({
    href,
    titleKey: `${prefix}.program.title`,
    descriptionKey: 'headerMenus.common.programDescription',
});

const symposiumMenu = (id: 'sblp' | 'sbcars' | 'sast'): HeaderMenuDefinition => ({
    ariaLabelKey: `headerMenus.${id}.ariaLabel`,
    variant: 'compact',
    columns: [
        [
            {
                titleKey: `headerMenus.${id}.title`,
                links: [
                    callLink(`headerMenus.${id}`),
                    programLink(`headerMenus.${id}`),
                    papersLink(`headerMenus.${id}`),
                ],
            },
        ],
    ],
});

const sbesTrack = (track: string): HeaderMenuSection => ({
    titleKey: `headerMenus.sbes.tracks.${track}`,
    links: [
        callLink('headerMenus.sbes'),
        papersLink('headerMenus.sbes'),
    ],
});

export const HEADER_MENUS: Record<HeaderMenuId, HeaderMenuDefinition> = {
    cbsoft: {
        ariaLabelKey: 'headerMenu.ariaLabel',
        variant: 'cbsoft',
        columns: [
            [
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
                            descriptionKey: 'headerMenu.guide.accommodation.description',
                        },
                        {
                            href: '#eventos-sociais',
                            titleKey: 'headerMenu.guide.social.title',
                            descriptionKey: 'headerMenu.guide.social.description',
                        },
                        {
                            href: '#experiencias-bh',
                            titleKey: 'headerMenu.guide.experiences.title',
                            descriptionKey: 'headerMenu.guide.experiences.description',
                        },
                    ],
                },
                {
                    titleKey: 'headerMenu.history.title',
                    links: [
                        {
                            href: '#edicoes-anteriores',
                            titleKey: 'headerMenu.history.previous.title',
                            descriptionKey: 'headerMenu.history.previous.description',
                        },
                    ],
                },
            ],
            [
                {
                    titleKey: 'headerMenu.program.title',
                    links: [
                        {
                            href: '#agenda',
                            titleKey: 'headerMenu.program.schedule.title',
                            descriptionKey: 'headerMenu.program.schedule.description',
                        },
                        {
                            href: '#artigos-aceitos',
                            titleKey: 'headerMenu.program.articles.title',
                            descriptionKey: 'headerMenu.program.articles.description',
                        },
                        {
                            href: '#eventos',
                            titleKey: 'headerMenu.program.special.title',
                            descriptionKey: 'headerMenu.program.special.description',
                        },
                    ],
                },
                {
                    titleKey: 'headerMenu.participation.title',
                    links: [
                        {
                            href: '#voluntarios',
                            titleKey: 'headerMenu.participation.volunteers.title',
                            descriptionKey: 'headerMenu.participation.volunteers.description',
                        },
                        {
                            href: '#codigo-de-conduta',
                            titleKey: 'headerMenu.participation.conduct.title',
                            descriptionKey: 'headerMenu.participation.conduct.description',
                        },
                    ],
                },
            ],
        ],
    },
    sbes: {
        ariaLabelKey: 'headerMenus.sbes.ariaLabel',
        variant: 'wide',
        columns: [
            [
                {
                    titleKey: 'headerMenus.sbes.title',
                    links: [
                        {
                            href: '#sbes',
                            titleKey: 'headerMenus.sbes.overview.title',
                            descriptionKey: 'headerMenus.sbes.overview.description',
                        },
                        programLink('headerMenus.sbes'),
                    ],
                },
                sbesTrack('special'),
                sbesTrack('research'),
                sbesTrack('education'),
                sbesTrack('ideas'),
            ],
            [
                sbesTrack('tools'),
                sbesTrack('industry'),
                sbesTrack('ctic'),
                sbesTrack('ctd'),
            ],
        ],
    },
    sblp: symposiumMenu('sblp'),
    sbcars: symposiumMenu('sbcars'),
    sast: symposiumMenu('sast'),
    workshops: {
        ariaLabelKey: 'headerMenus.workshops.ariaLabel',
        variant: 'compact',
        columns: [
            [
                {
                    titleKey: 'headerMenus.workshops.title',
                    links: [
                        callLink('headerMenus.workshops'),
                        {
                            href: '#workshops-aceitos',
                            titleKey: 'headerMenus.workshops.accepted.title',
                            descriptionKey: 'headerMenus.workshops.accepted.description',
                        },
                        programLink('headerMenus.workshops'),
                        papersLink('headerMenus.workshops'),
                    ],
                },
            ],
        ],
    },
    more: {
        ariaLabelKey: 'headerMenus.more.ariaLabel',
        variant: 'more',
        columns: [
            [
                {
                    titleKey: 'headerMenus.more.artifacts.title',
                    links: [
                        callLink('headerMenus.more.artifacts'),
                        programLink('headerMenus.more.artifacts'),
                    ],
                },
                {
                    titleKey: 'headerMenus.more.latam.title',
                    links: [
                        callLink('headerMenus.more.latam'),
                        programLink('headerMenus.more.latam'),
                    ],
                },
            ],
            [
                {
                    titleKey: 'headerMenus.more.highSchool.title',
                    links: [
                        callLink('headerMenus.more.highSchool'),
                        programLink('headerMenus.more.highSchool'),
                    ],
                },
                {
                    titleKey: 'headerMenus.more.events.title',
                    links: [
                        {
                            href: 'https://aiware-latam.github.io/',
                            titleKey: 'headerMenus.more.events.aiware.title',
                            descriptionKey: 'headerMenus.more.events.aiware.description',
                            external: true,
                        },
                        {
                            href: '#software-livre',
                            titleKey: 'headerMenus.more.events.freeSoftware.title',
                            descriptionKey: 'headerMenus.more.events.freeSoftware.description',
                        },
                    ],
                },
            ],
        ],
    },
};
