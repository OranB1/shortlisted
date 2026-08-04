"use client";

import { motion } from "motion/react";
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
    <div className="rounded-cards bg-obsidian p-4 shadow-xl">
      <div className="flex items-center gap-3">
        <ScoreRing
          value={total}
          max={max}
          size={44}
          strokeWidth={5}
          label={<span className="font-mono text-[13px] text-paper">{total}</span>}
        />
        <div>
          <p className="text-caption text-ash">{subtitle}</p>
          <p className="font-mono text-[20px] text-paper">
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
                <span className="text-mist">{domain.label}</span>
                <span className="font-mono text-caption text-fog">
                  {points} / {domain.maxPoints}
                </span>
              </div>
              <div className="mt-1 h-[5px] overflow-hidden rounded-pills bg-graphite">
                <motion.div
                  className="h-full rounded-pills bg-acid-lime"
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              {nextBand && (
                <p className="mt-1 text-caption text-ash">
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
