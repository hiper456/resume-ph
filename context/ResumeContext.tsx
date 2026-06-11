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

function generateResumeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `resume-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function createFreshResumeData(): ResumeData {
  const now = new Date().toISOString();

  return {
    ...initialResumeData,
    id: generateResumeId(),
    createdAt: now,
    updatedAt: now,
    status: "draft",
  };
}

function normalizeResumeData(data: Partial<ResumeData>): ResumeData {
  const now = new Date().toISOString();

  return {
    ...initialResumeData,
    ...data,

    id: data.id || generateResumeId(),

    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now,

    status: data.status || "draft",

    personal: {
      ...initialResumeData.personal,
      ...data.personal,
    },

    experience: data.experience || [],
    education: data.education || [],
    skills: data.skills || [],
  };
}

export function ResumeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [resumeData, rawSetResumeData] =
    useState<ResumeData>(createFreshResumeData);

  const [isLoaded, setIsLoaded] = useState(false);

  const setResumeData: React.Dispatch<React.SetStateAction<ResumeData>> = (
    updater
  ) => {
    rawSetResumeData((previousData) => {
      const nextData =
        typeof updater === "function"
          ? updater(previousData)
          : updater;

      return {
        ...nextData,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as Partial<ResumeData>;
        rawSetResumeData(normalizeResumeData(parsedData));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        rawSetResumeData(createFreshResumeData());
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
    rawSetResumeData(createFreshResumeData());
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