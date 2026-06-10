"use client";

import { useState } from "react";
import ProgressBar from "@/components/wizard/ProgressBar";
import PersonalInfo from "@/components/wizard/PersonalInfo";

const steps = [
  {
    title: "Personal Information",
    description: "Tell us about yourself.",
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
    description: "Review your resume details before previewing.",
  },
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const step = steps[currentStep - 1];

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
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold">Build Your Resume</h1>

        <p className="mt-2 text-gray-600">
          Complete the steps below to generate your professional resume.
        </p>

        <div className="mt-10 rounded-2xl bg-white p-10 shadow-lg">
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold">{step.title}</h2>

            <p className="mt-2 text-gray-500">{step.description}</p>

            <div className="mt-8">
              {currentStep === 1 && <PersonalInfo />}
              {currentStep === 2 && <Placeholder text="Work Experience form coming next." />}
              {currentStep === 3 && <Placeholder text="Education form coming next." />}
              {currentStep === 4 && <Placeholder text="Skills form coming next." />}
              {currentStep === 5 && <Placeholder text="Review screen coming next." />}
            </div>

            <div className="mt-10 flex justify-between">
              <button
                onClick={goBack}
                disabled={currentStep === 1}
                className="rounded-lg border px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Back
              </button>

              <button
                onClick={goNext}
                disabled={currentStep === steps.length}
                className="rounded-lg bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {currentStep === steps.length ? "Finish" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
      {text}
    </div>
  );
}