// Official Ophthalmology ST1 self-assessment ("Evidence Folder") scoring matrix, 2026 cycle
// criteria (most recently published — 2027 criteria are due to be republished by 30 Sep 2026;
// this cycle's structure is very likely similar but not yet confirmed identical).
// Source: NHS England South West, "Evidence Folder 2026 Criteria"
// https://southwest.pgmdeducation.nhs.uk/recruitment/specialty-recruitment/ophthalmology-st1/evidence-folder-2026-criteria/
// Applicant Guide (process/weighting): https://southwest.pgmdeducation.nhs.uk/recruitment/specialty-recruitment/ophthalmology-st1/applicants-guide/
//
// Unlike CST/Paediatrics/Radiology, most domains here are NOT a single best-band pick — the real
// form lets candidates claim multiple achievements per domain, summed and capped at the domain
// max. Two domains (QI/Audit and Portfolio layout) are simpler best-of-band picks and are marked
// kind: "bands" below; the rest are kind: "checklist".
//
// Known discrepancy in the official source, reproduced rather than silently fixed: domain maxima
// below sum to 44, but the Applicant Guide states the self-assessment "maximum score that can be
// achieved is 47 points." Repeat-count caps on individual cumulative items (e.g. "how many times
// can you claim the 1-point-each undergraduate-year prize") are not numerically specified by NHS
// England beyond the domain/group caps shown — where we set an item's own repeat limit below, it's
// a reasonable ceiling for the UI, not an official number, and is flagged in that item's note.

export type OphthalmologyItem = {
  id: string;
  label: string;
  points: number;
  /** Max times this item can be claimed (repeat cap). Omit or 1 for a plain checkbox. */
  max?: number;
};

export type OphthalmologyGroup = {
  id: string;
  items: OphthalmologyItem[];
  /** "best" = take the single highest-scoring claimed item (mutually exclusive tiers). Default "sum". */
  mode?: "sum" | "best";
  /** Cap on this group's contribution, if the source specifies a sub-cap narrower than the domain max. */
  groupCap?: number;
  note?: string;
};

export type OphthalmologyChecklistDomain = {
  id: string;
  kind: "checklist";
  label: string;
  maxPoints: number;
  note?: string;
  groups: OphthalmologyGroup[];
};

export type OphthalmologyBand = { points: number; label: string };

export type OphthalmologyBandsDomain = {
  id: string;
  kind: "bands";
  label: string;
  maxPoints: number;
  note?: string;
  bands: OphthalmologyBand[];
};

export type OphthalmologyDomain = OphthalmologyChecklistDomain | OphthalmologyBandsDomain;

export const OPHTHALMOLOGY_PORTFOLIO_DOMAINS: OphthalmologyDomain[] = [
  {
    id: "qualifications",
    kind: "checklist",
    label: "Qualifications",
    maxPoints: 5,
    note: "MRCP and MRCS are not scored.",
    groups: [
      {
        id: "quals_standard",
        mode: "sum",
        items: [
          {
            id: "quals_pg",
            label: "Postgraduate qualification (MSc, BSc, PG Cert, incl. Optometry degree; ≥8 months full-time or equivalent; not intercalated)",
            points: 1,
            max: 5,
          },
        ],
      },
      {
        id: "quals_higher",
        mode: "best",
        note: "Pick the higher of these two if both apply — they don't stack.",
        items: [
          { id: "quals_md_mphil", label: "MD or MPhil", points: 3 },
          { id: "quals_phd", label: "Completed PhD or DPhil", points: 4 },
        ],
      },
    ],
  },
  {
    id: "prizes_awards",
    kind: "checklist",
    label: "Prizes and Awards",
    maxPoints: 5,
    groups: [
      {
        id: "prize_crombie",
        items: [{ id: "crombie", label: "Crombie Medal (1st, FRCOphth part 1)", points: 3 }],
      },
      {
        id: "prize_top_year",
        mode: "sum",
        note: "1st in an undergraduate year, where fewer than 15% of the year achieve it.",
        items: [{ id: "top_of_year", label: "1st in undergraduate year (top <15%)", points: 2, max: 3 }],
      },
      {
        id: "prize_national_undergrad",
        mode: "best",
        note: "National Undergraduate prize via competitive exam — pick the tier achieved.",
        items: [
          { id: "national_1st", label: "1st place", points: 3 },
          { id: "national_top10", label: "Top 10%", points: 2 },
          { id: "national_top20", label: "Top 20%", points: 1 },
        ],
      },
      {
        id: "prize_grant",
        mode: "sum",
        items: [
          { id: "lead_author_grant", label: "Lead-author research grant leading to a peer-reviewed publication", points: 1, max: 3 },
        ],
      },
      {
        id: "prize_presentation",
        mode: "sum",
        groupCap: 2,
        items: [
          { id: "best_presentation_poster", label: "Best presentation or poster, first author", points: 1, max: 2 },
        ],
      },
    ],
  },
  {
    id: "msf",
    kind: "checklist",
    label: "Multi-Source Feedback (MSF)",
    maxPoints: 2,
    note: "Must be within 18 months of interview, with a minimum of 5 respondents (GP) or 7 (hospital).",
    groups: [
      {
        id: "msf_satisfactory",
        items: [{ id: "msf_ok", label: "Satisfactory MSF scores with good comments", points: 2 }],
      },
    ],
  },
  {
    id: "qi_audit",
    kind: "bands",
    label: "Quality Improvement / Audit Projects",
    maxPoints: 5,
    bands: [
      { points: 5, label: "Published audit, or a QI guideline implemented supra-regionally" },
      { points: 4, label: "Initiated, designed, and wrote up a project, and implemented a change / completed the audit loop" },
      { points: 3, label: "Initiated, designed, and wrote up a project" },
      { points: 2, label: "Initiated and designed a project" },
      { points: 1, label: "Participation only" },
      { points: 0, label: "None" },
    ],
  },
  {
    id: "presentations",
    kind: "checklist",
    label: "Presentations",
    maxPoints: 6,
    note: "Poster/video presentations and second-author credit score half the rate of an oral, first-author presentation of the same tier.",
    groups: [
      {
        id: "pres_regional",
        mode: "sum",
        items: [
          { id: "regional_oral", label: "Regional, oral, first author", points: 1, max: 4 },
          { id: "regional_poster", label: "Regional, poster/video or second author", points: 0.5, max: 4 },
        ],
      },
      {
        id: "pres_national",
        mode: "sum",
        items: [
          { id: "national_oral", label: "National (e.g. RCOphth Congress), oral, first author", points: 2, max: 3 },
          { id: "national_poster", label: "National, poster/video or second author", points: 1, max: 3 },
        ],
      },
      {
        id: "pres_international",
        mode: "sum",
        items: [
          { id: "intl_oral", label: "International (e.g. ARVO, AAO), oral, first author", points: 3, max: 2 },
          { id: "intl_poster", label: "International, poster/video or second author", points: 1.5, max: 2 },
        ],
      },
    ],
  },
  {
    id: "education_teaching",
    kind: "checklist",
    label: "Education and Teaching",
    maxPoints: 5,
    groups: [
      {
        id: "teaching_helping",
        mode: "sum",
        groupCap: 2,
        note: "Helping with courses, mock OSCEs, e-learning, e-books, a train-the-teacher course, or examining undergraduates.",
        items: [{ id: "teaching_help", label: "Helped deliver a teaching activity", points: 0.5, max: 4 }],
      },
      {
        id: "teaching_formal",
        mode: "sum",
        items: [
          { id: "teaching_formal_block", label: "3+ formal teaching sessions delivered over 3+ months", points: 1, max: 3 },
        ],
      },
      {
        id: "teaching_credentials",
        mode: "sum",
        items: [
          { id: "teaching_qualification", label: "Higher teaching qualification (Dip/Cert Med Ed, ≥60 credits or ≥8 months full-time)", points: 2 },
          { id: "book_chapter", label: "Authored a book chapter", points: 2 },
          { id: "academic_book", label: "Authored a postgraduate academic book", points: 3 },
        ],
      },
    ],
  },
  {
    id: "specialty_commitment",
    kind: "checklist",
    label: "Ophthalmology Specialty Links and Commitment",
    maxPoints: 13,
    groups: [
      {
        id: "refraction_cert",
        items: [{ id: "refraction", label: "Refraction Certificate", points: 1 }],
      },
      {
        id: "frcophth_p1",
        mode: "best",
        note: "Pick the higher of pass / attempt — they don't stack.",
        items: [
          { id: "frcophth_pass", label: "FRCOphth Part 1 — pass", points: 3 },
          { id: "frcophth_attempt", label: "FRCOphth Part 1 — attempted", points: 1 },
        ],
      },
      {
        id: "publications_other",
        mode: "sum",
        groupCap: 2,
        items: [
          { id: "pub_nonpeer", label: "Non-peer-reviewed publication or case report", points: 0.5, max: 4 },
          { id: "pub_peer_other", label: "Peer-reviewed ophthalmology publication not counted elsewhere, first author", points: 1, max: 2 },
        ],
      },
      {
        id: "elective_project",
        mode: "sum",
        groupCap: 2,
        items: [{ id: "elective_ophth", label: "Ophthalmic elective or undergraduate project", points: 1, max: 2 }],
      },
      {
        id: "taster_week",
        items: [{ id: "taster", label: "Ophthalmology taster week", points: 1 }],
      },
      {
        id: "extra_sessions",
        items: [
          { id: "clinic_theatre_sessions", label: "10+ clinic/theatre sessions over 3+ months, outside a formal attachment", points: 1 },
        ],
      },
      {
        id: "simulation",
        mode: "sum",
        groupCap: 2,
        items: [{ id: "eyesi", label: "Ophthalmic simulation (EyeSi or equivalent), per 4+ hour activity", points: 1, max: 2 }],
      },
      {
        id: "meetings",
        mode: "sum",
        groupCap: 3,
        note: "National/international and regional meetings attended (not presented at — see Presentations for that).",
        items: [
          { id: "meeting_national_intl", label: "National or international meeting attended", points: 1, max: 3 },
          { id: "meeting_regional", label: "Regional meeting attended", points: 0.5, max: 6 },
        ],
      },
      {
        id: "discretionary",
        mode: "sum",
        groupCap: 2,
        note: "Excludes Duke-Elder exam, logbook, and workplace-based assessments.",
        items: [{ id: "discretionary_evidence", label: "Other discretionary evidence", points: 1, max: 2 }],
      },
    ],
  },
  {
    id: "portfolio_quality",
    kind: "bands",
    label: "Overall Portfolio Layout and Quality",
    maxPoints: 3,
    note: "NHS England doesn't publish exact band wording for this domain — pick the level that best matches how an assessor would likely see your submission's organisation and clarity.",
    bands: [
      { points: 3, label: "Clearly organised, well presented, easy for an assessor to navigate and verify" },
      { points: 2, label: "Reasonably organised, mostly clear" },
      { points: 1, label: "Basic organisation, harder to navigate or verify" },
      { points: 0, label: "Poorly organised or unclear" },
    ],
  },
];

export const OPHTHALMOLOGY_MAX = OPHTHALMOLOGY_PORTFOLIO_DOMAINS.reduce((sum, d) => sum + d.maxPoints, 0); // 44

export const OPHTHALMOLOGY_SCORING_SOURCE_URL =
  "https://southwest.pgmdeducation.nhs.uk/recruitment/specialty-recruitment/ophthalmology-st1/evidence-folder-2026-criteria/";

export const OPHTHALMOLOGY_STRUCTURAL_NOTE =
  "For the current (2027-entry) cycle, MSRA is used only for the first shortlisting cut — the top 350 MSRA scorers move on to have this self-assessment verified against evidence, and MSRA does not carry into the final score. A second cut applies your verified self-assessment score (minimum 20/47 to continue), then the top 260 by that score are interviewed. Final ranking for offers = verified self-assessment score (max 50 per the Applicant Guide) + interview/assessment score (max 50) — note the Applicant Guide's 50-point self-assessment maximum doesn't match this matrix's 44-point domain sum, a discrepancy in NHS England's own published material that we've reproduced rather than silently resolved. This matrix is the most recently published (2026-cycle) criteria; NHS England South West says updated 2027 criteria will be published by 30 September 2026. No official score distribution is published, so there's deliberately no likelihood tool here — this is a self-assessment band checker only.";

export const OPHTHALMOLOGY_MIN_TO_PROGRESS = {
  selfAssessment: 19,
  verified: 20,
  note: "A minimum self-assessment score of 19/47 is required to continue past initial shortlisting; a verified score of 20/47 or below does not progress past Evidence Folder Review.",
};
