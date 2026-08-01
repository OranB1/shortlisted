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

export const SELECTION_MECHANISMS: SelectionMechanism[] = [
  { specialty: "IMT / joint IMT-ACCS-IM", mechanism: "Self-assessment only, max 30 (+5 IMT-only bonus in 2026 = max 35). No MSRA. Final rank by interview." },
  { specialty: "GP ST1", mechanism: "100% MSRA (no Selection Centre, no interview, 2025/2026)" },
  { specialty: "Core Psychiatry CT1", mechanism: "100% MSRA (no interview, 2025/2026)" },
  { specialty: "ACCS-Emergency Medicine ST1", mechanism: "MSRA 40% / online interview 60%" },
  { specialty: "Anaesthetics CT1 (incl. ACCS-Anaesthetics)", mechanism: "MSRA 15% (PD 7.5% + CPS 7.5%) / interview 85%" },
  { specialty: "Core Surgical Training CT1", mechanism: "MSRA 10% / portfolio station 45% / management & clinical interview station 45% (portfolio scored at interview, not pre-scored)" },
  { specialty: "O&G, Clinical Radiology, Ophthalmology, Neurosurgery, CSRH, Histopathology, Public Health", mechanism: "MSRA used for shortlisting/bypass-to-offer; exact weighting varies by year — check each specialty's own page" },
];

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
export type CoverageTier = "verified_scoring_and_likelihood" | "verified_scoring" | "indicative";

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
  "General Practice": { tier: "indicative" },
  "Core Psychiatry Training": { tier: "indicative" },
  "Anaesthetics / ACCS": { tier: "indicative" },
  "Obstetrics & Gynaecology": { tier: "indicative" },
  "ACCS Emergency Medicine": { tier: "indicative" },
  "Clinical Radiology": { tier: "indicative" },
  "Ophthalmology": { tier: "indicative" },
};
