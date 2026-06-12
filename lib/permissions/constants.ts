export const FEATURES = {
  PDF_DOWNLOAD: "pdf_download",
  BASIC_TEMPLATE: "basic_template",
  PREMIUM_TEMPLATE: "premium_template",

  AI_SUMMARY: "ai_summary",
  AI_EXPERIENCE: "ai_experience",
  AI_SKILLS: "ai_skills",

  COVER_LETTER: "cover_letter",
  RESUME_SCORE: "resume_score",

  JOB_MATCHING: "job_matching",
  EMPLOYER_OUTREACH: "employer_outreach",
  APPLICATION_TRACKER: "application_tracker",
} as const;

export type FeatureCode = (typeof FEATURES)[keyof typeof FEATURES];

export const PLANS = {
  BASIC: "basic",
  PROFESSIONAL: "professional",
  EXECUTIVE: "executive",
} as const;

export type PlanCode = (typeof PLANS)[keyof typeof PLANS];