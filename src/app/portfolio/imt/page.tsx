import PortfolioForm from "./PortfolioForm";
import { Sources } from "@/components/Sources";
import { SPECIALTY_SOURCES } from "@/lib/data/sources";

export default function ImtPortfolioPage() {
  const sources = SPECIALTY_SOURCES.find((s) => s.specialty === "Internal Medicine Training")?.sources ?? [];
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-serif font-normal text-paper">IMT Portfolio Scoring</h1>
      <p className="mt-2 text-body-sm text-fog">
        Score your portfolio against the official 2026 IMT self-assessment matrix.
      </p>
      <PortfolioForm />
      <div className="mt-8">
        <Sources sources={sources} />
      </div>
    </main>
  );
}
