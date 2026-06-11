"use client";

import { useResume } from "@/context/ResumeContext";

export default function ProfessionalSummary() {
  const { resumeData, setResumeData } = useResume();

  function updateSummary(value: string) {
    setResumeData({
      ...resumeData,
      summary: value,
    });
  }

  return (
    <div className="mt-8">
      <label className="mb-2 block font-medium">
        Professional Summary
      </label>

      <textarea
        value={resumeData.summary}
        onChange={(e) => updateSummary(e.target.value)}
        className="min-h-40 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
        placeholder="Example: Experienced marine engineer with expertise in LNG operations, engine maintenance, safety compliance, and vessel machinery systems."
      />

      <p className="mt-2 text-sm text-gray-500">
        Write 2–4 sentences summarizing your experience, strengths, and career focus.
      </p>
    </div>
  );
}