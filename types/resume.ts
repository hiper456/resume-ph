export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

export type WorkExperience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  school: string;
  degree: string;
  year: string;
};

export type ResumeData = {
  personal: PersonalInfo;
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
  experience: [],
  education: [],
  skills: [],
};