"use client";

import { useResume } from "@/context/ResumeContext";

export default function ProfessionalSummary() {
  const { resumeData, setResumeData } = useResume();

  const maxLength = 600;
  const recommendedMin = 150;
  const recommendedMax = 350;

  const characterCount = resumeData.summary.length;

  function updateSummary(value: string) {
    setResumeData({
      ...resumeData,
      summary: value,
    });
  }

  return (
    <div className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block font-medium">
          Professional Summary
        </label>

        <textarea
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          maxLength={maxLength}
          rows={8}
          className="w-full rounded-lg border p-4 leading-7 focus:border-blue-500 focus:outline-none"
          placeholder="Example: Experienced marine engineer with expertise in LNG operations, engine maintenance, safety compliance, and vessel machinery systems."
        />

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-gray-500">
            Recommended: {recommendedMin}–{recommendedMax} characters.
          </p>

          <p
            className={
              characterCount > recommendedMax
                ? "font-medium text-amber-600"
                : "text-gray-500"
            }
          >
            {characterCount}/{maxLength}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
        💡 <strong>Tip:</strong> Write 2–4 sentences highlighting your
        experience, strengths, industry expertise, and the value you bring to
        employers.
      </div>

      <div className="rounded-xl border bg-gray-50 p-4 text-sm text-gray-700">
        <p className="font-semibold text-gray-900">Example:</p>

        <p className="mt-2 leading-6">
          Experienced marine engineer with strong background in LNG operations,
          vessel maintenance, safety compliance, and machinery troubleshooting.
          Skilled at supporting safe, efficient, and reliable shipboard
          operations in high-pressure environments.
        </p>
      </div>
    </div>
  );
}