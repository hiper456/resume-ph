"use client";

import { useResume } from "@/context/ResumeContext";
import ResumeTemplate from "@/components/resume/ResumeTemplate";
import { getTemplateById } from "@/lib/templates/templates";

export default function ResumePreview() {
  const { resumeData } = useResume();

  const selectedTemplate = getTemplateById(resumeData.templateId ?? "basic");
  const isPremiumTemplate = selectedTemplate?.isPremium ?? false;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="relative overflow-hidden rounded-xl">
        <ResumeTemplate resumeData={resumeData} />

        {isPremiumTemplate && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

            <div className="pointer-events-none absolute inset-0 flex rotate-[-24deg] items-center justify-center">
              <p className="select-none text-4xl font-black uppercase tracking-[0.35em] text-slate-900/10">
                Premium
              </p>
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-2xl border bg-white/90 p-5 text-center shadow-xl backdrop-blur">
              <p className="text-2xl">🔒</p>

              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                Premium Template
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                You are previewing the{" "}
                <span className="font-semibold text-slate-700">
                  {selectedTemplate?.name}
                </span>{" "}
                template. Upgrade to Professional to unlock download access.
              </p>

              <button
                type="button"
                className="mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Upgrade to Professional
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}