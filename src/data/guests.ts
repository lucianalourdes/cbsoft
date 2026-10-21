import type { Localized } from '@/lib/localized';
import { asset } from '@/data/config';

/** Brand-hue used to tint a guest's avatar ring. */
export type GuestTone = 'purple' | 'cyan' | 'leaf' | 'pink';

export interface Guest {
  id: string;
  name: string;
  affiliation: Localized;
  tone: GuestTone;
  /** Portrait under public/. Current images are AI-generated faces
   *  (thispersondoesnotexist.com) standing in for the real line-up. */
  photo: string;
}

/** Placeholder line-up — fictitious names, affiliations and portraits
 *  until the real 2026/2027 guest list is confirmed. */
export const GUESTS: Guest[] = [
  {
    id: 'helena-marques',
    name: 'Helena Marques',
    affiliation: { pt: 'Universidade de São Paulo', en: 'University of São Paulo' },
    tone: 'purple',
    photo: asset('images/guests/guest-1.jpg'),
  },
  {
    id: 'rafael-nogueira',
    name: 'Rafael Nogueira',
    affiliation: {
      pt: 'Universidade Federal de Minas Gerais',
      en: 'Federal University of Minas Gerais',
    },
    tone: 'cyan',
    photo: asset('images/guests/guest-2.jpg'),
  },
  {
    id: 'priya-venkatesh',
    name: 'Priya Venkatesh',
    affiliation: {
      pt: 'Instituto de Tecnologia de Delft',
      en: 'Delft University of Technology',
    },
    tone: 'leaf',
    photo: asset('images/guests/guest-3.jpg'),
  },
  {
    id: 'lars-andersen',
    name: 'Lars Andersen',
    affiliation: {
      pt: 'Instituto de Tecnologia de Blekinge',
      en: 'Blekinge Institute of Technology',
    },
    tone: 'pink',
    photo: asset('images/guests/guest-4.jpg'),
  },
  {
    id: 'camila-rocha',
    name: 'Camila Rocha',
    affiliation: {
      pt: 'Universidade Federal de Pernambuco',
      en: 'Federal University of Pernambuco',
    },
    tone: 'purple',
    photo: asset('images/guests/guest-5.jpg'),
  },
  {
    id: 'thomas-byrne',
    name: 'Thomas Byrne',
    affiliation: { pt: 'University College Cork', en: 'University College Cork' },
    tone: 'cyan',
    photo: asset('images/guests/guest-6.jpg'),
  },
  {
    id: 'aiko-tanaka',
    name: 'Aiko Tanaka',
    affiliation: { pt: 'Universidade de Tóquio', en: 'University of Tokyo' },
    tone: 'leaf',
    photo: asset('images/guests/guest-7.jpg'),
  },
  {
    id: 'marcus-feldmann',
    name: 'Marcus Feldmann',
    affiliation: {
      pt: 'Instituto Karlsruhe de Tecnologia',
      en: 'Karlsruhe Institute of Technology',
    },
    tone: 'pink',
    photo: asset('images/guests/guest-8.jpg'),
  },
];
