"use client";

import { useResume } from "@/context/ResumeContext";
import ResumeTemplate from "@/components/resume/ResumeTemplate";

export default function ResumePreview() {
  const { resumeData } = useResume();

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="relative overflow-hidden rounded-xl">
        <ResumeTemplate resumeData={resumeData} />
      </div>
    </div>
  );
}