"use client";

import { useMemo, useState } from "react";
import type { SpecialtyRatioYear } from "@/lib/data/all-specialty-ratios";
import { cn } from "@/lib/utils";

// Sqrt scale: the data spans ~1.9:1 to ~167:1, and a linear scale would flatten everything below
// ~30:1 to invisible slivers next to the two outlier dual-CCT/CSRH rows. Exact values are always
// labeled at the bar tip, so the nonlinear scale costs nothing in precision.
function barWidthPct(value: number, max: number): number {
  if (max <= 0) return 0;
  return (Math.sqrt(value) / Math.sqrt(max)) * 100;
}

function pctChange(from: number, to: number): number {
  return Math.round(((to - from) / from) * 100);
}

export function CompetitionRatioChart({ data }: { data: SpecialtyRatioYear[] }) {
  const [year, setYear] = useState<"both" | "2025" | "2024">("both");
  const [hovered, setHovered] = useState<string | null>(null);
  const sorted = useMemo(() => [...data].sort((a, b) => b.ratio2025 - a.ratio2025), [data]);
  const max = useMemo(() => Math.max(...data.map((d) => Math.max(d.ratio2024, d.ratio2025))), [data]);

  return (
    <div className="rounded-cards border border-graphite bg-carbon p-6 shadow-subtle">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-[560] text-paper">Competition ratio by specialty</h2>
          <p className="mt-1 text-caption text-ash">Applicants per post &middot; sqrt-scaled &middot; hover a row for the year-on-year change</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-caption text-ash">
            <span className="h-2 w-2 rounded-full bg-smoke" />
            2024
            <span className="ml-3 h-2 w-2 rounded-full bg-acid-lime" />
            2025
          </div>
          <div className="flex rounded-inputs border border-graphite bg-void/60 p-0.5 text-label">
            {(["both", "2025", "2024"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setYear(v)}
                className={cn(
                  "rounded-badges px-2.5 py-1 capitalize transition-colors",
                  year === v ? "bg-acid-lime text-void" : "text-fog hover:text-mist"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-1">
        {sorted.map((s) => {
          const isHovered = hovered === s.specialty;
          const change = pctChange(s.ratio2024, s.ratio2025);
          return (
            <div
              key={s.specialty}
              onMouseEnter={() => setHovered(s.specialty)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "relative flex items-center gap-3 rounded-inputs px-2 py-1.5 transition-colors",
                isHovered && "bg-black/[0.025]"
              )}
            >
              <span
                className={cn(
                  "w-[190px] shrink-0 truncate text-caption transition-colors",
                  isHovered ? "text-paper" : "text-mist"
                )}
                title={s.specialty}
              >
                {s.specialty}
              </span>

              <div className="relative h-[10px] flex-1">
                {/* background track gives every bar a full-width reference frame */}
                <div className="absolute inset-0 rounded-pills bg-graphite/60" />

                {/* 2025 paints first as the full-length base bar; 2024 paints on top as a
                    shorter, thinner inner segment, so the pair reads as "grew from here to
                    here" rather than one bar silently hiding the other. */}
                {(year === "both" || year === "2025") && (
                  <div
                    className="absolute left-0 top-1/2 h-[10px] -translate-y-1/2 rounded-pills bg-acid-lime transition-[width] duration-500 ease-out"
                    style={{ width: `${barWidthPct(s.ratio2025, max)}%` }}
                  />
                )}
                {(year === "both" || year === "2024") && (
                  <div
                    className="absolute left-0 top-1/2 h-[6px] -translate-y-1/2 rounded-pills bg-smoke transition-[width] duration-500 ease-out"
                    style={{ width: `${barWidthPct(s.ratio2024, max)}%` }}
                  />
                )}
              </div>

              <span className="w-[56px] shrink-0 text-right font-mono text-caption text-paper">
                {s.ratio2025.toFixed(1)}:1
              </span>

              {isHovered && (
                <div className="absolute right-2 top-full z-10 mt-1 flex items-center gap-3 rounded-inputs border border-graphite bg-obsidian px-3 py-2 text-label text-peach-ink shadow-xl">
                  <span>
                    2024 <span className="font-mono">{s.ratio2024.toFixed(1)}:1</span>
                  </span>
                  <span className="text-peach-ink-muted">&rarr;</span>
                  <span>
                    2025 <span className="font-mono">{s.ratio2025.toFixed(1)}:1</span>
                  </span>
                  <span className={cn("font-mono", change > 0 ? "text-coral-red" : "text-pulse-green")}>
                    {change > 0 ? "+" : ""}
                    {change}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
