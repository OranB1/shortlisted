"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { SPECIALTY_TIMELINES, TIMELINES_SOURCE_NOTE } from "@/lib/data/specialty-timelines";
import { buildPlan, daysUntil, type PlanEntry } from "@/lib/deadlines";
import { cn } from "@/lib/utils";

const ALL_SPECIALTIES = SPECIALTY_TIMELINES.map((t) => t.specialty);

function urgencyClass(days: number): string {
  if (days < 0) return "text-ash";
  if (days <= 14) return "text-coral-red";
  if (days <= 45) return "text-acid-lime";
  return "text-fog";
}

function formatCountdown(days: number): string {
  if (days < 0) return "past";
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  return `in ${days} days`;
}

function groupByMonth(entries: PlanEntry[]): { key: string; label: string; entries: PlanEntry[] }[] {
  const groups = new Map<string, PlanEntry[]>();
  for (const entry of entries) {
    const key = `${entry.date.getFullYear()}-${entry.date.getMonth()}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(entry);
  }
  return Array.from(groups.entries()).map(([key, entries]) => ({
    key,
    label: entries[0].date.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    entries,
  }));
}

export default function PlanBuilder() {
  const [selected, setSelected] = useState<string[]>([]);

  const plan = useMemo(() => buildPlan(selected), [selected]);
  const grouped = useMemo(() => groupByMonth(plan), [plan]);

  function toggle(specialty: string) {
    setSelected((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty]
    );
  }

  return (
    <div className="mt-8 space-y-8">
      <div>
        <h2 className="text-caption font-[510] uppercase tracking-wide text-ash">
          Which specialties are you applying to?
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALL_SPECIALTIES.map((specialty) => {
            const isSelected = selected.includes(specialty);
            return (
              <button
                key={specialty}
                type="button"
                onClick={() => toggle(specialty)}
                className={cn(
                  "flex items-center gap-1.5 rounded-pills border px-3 py-[7px] text-[13px] font-[510] transition-colors",
                  isSelected
                    ? "border-acid-lime/40 bg-acid-lime/[0.08] text-acid-lime"
                    : "border-graphite text-mist hover:border-smoke hover:text-paper"
                )}
              >
                {isSelected && <Check size={13} className="shrink-0" />}
                {specialty}
              </button>
            );
          })}
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="rounded-cards border border-dashed border-graphite bg-black/[0.02] p-8 text-center text-body-sm text-fog">
          Pick one or more specialties above to build your combined deadline timeline.
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-caption font-[510] uppercase tracking-wide text-ash">
              Your combined timeline
            </h2>
            <span className="text-caption text-ash">
              {plan.length} date{plan.length === 1 ? "" : "s"} across {selected.length} specialt
              {selected.length === 1 ? "y" : "ies"}
            </span>
          </div>

          <div className="mt-4 space-y-6">
            {grouped.map((group) => (
              <div key={group.key}>
                <p className="text-caption text-ash">{group.label}</p>
                <div className="mt-2 space-y-2">
                  {group.entries.map((entry, i) => {
                    const days = daysUntil(entry.date);
                    return (
                      <div
                        key={`${entry.specialty}-${entry.stage.label}-${i}`}
                        className={cn(
                          "flex items-center gap-4 rounded-cards bg-carbon p-4 shadow-subtle",
                          days < 0 && "opacity-50"
                        )}
                      >
                        <div className="w-[64px] shrink-0 text-center">
                          <p className="font-mono text-[20px] leading-none text-paper">
                            {entry.date.getDate()}
                          </p>
                          <p className="mt-1 text-label text-ash">
                            {entry.date.toLocaleDateString("en-GB", { month: "short" })}
                          </p>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-[510] text-paper">{entry.stage.label}</p>
                          <p className="mt-0.5 text-caption text-fog">{entry.specialty}</p>
                        </div>
                        <span className={cn("shrink-0 font-mono text-caption", urgencyClass(days))}>
                          {formatCountdown(days)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-caption text-ash">{TIMELINES_SOURCE_NOTE}</p>
    </div>
  );
}
