// Official Core Surgical Training (CST) portfolio scoring matrix, 2025/26 cycle.
// Source: NHS England, "Core Surgical Training Portfolio Guidance for Candidates"
// https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/surgery/core-surgery/core-surgical-training-portfolio-guidance-for-candidates
// (reviewed 23 Oct 2025, next review 23 Oct 2027)
//
// Structurally different from IMT: the portfolio is NOT pre-scored into a shortlisting number.
// It's assessed live at interview — candidates upload an index sheet + evidence, assessors get
// 10-15 minutes, then ask questions on TWO assessor-chosen domains (not candidate-chosen).
// No official UK CST score distribution is published, so there is no likelihood/percentile tool
// for CST (unlike IMT) — this is a self-assessment band checker only.

export type CstBand = {
  letter: string;
  label: string;
};

export type CstComponent = {
  id: string;
  label?: string; // set when a domain has more than one scored component
  bands: CstBand[];
};

export type CstDomain = {
  id: string;
  label: string;
  note?: string;
  components: CstComponent[];
};

export const CST_PORTFOLIO_DOMAINS: CstDomain[] = [
  {
    id: "operative_experience",
    label: "Operative Experience",
    note: "Via a single combined, verified eLogbook consolidation report.",
    components: [
      {
        id: "operative_experience",
        bands: [
          { letter: "A", label: "40+ cases" },
          { letter: "B", label: "30-39 cases" },
          { letter: "C", label: "20-29 cases" },
          { letter: "D", label: "11-19 cases" },
          { letter: "E", label: "10 or fewer cases / no evidence" },
        ],
      },
    ],
  },
  {
    id: "surgical_experience",
    label: "Surgical Experience",
    note: "Foundation placements no longer count, and ITU no longer counts as a surgical specialty (both 2025/26 changes).",
    components: [
      {
        id: "surgical_experience",
        bands: [
          { letter: "A", label: "Surgical taster week (min. 5 days, non-consecutive allowed) OR surgical elective (min. 4 weeks)" },
          { letter: "B", label: "Neither" },
        ],
      },
    ],
  },
  {
    id: "qi_audit",
    label: "Quality Improvement / Clinical Audit",
    note: "Presentation is only scored if you have a leadership level of A, B, or C. 2025/26 change: the presentation must have occurred in the area intended to bring about the change.",
    components: [
      {
        id: "leadership",
        label: "Leadership level",
        bands: [
          { letter: "A", label: "Led all aspects of a surgically-themed audit/QI with demonstrated change (2+ cycles)" },
          { letter: "B", label: "Led all aspects of a non-surgical audit/QI with demonstrated change" },
          { letter: "C", label: "Contributor through multiple cycles" },
          { letter: "D", label: "Involved in one cycle (e.g. data collection)" },
          { letter: "E", label: "None / other" },
        ],
      },
      {
        id: "presentation",
        label: "Presentation (only scored if leadership is A, B, or C)",
        bands: [
          { letter: "A", label: "Presented both cycles OR the intervention and change" },
          { letter: "B", label: "Presented one cycle" },
          { letter: "C", label: "Did not present" },
        ],
      },
    ],
  },
  {
    id: "presentations_publications",
    label: "Presentations and Publications",
    note: "Requires a PubMed ID for all print publications — no ID scores 0, and a false PubMed claim risks a probity referral to the GMC.",
    components: [
      {
        id: "presentations_publications",
        bands: [
          { letter: "A", label: "Won top prize for an invited/selected oral presentation at a national/international meeting, OR first author of a PubMed-cited publication (not case report/editorial)" },
          { letter: "B", label: "Delivered an oral presentation after selection, OR first-author prize-winning/oral poster, OR first-author PubMed case report/editorial/book chapter" },
          { letter: "C", label: "Named co-author of one PubMed-cited publication" },
          { letter: "D", label: "First-author poster, OR invited regional oral presentation, OR cited collaborative author" },
          { letter: "E", label: "None / other" },
        ],
      },
    ],
  },
  {
    id: "teaching_experience",
    label: "Teaching Experience",
    note: "Formal feedback evidence is mandatory at all levels.",
    components: [
      {
        id: "teaching_experience",
        bands: [
          { letter: "A", label: "Designed/organised a face-to-face programme (4+ sessions) AND delivered 4+" },
          { letter: "B", label: "Same, but delivered online" },
          { letter: "C", label: "Designed/organised but delivered fewer than 4 sessions" },
          { letter: "D", label: "Regular teaching (4+/year) OR a \"learning to teach\" course" },
          { letter: "E", label: "None" },
        ],
      },
    ],
  },
];

export const CST_SCORING_SOURCE_URL =
  "https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/surgery/core-surgery/core-surgical-training-portfolio-guidance-for-candidates";

export const CST_STRUCTURAL_NOTE =
  "A single achievement can only be claimed in one domain, at its highest-scoring category. Missing your index sheet at interview is an automatic 0. A confirmed change is coming for 2027: domains will be relabelled to match GMC Good Medical Practice categories — NHS England describes it as a cosmetic change, so the scoring logic is expected to map across rather than being rebuilt.";
