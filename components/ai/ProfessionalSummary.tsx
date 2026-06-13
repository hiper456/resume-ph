"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";

type ProfessionalSummaryProps = {
  canUseAi?: boolean;
};

export default function ProfessionalSummary({
  canUseAi = false,
}: ProfessionalSummaryProps) {
  const { resumeData, setResumeData } = useResume();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  async function handleUpgradeToProfessional() {
  try {
    setLoading(true);
    setError("");

    const response = await fetch("/api/payments/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeData,
        planCode: "professional",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to start checkout.");
    }

    if (!data.checkoutUrl) {
      throw new Error("Checkout URL was not returned.");
    }

    window.location.href = data.checkoutUrl;
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Unable to start checkout. Please try again."
    );
  } finally {
    setLoading(false);
  }
}

  async function generateSummary() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId: resumeData.id,
          name: `${resumeData.personal.firstName} ${resumeData.personal.lastName}`,
          experience: resumeData.experience,
          education: resumeData.education,
          skills: resumeData.skills,
        }),
      });

      const data = await response.json();

      if (response.status === 403 && data.code === "FEATURE_LOCKED") {
        setError(data.error);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate summary.");
      }

      if (!data.summary) {
        throw new Error("No summary returned.");
      }

      setResumeData((prev) => ({
        ...prev,
        summary: data.summary,
      }));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "AI summary generation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block font-medium">Professional Summary</label>

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

      {canUseAi ? (
        <button
          type="button"
          onClick={generateSummary}
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generating..." : "✨ Generate with AI"}
        </button>
      ) : (
        <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50 p-4">
          <p className="text-sm font-bold text-indigo-900">
            ✨ AI Summary is available on Professional
          </p>

          <p className="mt-1 text-sm leading-6 text-indigo-800">
            You can still write your summary manually. Upgrade to Professional
            to generate a polished, ATS-friendly summary with AI.
          </p>

<button
  type="button"
  onClick={handleUpgradeToProfessional}
  disabled={loading}
  className="mt-3 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Starting checkout..." : "Upgrade to Professional →"}
</button>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-4 rounded-xl border-l-4 border-blue-600 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-900">
          What makes a good summary?
        </h3>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-blue-800">
          <li>Keep it between 2 and 4 sentences.</li>
          <li>Highlight your years of experience.</li>
          <li>Mention your industry expertise.</li>
          <li>Describe the value you bring to employers.</li>
        </ul>
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