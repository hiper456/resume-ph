"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ResumeData, initialResumeData } from "@/types/resume";

const STORAGE_KEY = "resume-ph-draft";

type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  clearResumeData: () => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [resumeData, setResumeData] =
    useState<ResumeData>(initialResumeData);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }
  }, [resumeData, isLoaded]);

  function clearResumeData() {
    localStorage.removeItem(STORAGE_KEY);
    setResumeData(initialResumeData);
  }

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        clearResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error("useResume must be used inside ResumeProvider");
  }

  return context;
}