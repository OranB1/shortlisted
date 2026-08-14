import Image from "next/image";
import Link from "next/link";
import { Check, Circle, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { ScoreRing } from "@/components/ScoreRing";
import {
  PRIORITY_SPECIALTIES,
  SCORING_COVERAGE,
  SECONDARY_SPECIALTIES,
  type CoverageTier,
} from "@/lib/data/all-specialty-ratios";

const TIER_LABEL: Record<CoverageTier, string> = {
  verified_scoring_and_likelihood: "verified — scoring + likelihood",
  verified_scoring: "verified — scoring",
  confirmed_no_portfolio: "confirmed — no portfolio",
  indicative: "AI-indicative",
};

const TIER_STYLE: Record<CoverageTier, string> = {
  verified_scoring_and_likelihood: "bg-pulse-green/15 text-pulse-green",
  verified_scoring: "bg-iris-violet/15 text-iris-violet",
  confirmed_no_portfolio: "bg-signal-teal/15 text-signal-teal",
  indicative: "bg-black/[0.045] text-fog",
};

const CHECKLIST_PREVIEW = [
  { label: "Quality improvement project", done: true, points: 4 },
  { label: "Presentations & posters", done: true, points: 5 },
  { label: "Published research", done: true, points: 6 },
  { label: "Teaching experience", done: false, points: 0 },
  { label: "Training in teaching", done: false, points: 0 },
];
const CHECKLIST_TOTAL = CHECKLIST_PREVIEW.reduce((sum, i) => sum + i.points, 0);
const CHECKLIST_MAX = 30;

const EXPLORE_CARDS = [
  {
    href: "/specialties",
    title: "All-Specialty Competition Ratios",
    body: "2024 vs 2025 competition ratios and selection mechanisms across every CT1/ST1 route, official NHS England data.",
    cta: "Browse table",
  },
  {
    href: "/portfolio/imt",
    title: "Portfolio Scoring",
    body: "Score your portfolio against the official self-assessment matrix, domain by domain. IMT, CST, Paediatrics, Clinical Radiology, Ophthalmology, Cardiothoracic Surgery, and Histopathology are live now — more specialties are on the way.",
    cta: "Score now",
  },
  {
    href: "/plan",
    title: "Deadline Planner",
    body: "Pick every specialty you're applying to and see one combined, countdown-sorted timeline of every application, MSRA, portfolio, and interview deadline.",
    cta: "Build my plan",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-24">
      <section className="relative z-0 overflow-hidden lg:flex lg:items-center lg:gap-16">
        {/* Decorative only (alt=""), hidden below lg where the hero stacks to one column — at
            that width the image would sit directly behind the score card rather than beside it
            and read as clutter rather than atmosphere. `relative z-0` on the section (not just
            `relative`) gives this absolutely-positioned layer its own stacking context, so it
            can't end up painting behind the page's own background. */}
        <Image
          src="/brand/hero-converging-paths.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 1200px, 0px"
          className="pointer-events-none absolute inset-0 hidden object-cover object-right opacity-[0.14] lg:block"
        />

        <div className="relative z-10 max-w-2xl lg:flex-1">
          <span className="inline-flex items-center gap-2 rounded-pills bg-black/[0.045] px-3 py-[6px] text-label text-fog">
            <span className="h-1.5 w-1.5 rounded-full bg-pulse-green" />
            Live: verified scoring for 7 specialties
          </span>

          <h1 className="mt-4 text-heading-lg font-serif font-normal text-paper">Know where you stand.</h1>
          <p className="mt-6 max-w-lg text-body text-fog">
            Portfolio scoring, offer-likelihood estimates, and opportunity matching for foundation
            doctors and medical students building toward UK specialty training applications.
          </p>
          <Button href="/onboarding" size="lg" className="mt-8" iconTrailing={<ArrowRight size={16} />}>
            Get started
          </Button>
        </div>

        <div className="relative z-10 mt-16 lg:mt-0 lg:w-[380px] lg:shrink-0">
          <div className="rounded-cards bg-carbon p-6 shadow-subtle">
            <p className="text-caption text-ash">Your portfolio, scored</p>
            <ul className="mt-4 space-y-3">
              {CHECKLIST_PREVIEW.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-body-sm">
                  {item.done ? (
                    <Check size={16} className="shrink-0 text-acid-lime" />
                  ) : (
                    <Circle size={16} className="shrink-0 text-ash" />
                  )}
                  <span className={item.done ? "text-mist" : "text-ash"}>{item.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-4 border-t border-graphite pt-6">
              <ScoreRing value={CHECKLIST_TOTAL} max={CHECKLIST_MAX} size={64} strokeWidth={6} />
              <p className="text-caption text-ash">
                Illustrative example — plug in your own portfolio to see your real score.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-24 grid gap-6 sm:grid-cols-2">
        {EXPLORE_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-cards bg-carbon p-6 shadow-subtle transition-colors hover:shadow-[0_0_0_1px_var(--color-smoke)_inset]"
          >
            <h2 className="text-[17px] font-[510] text-paper">{card.title}</h2>
            <p className="mt-2 text-body-sm text-fog">{card.body}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-[510] text-mist">
              {card.cta} <ArrowRight size={14} />
            </span>
          </Link>
        ))}

        <div className="rounded-cards bg-carbon p-6 shadow-subtle sm:col-span-2">
          <h2 className="text-[17px] font-[510] text-paper">Priority specialty coverage</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRIORITY_SPECIALTIES.map((s) => {
              const coverage = SCORING_COVERAGE[s] ?? { tier: "indicative" as const };
              const href = coverage.portfolioHref ?? coverage.likelihoodHref;
              const rowClass =
                "flex items-center justify-between gap-2 rounded-inputs border border-graphite p-3 text-body-sm text-mist transition-colors hover:border-smoke hover:text-paper";
              const content = (
                <>
                  <span>{s}</span>
                  <span className={`shrink-0 rounded-badges px-[6px] text-label ${TIER_STYLE[coverage.tier]}`}>
                    {TIER_LABEL[coverage.tier]}
                  </span>
                </>
              );
              return href ? (
                <Link key={s} href={href} className={rowClass}>
                  {content}
                </Link>
              ) : (
                <div key={s} className={rowClass}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-cards bg-carbon p-6 shadow-subtle sm:col-span-2">
          <h2 className="text-[17px] font-[510] text-paper">Also covered</h2>
          <p className="mt-1 text-caption text-ash">
            Smaller applicant pools than the 10 priority specialties above, but scored or
            researched anyway.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SECONDARY_SPECIALTIES.map(({ name, coverage }) => {
              const href = coverage.portfolioHref ?? coverage.likelihoodHref;
              const rowClass =
                "flex items-center justify-between gap-2 rounded-inputs border border-graphite p-3 text-body-sm text-mist transition-colors hover:border-smoke hover:text-paper";
              const content = (
                <>
                  <span>{name}</span>
                  <span className={`shrink-0 rounded-badges px-[6px] text-label ${TIER_STYLE[coverage.tier]}`}>
                    {TIER_LABEL[coverage.tier]}
                  </span>
                </>
              );
              return href ? (
                <Link key={name} href={href} className={rowClass}>
                  {content}
                </Link>
              ) : (
                <div key={name} className={rowClass}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
