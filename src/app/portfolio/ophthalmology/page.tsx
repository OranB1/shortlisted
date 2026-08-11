import OphthalmologyForm from "./OphthalmologyForm";
import { Sources } from "@/components/Sources";
import { SPECIALTY_SOURCES } from "@/lib/data/sources";

export default function OphthalmologyPortfolioPage() {
  const sources = SPECIALTY_SOURCES.find((s) => s.specialty === "Ophthalmology")?.sources ?? [];
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-serif font-normal text-paper">Ophthalmology Portfolio Scoring</h1>
      <p className="mt-2 text-body-sm text-fog">
        Score your Evidence Folder against the official Ophthalmology ST1 self-assessment matrix.
      </p>
      <OphthalmologyForm />
      <div className="mt-8">
        <Sources sources={sources} />
      </div>
    </main>
  );
}
