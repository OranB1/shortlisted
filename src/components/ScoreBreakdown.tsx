"use client";

import { ScoreRing } from "@/components/ScoreRing";

type Band = { points: number; label: string };
type Domain = { id: string; label: string; maxPoints: number; bands: Band[] };

export function ScoreBreakdown({
  domains,
  selected,
  total,
  max,
  subtitle,
}: {
  domains: Domain[];
  selected: Record<string, number>;
  total: number;
  max: number;
  subtitle: React.ReactNode;
}) {
  return (
    <div className="rounded-cards border border-peach-ink/10 bg-obsidian p-4 shadow-xl">
      <div className="flex items-center gap-3">
        <ScoreRing
          value={total}
          max={max}
          size={44}
          strokeWidth={5}
          label={<span className="font-mono text-[13px] text-peach-ink">{total}</span>}
        />
        <div>
          <p className="text-caption text-peach-ink-muted">{subtitle}</p>
          <p className="font-mono text-[20px] text-peach-ink">
            {total} / {max}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {domains.map((domain) => {
          const points = selected[domain.id] ?? 0;
          const pct = domain.maxPoints > 0 ? Math.min(100, (points / domain.maxPoints) * 100) : 0;
          const nextBand = domain.bands
            .filter((b) => b.points > points)
            .sort((a, b) => a.points - b.points)[0];

          return (
            <div key={domain.id}>
              <div className="flex items-center justify-between gap-2 text-body-sm">
                <span className="text-peach-ink">{domain.label}</span>
                <span className="font-mono text-caption text-peach-ink-muted">
                  {points} / {domain.maxPoints}
                </span>
              </div>
              <div className="mt-1 h-[5px] overflow-hidden rounded-pills bg-peach-ink/15">
                <div
                  className="h-full rounded-pills bg-peach-ink transition-[width] duration-400 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {nextBand && (
                <p className="mt-1 text-caption text-peach-ink-muted">
                  +{nextBand.points - points} available — {nextBand.label}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
