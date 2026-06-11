"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { calculateResumeScore } from "@/lib/resumeScore";

export default function ResumeScore() {
  const { resumeData } = useResume();
  const [expanded, setExpanded] = useState(false);

  const result = calculateResumeScore(resumeData);

  const scoreColor =
    result.score >= 90
      ? "text-green-700"
      : result.score >= 75
      ? "text-yellow-600"
      : "text-red-600";

  const progressColor =
    result.score >= 90
      ? "bg-green-500"
      : result.score >= 75
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="mt-6 rounded-2xl border bg-white p-5 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Resume Score</h2>

          <p className={`mt-1 text-3xl font-extrabold ${scoreColor}`}>
            {result.score}
            <span className="text-lg text-gray-500">/100</span>
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-4 py-2 text-right">
          <p className="text-xs font-semibold text-blue-900">ATS Rating</p>
          <p className="text-sm font-bold text-blue-700">{result.rating}</p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`${progressColor} h-full rounded-full transition-all duration-700`}
          style={{ width: `${result.score}%` }}
        />
      </div>

      <div className="mt-4 grid gap-2 text-sm">
        <MiniCheck complete={result.completion.personal} label="Personal" />
        <MiniCheck complete={result.completion.summary} label="Summary" />
        <MiniCheck complete={result.completion.experience} label="Experience" />
      </div>

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="mt-4 w-full rounded-lg border px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        {expanded ? "Hide details" : "View details"}
      </button>

      {expanded && (
        <div className="mt-5 border-t pt-5">
          <h3 className="font-semibold text-gray-900">Resume Completion</h3>

          <div className="mt-3 space-y-2 text-sm">
            <Row complete={result.completion.personal} title="Personal Information" />
            <Row complete={result.completion.summary} title="Professional Summary" />
            <Row complete={result.completion.experience} title="Work Experience" />
            <Row complete={result.completion.education} title="Education" />
            <Row complete={result.completion.skills} title="Skills" />
          </div>

          {result.strengths.length > 0 && (
            <div className="mt-5">
              <h3 className="font-semibold text-green-700">Strengths</h3>

              <ul className="mt-2 space-y-2 text-sm text-green-700">
                {result.strengths.map((item) => (
                  <li key={item}>✅ {item}</li>
                ))}
              </ul>
            </div>
          )}

          {result.suggestions.length > 0 && (
            <div className="mt-5">
              <h3 className="font-semibold text-orange-700">Suggestions</h3>

              <ul className="mt-2 space-y-2 text-sm text-orange-700">
                {result.suggestions.map((item) => (
                  <li key={item}>⚠ {item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5 rounded-xl border bg-gray-50 p-4">
            <p className="text-sm text-gray-700">
              {result.score >= 90 &&
                "🎉 Excellent! Your resume is highly competitive and ready for applications."}

              {result.score >= 75 &&
                result.score < 90 &&
                "👍 Your resume is strong. A few improvements can make it even better."}

              {result.score < 75 &&
                "💡 Complete more sections and improve your descriptions to maximize your chances of getting interviews."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniCheck({
  complete,
  label,
}: {
  complete: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
      <span className="text-gray-700">{label}</span>
      <span>{complete ? "✅" : "⚠"}</span>
    </div>
  );
}

function Row({
  complete,
  title,
}: {
  complete: boolean;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
      <span className="text-gray-700">{title}</span>

      <span className={complete ? "text-green-600" : "text-orange-600"}>
        {complete ? "✅" : "⚠"}
      </span>
    </div>
  );
}