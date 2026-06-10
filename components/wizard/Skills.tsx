"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";

export default function Skills() {
  const { resumeData, setResumeData } = useResume();
  const [inputValue, setInputValue] = useState("");

  function addSkill() {
    const newSkill = inputValue.trim();

    if (!newSkill) return;

    const alreadyExists = resumeData.skills.some(
      (skill) => skill.toLowerCase() === newSkill.toLowerCase()
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
            onBlur={addSkill}
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
    </div>
  );
}