/**
 * Publication switchboard: every value that still depends on an official
 * decision lives here, next to its approval state. Components read from
 * this file and hide or mark as pending whatever is not approved, so going
 * live is a matter of filling in a value here — never editing a component.
 *
 * Rule of thumb: `null` means "not approved yet". Nothing public may link
 * to `#`; a missing URL hides the link instead.
 *
 * The venue (features/venue/data/venue.ts) and the social profiles
 * (features/layout/data/socialLinks.ts) follow the same rule in their own
 * files.
 */
export const PUBLICATION = {
  /** Hero countdown. Belo Horizonte follows Brasília time (UTC-3, no DST). */
  countdown: {
    /** Full-paper submission deadline, 23:59 in Belo Horizonte. */
    target: '2027-03-15T23:59:59-03:00',
    timeZone: 'America/Sao_Paulo',
  },

  /** Congress dates. While `null`, pages say "a definir" and the
   *  "dias de programação" figure is hidden. ISO 'YYYY-MM-DD'. */
  dates: {
    start: null as string | null,
    end: null as string | null,
  },

  /** Registration stays "Em breve" until dates, categories, fees and the
   *  SBC link are all approved. */
  registration: {
    /** Fees and categories approved for publication. */
    feesApproved: false,
    /** Link to the SBC registration system. */
    url: null as string | null,
  },

  /** Call for papers CTAs. */
  callForPapers: {
    guidelinesUrl: null as string | null,
    submissionUrl: null as string | null,
  },
};

/** Registration only opens once fees are approved and the SBC link exists. */
export function registrationOpen(): boolean {
  return PUBLICATION.registration.feesApproved && PUBLICATION.registration.url != null;
}

/** Inclusive number of congress days, or `null` while dates are pending. */
export function congressDays(): number | null {
  const { start, end } = PUBLICATION.dates;
  if (!start || !end) return null;
  const ms = Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`);
  return Math.round(ms / 86_400_000) + 1;
}
