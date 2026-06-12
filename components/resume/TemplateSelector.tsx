"use client";

import { Lock } from "lucide-react";
import {
  RESUME_TEMPLATES,
  ResumeTemplateId,
} from "@/lib/templates/templates";
import { useResume } from "@/context/ResumeContext";

export default function TemplateSelector() {
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
          Choose Template
        </h2>
        <p className="text-sm text-slate-500">
          Select a resume design. Premium templates require Professional access.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {RESUME_TEMPLATES.map((template) => {
          const isSelected =
            (resumeData.templateId ?? "basic") === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => handleSelectTemplate(template.id)}
              className={`relative rounded-xl border p-4 text-left transition hover:border-blue-500 hover:shadow-md ${
                isSelected
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              {template.isPremium && (
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                  <Lock className="h-3 w-3" />
                  Premium
                </div>
              )}

              <div className="mb-3 h-28 rounded-lg border bg-slate-50" />

              <h3 className="font-semibold text-slate-900">
                {template.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {template.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}