"use client";

import {
  sortEducationNewestFirst,
  sortExperienceNewestFirst,
} from "@/utils/sortResumeEntries";
import { ResumeData } from "@/types/resume";

type Props = {
  resumeData: ResumeData;
};

export default function ResumeModern({ resumeData }: Props) {
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
    className="mx-auto w-full max-w-[540px] overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-900 shadow-2xl print:m-0 print:h-[297mm] print:w-[210mm] print:max-w-none print:rounded-none print:border-0 print:shadow-none"
  >
    <div className="grid min-h-[760px] grid-cols-[34%_66%] print:min-h-[297mm]">
        <aside className="bg-slate-900 p-6 text-white print:bg-slate-900">
          <div className="mb-8">
            <div className="mb-4 h-16 w-16 rounded-full bg-white/10" />

            <h1 className="text-xl font-extrabold uppercase leading-tight tracking-tight">
              {fullName || "Juan Dela Cruz"}
            </h1>

            <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-slate-300">
              Professional Resume
            </p>
          </div>

          <SideSection title="Contact">
            {contactItems.length > 0 ? (
              <div className="space-y-2">
                {contactItems.map((item) => (
                  <p
                    key={item}
                    className="break-words text-[10px] leading-4 text-slate-200"
                  >
                    {item}
                  </p>
                ))}
              </div>
            ) : (
              <SideEmptyText>
                juan@email.com
                <br />
                +63 912 345 6789
                <br />
                Cebu City, Philippines
              </SideEmptyText>
            )}
          </SideSection>

          <SideSection title="Skills">
            {resumeData.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-slate-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <SideEmptyText>Your skills will appear here.</SideEmptyText>
            )}
          </SideSection>
        </aside>

        <main className="p-8">
          <ResumeSection title="Professional Summary">
            {resumeData.summary ? (
              <p className="text-xs leading-5 text-slate-700">
                {resumeData.summary}
              </p>
            ) : (
              <EmptyText>Your professional summary will appear here.</EmptyText>
            )}
          </ResumeSection>

          <ResumeSection title="Experience">
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
                          <h3 className="text-sm font-bold text-slate-950">
                            {job.position || "Job Title"}
                          </h3>

                          <p className="text-xs font-semibold text-blue-700">
                            {job.company || "Company Name"}
                          </p>
                        </div>

                        {dateLine && (
                          <p className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                            {dateLine}
                          </p>
                        )}
                      </div>

                      {job.description && (
                        <p className="mt-2 whitespace-pre-line text-xs leading-5 text-slate-700">
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
                          <h3 className="text-sm font-bold text-slate-950">
                            {item.degree || "Degree / Course"}
                          </h3>

                          <p className="text-xs font-semibold text-blue-700">
                            {item.school || "School / University"}
                          </p>
                        </div>

                        {dateLine && (
                          <p className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-slate-500">
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
        </main>
      </div>
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
    <section className="mb-7">
      <h2 className="mb-3 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-800">
        <span className="h-2 w-2 rounded-full bg-blue-700" />
        {title}
      </h2>

      {children}
    </section>
  );
}

function SideSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="mb-3 border-b border-white/20 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-300">
        {title}
      </h2>

      {children}
    </section>
  );
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return <p className="text-xs italic leading-5 text-slate-400">{children}</p>;
}

function SideEmptyText({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] italic leading-4 text-slate-400">{children}</p>;
}