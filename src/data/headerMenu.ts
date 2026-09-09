export type HeaderMenuId =
    | 'cbsoft'
    | 'sbes'
    | 'sblp'
    | 'sbcars'
    | 'sast'
    | 'workshops'
    | 'more';

export interface HeaderMenuLink {
    href: string;
    titleKey: string;
    descriptionKey: string;
    external?: boolean;
}

export interface HeaderMenuSection {
    titleKey: string;
    links: HeaderMenuLink[];
}

export interface HeaderMenuDefinition {
    variant: 'cbsoft' | 'wide' | 'compact' | 'more';
    columns: HeaderMenuSection[][];
}

/** Every item has its own title AND description in common.json. */
const link = (key: string, href: string, external = false): HeaderMenuLink => ({
    href,
    titleKey: `headerMenu.${key}.title`,
    descriptionKey: `headerMenu.${key}.description`,
    external,
});

const symposiumMenu = (id: 'sblp' | 'sbcars' | 'sast'): HeaderMenuDefinition => ({
    variant: 'compact',
    columns: [[{
        titleKey: `headerMenu.${id}.title`,
        links: [
            link(`${id}.call`, '#cfp'),
            link(`${id}.program`, '#agenda'),
            link(`${id}.papers`, '#artigos-aceitos'),
        ],
    }]],
});

// The current app is a single page. Keep its anchor navigation; connect
// dedicated pages here when their routes and 2027 content are available.
export const HEADER_MENUS: Record<HeaderMenuId, HeaderMenuDefinition> = {
    cbsoft: {
        variant: 'cbsoft',
        columns: [
            [
                {
                    titleKey: 'headerMenu.event.title',
                    links: [
                        link('event.about', '/sobre'),
                        link('event.organization', '#comite'),
                        link('event.speakers', '#palestrantes'),
                    ],
                },
                {
                    titleKey: 'headerMenu.guide.title',
                    links: [
                        link('guide.venue', '#local'),
                        link('guide.map', '#mapa'),
                        link('guide.accommodation', '#acomodacoes'),
                        link('guide.social', '#eventos-sociais'),
                        link('guide.experiences', '#experiencias-bh'),
                    ],
                },
                {
                    titleKey: 'headerMenu.history.title',
                    links: [link('history.previous', '#edicoes-anteriores')],
                },
            ],
            [
                {
                    titleKey: 'headerMenu.program.title',
                    links: [
                        link('program.schedule', '#agenda'),
                        link('program.articles', '#artigos-aceitos'),
                        link('program.special', '#eventos'),
                    ],
                },
                {
                    titleKey: 'headerMenu.participation.title',
                    links: [
                        link('participation.volunteers', '#voluntarios'),
                        link('participation.conduct', '#codigo-de-conduta'),
                    ],
                },
            ],
        ],
    },
    sbes: {
        variant: 'wide',
        columns: [
            [{
                titleKey: 'headerMenu.sbes.tracksTitle',
                links: [
                    link('sbes.tracks.special', '#cfp'),
                    link('sbes.tracks.research', '#cfp'),
                    link('sbes.tracks.education', '#cfp'),
                    link('sbes.tracks.ideas', '#cfp'),
                ],
            }],
            [
                {
                    titleKey: 'headerMenu.sbes.communityTitle',
                    links: [
                        link('sbes.tracks.tools', '#cfp'),
                        link('sbes.tracks.industry', '#cfp'),
                        link('sbes.tracks.ctic', '#cfp'),
                        link('sbes.tracks.ctd', '#cfp'),
                    ],
                },
                {
                    titleKey: 'headerMenu.sbes.programTitle',
                    links: [link('sbes.program', '#agenda')],
                },
            ],
        ],
    },
    sblp: symposiumMenu('sblp'),
    sbcars: symposiumMenu('sbcars'),
    sast: symposiumMenu('sast'),
    workshops: {
        variant: 'compact',
        columns: [[{
            titleKey: 'headerMenu.workshops.title',
            links: [
                link('workshops.call', '#cfp'),
                link('workshops.accepted', '#workshops-aceitos'),
                link('workshops.program', '#agenda'),
                link('workshops.papers', '#artigos-aceitos'),
            ],
        }]],
    },
    more: {
        variant: 'more',
        columns: [
            [{
                titleKey: 'headerMenu.more.communityTitle',
                links: [
                    link('more.artifacts', '#artefatos'),
                    link('more.latam', '#latam-school'),
                    link('more.highSchool', '#ensino-medio'),
                ],
            }],
            [{
                titleKey: 'headerMenu.more.eventsTitle',
                links: [
                    link('more.aiware', 'https://aiware-latam.github.io/', true),
                    link('more.freeSoftware', '#software-livre'),
                ],
            }],
        ],
    },
};
