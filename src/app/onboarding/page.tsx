import OnboardingWizard from "./OnboardingWizard";

export default function OnboardingPage() {
  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-[510] text-paper">Let&apos;s set you up</h1>
      <p className="mt-2 text-body-sm text-fog">A few quick questions — takes under a minute.</p>
      <OnboardingWizard />
    </main>
  );
}
