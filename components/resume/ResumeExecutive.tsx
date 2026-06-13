"use client";

import {
  sortEducationNewestFirst,
  sortExperienceNewestFirst,
} from "@/utils/sortResumeEntries";
import { ResumeData } from "@/types/resume";

type Props = {
  resumeData: ResumeData;
};

export default function ResumeExecutive({ resumeData }: Props) {
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
  className="mx-auto min-h-[760px] w-full max-w-[540px] rounded-lg 
  border border-stone-200 bg-[#fbfaf7] p-10 text-stone-900 shadow-2xl print:m-0 print:h-[297mm] print:min-h-[297mm] print:w-[210mm] 
  print:max-w-none print:rounded-none print:border-0 print:bg-white print:px-10 print:py-8 print:shadow-none"
>
      <header className="border-b border-stone-300 pb-6">
        <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-stone-500">
          Executive Curriculum Vitae
        </p>

        <h1 className="text-center font-serif text-4xl font-semibold uppercase leading-tight tracking-wide text-stone-950">
          {fullName || "Juan Dela Cruz"}
        </h1>

        <div className="mx-auto mt-5 h-px w-24 bg-stone-900" />

        <p className="mt-5 text-center text-[11px] leading-5 tracking-wide text-stone-600">
          {contactItems.length > 0
            ? contactItems.join("  |  ")
            : "juan@email.com  |  +63 912 345 6789  |  Cebu City, Philippines"}
        </p>
      </header>

      <ExecutiveSection title="Professional Profile">
        {resumeData.summary ? (
          <p className="text-[12px] leading-6 text-stone-700">
            {resumeData.summary}
          </p>
        ) : (
          <EmptyText>Your professional summary will appear here.</EmptyText>
        )}
      </ExecutiveSection>

      <ExecutiveSection title="Leadership Experience">
        {experiences.length > 0 ? (
          <div className="space-y-6">
            {experiences.map((job, index) => {
              const dateLine = formatExperienceDate(job);

              return (
                <article
                  key={job.id || `${job.company}-${job.position}-${index}`}
                  className="border-l border-stone-300 pl-5"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-serif text-[15px] font-semibold text-stone-950">
                        {job.position || "Executive Role"}
                      </h3>

                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                        {job.company || "Company Name"}
                      </p>
                    </div>

                    {dateLine && (
                      <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                        {dateLine}
                      </p>
                    )}
                  </div>

                  {job.description && (
                    <p className="mt-3 whitespace-pre-line text-[12px] leading-6 text-stone-700">
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
      </ExecutiveSection>

      <div className="grid gap-8 sm:grid-cols-[1fr_1fr]">
        <ExecutiveSection title="Education">
          {education.length > 0 ? (
            <div className="space-y-4">
              {education.map((item, index) => {
                const dateLine = formatEducationDate(item);

                return (
                  <article
                    key={item.id || `${item.school}-${item.degree}-${index}`}
                  >
                    <h3 className="font-serif text-[14px] font-semibold text-stone-950">
                      {item.degree || "Degree / Course"}
                    </h3>

                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
                      {item.school || "School / University"}
                    </p>

                    {dateLine && (
                      <p className="mt-1 text-[10px] text-stone-500">
                        {dateLine}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyText>Your education details will appear here.</EmptyText>
          )}
        </ExecutiveSection>

        <ExecutiveSection title="Core Competencies">
          {resumeData.skills.length > 0 ? (
            <ul className="space-y-2">
              {resumeData.skills.map((skill) => (
                <li
                  key={skill}
                  className="text-[12px] leading-5 text-stone-700"
                >
                  <span className="mr-2 text-stone-400">◆</span>
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyText>Your skills will appear here.</EmptyText>
          )}
        </ExecutiveSection>
      </div>
    </div>
  );
}

function ExecutiveSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-stone-500">
        {title}
      </h2>

      {children}
    </section>
  );
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] italic leading-5 text-stone-400">
      {children}
    </p>
  );
}