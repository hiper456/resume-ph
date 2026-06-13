"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProgressBar from "@/components/wizard/ProgressBar";
import PersonalInfo from "@/components/wizard/PersonalInfo";
import WorkExperience from "@/components/wizard/WorkExperience";
import ResumePreview from "@/components/preview/ResumePreview";
import Education from "@/components/ai/Education";
import Skills from "@/components/wizard/Skills";
import Review from "@/components/wizard/Review";
import PrintResume from "@/components/resume/PrintResume";
import ProfessionalSummary from "@/components/ai/ProfessionalSummary";
import TemplateSelector from "@/components/resume/TemplateSelector";
import ResumeScore from "@/components/preview/ResumeScore";
import CoverLetterGenerator from "@/components/ai/CoverLetterGenerator";

const steps = [
  {
    title: "Personal Information",
    description: "Tell us about yourself.",
  },
  {
    title: "Professional Summary",
    description:
      "Write a brief summary of your professional background and goals.",
  },
  {
    title: "Work Experience",
    description: "Add your previous jobs and responsibilities.",
  },
  {
    title: "Education",
    description: "Add your educational background.",
  },
  {
    title: "Skills",
    description: "List your strongest professional skills.",
  },
  {
    title: "Review",
    description: "Review your resume details before unlocking your PDF.",
  },
];

const PLAN_LABELS = {
  basic: "Basic",
  professional: "Professional",
  executive: "Executive",
} as const;

type PlanCode = keyof typeof PLAN_LABELS;

function getValidPlan(plan: string | null): PlanCode {
  if (plan === "professional" || plan === "executive") return plan;
  return "basic";
}

function LockedFeaturePrompt({
  title,
  description,
  buttonText,
  plan,
}: {
  title: string;
  description: string;
  buttonText: string;
  plan: PlanCode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
        Locked Feature
      </p>

      <h3 className="mt-2 text-lg font-bold text-slate-950">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

      <a
        href={`/payment/manual?plan=${plan}`}
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
      >
        {buttonText} →
      </a>
    </div>
  );
}

export default function BuilderPage() {
  const searchParams = useSearchParams();
  const selectedPlan = getValidPlan(searchParams.get("plan"));

  const [currentStep, setCurrentStep] = useState(1);

  const step = steps[currentStep - 1];
  const isLastStep = currentStep === steps.length;

  const isBasicPlan = selectedPlan === "basic";
  const isProfessionalPlan = selectedPlan === "professional";
  const isExecutivePlan = selectedPlan === "executive";

  function goNext() {
    if (currentStep < steps.length) {
      setCurrentStep((step) => step + 1);
    }
  }

  function goBack() {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 print:min-h-0 print:bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12 print:hidden">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
            Resume PH Builder
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Build Your Resume
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            You are currently viewing the{" "}
            <span className="font-bold text-blue-700">
              {PLAN_LABELS[selectedPlan]}
            </span>{" "}
            builder experience.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_520px]">
          <section className="rounded-2xl bg-white p-5 shadow-lg sm:p-8 lg:p-10">
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

            <div className="mx-auto max-w-3xl">
              <div className="mt-8">
                <p className="text-sm font-medium text-blue-700">
                  Step {currentStep} of {steps.length}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
                  {step.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>

              <div className="mt-8">
                {currentStep === 1 && <PersonalInfo />}
                {currentStep === 2 && <ProfessionalSummary canUseAi={false} />}
                {currentStep === 3 && <WorkExperience canUseAi={false} />}
                {currentStep === 4 && <Education />}
                {currentStep === 5 && <Skills />}
                {currentStep === 6 && <Review planCode={selectedPlan} />}
              </div>

              <div className="mt-10 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={currentStep === 1}
                  className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-8"
                >
                  ← Back
                </button>

                {!isLastStep && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 sm:px-8"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <ResumePreview />
            <ResumeScore />

            {isBasicPlan && (
              <>
                <LockedFeaturePrompt
                  title="Unlock AI resume improvements"
                  description="Upgrade to Professional to improve your summary and work experience using AI."
                  buttonText="Upgrade to Professional"
                  plan="professional"
                />

                <LockedFeaturePrompt
                  title="Unlock cover letter and ATS tools"
                  description="Upgrade to Executive to generate a cover letter and access advanced resume optimization tools."
                  buttonText="Upgrade to Executive"
                  plan="executive"
                />
              </>
            )}

            {isProfessionalPlan && (
              <>
                <TemplateSelector />

                <LockedFeaturePrompt
                  title="Unlock Executive tools"
                  description="Generate cover letters, ATS improvements, and future employer matching features."
                  buttonText="Upgrade to Executive"
                  plan="executive"
                />
              </>
            )}

            {isExecutivePlan && (
              <>
                <TemplateSelector />
                <CoverLetterGenerator />
              </>
            )}
          </aside>
        </div>
      </div>

      <PrintResume />
    </main>
  );
}