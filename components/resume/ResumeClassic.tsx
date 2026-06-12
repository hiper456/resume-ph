"use client";

import {
  sortEducationNewestFirst,
  sortExperienceNewestFirst,
} from "@/utils/sortResumeEntries";

import { ResumeData } from "@/types/resume";

type ResumeTemplateProps = {
  resumeData: ResumeData;
};

export default function ResumeTemplate({
  resumeData,
}: ResumeTemplateProps) {

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
    if (item.startYear && item.endYear) return `${item.startYear} - ${item.endYear}`;
    if (item.endYear) return item.endYear;
    if (item.startYear) return `${item.startYear} - Present`;

    return "";
  }

  return (
    <div
      id="resume-preview-paper"
      className="mx-auto w-full max-w-[540px] rounded-lg border border-gray-200 bg-white p-10 text-gray-900 shadow-2xl print:m-0 print:w-full print:max-w-none print:rounded-none print:border-0 print:px-10 print:py-8 print:shadow-none"
    >
      <header className="text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-gray-950">
          {fullName || "Juan Dela Cruz"}
        </h1>

        <p className="mt-3 text-xs leading-5 text-gray-600">
          {contactItems.length > 0
            ? contactItems.join(" · ")
            : "juan@email.com · +63 912 345 6789 · Cebu City, Philippines"}
        </p>
      </header>

      <Divider />

      <ResumeSection title="Professional Summary">
        {resumeData.summary ? (
          <p className="text-xs leading-5 text-gray-700">
            {resumeData.summary}
          </p>
        ) : (
          <EmptyText>Your professional summary will appear here.</EmptyText>
        )}
      </ResumeSection>

      <ResumeSection title="Professional Experience">
        {experiences.length > 0 ? (
          <div className="space-y-5">
            {experiences.map((job, index) => {
              const dateLine = formatExperienceDate(job);

              return (
                <article
                  key={job.id || `${job.company}-${job.position}-${index}`}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-950">
                        {job.position || "Job Title"}
                      </h3>

                      <p className="text-xs font-medium text-gray-600">
                        {job.company || "Company Name"}
                      </p>
                    </div>

                    {dateLine && (
                      <p className="shrink-0 text-xs font-medium text-gray-500">
                        {dateLine}
                      </p>
                    )}
                  </div>

                  {job.description && (
                    <p className="mt-2 whitespace-pre-line text-xs leading-5 text-gray-700">
                      {job.description}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyText>Your work experience will appear here.</EmptyText>
        )}
      </ResumeSection>

      <ResumeSection title="Education">
        {education.length > 0 ? (
          <div className="space-y-4">
            {education.map((item, index) => {
              const dateLine = formatEducationDate(item);

              return (
                <article
                  key={item.id || `${item.school}-${item.degree}-${index}`}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-950">
                        {item.degree || "Degree / Course"}
                      </h3>

                      <p className="text-xs font-medium text-gray-600">
                        {item.school || "School / University"}
                      </p>
                    </div>

                    {dateLine && (
                      <p className="shrink-0 text-xs font-medium text-gray-500">
                        {dateLine}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyText>Your education details will appear here.</EmptyText>
        )}
      </ResumeSection>

      <ResumeSection title="Core Skills">
        {resumeData.skills.length > 0 ? (
          <p className="text-xs leading-6 text-gray-700">
            {resumeData.skills.join(" • ")}
          </p>
        ) : (
          <EmptyText>Your skills will appear here.</EmptyText>
        )}
      </ResumeSection>
    </div>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="mb-3 border-b border-gray-300 pb-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-gray-700">
        {title}
      </h2>

      {children}
    </section>
  );
}

function Divider() {
  return <div className="mt-5 border-t-2 border-gray-900" />;
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs italic leading-5 text-gray-400">
      {children}
    </p>
  );
}