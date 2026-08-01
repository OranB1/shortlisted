import Link from "next/link";
import { PRIORITY_SPECIALTIES, SCORING_COVERAGE, type CoverageTier } from "@/lib/data/all-specialty-ratios";

const TIER_LABEL: Record<CoverageTier, string> = {
  verified_scoring_and_likelihood: "verified — scoring + likelihood",
  verified_scoring: "verified — scoring",
  indicative: "AI-indicative",
};

const TIER_STYLE: Record<CoverageTier, string> = {
  verified_scoring_and_likelihood: "bg-pulse-green/15 text-pulse-green",
  verified_scoring: "bg-iris-violet/15 text-iris-violet",
  indicative: "bg-white/5 text-fog",
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-24">
      <section className="max-w-2xl">
        <h1 className="text-heading-lg font-[510] text-paper">Know where you stand.</h1>
        <p className="mt-6 max-w-lg text-body text-fog">
          Portfolio scoring, offer-likelihood estimates, and opportunity matching for foundation
          doctors and medical students building toward UK specialty training applications.
        </p>
        <Link
          href="/onboarding"
          className="mt-8 inline-block rounded-buttons bg-acid-lime px-4 py-[10px] text-[14px] font-[510] tracking-[-0.011em] text-void shadow-[0px_5px_2px_rgba(0,0,0,0.01),0px_3px_2px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.07)] transition-opacity hover:opacity-90"
        >
          Get started →
        </Link>
      </section>

      <div className="mt-24 grid gap-6 sm:grid-cols-2">
        <Link
          href="/specialties"
          className="rounded-cards bg-carbon p-6 shadow-subtle transition-colors hover:shadow-[0_0_0_1px_var(--color-smoke)_inset]"
        >
          <h2 className="text-[17px] font-[510] text-paper">All-Specialty Competition Ratios</h2>
          <p className="mt-2 text-body-sm text-fog">
            2024 vs 2025 competition ratios and selection mechanisms across every CT1/ST1 route,
            official NHS England data.
          </p>
          <span className="mt-4 inline-block text-[13px] font-[510] text-mist">Browse table →</span>
        </Link>

        <Link
          href="/portfolio/imt"
          className="rounded-cards bg-carbon p-6 shadow-subtle transition-colors hover:shadow-[0_0_0_1px_var(--color-smoke)_inset]"
        >
          <h2 className="text-[17px] font-[510] text-paper">Portfolio Scoring</h2>
          <p className="mt-2 text-body-sm text-fog">
            Score your portfolio against the official self-assessment matrix, domain by domain.
            IMT, CST, and Paediatrics are live now — more specialties are on the way.
          </p>
          <span className="mt-4 inline-block text-[13px] font-[510] text-mist">Score now →</span>
        </Link>

        <div className="rounded-cards bg-carbon p-6 shadow-subtle sm:col-span-2">
          <h2 className="text-[17px] font-[510] text-paper">Priority specialty coverage</h2>
          <ul className="mt-4 divide-y divide-graphite">
            {PRIORITY_SPECIALTIES.map((s) => {
              const coverage = SCORING_COVERAGE[s] ?? { tier: "indicative" as const };
              const href = coverage.portfolioHref ?? coverage.likelihoodHref;
              return (
                <li key={s} className="flex items-center justify-between py-2 text-body-sm text-mist">
                  {href ? (
                    <Link href={href} className="hover:text-paper hover:underline">
                      {s}
                    </Link>
                  ) : (
                    <span>{s}</span>
                  )}
                  <span className={`rounded-badges px-[6px] text-label ${TIER_STYLE[coverage.tier]}`}>
                    {TIER_LABEL[coverage.tier]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
