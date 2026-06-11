"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";

export default function Review() {
  const { resumeData } = useResume();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const fullName =
    `${resumeData.personal.firstName} ${resumeData.personal.lastName}`.trim();

  async function handleUnlockDownload() {
    try {
      setIsCheckingOut(true);
      setCheckoutError("");

      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeData,
        }),
      });

      const contentType = response.headers.get("content-type");

if (!contentType?.includes("application/json")) {
  const text = await response.text();
  console.error("Non-JSON response:", text);

  throw new Error(
    "Checkout API is not returning JSON. Check if /api/payments/create-checkout exists."
  );
}

const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create checkout session.");
      }

      if (!data.checkoutUrl) {
        throw new Error("Checkout URL was not returned.");
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-blue-900">
        <h3 className="text-lg font-bold">🎉 Your resume is ready!</h3>

        <p className="mt-1 text-sm">
          Review your information before unlocking your professional PDF.
        </p>
      </div>

      <ReviewCard title="Personal Information">
        <p>{fullName || "No name added"}</p>
        <p>{resumeData.personal.email || "No email added"}</p>
        <p>{resumeData.personal.phone || "No phone added"}</p>
        <p>{resumeData.personal.address || "No address added"}</p>
      </ReviewCard>

      <ReviewCard title="Professional Summary">
        <p>{resumeData.summary || "No professional summary added."}</p>
      </ReviewCard>

      <ReviewCard title="Work Experience">
        {resumeData.experience.length > 0 ? (
          <div className="space-y-4">
            {resumeData.experience.map((job) => (
              <div key={job.id}>
                <p className="font-semibold">{job.position || "Job Title"}</p>
                <p className="text-gray-600">{job.company || "Company"}</p>
                <p className="text-sm text-gray-500">
                  {job.startMonth} {job.startYear} -{" "}
                  {job.isCurrent
                    ? "Present"
                    : `${job.endMonth} ${job.endYear}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No work experience added.</p>
        )}
      </ReviewCard>

      <ReviewCard title="Education">
        {resumeData.education.length > 0 ? (
          <div className="space-y-4">
            {resumeData.education.map((item) => (
              <div key={item.id}>
                <p className="font-semibold">{item.degree || "Degree"}</p>
                <p className="text-gray-600">{item.school || "School"}</p>
                <p className="text-sm text-gray-500">
                  {item.startYear} - {item.endYear}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No education added.</p>
        )}
      </ReviewCard>

      <ReviewCard title="Skills">
        {resumeData.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p>No skills added.</p>
        )}
      </ReviewCard>

      <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-green-900">
        <h3 className="font-bold">Ready to Download</h3>

        <p className="mt-1 text-sm">
          Unlock your professional PDF resume using secure checkout.
        </p>

        {checkoutError && (
          <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {checkoutError}
          </p>
        )}

        <button
          type="button"
          onClick={handleUnlockDownload}
          disabled={isCheckingOut}
          className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isCheckingOut ? "Creating checkout..." : "🔒 Unlock & Download PDF"}
        </button>

        <p className="mt-3 text-xs text-green-700">
          Pay securely via GCash, Maya, or card.
        </p>
      </div>
    </div>
  );
}

function ReviewCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-gray-50 p-5">
      <h3 className="font-bold text-gray-900">{title}</h3>

      <div className="mt-3 space-y-2 text-sm text-gray-700">{children}</div>
    </div>
  );
}