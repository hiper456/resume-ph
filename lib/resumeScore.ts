import { ResumeData } from "@/types/resume";

export interface ResumeScoreResult {
  score: number;
  strengths: string[];
  suggestions: string[];

  completion: {
    personal: boolean;
    summary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
  };

  rating: string;
}

export function calculateResumeScore(
  resume: ResumeData
): ResumeScoreResult {
  let score = 0;

  const strengths: string[] = [];
  const suggestions: string[] = [];

  // --------------------
  // Personal Information (20)
  // --------------------

  const personalComplete =
    !!resume.personal.firstName &&
    !!resume.personal.lastName &&
    !!resume.personal.email &&
    !!resume.personal.phone &&
    !!resume.personal.address;

  if (personalComplete) {
    score += 20;
    strengths.push("Complete contact information");
  } else {
    if (!resume.personal.firstName || !resume.personal.lastName) {
      suggestions.push("Complete your full name.");
    }

    if (!resume.personal.email) {
      suggestions.push("Add an email address.");
    }

    if (!resume.personal.phone) {
      suggestions.push("Add a phone number.");
    }

    if (!resume.personal.address) {
      suggestions.push("Add your location.");
    }
  }

  // --------------------
  // Professional Summary (20)
  // --------------------

  const summaryComplete = resume.summary.trim().length >= 150;

  if (summaryComplete) {
    score += 20;
    strengths.push("Professional summary");
  } else {
    suggestions.push(
      "Write a stronger professional summary (150+ characters)."
    );
  }

  // --------------------
  // Work Experience (25)
  // --------------------

  const experienceComplete = resume.experience.length > 0;

  if (experienceComplete) {
    score += 10;
    strengths.push("Work experience");
  } else {
    suggestions.push("Add at least one work experience.");
  }

  const detailedExperience =
    experienceComplete &&
    resume.experience.every(
      (job) => job.description.trim().length >= 60
    );

  if (detailedExperience) {
    score += 15;
    strengths.push("Detailed responsibilities");
  } else {
    suggestions.push(
      "Expand your responsibilities and achievements."
    );
  }

  // --------------------
  // Education (15)
  // --------------------

  const educationComplete = resume.education.length > 0;

  if (educationComplete) {
    score += 15;
    strengths.push("Education");
  } else {
    suggestions.push("Add your education.");
  }

  // --------------------
  // Skills (20)
  // --------------------

  const skillsComplete = resume.skills.length >= 5;

  if (skillsComplete) {
    score += 20;
    strengths.push("Strong skills section");
  } else {
    suggestions.push(
      "Add at least five technical or professional skills."
    );
  }

  // --------------------
  // Rating
  // --------------------

  let rating = "Needs Improvement";

  if (score >= 90) {
    rating = "Excellent";
  } else if (score >= 75) {
    rating = "Very Good";
  } else if (score >= 60) {
    rating = "Good";
  }

  return {
    score,

    strengths,

    suggestions,

    completion: {
      personal: personalComplete,
      summary: summaryComplete,
      experience: experienceComplete,
      education: educationComplete,
      skills: skillsComplete,
    },

    rating,
  };
}
