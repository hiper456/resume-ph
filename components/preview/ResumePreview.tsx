"use client";

import ResumeScore from "@/components/preview/ResumeScore";
import { useResume } from "@/context/ResumeContext";
import ResumeTemplate from "@/components/resume/ResumeTemplate";

export default function ResumePreview() {
  const { resumeData } = useResume();

  return (
    <>
      <ResumeTemplate resumeData={resumeData} />
      <ResumeScore />
    </>
  );
}