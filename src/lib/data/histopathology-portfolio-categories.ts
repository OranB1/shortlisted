// Official Histopathology ST1 self-assessment scoring matrix, 2026 cycle.
// Source: NHS England, "Histopathology ST1 training Self-assessment scoring guidance for
// applicants"
// https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/pathology/histopathology/histopathology-st1-training-self-assessment-scoring-guidance-for-applicants
// Page last reviewed 22 October 2025, checked 2026-08-10. Maximum possible score: 71.
//
// Does not use the MSRA. The self-assessment score (completed on Oriel at application) is used
// to shortlist to the evidence-verification stage if eligible applications exceed interview
// capacity; the verified evidence score then determines interview invitations. Final ranking for
// offers comes from the interview alone — self-assessment/evidence-verification score does not
// carry forward into final rank, so there's deliberately no likelihood tool here, same as CST and
// Paediatrics. A specific achievement can only be claimed in one domain — use whichever domain
// gives the highest score. If no evidence is uploaded for a domain, verifiers award 0 for it.

export type HistopathologyBand = {
  points: number;
  label: string;
};

export type HistopathologyDomain = {
  id: string;
  label: string;
  maxPoints: number;
  note?: string;
  bands: HistopathologyBand[];
};

export const HISTOPATHOLOGY_PORTFOLIO_DOMAINS: HistopathologyDomain[] = [
  {
    id: "additional_undergraduate_degrees",
    label: "Additional Undergraduate Degrees and Qualifications",
    maxPoints: 3,
    note: "Degree obtained prior to starting medicine — can include non-medical related degrees.",
    bands: [
      { points: 3, label: "1st class honours or equivalent" },
      { points: 2, label: "2.1 or equivalent" },
      { points: 0, label: "None/other" },
    ],
  },
  {
    id: "postgraduate_degrees",
    label: "Postgraduate Degrees and Qualifications",
    maxPoints: 4,
    note: "Cannot claim membership examinations or parts thereof (incl. MRCP(UK)). Qualifications unrelated to medicine cannot be claimed under the diploma/certificate option.",
    bands: [
      { points: 4, label: "PhD or DPhil (can include non-medical related qualifications)" },
      { points: 4, label: "MD (2-year original research-based) or MPhil (can include non-medical related qualifications)" },
      { points: 3, label: "Master's level degree (MSc, MA, MRes) — typically 8+ months whole-time equivalent, can include non-medical" },
      { points: 3, label: "MD (dissertation)" },
      { points: 2, label: "Other relevant PG diploma or PG certificate, typically 1–10 months whole-time equivalent" },
      { points: 0, label: "None/other" },
    ],
  },
  {
    id: "presentations_posters",
    label: "Presentations/Posters",
    maxPoints: 8,
    note: "Must have been invited/selected to present. Scotland and Wales presentations now count as National.",
    bands: [
      { points: 8, label: "Histopathology-related oral presentation, national/international meeting" },
      { points: 8, label: "More than 1 Histopathology-related poster, national/international meeting" },
      { points: 6, label: "1 Histopathology-related poster, national/international meeting" },
      { points: 6, label: "Histopathology-related oral presentation, regional meeting" },
      { points: 5, label: "Non-Histopathology oral presentation, national/international meeting" },
      { points: 5, label: "More than 1 non-Histopathology poster, national/international meeting" },
      { points: 4, label: "1 non-Histopathology poster, national/international meeting" },
      { points: 4, label: "Non-Histopathology oral presentation, regional meeting" },
      { points: 4, label: "Poster(s) at regional meeting(s)" },
      { points: 2, label: "Oral presentation or poster(s) at local meeting(s)" },
      { points: 2, label: "Significant contributor to an oral/poster presentation you didn't personally present or show" },
      { points: 0, label: "None/other" },
    ],
  },
  {
    id: "publications",
    label: "Publications",
    maxPoints: 5,
    note: "PubMed-cited (or in press) unless stated otherwise.",
    bands: [
      { points: 5, label: "First/joint-first author of 2 or more original research publications" },
      { points: 4, label: "Co-author of 2 or more original research publications" },
      { points: 4, label: "First/joint-first author of 1 original research publication" },
      { points: 3, label: "Co-author of 1 original research publication" },
      { points: 3, label: "First/joint-first/co-author of more than 1 other publication (editorial, review, case report, letter, etc.)" },
      { points: 3, label: "First/joint-first/co-author of 1 other publication (editorial, review, case report, letter, etc.)" },
      { points: 2, label: "1 or more abstracts, non-peer-reviewed articles, or articles not PubMed-cited" },
      { points: 0, label: "None/other" },
    ],
  },
  {
    id: "teaching_experience",
    label: "Teaching Experience",
    maxPoints: 10,
    note: "Requires evidence of formal feedback.",
    bands: [
      { points: 10, label: "Co-designed and organised a teaching programme with local tutors, contributed regularly for ~3+ months" },
      { points: 8, label: "Organised a local teaching programme (2+ sessions), contributed regularly for ~3+ months" },
      { points: 6, label: "Regular teaching for ~3+ months" },
      { points: 4, label: "Occasional teaching" },
      { points: 0, label: "None/other" },
    ],
  },
  {
    id: "training_in_teaching",
    label: "Training in Teaching",
    maxPoints: 5,
    bands: [
      { points: 5, label: "Master's level teaching qualification" },
      { points: 3, label: "Higher qualification in teaching, e.g. PG Cert or PG Diploma" },
      { points: 2, label: "Substantial training (more than 2 days), e.g. a module forming part of a PG teaching qualification" },
      { points: 1, label: "Brief training (no more than 2 days)" },
      { points: 0, label: "No training in teaching methods" },
    ],
  },
  {
    id: "quality_improvement",
    label: "Quality Improvement (QI)",
    maxPoints: 10,
    note: "\"Sustainable change\" means more than one completed PDSA cycle.",
    bands: [
      { points: 10, label: "Led design/implementation of a sustainable change, and presented complete results at a meeting" },
      { points: 8, label: "Led design/implementation of a sustainable change, results not presented" },
      { points: 6, label: "Actively participated in a sustainable change, and presented complete results at a meeting" },
      { points: 4, label: "Actively participated in a sustainable change, results not presented" },
      { points: 2, label: "Participated in certain stages only, at least one cycle completed" },
      { points: 0, label: "None/other" },
    ],
  },
  {
    id: "leadership_management",
    label: "Leadership and Management",
    maxPoints: 8,
    note: "Role held 6+ months with demonstrable positive impact.",
    bands: [
      { points: 8, label: "National leadership/managerial role related to healthcare provision" },
      { points: 8, label: "National leadership/managerial role, non-medical voluntary capacity" },
      { points: 6, label: "Regional leadership/managerial role related to healthcare provision" },
      { points: 4, label: "Local leadership/managerial role related to healthcare provision" },
      { points: 4, label: "Local/regional leadership/managerial role, non-medical voluntary capacity" },
      { points: 0, label: "None/other" },
    ],
  },
  {
    id: "commitment_to_histopathology",
    label: "Commitment to Histopathology as a Specialty",
    maxPoints: 10,
    bands: [
      { points: 10, label: "Completed a foundation year programme or extended period of training in histopathology" },
      { points: 10, label: "Experience in histopathology lasting more than 2 days, e.g. a taster week" },
      { points: 6, label: "Brief experience, no more than 2 days" },
      { points: 0, label: "No experience of histopathology" },
    ],
  },
  {
    id: "histopathology_related_activities",
    label: "Histopathology Related Activities",
    maxPoints: 8,
    bands: [
      { points: 8, label: "Completed a research project related to histopathology" },
      { points: 8, label: "Produced and presented a presentation/poster related to histopathology at a national/regional meeting" },
      { points: 6, label: "Completed an audit in histopathology" },
      { points: 4, label: "Attended histopathology-related courses with CPD evidence" },
      { points: 4, label: "Completed an alternative histopathology-related activity, with evidence" },
      { points: 0, label: "None of the above" },
    ],
  },
];

export const HISTOPATHOLOGY_MAX = HISTOPATHOLOGY_PORTFOLIO_DOMAINS.reduce(
  (sum, d) => sum + d.maxPoints,
  0
); // 71

export const HISTOPATHOLOGY_SCORING_SOURCE_URL =
  "https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/pathology/histopathology/histopathology-st1-training-self-assessment-scoring-guidance-for-applicants";

export const HISTOPATHOLOGY_STRUCTURAL_NOTE =
  "No MSRA is used for this pathway. This self-assessment score (completed on Oriel at application) is used to shortlist to the evidence-verification stage if eligible applications exceed capacity; the verified evidence score then determines who's invited to interview. Final ranking for offers comes from the interview alone — this score doesn't carry into final rank, so there's deliberately no likelihood tool here, same as CST and Paediatrics. Evidence for each domain must be uploaded to the Evidence Verification Portal by the deadline (10am, 1 December 2025 for the previous cycle — check the current cycle's exact date); a domain with no evidence uploaded is scored 0 regardless of your self-assessment claim, and only the first item of evidence you upload per domain will be checked. Any achievement can only be claimed in one domain — use whichever gives the highest score.";
