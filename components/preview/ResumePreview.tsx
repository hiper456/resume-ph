"use client";

import ResumeTemplate from "@/components/resume/ResumeTemplate";
import ResumeScore from "@/components/preview/ResumeScore";

export default function ResumePreview() {
  return (
    <aside className="sticky top-8 self-start print:hidden">
      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto pr-2">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Live Preview
          </p>

          <ResumeTemplate />
        </div>

        <ResumeScore />
      </div>
    </aside>
  );
}