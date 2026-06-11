"use client";

import { useResume } from "@/context/ResumeContext";
import {
  sortEducationNewestFirst,
  sortExperienceNewestFirst,
} from "@/utils/sortResumeEntries";

export default function ResumeTemplate() {
  const { resumeData } = useResume();

  const fullName =
    `${resumeData.personal.firstName} ${resumeData.personal.lastName}`.trim();

  const experiences = sortExperienceNewestFirst(
    resumeData.experience
  );

  const education = sortEducationNewestFirst(
    resumeData.education
  );

  return (
    <div
      id="resume-preview-paper"
      className="mx-auto w-full max-w-[520px] rounded-lg border bg-white p-8 shadow-2xl"
    >
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold">
          {fullName || "Juan Dela Cruz"}
        </h1>

        <p className="mt-2 text-xs text-gray-600">
          {resumeData.personal.email}
        </p>

        <p className="text-xs text-gray-600">
          {resumeData.personal.phone}
        </p>

        <p className="text-xs text-gray-600">
          {resumeData.personal.address}
        </p>
      </header>

      <section className="mt-6">
        <h2 className="border-b pb-1 text-xs font-bold uppercase">
          Work Experience
        </h2>

        {experiences.map((job) => (
          <div key={job.id} className="mt-4">
            <div className="flex justify-between">
              <div>
                <p className="font-bold">
                  {job.position}
                </p>

                <p className="text-sm text-gray-600">
                  {job.company}
                </p>
              </div>

              <p className="text-xs text-gray-500">
                {job.startMonth} {job.startYear}
                {" - "}
                {job.isCurrent
                  ? "Present"
                  : `${job.endMonth} ${job.endYear}`}
              </p>
            </div>

            <p className="mt-2 whitespace-pre-line text-xs leading-5">
              {job.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="border-b pb-1 text-xs font-bold uppercase">
          Education
        </h2>

        {education.map((item) => (
          <div key={item.id || `${item.school}-${item.degree}-${index}`} className="mt-3">
            <p className="font-bold">
              {item.degree}
            </p>

            <p className="text-sm text-gray-600">
              {item.school}
            </p>

            <p className="text-xs text-gray-500">
              {item.startYear} - {item.endYear}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="border-b pb-1 text-xs font-bold uppercase">
          Skills
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {resumeData.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}