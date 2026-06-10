"use client";

import { useResume } from "@/context/ResumeContext";

export default function Education() {
  const { resumeData, setResumeData } = useResume();

  const education = resumeData.education[0] || {
    school: "",
    degree: "",
    year: "",
  };

  const updateField = (
    field: keyof typeof education,
    value: string
  ) => {
    setResumeData({
      ...resumeData,
      education: [
        {
          ...education,
          [field]: value,
        },
      ],
    });
  };

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block font-medium">School / University *</label>
        <input
          type="text"
          value={education.school}
          onChange={(e) => updateField("school", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="University of Cebu"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Degree / Course *</label>
        <input
          type="text"
          value={education.degree}
          onChange={(e) => updateField("degree", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="Bachelor of Science in Information Technology"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block font-medium">Year / Graduation Date</label>
        <input
          type="text"
          value={education.year}
          onChange={(e) => updateField("year", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="2024"
        />
      </div>
    </div>
  );
}