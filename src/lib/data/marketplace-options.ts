export type TaskType = "qip" | "audit" | "research" | "presentation" | "teaching" | "other";

export const TASK_TYPE_OPTIONS: { value: TaskType; label: string }[] = [
  { value: "qip", label: "Quality Improvement Project (QIP)" },
  { value: "audit", label: "Audit" },
  { value: "research", label: "Research / data work" },
  { value: "presentation", label: "Presentation / case write-up" },
  { value: "teaching", label: "Teaching support" },
  { value: "other", label: "Other" },
];

export type ExperienceLevel = "no_experience_needed" | "some_experience" | "experienced";

export const EXPERIENCE_LEVEL_OPTIONS: { value: ExperienceLevel; label: string }[] = [
  { value: "no_experience_needed", label: "No experience needed" },
  { value: "some_experience", label: "Some experience helpful" },
  { value: "experienced", label: "Looking for someone experienced" },
];

export type OpportunityStatus = "open" | "closed" | "filled";
