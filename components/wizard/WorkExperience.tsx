"use client";

import { useResume } from "@/context/ResumeContext";

export default function WorkExperience() {
  const { resumeData, setResumeData } = useResume();

  const experience = resumeData.experience[0] || {
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const updateField = (
    field: keyof typeof experience,
    value: string
  ) => {
    setResumeData({
      ...resumeData,
      experience: [
        {
          ...experience,
          [field]: value,
        },
      ],
    });
  };

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block font-medium">Company Name *</label>
        <input
          type="text"
          value={experience.company}
          onChange={(e) => updateField("company", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="ABC Corporation"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Job Title *</label>
        <input
          type="text"
          value={experience.position}
          onChange={(e) => updateField("position", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="Customer Service Representative"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Start Date</label>
        <input
          type="text"
          value={experience.startDate}
          onChange={(e) => updateField("startDate", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="January 2022"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">End Date</label>
        <input
          type="text"
          value={experience.endDate}
          onChange={(e) => updateField("endDate", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="Present"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block font-medium">Responsibilities / Achievements</label>
        <textarea
          value={experience.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="min-h-32 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="Describe your role, achievements, responsibilities, and measurable results."
        />
      </div>
    </div>
  );
}