import { GP_MSRA_SCORE_BANDS, type SpecialtyRatioYear } from "@/lib/data/all-specialty-ratios";

// Directional-only projections. We have exactly two data points (2024, 2025) for competition
// ratios, so this is a simple growth-factor extrapolation, not a real trend line — it's meant to
// give a "which direction, roughly how much" signal, not a precise forecast. Always show the
// caveat alongside any number this produces.

export function projectNextCycleRatio(r: SpecialtyRatioYear): {
  growthFactor: number;
  projectedRatio: number;
} {
  const growthFactor = r.ratio2024 > 0 ? r.ratio2025 / r.ratio2024 : 1;
  const projectedRatio = r.ratio2025 * growthFactor;
  return { growthFactor, projectedRatio };
}

/**
 * Rough MSRA score to aim for, given a target "need to rank in the top N% of applicants" figure,
 * interpolated from GP's official per-paper score-band table (which gives % of candidates per
 * score band, not a direct percentile function — we reverse-accumulate it from the top).
 * Returns null if topPercent is out of the table's range.
 */
export function estimateGpMsraScoreTarget(topPercent: number): number | null {
  if (topPercent <= 0 || topPercent > 100) return null;

  const bandsHighestFirst = [...GP_MSRA_SCORE_BANDS].reverse();
  let cumulativeBefore = 0;

  for (const band of bandsHighestFirst) {
    const cumulativeAfter = cumulativeBefore + band.pctOfCandidates;
    if (topPercent <= cumulativeAfter) {
      const fractionIntoBand = (topPercent - cumulativeBefore) / band.pctOfCandidates;
      const scoreMax = band.maxScore ?? (band.minScore ?? 0) + 20;
      const scoreMin = band.minScore ?? scoreMax - 20;
      const width = scoreMax - scoreMin;
      return Math.round(scoreMax - fractionIntoBand * width);
    }
    cumulativeBefore = cumulativeAfter;
  }
  return null;
}

export function impliedTopPercentFromRatio(ratio: number): number {
  return ratio > 0 ? Math.min(100, 100 / ratio) : 100;
}
