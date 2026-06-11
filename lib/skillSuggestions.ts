export const skillSuggestions = [
  "Communication",
  "Leadership",
  "Problem Solving",
  "Teamwork",
  "Time Management",
  "Attention to Detail",
  "Customer Service",
  "Adaptability",

  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Git",
  "GitHub",

  "REST API",
  "SQL",
  "PostgreSQL",
  "Supabase",
  "Firebase",

  "Microsoft Excel",
  "Microsoft Word",
  "Google Workspace",

  "Canva",
  "Social Media Management",
  "Lead Generation",
  "Virtual Assistance",
  "Bookkeeping",
];

export function getSkillSuggestions(existingSkills: string[]) {
  return skillSuggestions.filter(
    (skill) =>
      !existingSkills.some(
        (existing) =>
          existing.toLowerCase().trim() === skill.toLowerCase()
      )
  );
}