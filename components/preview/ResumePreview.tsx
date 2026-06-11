"use client";

import ResumeTemplate from "@/components/resume/ResumeTemplate";

export default function ResumePreview() {
  return (
    <aside className="sticky top-8 self-start">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <ResumeTemplate />
      </div>
    </aside>
  );
}