// Official Cardiothoracic Surgery ST1 self-assessment scoring matrix, 2026 cycle.
// Source: NHS England Wessex, "2026 National Selection – ST1 Cardiothoracic Surgery Self
// Assessment Scores and Descriptors"
// https://wessex.hee.nhs.uk/wp-content/uploads/sites/6/2025/10/ST1-CT-Surgery-Self-Assessment-Criteria-2026.pdf
// Checked 2026-08-08. Maximum possible score: 59.
//
// No MSRA is used for this pathway. Self-assessment score is verified against uploaded evidence,
// then carries forward and is combined with a structured virtual interview score for final rank
// — the official guide doesn't publish the exact weighting formula between the two.
//
// Several domains have a published maximum higher than the highest band the official document
// actually describes (e.g. "Undergraduate Clinical Electives" is headed 0–5 but only bands 0–4
// are described). We've reproduced exactly what's published rather than inventing the missing
// top band — see each domain's note.

export type CardiothoracicBand = {
  points: number;
  label: string;
};

export type CardiothoracicDomain = {
  id: string;
  label: string;
  section: string;
  maxPoints: number;
  note?: string;
  bands: CardiothoracicBand[];
};

export const CARDIOTHORACIC_PORTFOLIO_DOMAINS: CardiothoracicDomain[] = [
  {
    id: "academic_prizes_awards",
    label: "Academic Prizes & Awards",
    section: "Undergraduate Medical Career",
    maxPoints: 6,
    note: "Top-10%/1st-in-year claims require signed confirmation from the medical school and must apply to the entire degree, not individual components.",
    bands: [
      { points: 6, label: "Graduated ranked 1st overall in final year medical school" },
      { points: 4, label: "Graduated top 10% of final year medical school overall" },
      { points: 3, label: "Two or more 1st prizes for academic performance" },
      { points: 2, label: "One 1st prize for academic performance, or one or more bursary/grant/fellowship for research or travel" },
      { points: 1, label: "Certificate of merit/appreciation, or runner-up" },
      { points: 0, label: "Shortlisted or finalist, not winner" },
    ],
  },
  {
    id: "undergraduate_electives",
    label: "Undergraduate Clinical Electives and Attachments",
    section: "Undergraduate Medical Career",
    maxPoints: 5,
    note: "\"Home institution\" means any CT surgery centre affiliated with your medical school. The official document's highest described band is 4, despite this domain's stated maximum being 5 — reproduced as published.",
    bands: [
      { points: 4, label: "Two or more separate electives/attachments in a non-home institution, each ≥4 weeks" },
      { points: 3, label: "Two or more separate electives/attachments in your home institution, each >2 weeks" },
      { points: 2, label: "One elective/attachment in CT surgery, non-home institution, ≥4 weeks" },
      { points: 1, label: "One elective/attachment in CT surgery, home institution, >2 weeks, OR one in a non-home institution ≥2 weeks" },
      { points: 0, label: "Elective/attachment in CT surgery, home institution, ≤2 weeks" },
    ],
  },
  {
    id: "higher_degrees",
    label: "Higher Degree",
    section: "Postgraduate Qualifications",
    maxPoints: 6,
    note: "Involving full-time original research (e.g. PhD, MD, Master's). Excludes degrees that are an integral part of the undergraduate or postgraduate curriculum. Generic topics like anatomy/physiology don't count as \"directly related\" to CT surgery.",
    bands: [
      { points: 6, label: "Awarded doctorate (MD/PhD/DPhil) with original research directly related to CT surgery" },
      { points: 4, label: "Awarded Master's (MS/MCh/MPhil) with original research directly related to CT surgery" },
      { points: 2, label: "Higher degree not directly related to CT surgery, at any timepoint" },
      { points: 0, label: "MD as primary medical qualification, or registered but not yet awarded" },
    ],
  },
  {
    id: "postgraduate_qualifications",
    label: "Postgraduate Qualifications",
    section: "Postgraduate Qualifications",
    maxPoints: 4,
    bands: [
      { points: 4, label: "Full MRCS" },
      { points: 2, label: "MRCS Part A" },
      { points: 1, label: "MRCP" },
      { points: 0, label: "USMLE / ECFMG" },
    ],
  },
  {
    id: "pg_cert_dip",
    label: "PG Certificates and PG Diplomas",
    section: "Postgraduate Qualifications",
    maxPoints: 3,
    note: "Includes PG Cert in Education.",
    bands: [
      { points: 3, label: "Three or more PG Diplomas" },
      { points: 2, label: "Three or more PG Certificates, or one/two PG Diplomas" },
      { points: 1, label: "One or two PG Certificates relevant to CT surgery research/service delivery" },
      { points: 0, label: "No evidence" },
    ],
  },
  {
    id: "research",
    label: "Research",
    section: "Professional Development",
    maxPoints: 4,
    note: "Grant-holder claims require documentation that the applicant is the primary grant holder.",
    bands: [
      { points: 4, label: "Principal grant holder, £20,000 or more (postgraduate)" },
      { points: 3, label: "Principal grant holder, £10,000–£19,999 (postgraduate)" },
      { points: 2, label: "Principal grant holder, £2,000–£9,999 (postgraduate)" },
      { points: 1, label: "Substantive role in a completed research project not recognised elsewhere, or grant co-applicant, or principal grant holder under £2,000" },
      { points: 0, label: "Limited involvement (e.g. data collection only)" },
    ],
  },
  {
    id: "qi_audit",
    label: "Quality Improvement Project / Audit",
    section: "Professional Development",
    maxPoints: 3,
    note: "Requires a structured write-up (title/aim/baseline data/method/planning/stakeholder engagement/evaluation/reflection) signed off by your Consultant Supervisor.",
    bands: [
      { points: 3, label: "Led three or more different audit/re-audit cycles" },
      { points: 2, label: "Led four or more completed QI/audit projects, or led two different audit/re-audit cycles" },
      { points: 1, label: "Led design/conduct/presentation of one to three completed QI/audit projects registered with the audit department, or led one full audit/re-audit cycle" },
      { points: 0, label: "Participation only (e.g. data collection, audit commenced but not completed)" },
    ],
  },
  {
    id: "pg_awards_prizes",
    label: "Postgraduate Awards and Prizes",
    section: "Professional Development",
    maxPoints: 3,
    bands: [
      { points: 3, label: "International award for outstanding achievement" },
      { points: 2, label: "National award for outstanding achievement" },
      { points: 1, label: "Local/regional peer-group award for achievement in medicine or surgery" },
      { points: 0, label: "Bursaries/grants/fellowships for research or travel" },
    ],
  },
  {
    id: "operative_incisions",
    label: "Operative Skills — Incisions",
    section: "Operative Skills",
    maxPoints: 3,
    note: "As primary surgeon, opening laparotomy/thoracotomy/sternotomy. Requires a consolidated logbook signed by consultant surgeon(s). Official document's highest described band is 11+ cases (2 points) despite a stated maximum of 3 — reproduced as published.",
    bands: [
      { points: 2, label: "11 or more cases" },
      { points: 1, label: "6–10 cases" },
      { points: 0, label: "0–5 cases" },
    ],
  },
  {
    id: "operative_closures",
    label: "Operative Skills — Closures",
    section: "Operative Skills",
    maxPoints: 3,
    note: "As primary surgeon for closure. Same case-count bands and publishing gap as Incisions above.",
    bands: [
      { points: 2, label: "11 or more cases" },
      { points: 1, label: "6–10 cases" },
      { points: 0, label: "0–5 cases" },
    ],
  },
  {
    id: "operative_whole_procedures",
    label: "Operative Skills — Whole Procedures",
    section: "Operative Skills",
    maxPoints: 4,
    note: "As primary surgeon. Examples given: appendicectomy, varicose vein surgery, excision of subcutaneous cyst, saphenous vein harvesting, VATS pleural biopsy.",
    bands: [
      { points: 3, label: "16 or more cases" },
      { points: 2, label: "11–15 cases" },
      { points: 1, label: "6–10 cases" },
      { points: 0, label: "0–5 cases" },
    ],
  },
  {
    id: "presentations",
    label: "Presentations",
    section: "Supporting Activities",
    maxPoints: 3,
    bands: [
      { points: 3, label: "Three or more personally delivered oral (podium) presentations at a national/international society" },
      { points: 2, label: "One or two personally delivered oral (podium) presentations at a national/international society" },
      { points: 1, label: "Poster presentation(s) at national/international meetings" },
      { points: 0, label: "Departmental presentations" },
    ],
  },
  {
    id: "publications",
    label: "Publications",
    section: "Supporting Activities",
    maxPoints: 4,
    note: "Joint first authorship only counts if explicitly stated by the journal; a PubMed screenshot is required as evidence.",
    bands: [
      { points: 4, label: "First author of 4 peer-reviewed (PubMed-listed) publications" },
      { points: 3, label: "First author of 3 peer-reviewed publications" },
      { points: 2, label: "Co-author of 5+ peer-reviewed publications/book chapters, or author/editor of a relevant textbook, or first author of 2" },
      { points: 1, label: "Co-author of 1–4 peer-reviewed publications or book chapter(s), or first author of 1 (excl. case reports)" },
      { points: 0, label: "Letter to editor, abstract, e-comment, or pay-to-publish" },
    ],
  },
  {
    id: "leadership",
    label: "Organisational and Leadership Skills",
    section: "Supporting Activities",
    maxPoints: 2,
    note: "Must fall within 3 years of the application closing date.",
    bands: [
      { points: 2, label: "Overall Chair or Secretary of a national or international body/society" },
      { points: 1, label: "Official role in a local/regional committee, project, charity work, or local/regional branch of a national body" },
      { points: 0, label: "Rota master or similar" },
    ],
  },
  {
    id: "teaching",
    label: "Teaching",
    section: "Supporting Activities",
    maxPoints: 4,
    note: "Formal role claims require contract evidence signed by HR specifying hours/week; the role must be completed by evidence-upload time.",
    bands: [
      { points: 4, label: "Formal teaching role, 12+ months (minimum 50% WTE) — e.g. anatomy demonstrator" },
      { points: 3, label: "Formal teaching role, 6+ months (minimum 50% WTE)" },
      { points: 2, label: "Faculty of a course with a published programme, and formal participant feedback" },
      { points: 1, label: "Regular teaching to clinical professionals (at least monthly, 6+ months)" },
      { points: 0, label: "Ad hoc teaching (less than monthly for 6+ months), or public talks" },
    ],
  },
  {
    id: "outside_achievement",
    label: "Achievements Outside of Medicine",
    section: "Supporting Activities",
    maxPoints: 2,
    note: "Must reflect a regional/national award or prize, or county/national team membership. Charity/committee/project work doesn't count here — see Leadership instead.",
    bands: [
      { points: 2, label: "Recognised significant achievement outside medicine, within the last 3 years" },
      { points: 1, label: "Recognised significant achievement outside medicine, not fitting elsewhere" },
      { points: 0, label: "No evidence" },
    ],
  },
];

export const CARDIOTHORACIC_MAX = CARDIOTHORACIC_PORTFOLIO_DOMAINS.reduce((sum, d) => sum + d.maxPoints, 0); // 59

export const CARDIOTHORACIC_SCORING_SOURCE_URL =
  "https://wessex.hee.nhs.uk/wp-content/uploads/sites/6/2025/10/ST1-CT-Surgery-Self-Assessment-Criteria-2026.pdf";

export const CARDIOTHORACIC_STRUCTURAL_NOTE =
  "No MSRA is used for this pathway. Your self-assessment score is verified against uploaded evidence at an evidence-verification day, then carries forward and is combined with a structured virtual interview score for final rank — NHS England Wessex hasn't published the exact weighting formula between the two. Disability Confident Scheme applicants need 50%+ of the total self-assessment score to guarantee an interview. No official score distribution is published, so there's deliberately no likelihood tool here — this is a self-assessment band checker only. From the 2027 cycle onward, ST1 becomes the sole entry route into Cardiothoracic Surgery training (2026 was the last intake for the separate ST4 Thoracic Surgery route), which may increase competition — no compensating post-number increase has been announced.";
