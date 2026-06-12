"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";

export default function CoverLetterGenerator() {
  const { resumeData, setResumeData } = useResume();

  const [targetPosition, setTargetPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [error, setError] = useState("");

  const coverLetter = resumeData.coverLetter || "";

  async function generateCoverLetter() {
    try {
      setLoading(true);
      setError("");
      setCopySuccess("");

      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId: resumeData.id,
          name: `${resumeData.personal.firstName} ${resumeData.personal.lastName}`,
          summary: resumeData.summary,
          experience: resumeData.experience,
          education: resumeData.education,
          skills: resumeData.skills,
          targetPosition,
        }),
      });

      const data = await response.json();

      if (response.status === 403 && data.code === "FEATURE_LOCKED") {
        setError(data.error);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate cover letter.");
      }

      if (!data.coverLetter) {
        throw new Error("No cover letter returned.");
      }

      setResumeData((prev) => ({
        ...prev,
        coverLetter: data.coverLetter,
      }));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Cover letter generation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyCoverLetter() {
    if (!coverLetter) return;

    await navigator.clipboard.writeText(coverLetter);
    setCopySuccess("Copied to clipboard.");

    setTimeout(() => {
      setCopySuccess("");
    }, 2000);
  }

  function downloadCoverLetter() {
    if (!coverLetter) return;

    const blob = new Blob([coverLetter], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "cover-letter.txt";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
          🎁 Launch Bonus
        </div>

        <h3 className="text-2xl font-black text-slate-900">
          AI Cover Letter
        </h3>

        <p className="text-sm leading-6 text-slate-600">
          Generate a polished, employer-ready cover letter from your resume.
          Included in the Professional plan during launch.
        </p>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Target Position{" "}
          <span className="font-normal text-slate-400">(optional)</span>
        </label>

        <input
          value={targetPosition}
          onChange={(event) => setTargetPosition(event.target.value)}
          placeholder="Example: Software Engineer, Chief Engineer, Operations Manager"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
        />
      </div>

      <button
        type="button"
        onClick={generateCoverLetter}
        disabled={loading}
        className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : coverLetter
            ? "Regenerate Cover Letter"
            : "Generate Cover Letter"}
      </button>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {coverLetter && (
        <div className="mt-5">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <label className="block text-sm font-semibold text-slate-700">
              Generated Cover Letter
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyCoverLetter}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Copy
              </button>

              <button
                type="button"
                onClick={downloadCoverLetter}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Download TXT
              </button>
            </div>
          </div>

          {copySuccess && (
            <p className="mb-2 text-xs font-semibold text-emerald-600">
              {copySuccess}
            </p>
          )}

          <textarea
            value={coverLetter}
            onChange={(event) =>
              setResumeData((prev) => ({
                ...prev,
                coverLetter: event.target.value,
              }))
            }
            className="min-h-[360px] w-full rounded-xl border border-slate-300 p-4 text-sm leading-7 outline-none focus:border-slate-900"
          />
        </div>
      )}
    </section>
  );
}