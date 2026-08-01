import CstForm from "./CstForm";

export default function CstPortfolioPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-[510] text-paper">CST Portfolio Scoring</h1>
      <p className="mt-2 text-body-sm text-fog">
        See where you stand against the official 2025/26 Core Surgical Training portfolio matrix.
      </p>
      <CstForm />
    </main>
  );
}
