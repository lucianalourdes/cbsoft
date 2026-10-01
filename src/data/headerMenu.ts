export type HeaderMenuId =
    | 'cbsoft'
    | 'sbes'
    | 'sbmf'
    | 'sbcars'
    | 'sast'
    | 'workshops'
    | 'more';

import { SBES_TRACKS, type SbesTrackId } from './sbesTracks';

export interface HeaderMenuSubLink {
    href: string;
    titleKey: string;
}

export interface HeaderMenuLink {
    href: string;
    titleKey: string;
    descriptionKey: string;
    external?: boolean;
    /** When set, the item is a group label and these are its links. */
    children?: HeaderMenuSubLink[];
}

export interface HeaderMenuSection {
    titleKey: string;
    links: HeaderMenuLink[];
}

export interface HeaderMenuDefinition {
    variant: 'cbsoft' | 'compact' | 'more' | 'tracks';
    columns: HeaderMenuSection[][];
}

/** Every item has its own title AND description in common.json. */
const link = (key: string, href: string, external = false): HeaderMenuLink => ({
    href,
    titleKey: `headerMenu.${key}.title`,
    descriptionKey: `headerMenu.${key}.description`,
    external,
});

/** Every "Chamada de Trabalhos" link points here for now — the only call
 *  page so far. Swap in per-symposium/track pages once they exist. */
export const CALL_FOR_PAPERS_PATH = '/workshops/chamada';

/** Likewise, every "Artigos Aceitos" link shares one page for now; the
 *  per-track pages (/sbes/<slug>/artigos-aceitos) are ready for later. */
export const ACCEPTED_PAPERS_PATH = '/artigos-aceitos';

/** An SBES track: its call for papers and its accepted-papers page. */
const sbesTrack = (id: SbesTrackId): HeaderMenuLink => ({
    ...link(`sbes.tracks.${id}`, CALL_FOR_PAPERS_PATH),
    children: [
        { href: CALL_FOR_PAPERS_PATH, titleKey: 'headerMenu.sbes.trackCall' },
        { href: ACCEPTED_PAPERS_PATH, titleKey: 'headerMenu.sbes.trackPapers' },
    ],
});

const symposiumMenu = (id: 'sbmf' | 'sbcars' | 'sast'): HeaderMenuDefinition => ({
    variant: 'compact',
    columns: [[{
        titleKey: `headerMenu.${id}.title`,
        links: [
            link(`${id}.call`, CALL_FOR_PAPERS_PATH),
            link(`${id}.program`, '#agenda'),
            link(`${id}.papers`, ACCEPTED_PAPERS_PATH),
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
                        link('program.articles', ACCEPTED_PAPERS_PATH),
                        link('program.special', '#eventos'),
                    ],
                },
                {
                    titleKey: 'headerMenu.participation.title',
                    links: [
                        link('participation.volunteers', '/voluntarios'),
                        link('participation.conduct', '/codigo-de-conduta'),
                    ],
                },
            ],
        ],
    },
    // One list of tracks; each opens a side flyout with its two links.
    sbes: {
        variant: 'tracks',
        columns: [[
            {
                titleKey: 'headerMenu.sbes.tracksTitle',
                links: SBES_TRACKS.map((track) => sbesTrack(track.id)),
            },
            {
                titleKey: 'headerMenu.sbes.programTitle',
                links: [link('sbes.program', '#agenda')],
            },
        ]],
    },
    sbmf: symposiumMenu('sbmf'),
    sbcars: symposiumMenu('sbcars'),
    sast: symposiumMenu('sast'),
    workshops: {
        variant: 'compact',
        columns: [[{
            titleKey: 'headerMenu.workshops.title',
            links: [
                link('workshops.call', '/workshops/chamada'),
                // link('workshops.accepted', '#workshops-aceitos'),
                // link('workshops.program', '#agenda'),
                // link('workshops.papers', '#artigos-aceitos'),
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
