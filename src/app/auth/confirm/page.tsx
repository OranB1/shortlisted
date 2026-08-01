import { Suspense } from "react";
import ConfirmForm from "./ConfirmForm";

export default function ConfirmPage() {
  return (
    <main className="mx-auto w-full max-w-md flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-[510] text-paper">Confirm sign-in</h1>
      <p className="mt-2 text-body-sm text-fog">One more click and you&apos;re in.</p>
      <Suspense fallback={null}>
        <ConfirmForm />
      </Suspense>
    </main>
  );
}
