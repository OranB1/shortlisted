// Official IMT self-assessment scoring matrix, 2026 recruitment cycle.
// Source: https://www.imtrecruitment.org.uk/recruitment-process/applying/application-scoring
// Each domain scores your single highest-qualifying achievement, not a count of everything you've
// done (e.g. three local posters do not add up) — so the UI should ask "which band do you qualify
// for", not "how many do you have".

export type ScoreBand = {
  points: number;
  label: string;
};

export type PortfolioDomain = {
  id: string;
  label: string;
  maxPoints: number;
  note?: string;
  bands: ScoreBand[]; // ordered highest points first; last is always { points: 0, label: "None of the above" }
};

export const IMT_PORTFOLIO_DOMAINS: PortfolioDomain[] = [
  {
    id: "degrees",
    label: "Postgraduate degrees & qualifications",
    maxPoints: 4,
    note: "Intercalated degrees, MRCP(UK)/membership exams, and teaching qualifications (see Training in Teaching) don't count here.",
    bands: [
      { points: 4, label: "PhD or MD by research (can include non-medical related qualifications)" },
      { points: 3, label: "Masters level degree e.g. MSc, MA, MRes (8+ months full-time equivalent)" },
      { points: 1, label: "Other relevant postgraduate diploma or postgraduate certificate (1-10 months)" },
      { points: 0, label: "None of the above" },
    ],
  },
  {
    id: "presentations",
    label: "Presentations & posters",
    maxPoints: 6,
    note: "Must involve novel data (research, case presentations, QI projects) — teaching presentations don't count. First/second author only.",
    bands: [
      { points: 6, label: "Oral presentation (1st/2nd author) at a national or international medical meeting" },
      { points: 4, label: "Poster (1st/2nd author) at a national or international medical meeting" },
      { points: 3, label: "Oral presentation (1st/2nd author) at a regional medical meeting" },
      { points: 2, label: "Oral presentation at a local meeting, or poster at a regional/local meeting" },
      { points: 0, label: "None of the above" },
    ],
  },
  {
    id: "publications",
    label: "Publications",
    maxPoints: 8,
    note: "\"In press\" (fully accepted, awaiting publication) counts; submitted-but-not-accepted does not.",
    bands: [
      { points: 8, label: "First/joint-first/corresponding author of a PubMed-cited original research publication" },
      { points: 6, label: "Co-author of a PubMed-cited original research publication" },
      { points: 5, label: "Author of more than one other PubMed-cited publication (editorial, review, case report, letter), or a book chapter" },
      { points: 3, label: "Author of one other PubMed-cited publication" },
      { points: 1, label: "Published abstract(s) or non-PubMed-cited article(s)" },
      { points: 0, label: "None of the above" },
    ],
  },
  {
    id: "teaching",
    label: "Teaching experience",
    maxPoints: 5,
    note: "Requires formal feedback evidence (senior observation or collected/analysed participant feedback).",
    bands: [
      { points: 5, label: "Organised and regularly delivered a teaching programme (~3+ months) with local tutors" },
      { points: 3, label: "Regular teaching as part of a defined programme/course (~3+ months)" },
      { points: 1, label: "Occasional teaching (min. 3 sessions, under 3 months)" },
      { points: 0, label: "None of the above" },
    ],
  },
  {
    id: "teaching_training",
    label: "Training in teaching",
    maxPoints: 3,
    bands: [
      { points: 3, label: "Higher qualification in teaching (e.g. PG Cert/PG Diploma, 60+ credits)" },
      { points: 1, label: "Training in teaching methods below PG Cert/Diploma level (min. 6 hours)" },
      { points: 0, label: "No training in teaching methods" },
    ],
  },
  {
    id: "qi",
    label: "Quality improvement",
    maxPoints: 4,
    note: "Must use a recognised QI methodology (e.g. PDSA); clinical audits qualify if they do.",
    bands: [
      { points: 4, label: "Involved in all stages of two QI cycles" },
      { points: 3, label: "Involved in some stages of two cycles, or all stages of one cycle" },
      { points: 1, label: "Involved in some stages of one cycle" },
      { points: 0, label: "None of the above" },
    ],
  },
];

export const IMT_SELF_ASSESSMENT_MAX = IMT_PORTFOLIO_DOMAINS.reduce((sum, d) => sum + d.maxPoints, 0); // 30

export const IMT_UNIQUE_APPLICANT_BONUS = {
  points: 5,
  label: "Applying only to the joint IMT/ACCS-IM vacancy in Round 1 (no other live specialty applications at closing date)",
};

export const IMT_MAX_WITH_BONUS = IMT_SELF_ASSESSMENT_MAX + IMT_UNIQUE_APPLICANT_BONUS.points; // 35

export const IMT_SCORING_SOURCE_URL =
  "https://www.imtrecruitment.org.uk/recruitment-process/applying/application-scoring";
