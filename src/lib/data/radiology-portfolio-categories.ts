// Official Clinical Radiology ST1 portfolio scoring matrix, 2026 cycle.
// Source: NHS England, "Clinical Radiology ST1 Portfolio Review Guidance"
// https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/clinical-radiology/core-clinical-radiology/clinical-radiology-st1-portfolio-review-guidance
// (reviewed 20 Oct 2025, next review 20 Oct 2027)
//
// 5 domains, 24 points total. Domain 1 (Commitment to Specialty) is double-weighted — its A-E
// bands already have the ×2 applied below. MSRA is used only to shortlist into the interview and
// does not carry into the final score: final ranking for offers is 40% portfolio score (this
// matrix) + 60% interview score. Only one piece of evidence may be claimed per domain (two for
// Domain 1 category A and Domain 4 category A). Intercalated/additional undergraduate degrees
// are explicitly excluded from scoring — only postgraduate achievements count.

export type RadiologyBand = {
  letter: string;
  points: number;
  label: string;
};

export type RadiologyDomain = {
  id: string;
  label: string;
  maxPoints: number;
  note?: string;
  bands: RadiologyBand[];
};

export const RADIOLOGY_PORTFOLIO_DOMAINS: RadiologyDomain[] = [
  {
    id: "commitment_to_specialty",
    label: "Commitment to Specialty",
    maxPoints: 8,
    note: "Double-weighted domain. \"Significant exposure\" means at least 3 whole-day-equivalent days attached to a clinical radiology department (e.g. taster week, SSC/elective, or a radiology-based research project with departmental presence).",
    bands: [
      { letter: "A", points: 8, label: "Multiple significant exposures to the work of a clinical radiology department" },
      { letter: "B", points: 6, label: "One significant exposure to the work of a radiology department" },
      { letter: "C", points: 4, label: "Attended a radiology-based course of at least 1 day in length" },
      { letter: "D", points: 2, label: "Attended a radiology-related conference" },
      { letter: "E", points: 0, label: "None of the above" },
    ],
  },
  {
    id: "leadership_management",
    label: "Leadership and Management",
    maxPoints: 4,
    note: "Any claimed role must be at least 6 months in duration.",
    bands: [
      { letter: "A", points: 4, label: "Held a national-level leadership/managerial role involving radiology" },
      { letter: "B", points: 3, label: "Held a national-level leadership/managerial role not involving radiology but relating to healthcare, or a local/regional leadership/managerial role involving radiology" },
      { letter: "C", points: 2, label: "Held a national-level leadership/managerial role outside healthcare, or a local/regional leadership/managerial role relating to healthcare but not radiology" },
      { letter: "D", points: 1, label: "Held a local/regional leadership/managerial role outside healthcare" },
      { letter: "E", points: 0, label: "None of the above" },
    ],
  },
  {
    id: "teaching_training",
    label: "Teaching and Training",
    maxPoints: 4,
    note: "Formal teaching programmes must total at least 3 months.",
    bands: [
      { letter: "A", points: 4, label: "Holds a formal postgraduate teaching qualification (Masters, CILT, PGDip, PG Cert)" },
      { letter: "B", points: 3, label: "Made a major contribution to a national or international teaching programme, with evidence" },
      { letter: "C", points: 2, label: "Evidence of other training in teaching methods, study of at least 2 days (e.g. Train the Trainers)" },
      { letter: "D", points: 1, label: "Evidence of providing regional teaching" },
      { letter: "E", points: 0, label: "None of the above" },
    ],
  },
  {
    id: "audit_qi",
    label: "Audit and Quality Improvement",
    maxPoints: 4,
    note: "\"Changed practice\" means a demonstrated closed-loop second cycle showing improved compliance, or improvement in a quality metric.",
    bands: [
      { letter: "A", points: 4, label: "Led 2+ radiology-related audits/QI projects that resulted in changed practice" },
      { letter: "B", points: 3, label: "Led one radiology-related audit/QI project that resulted in changed practice" },
      { letter: "C", points: 2, label: "Led a non-radiology audit/QI project shown to have resulted in changed practice" },
      { letter: "D", points: 1, label: "Contributed to, but did not lead, an audit/QI project" },
      { letter: "E", points: 0, label: "None of the above" },
    ],
  },
  {
    id: "academic_achievements",
    label: "Academic Achievements",
    maxPoints: 4,
    note: "Intercalated and additional undergraduate degrees are excluded from scoring — only postgraduate achievements count.",
    bands: [
      { letter: "A", points: 4, label: "Holds a postgraduate research degree (PhD, MD, MDRes), or 1+ peer-reviewed radiology publication as first author" },
      { letter: "B", points: 3, label: "1+ peer-reviewed radiology publication not as first author, or 1+ peer-reviewed non-radiology publication as first author, or a radiology-related case report as first author, or 1+ national/international oral or poster presentation (radiology) as first author" },
      { letter: "C", points: 2, label: "1+ peer-reviewed publication not as first author, or a non-radiology case report as first author, or a local/regional oral or poster presentation (radiology) as first author" },
      { letter: "D", points: 1, label: "A local/regional/national/international oral or poster presentation not relating to radiology, or involvement in a research team as part of an elective/intercalated degree/SSC/academic foundation programme/summer school/research taster" },
      { letter: "E", points: 0, label: "None of the above" },
    ],
  },
];

export const RADIOLOGY_MAX = RADIOLOGY_PORTFOLIO_DOMAINS.reduce((sum, d) => sum + d.maxPoints, 0); // 24

export const RADIOLOGY_SCORING_SOURCE_URL =
  "https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/clinical-radiology/core-clinical-radiology/clinical-radiology-st1-portfolio-review-guidance";

export const RADIOLOGY_STRUCTURAL_NOTE =
  "MSRA is used only to shortlist into interview and does not carry into your final score. Final ranking for offers is 40% this portfolio score + 60% interview score (one official NHS England page states this split; a small number of secondary sources describe the opposite weighting for the same cycle, so treat the exact ratio as the best-available figure rather than fully unanimous). No official score distribution is published for the portfolio stage, so there's deliberately no likelihood tool here — this is a self-assessment band checker only, same as CST.";
