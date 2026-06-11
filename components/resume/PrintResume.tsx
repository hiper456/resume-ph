"use client";

import ResumeTemplate from "@/components/resume/ResumeTemplate";

export default function PrintResume() {
  return (
    <div className="hidden print:block print:m-0 print:bg-white print:p-0">
      <ResumeTemplate />
    </div>
  );
}