// Medical Training (Prioritisation) Act 2026 — Royal Assent 6 March 2026, in force for all 2026
// recruitment rounds (every specialty except ST1 Public Health).
// Source: NHS England, "Prioritisation for Specialty Recruitment"
// https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/prioritisation-for-specialty-recruitment
// (reviewed 16 June 2026)
//
// Every applicant is sorted into exactly one of two groups before offers begin. There is no
// ranking within a group. The whole priority group (in rank order) is worked through for offers
// first; only once every appointable priority-group candidate has been offered/declined does the
// system move to the non-priority group, again in rank order. Rank itself is NOT affected by
// priority status — only the order in which groups are considered for offers.
//
// Priority requires ALL THREE of:
//  1. Qualifying country of primary medical qualification
//  2. Qualifying immigration/citizenship status
//  3. Completed or currently on a "relevant qualifying UK programme" (for CT1/ST1: the UK
//     Foundation Programme only — the Malta Foundation Programme and Trust-based/non-HEE
//     programmes explicitly do NOT qualify)

export type QualificationCountry = "uk" | "irl_iceland_liechtenstein_norway_switzerland" | "other";

export const QUALIFICATION_COUNTRY_OPTIONS: { value: QualificationCountry; label: string }[] = [
  { value: "uk", label: "UK" },
  { value: "irl_iceland_liechtenstein_norway_switzerland", label: "Ireland, Iceland, Liechtenstein, Norway, or Switzerland" },
  { value: "other", label: "Elsewhere" },
];

export type ImmigrationStatus =
  | "british_citizen"
  | "commonwealth_right_of_abode"
  | "irish_citizen"
  | "ilr_settled"
  | "eu_settled_or_presettled"
  | "partner_dependent_visa"
  | "other_visa";

export const IMMIGRATION_STATUS_OPTIONS: { value: ImmigrationStatus; label: string; qualifies: boolean }[] = [
  { value: "british_citizen", label: "British citizen", qualifies: true },
  { value: "commonwealth_right_of_abode", label: "Commonwealth citizen with right of abode", qualifies: true },
  { value: "irish_citizen", label: "Irish citizen", qualifies: true },
  { value: "ilr_settled", label: "Indefinite Leave to Remain / Settled Status", qualifies: true },
  { value: "eu_settled_or_presettled", label: "EU Settled or Pre-Settled Status", qualifies: true },
  { value: "partner_dependent_visa", label: "Partner or Dependent visa", qualifies: false },
  { value: "other_visa", label: "Other visa (e.g. Skilled Worker, Student, Graduate)", qualifies: false },
];

export type PriorityInput = {
  qualificationCountry: QualificationCountry;
  trainedMajorityInBritishIslesOrIreland: boolean | null; // only asked if not "uk"
  immigrationStatus: ImmigrationStatus;
  completedOrOnFoundationProgramme: boolean;
};

export type PriorityGroup = "priority" | "not_priority";

export function computePriorityGroup(input: PriorityInput): PriorityGroup {
  const qualifyingCountry =
    input.qualificationCountry === "uk" ||
    (input.qualificationCountry === "irl_iceland_liechtenstein_norway_switzerland" &&
      input.trainedMajorityInBritishIslesOrIreland === true);

  const qualifyingImmigration =
    IMMIGRATION_STATUS_OPTIONS.find((o) => o.value === input.immigrationStatus)?.qualifies ?? false;

  return qualifyingCountry && qualifyingImmigration && input.completedOrOnFoundationProgramme
    ? "priority"
    : "not_priority";
}

export const PRIORITISATION_CAVEAT =
  "Under the Medical Training (Prioritisation) Act 2026, the entire priority group is offered posts (in rank order) before the non-priority group gets any consideration — regardless of score. Your rank isn't affected by priority status, but non-priority applicants are only considered once the priority pool is exhausted, which this tool can't precisely quantify from published data.";
