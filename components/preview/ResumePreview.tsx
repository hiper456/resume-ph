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
      {isPremiumTemplate ? (
        <div className="relative">
          <div className="pointer-events-none select-none blur-[2px]">
            <ResumeTemplate resumeData={resumeData} />
          </div>

          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 p-8 text-center backdrop-blur-sm">
            <div className="max-w-sm rounded-2xl border bg-white p-6 shadow-xl">
              <p className="mb-2 text-3xl">🔒</p>

              <h3 className="text-lg font-semibold text-slate-900">
                Premium Template
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Upgrade to Professional to use the{" "}
                <span className="font-semibold text-slate-700">
                  {selectedTemplate?.name}
                </span>{" "}
                template.
              </p>

              <button
                type="button"
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Upgrade to Professional
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ResumeTemplate resumeData={resumeData} />
      )}
    </div>
  );
}