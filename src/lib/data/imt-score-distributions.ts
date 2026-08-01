// Source: UK_Specialty_Training_Data_Compendium_v2.md, Parts 1-2 (official IMT Recruitment charts, 2013-2026).
// Self-assessment max changes almost every year — always compare scores as a % of that year's max, not raw.

export type SelfAssessmentYear = {
  year: number;
  applicationsConsidered: number;
  scoreMin: number;
  scoreMax: number;
  maxPossible: number;
  mean: number;
  median: number;
};

export const SELF_ASSESSMENT_DISTRIBUTIONS: SelfAssessmentYear[] = [
  { year: 2026, applicationsConsidered: 8251, scoreMin: 0, scoreMax: 35, maxPossible: 35, mean: 19.77, median: 21 },
  { year: 2025, applicationsConsidered: 8728, scoreMin: 0, scoreMax: 30, maxPossible: 30, mean: 13.75, median: 14 },
  { year: 2024, applicationsConsidered: 6174, scoreMin: 0, scoreMax: 38, maxPossible: 40, mean: 16.85, median: 17 },
  { year: 2023, applicationsConsidered: 4292, scoreMin: 0, scoreMax: 40, maxPossible: 40, mean: 17.83, median: 18 },
  { year: 2022, applicationsConsidered: 3939, scoreMin: 0, scoreMax: 56, maxPossible: 58, mean: 24.49, median: 24 },
  { year: 2021, applicationsConsidered: 3512, scoreMin: 0, scoreMax: 54, maxPossible: 58, mean: 22.43, median: 22 },
  { year: 2020, applicationsConsidered: 2714, scoreMin: 0, scoreMax: 64, maxPossible: 68, mean: 23.43, median: 22 },
  { year: 2019, applicationsConsidered: 2105, scoreMin: 0, scoreMax: 61, maxPossible: 68, mean: 23.64, median: 23 },
];

export type TotalScoreYear = {
  year: number;
  candidatesAssessed: number;
  scoreMin: number;
  scoreMax: number;
  maxPossible: number;
  mean: number;
  median: number;
  appointablePct: number; // share of interviewed candidates rated appointable
  notAppointablePct: number | null;
};

export const TOTAL_SCORE_DISTRIBUTIONS: TotalScoreYear[] = [
  { year: 2026, candidatesAssessed: 3754, scoreMin: 25.6, scoreMax: 96, maxPossible: 96, mean: 76.47, median: 77.6, appointablePct: 89, notAppointablePct: 11 },
  { year: 2025, candidatesAssessed: 3850, scoreMin: 27.6, scoreMax: 80, maxPossible: 80, mean: 62.95, median: 64.0, appointablePct: 89, notAppointablePct: 11 },
  { year: 2024, candidatesAssessed: 3682, scoreMin: 25.2, scoreMax: 80, maxPossible: 80, mean: 64.43, median: 65.8, appointablePct: 91, notAppointablePct: 9 },
  { year: 2023, candidatesAssessed: 3642, scoreMin: 20.8, scoreMax: 80, maxPossible: 80, mean: 62.02, median: 63.2, appointablePct: 88, notAppointablePct: 12 },
  { year: 2022, candidatesAssessed: 3404, scoreMin: 19, scoreMax: 80, maxPossible: 80, mean: 62.09, median: 64.0, appointablePct: 89, notAppointablePct: 11 },
  { year: 2021, candidatesAssessed: 3028, scoreMin: 9, scoreMax: 94.5, maxPossible: 100, mean: 61.88, median: 63.08, appointablePct: 85, notAppointablePct: 15 },
  { year: 2020, candidatesAssessed: 2393, scoreMin: 25.45, scoreMax: 93.25, maxPossible: 97, mean: 66.93, median: 68.0, appointablePct: 86, notAppointablePct: 14 },
  { year: 2019, candidatesAssessed: 1823, scoreMin: 31.3, scoreMax: 92.5, maxPossible: 97, mean: 68.76, median: 69.35, appointablePct: 92, notAppointablePct: 8 },
];

// Round 1 fill rate has been ~100% nationally every year since 2021 (Round 2 discontinued for IMT after 2020).
// Practical read from the compendium: "probability of any IMT offer" is very high once appointable;
// the scarce resource is your *preferred* region, not whether a post exists somewhere.
export const NATIONAL_FILL_RATE_CONTEXT = {
  since2021RoundOneFillRatePct: 99.5,
  round2DiscontinuedSince: 2020,
  note:
    "Round 1 alone has hit ~99-100% fill nationally since 2021. Nearly every appointable candidate gets a post somewhere; being ranked highly enough for a *preferred* region is the actual constraint.",
};
