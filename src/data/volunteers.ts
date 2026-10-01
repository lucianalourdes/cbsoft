/** Key dates for the volunteer call (/voluntarios). The 2026 call used
 *  10 Jul (forms) / 20 Jul (results); 2027 dates are still to be announced,
 *  so every `date` stays `null` (rendered as "A definir") until confirmed. */
export interface VolunteerMilestone {
  /** Suffix of `volunteersPage.milestones.*` in common.json. */
  key: 'forms' | 'results';
  date: string | null;
}

export const VOLUNTEER_MILESTONES: VolunteerMilestone[] = [
  { key: 'forms', date: null },
  { key: 'results', date: null },
];

/** Google Forms for the volunteer application. The 2026 call used
 *  https://forms.gle/QSfzifWfZLdm2FVW6 (student) and
 *  https://forms.gle/LHFE8D19NDChqaom7 (recommendation); set the 2027 URLs
 *  here once they exist (`null` renders "link a ser divulgado"). */
export const VOLUNTEER_APPLICATION_FORM_URL: string | null = null;
export const VOLUNTEER_RECOMMENDATION_FORM_URL: string | null = null;

export interface VolunteerCoordinator {
  name: string;
  affiliation: string;
  email: string;
}

/** Volunteer coordination. Placeholders ("xxxxx") until the 2027 team is
 *  confirmed; the 2026 call listed Kelly Braghetto, Lilian Passos Scatalon
 *  and David Tadokoro (IME-USP). */
export const VOLUNTEER_COORDINATORS: VolunteerCoordinator[] = [
  { name: 'xxxxx', affiliation: 'xxxxx', email: 'xxxxx' },
  { name: 'xxxxx', affiliation: 'xxxxx', email: 'xxxxx' },
];
