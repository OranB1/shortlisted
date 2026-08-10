// Source: All_Specialty_Competition_Ratios.md (NHS England official competition-ratios archive, Round 1).

export type SpecialtyRatioYear = {
  specialty: string;
  applications2024: number;
  posts2024: number;
  ratio2024: number;
  applications2025: number;
  posts2025: number;
  ratio2025: number;
};

export const SPECIALTY_RATIOS: SpecialtyRatioYear[] = [
  { specialty: "ACCS Emergency Medicine CT1/ST1", applications2024: 2718, posts2024: 359, ratio2024: 7.57, applications2025: 5081, posts2025: 357, ratio2025: 14.23 },
  { specialty: "Anaesthetics CT1", applications2024: 3522, posts2024: 542, ratio2024: 6.5, applications2025: 6770, posts2025: 539, ratio2025: 12.56 },
  { specialty: "Cardiothoracic Surgery ST1", applications2024: 408, posts2024: 9, ratio2024: 45.33, applications2025: 737, posts2025: 10, ratio2025: 73.7 },
  { specialty: "Clinical Radiology ST1", applications2024: 3719, posts2024: 312, ratio2024: 11.92, applications2025: 4011, posts2025: 356, ratio2025: 11.27 },
  { specialty: "Community Sexual & Reproductive Health ST1", applications2024: 461, posts2024: 18, ratio2024: 25.61, applications2025: 1379, posts2025: 14, ratio2025: 98.5 },
  { specialty: "Core Psychiatry Training CT1", applications2024: 4650, posts2024: 492, ratio2024: 9.45, applications2025: 10677, posts2025: 489, ratio2025: 21.83 },
  { specialty: "Core Surgical Training CT1", applications2024: 3384, posts2024: 645, ratio2024: 5.25, applications2025: 5399, posts2025: 630, ratio2025: 8.57 },
  { specialty: "General Practice ST1", applications2024: 15036, posts2024: 4096, ratio2024: 3.67, applications2025: 20995, posts2025: 4276, ratio2025: 4.91 },
  { specialty: "GP & Public Health Dual CCT ST1", applications2024: 1794, posts2024: 16, ratio2024: 112.13, applications2025: 2173, posts2025: 13, ratio2025: 167.15 },
  { specialty: "Histopathology ST1", applications2024: 600, posts2024: 119, ratio2024: 5.04, applications2025: 985, posts2025: 104, ratio2025: 9.47 },
  { specialty: "Internal Medicine Training CT1", applications2024: 6273, posts2024: 1698, ratio2024: 3.69, applications2025: 8841, posts2025: 1678, ratio2025: 5.27 },
  { specialty: "Neurosurgery ST1", applications2024: 354, posts2024: 18, ratio2024: 19.67, applications2025: 561, posts2025: 21, ratio2025: 26.71 },
  { specialty: "Obstetrics & Gynaecology ST1", applications2024: 2170, posts2024: 310, ratio2024: 7.0, applications2025: 4945, posts2025: 297, ratio2025: 16.65 },
  { specialty: "Ophthalmology ST1", applications2024: 1383, posts2024: 96, ratio2024: 14.41, applications2025: 2197, posts2025: 102, ratio2025: 21.54 },
  { specialty: "Oral & Maxillo Facial Surgery ST1", applications2024: 34, posts2024: 18, ratio2024: 1.89, applications2025: 77, posts2025: 22, ratio2025: 3.5 },
  { specialty: "Paediatrics ST1", applications2024: 1583, posts2024: 479, ratio2024: 3.3, applications2025: 2680, posts2025: 476, ratio2025: 5.63 },
  { specialty: "Public Health Medicine ST1", applications2024: 1816, posts2024: 104, ratio2024: 17.46, applications2025: 2710, posts2025: 95, ratio2025: 28.53 },
];

export type SelectionMechanism = {
  specialty: string;
  mechanism: string;
};

// Verified against each specialty's own official recruitment site, checked 2026-08-07 (see
// per-specialty portfolio-category data files for full source URLs and research notes where a
// scoring matrix exists). Mechanisms confirmed as having genuinely no portfolio component are
// stated as fact, not as an "indicative" guess — that's a real structural difference, not a gap
// in our data.
export const SELECTION_MECHANISMS: SelectionMechanism[] = [
  { specialty: "IMT / joint IMT-ACCS-IM", mechanism: "Self-assessment only, max 30 (+5 IMT-only bonus in 2026 = max 35). No MSRA. Final rank by interview." },
  { specialty: "GP ST1", mechanism: "Confirmed 100% MSRA — no Selection Centre, no interview, no portfolio. Applies through at least the August 2026 round; NHS England hasn't yet published the mechanism for February 2027." },
  { specialty: "Core Psychiatry CT1", mechanism: "Confirmed 100% MSRA — no interview, no portfolio, through at least the August 2026 round. RCPsych has a Task and Finish Group reviewing the MSRA-only model after 2025's 21.83:1 ratio spike, but NHS England (who has final say) hasn't announced any change." },
  { specialty: "ACCS-Emergency Medicine ST1", mechanism: "Confirmed MSRA 40% / online interview 60%. Interview includes a portfolio-verification station, but no official points/domain breakdown for it is published — only narrative person-specification criteria." },
  { specialty: "Anaesthetics CT1 (incl. ACCS-Anaesthetics)", mechanism: "Confirmed MSRA 15% (PD 7.5% + CPS 7.5%) / interview 85%. Portfolio/self-assessment scoring was explicitly removed from the CT1 application form — the 85% is a pure structured interview (two 15-min stations), 60/100 minimum to be appointable." },
  { specialty: "Obstetrics & Gynaecology ST1", mechanism: "Confirmed MSRA (33.3%) / two-station online interview (66.6%). No portfolio stage. Top 75 MSRA scorers bypass interview straight to offer; everyone else needs 50/100+ at interview to be appointable." },
  { specialty: "Core Surgical Training CT1", mechanism: "MSRA 10% / portfolio station 45% / management & clinical interview station 45% (portfolio scored at interview, not pre-scored)" },
  { specialty: "Clinical Radiology ST1", mechanism: "MSRA shortlists into interview only (doesn't carry to final rank). Verified scoring matrix: portfolio 40% + interview 60% of final rank — see the Clinical Radiology portfolio scorer." },
  { specialty: "Ophthalmology ST1", mechanism: "MSRA gates the first shortlisting cut only (doesn't carry to final score). Verified scoring matrix for the self-assessment Evidence Folder — see the Ophthalmology portfolio scorer." },
  { specialty: "Cardiothoracic Surgery ST1", mechanism: "No MSRA. Self-assessment (16 domains across 5 sections, max 59) verified against evidence, then combined with a structured interview — NHS England Wessex doesn't publish the weighting. See the Cardiothoracic Surgery portfolio scorer." },
  { specialty: "Histopathology ST1", mechanism: "No MSRA. Self-assessment (10 domains, max 71) shortlists to evidence verification; final rank is interview-only. See the Histopathology portfolio scorer." },
  { specialty: "Neurosurgery ST1", mechanism: "Confirmed two-stage ranking: MSRA 40% + self-assessment 60% ranks for interview; final rank is MSRA 12% + self-assessment 18% + four-station interview 70%. 65% of available marks needed to be appointable. Exact self-assessment domain point values not yet obtainable (source PDF unreachable) — no scorer built yet." },
  { specialty: "Oral & Maxillofacial Surgery (OMFS) ST1", mechanism: "No MSRA. Self-assessed portfolio (confirmed domains: MFDS/MRCS, OMFS and non-OMFS courses, OMFS and non-OMFS surgical logbook experience, OMFS educational activity, postgraduate degrees, prizes, QI/audit, teaching, training in teaching, presentations, publications, leadership, other achievements) plus a four-station interview (7 min/station, 60% overall + 40%/station to be appointable). Exact point values per domain not yet obtainable (source page removed/relocated) — no scorer built yet." },
  { specialty: "Community Sexual & Reproductive Health (CSRH) ST1", mechanism: "MSRA-ranked shortlisting into interview; NHS England doesn't publish the MSRA/interview weighting. No scored portfolio." },
  { specialty: "Public Health Medicine ST1", mechanism: "Does not use the MSRA. Assessment Centre (3 computer-based papers) is pass/fail only; final rank is 100% Selection Centre (virtual interview) score. Accepts non-medical applicants." },
];

// Official NHS England GP ST1 MSRA score-band table, per paper (Clinical Problem Solving shown;
// a parallel table exists for Professional Dilemmas but wasn't extracted). Source:
// https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/general-practice-gp/how-to-apply-for-gp-specialty-training/gp-specialty-training-recruitment/gp-msra
// Page is labelled "2026 round 1 scoring" but its own "last reviewed" date is 25 Sep 2023 — the
// band shape is very likely reused each cycle rather than freshly recalculated, so treat this as
// indicative of band shape, not a confirmed 2026-cohort result. MSRA scores are normalised to a
// mean of 250 and SD of 40 each sitting, which is why this table works as a rough model across
// cycles despite raw scores not being directly comparable year to year.
export type GpMsraBand = { minScore: number | null; maxScore: number | null; pctOfCandidates: number; band: number };

export const GP_MSRA_SCORE_BANDS: GpMsraBand[] = [
  { minScore: null, maxScore: 170, pctOfCandidates: 2, band: 1 },
  { minScore: 171, maxScore: 185, pctOfCandidates: 2, band: 1 },
  { minScore: 186, maxScore: 210, pctOfCandidates: 7, band: 2 },
  { minScore: 211, maxScore: 230, pctOfCandidates: 9, band: 2 },
  { minScore: 231, maxScore: 250, pctOfCandidates: 13, band: 3 },
  { minScore: 251, maxScore: 270, pctOfCandidates: 19, band: 3 },
  { minScore: 271, maxScore: 290, pctOfCandidates: 24, band: 3 },
  { minScore: 291, maxScore: 310, pctOfCandidates: 20, band: 4 },
  { minScore: 311, maxScore: null, pctOfCandidates: 4, band: 4 },
];

export const GP_MSRA_BANDS_SOURCE_URL =
  "https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/general-practice-gp/how-to-apply-for-gp-specialty-training/gp-specialty-training-recruitment/gp-msra";

export const MSRA_MINIMUM_STANDARD = {
  perComponent: 201,
  note: "201 on each of the 2 components (PD and CPS) — falling below on either is an automatic fail regardless of specialty.",
};

// The 10 priority specialties named in the master prompt as covering the majority of UK applicants.
export const PRIORITY_SPECIALTIES = [
  "General Practice",
  "Internal Medicine Training",
  "Core Psychiatry Training",
  "Core Surgical Training",
  "Anaesthetics / ACCS",
  "Paediatrics",
  "Obstetrics & Gynaecology",
  "ACCS Emergency Medicine",
  "Clinical Radiology",
  "Ophthalmology",
];

// Which priority specialties have verified precise scoring built so far vs AI-indicative only.
// "verified_scoring_and_likelihood" = a real scoring matrix AND an offer-likelihood/percentile
// tool (only possible where an official score distribution is published — currently IMT only).
// "verified_scoring" = a real, sourced scoring matrix, but no published score distribution to
// build a likelihood estimate from (CST is interview-assessed live; Paediatrics' shortlisting
// score is a gate that doesn't carry to final rank).
// "confirmed_no_portfolio" = we've verified, from the specialty's own official recruitment site,
// that there is no portfolio/self-assessment scoring matrix at all (MSRA-only, or a pure
// structured interview with no published scoring rubric) — this is a confirmed fact, not a gap
// in our research, so it's deliberately shown differently from "indicative".
export type CoverageTier =
  | "verified_scoring_and_likelihood"
  | "verified_scoring"
  | "confirmed_no_portfolio"
  | "indicative";

export type SpecialtyCoverage = {
  tier: CoverageTier;
  portfolioHref?: string;
  likelihoodHref?: string;
};

export const SCORING_COVERAGE: Record<string, SpecialtyCoverage> = {
  "Internal Medicine Training": {
    tier: "verified_scoring_and_likelihood",
    portfolioHref: "/portfolio/imt",
    likelihoodHref: "/imt-likelihood",
  },
  "Core Surgical Training": { tier: "verified_scoring", portfolioHref: "/portfolio/cst" },
  "Paediatrics": { tier: "verified_scoring", portfolioHref: "/portfolio/paediatrics" },
  "Clinical Radiology": { tier: "verified_scoring", portfolioHref: "/portfolio/radiology" },
  "Ophthalmology": { tier: "verified_scoring", portfolioHref: "/portfolio/ophthalmology" },
  "General Practice": { tier: "confirmed_no_portfolio" },
  "Core Psychiatry Training": { tier: "confirmed_no_portfolio" },
  "Anaesthetics / ACCS": { tier: "confirmed_no_portfolio" },
  "Obstetrics & Gynaecology": { tier: "confirmed_no_portfolio" },
  "ACCS Emergency Medicine": { tier: "confirmed_no_portfolio" },
};

// Specialties covered outside the 10-priority list above — smaller applicant pools, but built
// because we could source (or partially source) their scoring matrices. Kept separate from
// SCORING_COVERAGE/PRIORITY_SPECIALTIES so the home page's priority grid doesn't grow to cover
// every specialty in SPECIALTY_RATIOS, only the ones with dedicated build effort behind them.
export type SecondarySpecialty = {
  name: string;
  coverage: SpecialtyCoverage;
};

export const SECONDARY_SPECIALTIES: SecondarySpecialty[] = [
  { name: "Cardiothoracic Surgery", coverage: { tier: "verified_scoring", portfolioHref: "/portfolio/cardiothoracic" } },
  { name: "Histopathology", coverage: { tier: "verified_scoring", portfolioHref: "/portfolio/histopathology" } },
  { name: "Neurosurgery", coverage: { tier: "indicative" } },
  { name: "Oral & Maxillofacial Surgery", coverage: { tier: "indicative" } },
];
