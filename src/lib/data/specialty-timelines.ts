// Recruitment timeline (key dates) for every CT1/ST1 specialty in SPECIALTY_RATIOS, for the round
// applying autumn 2026 for August 2027 posts. NHS England's central "Specialty Recruitment
// Interview Schedule" page hadn't been updated for this round as of 2026-08-10 (it still only
// covered the round applying autumn 2025 for August 2026 posts), so each specialty's dates below
// were gathered from that specialty's own recruitment pages/timeline. Every specialty confirms the
// same national application window (22 Oct – 19 Nov 2026) and post-start date (Aug 2027), which
// cross-validates the rest of each row.
//
// Treat these as a planning aid, not a guarantee — always confirm exact dates and times on Oriel
// or the specialty's own recruitment page before relying on them for submission. Where a specialty
// publishes an exact day (not just a month) for interviews/offers, that's shown; a few offer dates
// vary slightly by specialty (23, 26, or 30 Mar 2027) because NHS England staggers them.

export type TimelineStage = {
  label: string;
  date: string; // free text — a single date or a range, exactly as published
};

export type SpecialtyTimeline = {
  specialty: string; // matches SPECIALTY_RATIOS[].specialty
  stages: TimelineStage[];
};

export const SPECIALTY_TIMELINES: SpecialtyTimeline[] = [
  {
    specialty: "Internal Medicine Training CT1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "Self-assessment scoring completed", date: "16 Dec 2026" },
      { label: "Interview period", date: "11 Jan – 12 Feb 2027" },
      { label: "Final ranking released", date: "23 Feb 2027" },
      { label: "Offers released", date: "23 Mar 2027" },
      { label: "Post starts", date: "4 Aug 2027" },
    ],
  },
  {
    specialty: "Core Surgical Training CT1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "MSRA sitting window", date: "5–18 Jan 2027" },
      { label: "Portfolio submission", date: "15–25 Feb 2027" },
      { label: "Interview", date: "1–10 Mar 2027" },
      { label: "Offers released", date: "23 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Paediatrics ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "Application form scoring", date: "16 Dec 2026 – 11 Jan 2027" },
      { label: "Interview", date: "2 Feb – 12 Mar 2027" },
      { label: "Offers released", date: "23 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Clinical Radiology ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "MSRA sitting window", date: "5–18 Jan 2027" },
      { label: "Portfolio upload", date: "12–15 Feb 2027" },
      { label: "Interview", date: "22–26 Feb 2027" },
      { label: "Offers released", date: "23 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Ophthalmology ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "MSRA sitting window", date: "5–18 Jan 2027" },
      { label: "Portfolio & self-assessment submission", date: "15 Jan – 1 Feb 2027" },
      { label: "Portfolio review", date: "12 Feb 2027" },
      { label: "Interview", date: "15–16 Mar 2027" },
      { label: "Offers released", date: "23 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "General Practice ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "MSRA sitting window", date: "11–24 Feb 2027 (or 5–18 Jan 2027 if brought forward)" },
      { label: "Offers released", date: "30 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Core Psychiatry Training CT1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "MSRA sitting window", date: "11–24 Feb 2027 (or 5–18 Jan 2027 if brought forward)" },
      { label: "Offers released", date: "23 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Anaesthetics CT1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "MSRA sitting window", date: "5–18 Jan 2027" },
      { label: "MSRA ranking", date: "16 Feb 2027" },
      { label: "Interview", date: "24 Feb – 12 Mar 2027" },
      { label: "Offers released", date: "23 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Obstetrics & Gynaecology ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "MSRA sitting window", date: "5–18 Jan 2027" },
      { label: "Interview (non-bypass applicants)", date: "23 Feb – 5 Mar 2027" },
      { label: "Offers released", date: "26 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "ACCS Emergency Medicine CT1/ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "MSRA sitting window", date: "5–18 Jan 2027" },
      { label: "Interview invitations", date: "11–17 Mar 2027" },
      { label: "Offers released", date: "30 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Community Sexual & Reproductive Health ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "MSRA sitting window", date: "5–18 Jan 2027" },
      { label: "Interview", date: "16–17 Mar 2027" },
      { label: "Offers released", date: "30 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Public Health Medicine ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "Assessment Centre (pass/fail gate)", date: "5–6 Jan 2027" },
      { label: "Selection Centre (virtual interview)", date: "2–4 Mar 2027" },
      { label: "Offers released", date: "30 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Cardiothoracic Surgery ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "Portfolio self-score submission", date: "by 4 Dec 2026" },
      { label: "Portfolio evidence upload", date: "7–18 Dec 2026" },
      { label: "Evidence verification panel", date: "4 Jan 2027" },
      { label: "Verified portfolio ranking", date: "by 25 Jan 2027" },
      { label: "Interview", date: "1–2 Feb 2027" },
      { label: "Offers released", date: "4 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Histopathology ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "Evidence verification window", date: "23–30 Nov 2026" },
      { label: "Interview", date: "1–4 Feb 2027" },
      { label: "Offers released", date: "23 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Neurosurgery ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "MSRA sitting window", date: "5–18 Jan 2027" },
      { label: "Ranking for interview (MSRA + self-assessment)", date: "19 Jan 2027" },
      { label: "Interview (4 stations)", date: "15–16 Mar 2027" },
      { label: "Offers released", date: "23 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
  {
    specialty: "Oral & Maxillo Facial Surgery ST1",
    stages: [
      { label: "Applications open", date: "22 Oct 2026" },
      { label: "Applications close", date: "19 Nov 2026" },
      { label: "Evidence upload", date: "1–8 Jan 2027" },
      { label: "Interview (online, via Qpercom)", date: "1 Feb 2027" },
      { label: "Ranking & offers released", date: "by 23 Mar 2027" },
      { label: "Post starts", date: "Aug 2027" },
    ],
  },
];

export const TIMELINES_SOURCE_NOTE =
  "Gathered from each specialty's own official recruitment timeline for the round applying autumn 2026 for August 2027 posts (NHS England's central interview-schedule page hadn't been updated for this round at last check). Confirm exact dates on Oriel before relying on them.";
