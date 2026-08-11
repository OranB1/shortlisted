import CstForm from "./CstForm";
import { Sources } from "@/components/Sources";
import { SPECIALTY_SOURCES } from "@/lib/data/sources";

export default function CstPortfolioPage() {
  const sources = SPECIALTY_SOURCES.find((s) => s.specialty === "Core Surgical Training")?.sources ?? [];
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-serif font-normal text-paper">CST Portfolio Scoring</h1>
      <p className="mt-2 text-body-sm text-fog">
        See where you stand against the official 2025/26 Core Surgical Training portfolio matrix.
      </p>
      <CstForm />
      <div className="mt-8">
        <Sources sources={sources} />
      </div>
    </main>
  );
}
