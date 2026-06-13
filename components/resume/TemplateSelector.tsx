"use client";

import {
  RESUME_TEMPLATES,
  ResumeTemplateId,
} from "@/lib/templates/templates";
import { useResume } from "@/context/ResumeContext";

type TemplateSelectorProps = {
  canUsePremiumTemplates?: boolean;
};

export default function TemplateSelector({
  canUsePremiumTemplates = false,
}: TemplateSelectorProps) {
  const { resumeData, setResumeData } = useResume();

  function handleSelectTemplate(templateId: ResumeTemplateId) {
    setResumeData((previousData) => ({
      ...previousData,
      templateId,
    }));
  }

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Choose Resume Design
        </h2>
        <p className="text-sm text-slate-500">
          Preview your resume in different templates.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {RESUME_TEMPLATES.map((template) => {
          const isSelected = (resumeData.templateId ?? "basic") === template.id;
          const isLocked = template.isPremium && !canUsePremiumTemplates;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => {
                if (isLocked) return;
                handleSelectTemplate(template.id);
              }}
              disabled={isLocked}
              className={`relative overflow-hidden rounded-xl border bg-white text-left transition ${
                isLocked
                  ? "cursor-not-allowed opacity-70"
                  : "hover:border-blue-500 hover:shadow-md"
              } ${
                isSelected
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "border-slate-200"
              }`}
            >
              {isLocked && (
                <div className="absolute right-2 top-2 z-10 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700">
                  🔒 Premium
                </div>
              )}

              <TemplateThumbnail templateId={template.id} />

              <div className="p-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  {template.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {template.description}
                </p>

                {isLocked && (
                  <p className="mt-2 text-xs font-bold text-blue-700">
                    Upgrade to Professional
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function TemplateThumbnail({ templateId }: { templateId: ResumeTemplateId }) {
  if (templateId === "modern") {
    return (
      <div className="grid h-32 grid-cols-[34%_66%] bg-white">
        <div className="bg-slate-900 p-2">
          <div className="mb-2 h-5 w-5 rounded-full bg-white/20" />
          <div className="space-y-1">
            <div className="h-1.5 w-12 bg-white/40" />
            <div className="h-1.5 w-8 bg-white/30" />
          </div>
          <div className="mt-4 space-y-1">
            <div className="h-1 w-10 bg-white/30" />
            <div className="h-1 w-8 bg-white/20" />
            <div className="h-1 w-12 bg-white/20" />
          </div>
        </div>

        <div className="p-3">
          <div className="mb-3 h-2 w-16 bg-blue-700" />
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-slate-200" />
            <div className="h-1.5 w-10/12 bg-slate-200" />
            <div className="h-1.5 w-8/12 bg-slate-200" />
          </div>
          <div className="mt-4 space-y-1.5">
            <div className="h-1.5 w-20 bg-slate-800" />
            <div className="h-1 w-full bg-slate-200" />
            <div className="h-1 w-11/12 bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (templateId === "executive") {
    return (
      <div className="h-32 bg-[#fbfaf7] p-4">
        <div className="mx-auto mb-2 h-1 w-20 bg-stone-300" />
        <div className="mx-auto h-3 w-24 bg-stone-900" />
        <div className="mx-auto mt-2 h-px w-12 bg-stone-700" />

        <div className="mt-5 space-y-1.5">
          <div className="h-1.5 w-24 bg-stone-400" />
          <div className="h-1 w-full bg-stone-200" />
          <div className="h-1 w-11/12 bg-stone-200" />
          <div className="h-1 w-9/12 bg-stone-200" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="h-1.5 w-12 bg-stone-400" />
            <div className="h-1 w-full bg-stone-200" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-12 bg-stone-400" />
            <div className="h-1 w-full bg-stone-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-32 bg-white p-4">
      <div className="mx-auto h-3 w-28 bg-slate-900" />
      <div className="mx-auto mt-2 h-1.5 w-32 bg-slate-300" />
      <div className="mt-4 border-t-2 border-slate-900" />

      <div className="mt-4 space-y-1.5">
        <div className="h-1.5 w-28 bg-slate-700" />
        <div className="h-1 w-full bg-slate-200" />
        <div className="h-1 w-10/12 bg-slate-200" />
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="h-1.5 w-24 bg-slate-700" />
        <div className="h-1 w-full bg-slate-200" />
      </div>
    </div>
  );
}