"use client";

import { useResume } from "@/context/ResumeContext";
import ResumeTemplate from "./ResumeClassic";

export default function PrintResume() {
  const { resumeData } = useResume();

  return (
    <div className="hidden print:block">
      <ResumeTemplate resumeData={resumeData} />
    </div>
  );
}