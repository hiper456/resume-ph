"use client";

import { useState } from "react";
import ProgressBar from "@/components/wizard/ProgressBar";
import PersonalInfo from "@/components/wizard/PersonalInfo";
import WorkExperience from "@/components/wizard/WorkExperience";
import ResumePreview from "@/components/preview/ResumePreview";
import Education from "@/components/ai/Education";
import Skills from "@/components/wizard/Skills";
import Review from "@/components/wizard/Review";
import PrintResume from "@/components/resume/PrintResume";
import ProfessionalSummary from "@/components/ai/ProfessionalSummary";
import CoverLetterGenerator from "@/components/ai/CoverLetterGenerator";
import TemplateSelector from "@/components/resume/TemplateSelector";
import ResumeScore from "@/components/preview/ResumeScore";

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

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const step = steps[currentStep - 1];
  const isLastStep = currentStep === steps.length;

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
            Complete the steps below, choose a template, and preview your
            professional resume in real time.
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
                {currentStep === 2 && <ProfessionalSummary />}
                {currentStep === 3 && <WorkExperience />}
                {currentStep === 4 && <Education />}
                {currentStep === 5 && <Skills />}
                {currentStep === 6 && <Review />}
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

                {!isLastStep ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 sm:px-8"
                  >
                    Next →
                  </button>
                ) : (
                  <a
                    href="/payment/manual"
                    className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 sm:px-8"
                  >
                    Unlock PDF →
                  </a>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <TemplateSelector />

            <ResumePreview />

            <ResumeScore />

            <CoverLetterGenerator />
          </aside>
        </div>
      </div>

      <PrintResume />
    </main>
  );
}