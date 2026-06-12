import { FEATURES } from "@/lib/permissions/constants";

export type ResumeTemplateId = "basic" | "modern" | "executive";

export type FeatureCode =
  (typeof FEATURES)[keyof typeof FEATURES];
  
export type TemplateConfig = {
  id: ResumeTemplateId;
  name: string;
  description: string;
  isPremium: boolean;
  requiredFeature?: FeatureCode;
};

export const RESUME_TEMPLATES: TemplateConfig[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Clean ATS-friendly resume template.",
    isPremium: false,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Premium polished layout for professionals.",
    isPremium: true,
    requiredFeature: FEATURES.PREMIUM_TEMPLATE,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium senior-level resume layout.",
    isPremium: true,
    requiredFeature: FEATURES.PREMIUM_TEMPLATE,
  },
];

export function getTemplateById(templateId: ResumeTemplateId) {
  return RESUME_TEMPLATES.find((template) => template.id === templateId);
}