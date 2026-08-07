import {
  SPECIALTY_RATIOS,
  SELECTION_MECHANISMS,
  MSRA_MINIMUM_STANDARD,
  GP_MSRA_BANDS_SOURCE_URL,
} from "@/lib/data/all-specialty-ratios";
import { IDT_NOTES, IDT_CAVEAT } from "@/lib/data/inter-deanery-transfers";
import { projectNextCycleRatio, impliedTopPercentFromRatio, estimateGpMsraScoreTarget } from "@/lib/projection";

function ratioChange(r2024: number, r2025: number): { pct: number; harder: boolean } {
  const pct = ((r2025 - r2024) / r2024) * 100;
  return { pct: Math.round(pct), harder: pct > 0 };
}

export default function SpecialtiesPage() {
  const sorted = [...SPECIALTY_RATIOS].sort((a, b) => b.ratio2025 - a.ratio2025);

  const gp = SPECIALTY_RATIOS.find((s) => s.specialty === "General Practice ST1");
  const gpProjection = gp ? projectNextCycleRatio(gp) : null;
  const gpTopPercent = gpProjection ? impliedTopPercentFromRatio(gpProjection.projectedRatio) : null;
  const gpScoreTarget = gpTopPercent !== null ? estimateGpMsraScoreTarget(gpTopPercent) : null;

  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-[510] text-paper">All-Specialty Competition Ratios</h1>
      <p className="mt-2 max-w-2xl text-body-sm text-fog">
        Round 1 applications-per-post, 2024 vs 2025. Source: NHS England official competition
        ratios archive. Every specialty got harder 2024 → 2025 — several dramatically.
      </p>

      <div className="mt-8 overflow-x-auto rounded-cards bg-carbon shadow-subtle">
        <table className="w-full text-left text-body-sm">
          <thead className="text-caption text-fog">
            <tr>
              <th className="px-4 py-3 font-normal">Specialty</th>
              <th className="px-4 py-3 font-normal">2024 ratio</th>
              <th className="px-4 py-3 font-normal">2025 ratio</th>
              <th className="px-4 py-3 font-normal">Change</th>
              <th className="px-4 py-3 font-normal">2025 posts</th>
              <th className="px-4 py-3 font-normal">Next cycle (projected)</th>
            </tr>
          </thead>
          <tbody className="divide-y-[0.5px] divide-graphite">
            {sorted.map((s) => {
              const change = ratioChange(s.ratio2024, s.ratio2025);
              const projection = projectNextCycleRatio(s);
              return (
                <tr key={s.specialty}>
                  <td className="px-4 py-3 font-[510] text-paper">{s.specialty}</td>
                  <td className="px-4 py-3 font-mono text-mist">{s.ratio2024.toFixed(1)} : 1</td>
                  <td className="px-4 py-3 font-mono text-mist">{s.ratio2025.toFixed(1)} : 1</td>
                  <td
                    className={`px-4 py-3 font-mono ${change.harder ? "text-coral-red" : "text-pulse-green"}`}
                  >
                    {change.harder ? "+" : ""}
                    {change.pct}%
                  </td>
                  <td className="px-4 py-3 font-mono text-mist">{s.posts2025}</td>
                  <td className="px-4 py-3 font-mono text-ash">~{projection.projectedRatio.toFixed(1)} : 1</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-caption text-ash">
        &ldquo;Next cycle (projected)&rdquo; is a simple extrapolation of the 2024→2025 trend for
        each specialty — we only have two years of official data, so treat this as a rough
        direction and size of change, not a forecast.
      </p>

      {gp && gpProjection && gpTopPercent !== null && gpScoreTarget !== null && (
        <div className="mt-8 rounded-cards bg-carbon p-6 shadow-subtle">
          <h2 className="text-[17px] font-[510] text-paper">
            GP: roughly what MSRA score should you aim for next cycle?
          </h2>
          <p className="mt-2 text-body-sm text-fog">
            Extrapolating the applications/posts trend, next cycle&apos;s ratio is projected at
            roughly <span className="font-mono text-mist">{gpProjection.projectedRatio.toFixed(1)} : 1</span> —
            meaning you&apos;d likely need to rank in the top{" "}
            <span className="font-mono text-mist">~{Math.round(gpTopPercent)}%</span> of
            applicants. Mapped against NHS England&apos;s published GP MSRA score bands, that&apos;s
            roughly a score of{" "}
            <span className="font-mono text-[20px] text-paper">{gpScoreTarget}</span> on each
            paper (Professional Dilemmas and Clinical Problem Solving are banded separately, mean
            250 / SD 40 each sitting).
          </p>
          <p className="mt-3 text-caption text-ash">
            Take this as a rough compass, not a target to bank on: it chains together a two-point
            trend line and a{" "}
            <a href={GP_MSRA_BANDS_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">
              score-band table
            </a>{" "}
            whose own review date predates this cycle. It also assumes posts stay flat and the
            2024→2025 growth rate repeats — a real forecast would need more years of data than
            NHS England currently publishes.
          </p>
        </div>
      )}

      <h2 className="mt-16 text-subheading font-[510] text-paper">Selection mechanisms</h2>
      <div className="mt-4 space-y-3">
        {SELECTION_MECHANISMS.map((m) => (
          <div key={m.specialty} className="rounded-cards bg-carbon p-4 shadow-subtle">
            <p className="font-[510] text-paper">{m.specialty}</p>
            <p className="mt-1 text-body-sm text-fog">{m.mechanism}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-caption text-ash">
        MSRA minimum standard: {MSRA_MINIMUM_STANDARD.perComponent} on each component (PD and
        CPS). {MSRA_MINIMUM_STANDARD.note}
      </p>

      <h2 className="mt-16 text-subheading font-[510] text-paper">Inter-deanery transfer patterns</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-fog">{IDT_CAVEAT}</p>
      <div className="mt-4 space-y-3">
        {IDT_NOTES.map((n) => (
          <div key={n.specialty} className="rounded-cards bg-carbon p-4 shadow-subtle">
            <div className="flex items-center gap-2">
              <p className="font-[510] text-paper">{n.specialty}</p>
              {!n.hasSignal && (
                <span className="rounded-badges bg-white/5 px-[6px] text-label text-fog">no signal</span>
              )}
            </div>
            <p className="mt-1 text-body-sm text-fog">{n.note}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
