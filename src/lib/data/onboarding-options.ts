export type DoctorStage = {
  value: string;
  label: string;
};

// F3/F4 included since not every foundation doctor goes straight into specialty training after
// F2. "In specialty training" is deliberately generic (not "IMT Year 1/2/3") — a doctor could be
// in any specialty's training programme, which is captured separately via currentSpecialty.
export const DOCTOR_STAGES: DoctorStage[] = [
  { value: "F1", label: "Foundation Year 1 (F1)" },
  { value: "F2", label: "Foundation Year 2 (F2)" },
  { value: "F3", label: "Foundation Year 3 (F3)" },
  { value: "F4", label: "Foundation Year 4 (F4)" },
  { value: "IN_SPECIALTY_TRAINING", label: "In specialty training" },
  { value: "OTHER", label: "Other" },
];

export const SPECIALTY_TRAINING_YEARS = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5+"];

export const MED_SCHOOL_YEARS = ["1", "2", "3", "4", "5", "Intercalating"];

export type OnboardingRole = {
  value: "medical_student" | "doctor_applicant" | "consultant_registrar";
  label: string;
  description: string;
};

export const ONBOARDING_ROLES: OnboardingRole[] = [
  {
    value: "medical_student",
    label: "Medical student",
    description: "Building a portfolio toward specialty training applications",
  },
  {
    value: "doctor_applicant",
    label: "Foundation doctor / IMT trainee",
    description: "Applying to specialty training (F1, F2, or IMT)",
  },
  {
    value: "consultant_registrar",
    label: "Consultant or registrar",
    description: "Here to post QIP, audit, or research opportunities for others",
  },
];

export type Intent = {
  value: string;
  label: string;
};

export const APPLICANT_INTENTS: Intent[] = [
  { value: "check_likelihood", label: "Check my offer likelihood" },
  { value: "score_portfolio", label: "Score my portfolio" },
  { value: "explore", label: "Just exploring" },
];
