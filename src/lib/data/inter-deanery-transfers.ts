// Inter-deanery transfer (IDT) data — existing trainees applying to move deaneries MID-TRAINING
// (e.g. an ST3 O&G trainee wanting to move from Severn to North London). This is a genuinely
// different question from initial ST1 recruitment competition (covered by SPECIALTY_RATIOS) —
// shown here as its own labelled section so the two datasets never get conflated in the UI.
// Source: NHS England IDT statistics pages, .../inter-deanery-transfers-idt/statistics/top-6/...

export type IdtSpecialtyNote = {
  specialty: string;
  note: string;
  hasSignal: boolean;
};

export const IDT_NOTES: IdtSpecialtyNote[] = [
  {
    specialty: "Obstetrics & Gynaecology",
    note: "North London and South London consistently draw the highest transfer demand — 18-20 applications per round in recent years, vs. 0-7 for most other regions.",
    hasSignal: true,
  },
  {
    specialty: "Clinical Radiology",
    note: "Even more pronounced than O&G: North London alone drew 32 applications-to-join in August 2024 (26 in February 2024) — typically 3-6x the volume of the next-busiest region. North and South London combined regularly account for 40-50% of all national transfer demand. Total national volume has grown from ~10-20 applications per round pre-2020 to 50-69 per round in 2023-2025.",
    hasSignal: true,
  },
  {
    specialty: "Ophthalmology",
    note: "No usable signal — Ophthalmology's trainee cohort is too small to generate reliable transfer data. It only qualified as a tracked \"top 6\" specialty for a single round (August 2021: 15 applications, 7 offers) since NHS England began publishing this data.",
    hasSignal: false,
  },
];

export const IDT_CAVEAT =
  "This measures existing trainees transferring between deaneries mid-training, not initial ST1 recruitment competition — a later-career question, not \"where's easiest to get an offer.\" Don't read it as a regional difficulty score for applying in the first place.";
