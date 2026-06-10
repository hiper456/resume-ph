"use client";

import { useResume } from "@/context/ResumeContext";

export default function PersonalInfo() {
  const { resumeData, setResumeData } = useResume();

  const updateField = (
    field: keyof typeof resumeData.personal,
    value: string
  ) => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [field]: value,
      },
    });
  };

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block font-medium">First Name *</label>
        <input
          type="text"
          value={resumeData.personal.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="Juan"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Last Name *</label>
        <input
          type="text"
          value={resumeData.personal.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="Dela Cruz"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Email *</label>
        <input
          type="email"
          value={resumeData.personal.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="juan@email.com"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Phone *</label>
        <input
          type="text"
          value={resumeData.personal.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="+63 912 345 6789"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block font-medium">Address</label>
        <input
          type="text"
          value={resumeData.personal.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="Cebu City, Philippines"
        />
      </div>
    </div>
  );
}