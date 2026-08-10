"use client";

import { useMemo, useState } from "react";
import type { SpecialtyRatioYear } from "@/lib/data/all-specialty-ratios";

// Sqrt scale: the data spans ~1.9:1 to ~167:1, and a linear scale would flatten everything below
// ~30:1 to invisible slivers next to the two outlier dual-CCT/CSRH rows. Exact values are always
// labeled at the bar tip, so the nonlinear scale costs nothing in precision.
function barWidthPct(value: number, max: number): number {
  if (max <= 0) return 0;
  return (Math.sqrt(value) / Math.sqrt(max)) * 100;
}

export function CompetitionRatioChart({ data }: { data: SpecialtyRatioYear[] }) {
  const [year, setYear] = useState<"both" | "2025" | "2024">("both");
  const sorted = useMemo(() => [...data].sort((a, b) => b.ratio2025 - a.ratio2025), [data]);
  const max = useMemo(() => Math.max(...data.map((d) => Math.max(d.ratio2024, d.ratio2025))), [data]);

  return (
    <div className="rounded-cards bg-carbon p-6 shadow-subtle">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-[510] text-paper">Competition ratio by specialty</h2>
          <p className="mt-1 text-caption text-ash">Applicants per post, sqrt-scaled bar length</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-caption text-ash">
            <span className="h-2 w-2 rounded-full bg-smoke" />
            2024
            <span className="ml-3 h-2 w-2 rounded-full bg-acid-lime" />
            2025
          </div>
          <div className="flex rounded-inputs border border-graphite p-0.5 text-label">
            {(["both", "2025", "2024"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setYear(v)}
                className={`rounded-badges px-2 py-1 capitalize transition-colors ${
                  year === v ? "bg-white/10 text-paper" : "text-fog hover:text-mist"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {sorted.map((s) => (
          <div key={s.specialty} className="flex items-center gap-3">
            <span className="w-[190px] shrink-0 truncate text-caption text-mist" title={s.specialty}>
              {s.specialty}
            </span>
            <div className="relative flex-1">
              {(year === "both" || year === "2024") && (
                <div className="flex h-[6px] items-center">
                  <div
                    className="h-[6px] rounded-pills bg-smoke"
                    style={{ width: `${barWidthPct(s.ratio2024, max)}%` }}
                  />
                </div>
              )}
              {(year === "both" || year === "2025") && (
                <div className={`flex h-[10px] items-center ${year === "both" ? "mt-1" : ""}`}>
                  <div
                    className="h-[10px] rounded-pills bg-acid-lime"
                    style={{ width: `${barWidthPct(s.ratio2025, max)}%` }}
                  />
                  <span className="ml-2 shrink-0 font-mono text-caption text-paper">
                    {s.ratio2025.toFixed(1)}:1
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
