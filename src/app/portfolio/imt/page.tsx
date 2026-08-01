import PortfolioForm from "./PortfolioForm";

export default function ImtPortfolioPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-[510] text-paper">IMT Portfolio Scoring</h1>
      <p className="mt-2 text-body-sm text-fog">
        Score your portfolio against the official 2026 IMT self-assessment matrix.
      </p>
      <PortfolioForm />
    </main>
  );
}
