"use client";

import { useResume } from "@/context/ResumeContext";

export default function Skills() {
  const { resumeData, setResumeData } = useResume();

  const skillsText = resumeData.skills.join(", ");

  function updateSkills(value: string) {
    const skillsArray = value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    setResumeData({
      ...resumeData,
      skills: skillsArray,
    });
  }

  return (
    <div className="mt-8">
      <label className="mb-2 block font-medium">
        Skills *
      </label>

      <textarea
        value={skillsText}
        onChange={(e) => updateSkills(e.target.value)}
        className="min-h-40 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
        placeholder="Customer Service, Microsoft Office, Leadership, Communication"
      />

      <p className="mt-2 text-sm text-gray-500">
        Separate each skill with a comma.
      </p>
    </div>
  );
}