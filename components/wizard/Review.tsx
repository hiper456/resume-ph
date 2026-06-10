"use client";

import { useResume } from "@/context/ResumeContext";

export default function Review() {
  const { resumeData } = useResume();

  const fullName =
    `${resumeData.personal.firstName} ${resumeData.personal.lastName}`.trim();

  const experience = resumeData.experience[0];
  const education = resumeData.education[0];

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-xl border bg-gray-50 p-5">
        <h3 className="font-bold">Personal Information</h3>
        <p className="mt-2 text-gray-700">{fullName || "No name added"}</p>
        <p className="text-gray-700">{resumeData.personal.email || "No email added"}</p>
        <p className="text-gray-700">{resumeData.personal.phone || "No phone added"}</p>
        <p className="text-gray-700">{resumeData.personal.address || "No address added"}</p>
      </div>

      <div className="rounded-xl border bg-gray-50 p-5">
        <h3 className="font-bold">Work Experience</h3>
        <p className="mt-2 text-gray-700">
          {experience?.position || "No job title added"}
        </p>
        <p className="text-gray-700">
          {experience?.company || "No company added"}
        </p>
      </div>

      <div className="rounded-xl border bg-gray-50 p-5">
        <h3 className="font-bold">Education</h3>
        <p className="mt-2 text-gray-700">
          {education?.degree || "No degree added"}
        </p>
        <p className="text-gray-700">
          {education?.school || "No school added"}
        </p>
        <p className="text-gray-700">
          {education?.year || "No year added"}
        </p>
      </div>

      <div className="rounded-xl border bg-gray-50 p-5">
        <h3 className="font-bold">Skills</h3>
        <p className="mt-2 text-gray-700">
          {resumeData.skills.length > 0
            ? resumeData.skills.join(", ")
            : "No skills added"}
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 p-5 text-blue-800">
        Review your details. Next step will be PDF generation and payment unlock.
      </div>
    </div>
  );
}