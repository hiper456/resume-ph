"use client";

import { useMemo, useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { getSkillSuggestions } from "@/lib/skillSuggestions";

export default function Skills() {
  const { resumeData, setResumeData } = useResume();
  const [inputValue, setInputValue] = useState("");

  const suggestions = useMemo(() => {
    const availableSuggestions = getSkillSuggestions(resumeData.skills);
    const searchValue = inputValue.trim().toLowerCase();

    if (!searchValue) {
      return availableSuggestions.slice(0, 12);
    }

    return availableSuggestions
      .filter((skill) => skill.toLowerCase().includes(searchValue))
      .slice(0, 12);
  }, [resumeData.skills, inputValue]);

  function addSkill(skillValue?: string) {
    const newSkill = (skillValue ?? inputValue).trim();

    if (!newSkill) return;

    const alreadyExists = resumeData.skills.some(
      (skill) => skill.toLowerCase().trim() === newSkill.toLowerCase()
    );

    if (alreadyExists) {
      setInputValue("");
      return;
    }

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    });

    setInputValue("");
  }

  function removeSkill(skillToRemove: string) {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill !== skillToRemove),
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }

    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      resumeData.skills.length > 0
    ) {
      removeSkill(resumeData.skills[resumeData.skills.length - 1]);
    }
  }

  return (
    <div className="mt-8">
      <label className="mb-2 block font-medium">Skills *</label>

      <div className="rounded-lg border bg-white p-3 focus-within:border-blue-500">
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {skill}

              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-blue-500 hover:text-blue-900"
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </span>
          ))}

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addSkill()}
            className="min-w-40 flex-1 outline-none"
            placeholder={
              resumeData.skills.length === 0
                ? "Type a skill and press Enter"
                : "Add another skill"
            }
          />
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Press Enter or comma after each skill. Click × to remove a skill.
      </p>
{suggestions.length > 0 && (
  <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
    <div className="mb-3 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-sm font-semibold text-gray-800">
          Recommended Skills
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Click a suggestion to quickly add it.
        </p>
      </div>

      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-200">
        Suggestions
      </span>
    </div>

    <div className="flex flex-wrap gap-2">
      {suggestions.map((skill) => (
        <button
          key={skill}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => addSkill(skill)}
          className="rounded-md bg-white px-3 py-1.5 text-sm text-gray-700 ring-1 ring-gray-200 transition hover:bg-gray-100 hover:text-gray-900 hover:ring-gray-300"
        >
          + {skill}
        </button>
      ))}
    </div>
  </div>
)}
    </div>
  );
}