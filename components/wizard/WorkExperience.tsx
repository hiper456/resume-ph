"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import type { WorkExperience } from "@/types/resume";
import { sortExperienceNewestFirst } from "@/utils/sortResumeEntries";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const emptyExperience = (): WorkExperience => ({
  id: createId(),
  company: "",
  position: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  isCurrent: false,
  description: "",
});

function normalizeExperience(item: WorkExperience): WorkExperience {
  return {
    id: item.id || createId(),
    company: item.company || "",
    position: item.position || "",
    startMonth: item.startMonth || "",
    startYear: item.startYear || "",
    endMonth: item.endMonth || "",
    endYear: item.endYear || "",
    isCurrent: Boolean(item.isCurrent),
    description: item.description || "",
  };
}

export default function WorkExperience() {
  const { resumeData, setResumeData } = useResume();

  const [draft, setDraft] = useState<WorkExperience>(emptyExperience());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const sortedExperience = sortExperienceNewestFirst(
    resumeData.experience.map(normalizeExperience)
  );

  function updateDraft(field: keyof WorkExperience, value: string | boolean) {
    setDraft({
      ...draft,
      [field]: value,
      ...(field === "isCurrent" && value === true
        ? { endMonth: "", endYear: "" }
        : {}),
    });

    if (field === "description") {
      setAiError("");
    }
  }

  async function rewriteExperienceWithAI() {
    if (!draft.description.trim()) {
      setAiError("Add a rough description first, then let AI improve it.");
      return;
    }

    try {
      setAiLoading(true);
      setAiError("");

      const response = await fetch("/api/improve-experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: draft.position,
          company: draft.company,
          description: draft.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to improve experience.");
      }

      const data = await response.json();

      if (!data.description) {
        throw new Error("No improved description returned.");
      }

      setDraft({
        ...draft,
        description: data.description,
      });
    } catch {
      setAiError("AI rewrite failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  }

  function saveExperience() {
    const cleanDraft = normalizeExperience(draft);

    if (!cleanDraft.company.trim() && !cleanDraft.position.trim()) {
      return;
    }

    const updatedExperience = editingId
      ? resumeData.experience.map((item) =>
          item.id === editingId ? cleanDraft : normalizeExperience(item)
        )
      : [...resumeData.experience.map(normalizeExperience), cleanDraft];

    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });

    setDraft(emptyExperience());
    setEditingId(null);
    setAiError("");
  }

  function editExperience(item: WorkExperience) {
    const normalized = normalizeExperience(item);

    setDraft(normalized);
    setEditingId(normalized.id);
    setAiError("");
  }

  function deleteExperience(id: string) {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience
        .map(normalizeExperience)
        .filter((item) => item.id !== id),
    });

    if (editingId === id) {
      setDraft(emptyExperience());
      setEditingId(null);
      setAiError("");
    }
  }

  function cancelEdit() {
    setDraft(emptyExperience());
    setEditingId(null);
    setAiError("");
  }

  function formatDateRange(item: WorkExperience) {
    const start =
      item.startMonth || item.startYear
        ? `${item.startMonth} ${item.startYear}`.trim()
        : "Start date";

    const end = item.isCurrent
      ? "Present"
      : item.endMonth || item.endYear
      ? `${item.endMonth} ${item.endYear}`.trim()
      : "End date";

    return `${start} - ${end}`;
  }

  return (
    <div className="mt-8 space-y-6">
      {sortedExperience.length > 0 && (
        <div className="space-y-3">
          {sortedExperience.map((item, index) => (
            <div
              key={item.id || `${item.company}-${item.position}-${index}`}
              className={`rounded-xl border p-4 ${
                editingId === item.id
                  ? "border-blue-300 bg-blue-50"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold">
                    {item.position || "Job Title"}
                  </p>

                  <p className="text-sm text-gray-600">
                    {item.company || "Company Name"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatDateRange(item)}
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500">
                  #{index + 1}
                </span>
              </div>

              {item.description && (
                <p className="mt-3 whitespace-pre-line line-clamp-3 text-sm text-gray-600">
                  {item.description}
                </p>
              )}

              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => editExperience(item)}
                  className="text-sm font-semibold text-blue-700"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteExperience(item.id)}
                  className="text-sm font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl border bg-white p-5">
        <h3 className="text-lg font-bold">
          {editingId ? "Edit Work Experience" : "Add Work Experience"}
        </h3>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <Input
            label="Company Name *"
            value={draft.company}
            placeholder="ABC Corporation"
            onChange={(value) => updateDraft("company", value)}
          />

          <Input
            label="Job Title *"
            value={draft.position}
            placeholder="Senior Engineer"
            onChange={(value) => updateDraft("position", value)}
          />

          <Select
            label="Start Month"
            value={draft.startMonth}
            options={months}
            onChange={(value) => updateDraft("startMonth", value)}
          />

          <Input
            label="Start Year"
            value={draft.startYear}
            placeholder="2022"
            onChange={(value) => updateDraft("startYear", value)}
          />

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={draft.isCurrent}
                onChange={(e) =>
                  updateDraft("isCurrent", e.target.checked)
                }
              />
              I currently work here
            </label>
          </div>

          {!draft.isCurrent && (
            <>
              <Select
                label="End Month"
                value={draft.endMonth}
                options={months}
                onChange={(value) => updateDraft("endMonth", value)}
              />

              <Input
                label="End Year"
                value={draft.endYear}
                placeholder="2024"
                onChange={(value) => updateDraft("endYear", value)}
              />
            </>
          )}

          <div className="md:col-span-2">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <label className="block font-medium">
                Responsibilities / Achievements
              </label>

              <button
                type="button"
                onClick={rewriteExperienceWithAI}
                disabled={aiLoading}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {aiLoading ? "Rewriting..." : "✨ Rewrite with AI"}
              </button>
            </div>

            <textarea
              value={draft.description}
              onChange={(e) =>
                updateDraft("description", e.target.value)
              }
              className="min-h-40 w-full rounded-lg border p-3 leading-7 focus:border-blue-500 focus:outline-none"
              placeholder="Example: Maintained engine room machinery, monitored equipment condition, assisted with inspections, and supported safe vessel operations."
            />

            {aiError && (
              <p className="mt-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {aiError}
              </p>
            )}

            <div className="mt-3 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-800">
              <p className="font-semibold">AI writing assistant</p>

              <p className="mt-1 leading-6">
                Write rough notes such as “maintained engines” or “handled
                daily inspections,” then let AI turn them into professional
                resume bullet points.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={saveExperience}
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            {editingId ? "Update Experience" : "+ Add Work Experience"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}