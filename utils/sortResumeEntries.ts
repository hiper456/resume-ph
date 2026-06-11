import type { WorkExperience, Education } from "@/types/resume";

function yearToNumber(year: string) {
  const parsed = Number(year);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function sortExperienceNewestFirst(
  experience: WorkExperience[]
) {
  return [...experience].sort((a, b) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;

    const aYear = a.isCurrent ? 9999 : yearToNumber(a.endYear);
    const bYear = b.isCurrent ? 9999 : yearToNumber(b.endYear);

    return bYear - aYear;
  });
}

export function sortEducationNewestFirst(education: Education[]) {
  return [...education].sort((a, b) => {
    return yearToNumber(b.endYear) - yearToNumber(a.endYear);
  });
}