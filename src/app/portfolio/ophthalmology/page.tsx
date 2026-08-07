import OphthalmologyForm from "./OphthalmologyForm";

export default function OphthalmologyPortfolioPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-[510] text-paper">Ophthalmology Portfolio Scoring</h1>
      <p className="mt-2 text-body-sm text-fog">
        Score your Evidence Folder against the official Ophthalmology ST1 self-assessment matrix.
      </p>
      <OphthalmologyForm />
    </main>
  );
}
