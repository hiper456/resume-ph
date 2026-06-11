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
  personal: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
};

export const initialResumeData: ResumeData = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
};