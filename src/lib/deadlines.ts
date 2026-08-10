import { SPECIALTY_TIMELINES, type TimelineStage } from "@/lib/data/specialty-timelines";

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// Stage date strings are free text ("11–24 Feb 2027", "by 4 Dec 2026", "22 Oct 2026", or just
// "Aug 2027" when no exact day is published) — this pulls the first complete date it finds, which
// is consistently the primary/end date for how these strings are written in specialty-timelines.ts.
// A month with no day (e.g. most specialties' "Post starts") falls back to the 1st of that month
// so the stage still surfaces in the plan, rather than silently vanishing.
export function parseStageDate(text: string): Date | null {
  const withDay = text.match(/(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/);
  if (withDay) {
    const [, day, monthRaw, year] = withDay;
    const month = MONTHS[monthRaw.slice(0, 3).toLowerCase()];
    if (month === undefined) return null;
    return new Date(Number(year), month, Number(day));
  }
  const monthOnly = text.match(/([A-Za-z]{3,9})\s+(\d{4})/);
  if (monthOnly) {
    const [, monthRaw, year] = monthOnly;
    const month = MONTHS[monthRaw.slice(0, 3).toLowerCase()];
    if (month === undefined) return null;
    return new Date(Number(year), month, 1);
  }
  return null;
}

export type PlanEntry = {
  specialty: string;
  stage: TimelineStage;
  date: Date;
};

export function buildPlan(selectedSpecialties: string[]): PlanEntry[] {
  const selected = new Set(selectedSpecialties);
  const entries: PlanEntry[] = [];
  for (const timeline of SPECIALTY_TIMELINES) {
    if (!selected.has(timeline.specialty)) continue;
    for (const stage of timeline.stages) {
      const date = parseStageDate(stage.date);
      if (date) entries.push({ specialty: timeline.specialty, stage, date });
    }
  }
  return entries.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function daysUntil(date: Date, from: Date = new Date()): number {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((target.getTime() - start.getTime()) / 86_400_000);
}
