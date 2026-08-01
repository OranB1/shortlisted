import { Suspense } from "react";
import LikelihoodForm from "./LikelihoodForm";

export default function ImtLikelihoodPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-[510] text-paper">IMT Offer Likelihood Estimator</h1>
      <p className="mt-2 max-w-2xl text-body-sm text-fog">
        Calibrated against official IMT Recruitment shortlisting and total-score distributions
        (2019–2026) and regional accepted-candidate rank data (2023–2025). Verified precise
        scoring — one of the platform&apos;s ten priority specialties.
      </p>
      <Suspense fallback={null}>
        <LikelihoodForm />
      </Suspense>
    </main>
  );
}
