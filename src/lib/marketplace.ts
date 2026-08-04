import { LONDON_MED_SCHOOL_HOSPITAL_PARTNERSHIPS } from "@/lib/data/medical-school-hospital-partnerships";

export function getPartneredHospitals(medSchool: string | null): string[] {
  if (!medSchool) return [];
  const entry = LONDON_MED_SCHOOL_HOSPITAL_PARTNERSHIPS.find((p) => p.medSchool === medSchool);
  return entry?.hospitals ?? [];
}

export type MatchProfile = {
  targetSpecialty: string | null;
  currentSpecialty: string | null;
  hospitalTrust: string | null;
  preferredRegion: string | null;
  yearOfStudy: string | null;
  grade: string | null;
};

export type OpportunityForMatch = {
  specialty: string | null;
  hospital_trust: string | null;
  deanery_region: string | null;
  min_year_of_study: string | null;
};

export type MatchCheck = { label: string; matches: boolean };

// Loose, best-effort matching against free-text fields — not a scoring system, just a quick
// "does this line up with your profile" signal for the applicant, mirroring the Indeed
// screenshot's alignment checkmarks.
export function computeMatches(opportunity: OpportunityForMatch, profile: MatchProfile): MatchCheck[] {
  const checks: MatchCheck[] = [];

  if (opportunity.specialty) {
    const studentSpecialty = profile.targetSpecialty ?? profile.currentSpecialty;
    checks.push({
      label: `Specialty: ${opportunity.specialty}`,
      matches: !!studentSpecialty && studentSpecialty.toLowerCase() === opportunity.specialty.toLowerCase(),
    });
  }

  if (opportunity.hospital_trust) {
    checks.push({
      label: `Hospital: ${opportunity.hospital_trust}`,
      matches: !!profile.hospitalTrust && profile.hospitalTrust.toLowerCase().includes(opportunity.hospital_trust.toLowerCase()),
    });
  }

  if (opportunity.deanery_region) {
    checks.push({
      label: `Region: ${opportunity.deanery_region}`,
      matches: profile.preferredRegion === opportunity.deanery_region,
    });
  }

  if (opportunity.min_year_of_study) {
    const studentYear = profile.yearOfStudy ?? profile.grade;
    checks.push({
      label: `Stage: ${opportunity.min_year_of_study}`,
      matches: !!studentYear && studentYear.toLowerCase().includes(opportunity.min_year_of_study.toLowerCase()),
    });
  }

  return checks;
}
