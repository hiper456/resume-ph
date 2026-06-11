"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import type { Education } from "@/types/resume";
import { sortEducationNewestFirst } from "@/utils/sortResumeEntries";

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const emptyEducation = (): Education => ({
  id: createId(),
  school: "",
  degree: "",
  startYear: "",
  endYear: "",
});

function normalizeEducation(item: Education): Education {
  return {
    id: item.id || createId(),
    school: item.school || "",
    degree: item.degree || "",
    startYear: item.startYear || "",
    endYear: item.endYear || "",
  };
}

export default function Education() {
  const { resumeData, setResumeData } = useResume();

  const [draft, setDraft] = useState<Education>(emptyEducation());
  const [editingId, setEditingId] = useState<string | null>(null);

  const sortedEducation = sortEducationNewestFirst(
    resumeData.education.map(normalizeEducation)
  );

  function updateDraft(field: keyof Education, value: string) {
    setDraft({
      ...draft,
      [field]: value,
    });
  }

  function saveEducation() {
    const cleanDraft = normalizeEducation(draft);

    if (!cleanDraft.school.trim() && !cleanDraft.degree.trim()) {
      return;
    }

    const updatedEducation = editingId
      ? resumeData.education.map((item) =>
          item.id === editingId ? cleanDraft : normalizeEducation(item)
        )
      : [...resumeData.education.map(normalizeEducation), cleanDraft];

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });

    setDraft(emptyEducation());
    setEditingId(null);
  }

  function editEducation(item: Education) {
    const normalized = normalizeEducation(item);

    setDraft(normalized);
    setEditingId(normalized.id);
  }

  function deleteEducation(id: string) {
    setResumeData({
      ...resumeData,
      education: resumeData.education
        .map(normalizeEducation)
        .filter((item) => item.id !== id),
    });

    if (editingId === id) {
      setDraft(emptyEducation());
      setEditingId(null);
    }
  }

  function cancelEdit() {
    setDraft(emptyEducation());
    setEditingId(null);
  }

  function formatDateRange(item: Education) {
    if (item.startYear && item.endYear) {
      return `${item.startYear} - ${item.endYear}`;
    }

    if (item.endYear) {
      return item.endYear;
    }

    if (item.startYear) {
      return `${item.startYear} - Present`;
    }

    return "Year not specified";
  }

  return (
    <div className="mt-8 space-y-6">
      {sortedEducation.length > 0 && (
        <div className="space-y-3">
          {sortedEducation.map((item, index) => (
            <div
              key={item.id || `${item.school}-${item.degree}-${index}`}
              className={`rounded-xl border p-4 ${
                editingId === item.id
                  ? "border-blue-300 bg-blue-50"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold">
                    {item.degree || "Degree / Course"}
                  </p>

                  <p className="text-sm text-gray-600">
                    {item.school || "School / University"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatDateRange(item)}
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500">
                  #{index + 1}
                </span>
              </div>

              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => editEducation(item)}
                  className="text-sm font-semibold text-blue-700"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteEducation(item.id)}
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
          {editingId ? "Edit Education" : "Add Education"}
        </h3>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <Input
            label="School / University *"
            value={draft.school}
            placeholder="University of Cebu"
            onChange={(value) => updateDraft("school", value)}
          />

          <Input
            label="Degree / Course *"
            value={draft.degree}
            placeholder="Bachelor of Science in Marine Engineering"
            onChange={(value) => updateDraft("degree", value)}
          />

          <Input
            label="Start Year"
            value={draft.startYear}
            placeholder="2012"
            onChange={(value) => updateDraft("startYear", value)}
          />

          <Input
            label="End Year / Graduation Year"
            value={draft.endYear}
            placeholder="2016"
            onChange={(value) => updateDraft("endYear", value)}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={saveEducation}
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            {editingId ? "Update Education" : "+ Add Education"}
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