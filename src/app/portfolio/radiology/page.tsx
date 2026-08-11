import RadiologyForm from "./RadiologyForm";
import { Sources } from "@/components/Sources";
import { SPECIALTY_SOURCES } from "@/lib/data/sources";

export default function RadiologyPortfolioPage() {
  const sources = SPECIALTY_SOURCES.find((s) => s.specialty === "Clinical Radiology")?.sources ?? [];
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-serif font-normal text-paper">Clinical Radiology Portfolio Scoring</h1>
      <p className="mt-2 text-body-sm text-fog">
        Score your portfolio against the official 2026 Clinical Radiology ST1 self-assessment
        matrix.
      </p>
      <RadiologyForm />
      <div className="mt-8">
        <Sources sources={sources} />
      </div>
    </main>
  );
}
