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

  const experiences = sortExperienceNewestFirst(resumeData.experience);
  const education = sortEducationNewestFirst(resumeData.education);

  const contactItems = [
    resumeData.personal.email,
    resumeData.personal.phone,
    resumeData.personal.address,
  ].filter(Boolean);

  function formatExperienceDate(job: (typeof experiences)[number]) {
    const start = `${job.startMonth || ""} ${job.startYear || ""}`.trim();

    const end = job.isCurrent
      ? "Present"
      : `${job.endMonth || ""} ${job.endYear || ""}`.trim();

    if (start && end) return `${start} - ${end}`;
    if (start) return start;
    if (end) return end;

    return "";
  }

  function formatEducationDate(item: (typeof education)[number]) {
    if (item.startYear && item.endYear) {
      return `${item.startYear} - ${item.endYear}`;
    }

    if (item.endYear) return item.endYear;
    if (item.startYear) return `${item.startYear} - Present`;

    return "";
  }

  return (
    <div
      id="resume-preview-paper"
      className="mx-auto w-full max-w-[520px] rounded-lg border bg-white p-8 text-gray-900 shadow-2xl"
    >
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold">
          {fullName || "Juan Dela Cruz"}
        </h1>

        <p className="mt-2 text-xs leading-5 text-gray-600">
          {contactItems.length > 0
            ? contactItems.join(" · ")
            : "juan@email.com · +63 912 345 6789 · Cebu City, Philippines"}
        </p>
      </header>

      <section className="mt-6">
        <h2 className="border-b pb-1 text-xs font-bold uppercase tracking-wide text-gray-700">
          Work Experience
        </h2>

        {experiences.length > 0 ? (
          experiences.map((job, index) => {
            const dateLine = formatExperienceDate(job);

            return (
              <div
                key={job.id || `${job.company}-${job.position}-${index}`}
                className="mt-4"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-bold">
                      {job.position || "Job Title"}
                    </p>

                    <p className="text-sm text-gray-600">
                      {job.company || "Company Name"}
                    </p>
                  </div>

                  {dateLine && (
                    <p className="shrink-0 text-right text-xs text-gray-500">
                      {dateLine}
                    </p>
                  )}
                </div>

                {job.description && (
                  <p className="mt-2 whitespace-pre-line text-xs leading-5 text-gray-700">
                    {job.description}
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <p className="mt-3 text-xs text-gray-500">
            Your work experience will appear here.
          </p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="border-b pb-1 text-xs font-bold uppercase tracking-wide text-gray-700">
          Education
        </h2>

        {education.length > 0 ? (
          education.map((item, index) => {
            const dateLine = formatEducationDate(item);

            return (
              <div
                key={item.id || `${item.school}-${item.degree}-${index}`}
                className="mt-3"
              >
                <p className="font-bold">
                  {item.degree || "Degree / Course"}
                </p>

                <p className="text-sm text-gray-600">
                  {item.school || "School / University"}
                </p>

                {dateLine && (
                  <p className="text-xs text-gray-500">
                    {dateLine}
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <p className="mt-3 text-xs text-gray-500">
            Your education details will appear here.
          </p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="border-b pb-1 text-xs font-bold uppercase tracking-wide text-gray-700">
          Skills
        </h2>

        {resumeData.skills.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-xs text-gray-500">
            Your skills will appear here.
          </p>
        )}
      </section>
    </div>
  );
}