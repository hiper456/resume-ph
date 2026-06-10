"use client";

import { createContext, useContext, useState } from "react";
import { ResumeData, initialResumeData } from "@/types/resume";

type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [resumeData, setResumeData] =
    useState<ResumeData>(initialResumeData);

  return (
    <ResumeContext.Provider
      value={{ resumeData, setResumeData }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error(
      "useResume must be used inside ResumeProvider"
    );
  }

  return context;
}