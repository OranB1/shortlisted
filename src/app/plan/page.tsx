import PlanBuilder from "./PlanBuilder";

export default function PlanPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-serif font-normal text-paper">My Plan</h1>
      <p className="mt-2 text-body-sm text-fog">
        Applying to more than one specialty? Build a single, countdown-sorted timeline of every
        application, MSRA, portfolio, and interview deadline across all of them.
      </p>
      <PlanBuilder />
    </main>
  );
}
