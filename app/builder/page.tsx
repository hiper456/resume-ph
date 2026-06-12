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
      setCurrentStep(currentStep + 1);
    }
  }

  function goBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 print:min-h-0 print:bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 print:hidden">
        <h1 className="text-4xl font-bold">Build Your Resume</h1>

        <p className="mt-2 text-gray-600">
          Complete the steps below to generate your professional resume.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl bg-white p-10 shadow-lg">
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold">{step.title}</h2>

              <p className="mt-2 text-gray-500">{step.description}</p>

              <div className="mt-8">
                {currentStep === 1 && <PersonalInfo />}
                {currentStep === 2 && <ProfessionalSummary />}
                {currentStep === 3 && <WorkExperience />}
                {currentStep === 4 && <Education />}
                {currentStep === 5 && <Skills />}
                {currentStep === 6 && <Review />}
              </div>

              

              <div className="mt-10 flex justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={currentStep === 1}
                  className="rounded-lg border px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Back
                </button>

                {!isLastStep && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-lg bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>

          <ResumePreview />
          <CoverLetterGenerator />
        </div>
      </div>

      <PrintResume />
    </main>
  );
}