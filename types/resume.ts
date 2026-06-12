export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

export type WorkExperience = {
  id: string;
  company: string;
  position: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrent: boolean;
  description: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  startYear: string;
  endYear: string;
};

export type ResumeData = {
  id: string;
  templateId?: "basic" | "modern" | "executive";
  createdAt: string;
  updatedAt: string;

  status: "draft" | "paid";

  personal: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  coverLetter: string;
};

export const initialResumeData: ResumeData = {
  id: "",
  templateId: "basic",
  createdAt: "",
  updatedAt: "",

  status: "draft",

  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  },

  summary: "",

  coverLetter: "",

  experience: [],

  education: [],

  skills: [],
};