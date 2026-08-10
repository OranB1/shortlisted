import CardiothoracicForm from "./CardiothoracicForm";

export default function CardiothoracicPortfolioPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-[510] text-paper">Cardiothoracic Surgery Portfolio Scoring</h1>
      <p className="mt-2 text-body-sm text-fog">
        Score your portfolio against the official 2026 Cardiothoracic Surgery ST1 self-assessment
        criteria.
      </p>
      <CardiothoracicForm />
    </main>
  );
}
