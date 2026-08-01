// Official Paediatrics ST1 shortlisting scoring glossary, 2026-27 cycle.
// Source: RCPCH, "ST1 Scoring Guidance & Glossary for Shortlisting 2026-27" v.4 (updated 27 Oct 2025)
// and rcpch.ac.uk/education-careers/apply-paediatrics/ST1 (last modified 28 Oct 2025).
//
// 5 domains, 30 points total. Two assessors score independently; combined score is used for
// SHORTLISTING RANK ONLY — it does NOT carry through to final interview rank. Final rank comes
// entirely from a separate two-station virtual interview (Communication, Career Motivation,
// Clinical Reasoning, Reflective Practice), appointability threshold 55%. So — like CST — there
// is no likelihood/percentile tool here, this is a shortlisting-gate self-assessment only.
//
// 2026-27 change: the "Additional Qualifications" section (scored separately in 2025-26) has
// been folded out entirely, reducing 6 scored sections to 5.

export type PaediatricsBand = {
  points: number;
  label: string;
};

export type PaediatricsDomain = {
  id: string;
  label: string;
  maxPoints: number;
  note?: string;
  bands: PaediatricsBand[];
};

export const PAEDIATRICS_PORTFOLIO_DOMAINS: PaediatricsDomain[] = [
  {
    id: "transferable_clinical_capabilities",
    label: "Transferable clinical capabilities",
    maxPoints: 8,
    note: "Up to five examples with reflections. Max 2 of the 5 can be practical clinical procedures (cannula, venepuncture, LP, NG tube, airway maintenance).",
    bands: [
      { points: 8, label: "Five distinctly different, clearly relevant examples, each with reflection" },
      { points: 6, label: "Four distinctly different, clearly relevant examples with reflection" },
      { points: 4, label: "Two to three distinctly different, clearly relevant examples with reflection" },
      { points: 2, label: "One relevant example with reflection" },
      { points: 0, label: "No evidence" },
    ],
  },
  {
    id: "personal_achievements",
    label: "Personal achievements and reflection",
    maxPoints: 8,
    note: "Distinct from your Transferable Clinical Capabilities examples. Medical or non-medical — community/charity work counts if clearly linked to suitability for paediatrics.",
    bands: [
      { points: 8, label: "Five distinctly different, clearly relevant achievements, each with reflection" },
      { points: 6, label: "Four distinctly different, clearly relevant achievements with reflection" },
      { points: 4, label: "Two to three distinctly different, clearly relevant achievements with reflection" },
      { points: 2, label: "One relevant achievement with reflection" },
      { points: 0, label: "No evidence" },
    ],
  },
  {
    id: "qip_audit",
    label: "QIP / Audit",
    maxPoints: 5,
    note: "Best of up to 2 examples counted — not cumulative.",
    bands: [
      { points: 5, label: "Planned/coordinated AND presented a good-quality project at regional/national/international level with results and recommendations described" },
      { points: 3, label: "Involved in planning and delivery, with some presentation or dissemination" },
      { points: 1, label: "Involved in data collection or a single stage only" },
      { points: 0, label: "None" },
    ],
  },
  {
    id: "academic_achievements",
    label: "Academic achievements",
    maxPoints: 3,
    note: "A research qualification (PG Cert, PG Dip, MSc, MD via 2+ years' original research, PhD) adds +1 on top of your base score below — it does not automatically produce a 4. Must be named explicitly in the application text box.",
    bands: [
      { points: 3, label: "Detailed description with national/international presentation OR first/last-author publication" },
      { points: 2, label: "Detailed description with local/regional presentation or dissemination" },
      { points: 1, label: "Brief description of academic involvement" },
      { points: 0, label: "No detail" },
    ],
  },
  {
    id: "teaching_education",
    label: "Teaching / Education",
    maxPoints: 5,
    bands: [
      { points: 5, label: "Designed, delivered, led, evaluated, AND used feedback to improve future sessions" },
      { points: 3, label: "Designed and delivered teaching with some evaluation" },
      { points: 1, label: "Delivered teaching without design/evaluation involvement" },
      { points: 0, label: "None" },
    ],
  },
];

export const PAEDIATRICS_RESEARCH_BONUS = {
  points: 1,
  label: "I hold a genuine research qualification (PG Cert, PG Dip, MSc, MD by 2+ years' original research, or PhD) — named explicitly in my application",
};

export const PAEDIATRICS_MAX = PAEDIATRICS_PORTFOLIO_DOMAINS.reduce((sum, d) => sum + d.maxPoints, 0); // 30
export const PAEDIATRICS_MAX_WITH_BONUS = PAEDIATRICS_MAX + PAEDIATRICS_RESEARCH_BONUS.points; // 31

export const PAEDIATRICS_SCORING_SOURCE_URL =
  "https://www.rcpch.ac.uk/education-careers/apply-paediatrics/ST1";

export const PAEDIATRICS_STRUCTURAL_NOTE =
  "This shortlisting score is a gate only — it does not carry into your final rank. Final rank comes entirely from a separate two-station virtual interview (Communication, Career Motivation, Clinical Reasoning, Reflective Practice) with an appointability threshold of 55%.";
