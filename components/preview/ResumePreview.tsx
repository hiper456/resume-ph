"use client";

import { useResume } from "@/context/ResumeContext";

export default function ResumePreview() {
  const { resumeData } = useResume();

  const fullName =
    `${resumeData.personal.firstName} ${resumeData.personal.lastName}`.trim();

  const experience = resumeData.experience[0];
  const education = resumeData.education[0];

  const completionItems = [
  resumeData.personal.firstName,
  resumeData.personal.lastName,
  resumeData.personal.email,
  resumeData.personal.phone,
  experience?.company,
  experience?.position,
  experience?.description,
  education?.school,
  education?.degree,
  education?.year,
];

  const completedItems = completionItems.filter(Boolean).length;
  const completionScore = Math.round(
    (completedItems / completionItems.length) * 100
  );

  return (
    <aside className="sticky top-8 self-start">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Live Preview
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Your Resume
            </h2>
          </div>

          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            {completionScore}%
          </div>
        </div>

        <div className="mb-5">
          <div className="mb-2 flex justify-between text-xs font-medium text-gray-500">
            <span>Resume completion</span>
            <span>{completionScore}%</span>
          </div>

          <div className="h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-700 transition-all duration-500"
              style={{ width: `${completionScore}%` }}
            />
          </div>
        </div>

        <div className="max-h-[78vh] overflow-y-auto rounded-xl bg-slate-100 p-4">
          <div className="mx-auto aspect-[210/297] w-full max-w-[520px] rounded-lg border border-gray-300 bg-white p-8 shadow-2xl">
            <div className="border-b border-gray-300 pb-4">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                {fullName || "Juan Dela Cruz"}
              </h1>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                {resumeData.personal.email || "juan@email.com"} ·{" "}
                {resumeData.personal.phone || "+63 912 345 6789"} ·{" "}
                {resumeData.personal.address || "Cebu City, Philippines"}
              </p>
            </div>

            <section className="mt-6">
              <h3 className="border-b border-gray-300 pb-1 text-xs font-bold uppercase tracking-wide text-gray-700">
                Work Experience
              </h3>

              {experience?.company ||
              experience?.position ||
              experience?.description ? (
                <div className="mt-3">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {experience.position || "Job Title"}
                      </p>

                      <p className="text-xs text-gray-600">
                        {experience.company || "Company Name"}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500">
                      {experience.startDate || "Start"} -{" "}
                      {experience.endDate || "Present"}
                    </p>
                  </div>

                  <p className="mt-3 whitespace-pre-line text-xs leading-5 text-gray-700">
                    {experience.description ||
                      "Describe your responsibilities, achievements, and measurable results."}
                  </p>
                </div>
              ) : (
                <MissingSection text="Add your work experience" />
              )}
            </section>

            <section className="mt-6">
              <h3 className="border-b border-gray-300 pb-1 text-xs font-bold uppercase tracking-wide text-gray-700">
                Education
              </h3>

              {education?.school || education?.degree || education?.year ? (
                <div className="mt-3">
                  <p className="text-sm font-bold text-gray-900">
                    {education.degree || "Degree / Course"}
                  </p>

                  <p className="text-xs text-gray-600">
                    {education.school || "School / University"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {education.year || "Graduation Year"}
                  </p>
                </div>
              ) : (
                <MissingSection text="Add your education details" />
              )}
            </section>

            <section className="mt-6">
              <h3 className="border-b border-gray-300 pb-1 text-xs font-bold uppercase tracking-wide text-gray-700">
                Skills
              </h3>

              <MissingSection text="Add your skills" />
            </section>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MissingSection({ text }: { text: string }) {
  return (
    <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
      ⚠ {text}
    </p>
  );
}