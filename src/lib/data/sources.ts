// Central, visible register of every official source this app's data is drawn from — one entry
// per specialty (or general dataset), each pointing at the primary document(s) used. Every
// data-*.ts file that has its own SCORING_SOURCE_URL constant is re-exported here rather than
// duplicated, so this file can never drift out of sync with what a scorer page actually cites.

import { IMT_SCORING_SOURCE_URL } from "@/lib/data/imt-portfolio-categories";
import { CST_SCORING_SOURCE_URL } from "@/lib/data/cst-portfolio-categories";
import { PAEDIATRICS_SCORING_SOURCE_URL } from "@/lib/data/paediatrics-portfolio-categories";
import { RADIOLOGY_SCORING_SOURCE_URL } from "@/lib/data/radiology-portfolio-categories";
import { OPHTHALMOLOGY_SCORING_SOURCE_URL } from "@/lib/data/ophthalmology-portfolio-categories";
import { CARDIOTHORACIC_SCORING_SOURCE_URL } from "@/lib/data/cardiothoracic-portfolio-categories";
import { HISTOPATHOLOGY_SCORING_SOURCE_URL } from "@/lib/data/histopathology-portfolio-categories";
import { GP_MSRA_BANDS_SOURCE_URL } from "@/lib/data/all-specialty-ratios";

export type SourceLink = { label: string; url: string };

export type SpecialtySources = {
  specialty: string;
  sources: SourceLink[];
};

export const COMPETITION_RATIOS_SOURCE_URL =
  "https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/competition-ratios";

export const SPECIALTY_SOURCES: SpecialtySources[] = [
  {
    specialty: "Internal Medicine Training",
    sources: [{ label: "IMT self-assessment scoring guide (imtrecruitment.org.uk)", url: IMT_SCORING_SOURCE_URL }],
  },
  {
    specialty: "Core Surgical Training",
    sources: [{ label: "CST portfolio guidance (NHS England)", url: CST_SCORING_SOURCE_URL }],
  },
  {
    specialty: "Paediatrics",
    sources: [{ label: "ST1 shortlisting glossary (RCPCH)", url: PAEDIATRICS_SCORING_SOURCE_URL }],
  },
  {
    specialty: "Clinical Radiology",
    sources: [{ label: "ST1 portfolio review guidance (NHS England)", url: RADIOLOGY_SCORING_SOURCE_URL }],
  },
  {
    specialty: "Ophthalmology",
    sources: [{ label: "Evidence Folder 2026 criteria (NHS England South West)", url: OPHTHALMOLOGY_SCORING_SOURCE_URL }],
  },
  {
    specialty: "Cardiothoracic Surgery",
    sources: [{ label: "ST1 self-assessment criteria (NHS England Wessex)", url: CARDIOTHORACIC_SCORING_SOURCE_URL }],
  },
  {
    specialty: "Histopathology",
    sources: [{ label: "ST1 self-assessment scoring guidance (NHS England)", url: HISTOPATHOLOGY_SCORING_SOURCE_URL }],
  },
  {
    specialty: "Neurosurgery",
    sources: [
      { label: "ST1 2026 person specification (NHS England)", url: "https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/person-specifications/person-specifications-2026/neurosurgery-st1-2026" },
      { label: "National recruitment page (Yorkshire & Humber Deanery)", url: "https://www.yorksandhumberdeanery.nhs.uk/recruitment/national_recruitment/national_neurosurgery_st1__st3_recruitment" },
    ],
  },
  {
    specialty: "Oral & Maxillofacial Surgery",
    sources: [
      { label: "ST1 2026 person specification (NHS England)", url: "https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/person-specifications/person-specifications-2026/oral-and-maxillofacial-surgery-st1-2026" },
      { label: "Applicant guide (NHS England South West / Severn)", url: "https://severndeanery.nhs.uk/recruitment/vacancies/show/omfs-st1-2026/applicant-guide-lib" },
    ],
  },
  {
    specialty: "General Practice — MSRA score bands",
    sources: [{ label: "GP MSRA score bands (NHS England)", url: GP_MSRA_BANDS_SOURCE_URL }],
  },
  {
    specialty: "All specialties — competition ratios",
    sources: [{ label: "Official competition ratios archive (NHS England)", url: COMPETITION_RATIOS_SOURCE_URL }],
  },
];
