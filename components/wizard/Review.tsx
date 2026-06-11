"use client";
import ProfessionalSummary from "@/components/wizard/ProfessionalSummary";
import { useResume } from "@/context/ResumeContext";

export default function Review() {
  const { resumeData } = useResume();

  const fullName =
    `${resumeData.personal.firstName} ${resumeData.personal.lastName}`.trim();

  const experience = resumeData.experience[0];
  const education = resumeData.education[0];

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-xl border bg-blue-50 p-5 text-blue-900">
        <h3 className="text-lg font-bold">Almost done!</h3>
        <p className="mt-1 text-sm">
          Review your details before generating your downloadable resume.
        </p>
      </div>

      <ProfessionalSummary />

      <ReviewCard title="Personal Information">
        <p>{fullName || "No name added"}</p>
        <p>{resumeData.personal.email || "No email added"}</p>
        <p>{resumeData.personal.phone || "No phone added"}</p>
        <p>{resumeData.personal.address || "No address added"}</p>
      </ReviewCard>

      <ReviewCard title="Work Experience">
        <p>{experience?.position || "No job title added"}</p>
        <p>{experience?.company || "No company added"}</p>
        <p>{experience?.startDate || "No start date"} - {experience?.endDate || "No end date"}</p>
      </ReviewCard>

      <ReviewCard title="Education">
        <p>{education?.degree || "No degree added"}</p>
        <p>{education?.school || "No school added"}</p>
        <p>{education?.year || "No year added"}</p>
      </ReviewCard>

      <ReviewCard title="Skills">
        {resumeData.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p>No skills added</p>
        )}
      </ReviewCard>

      

      <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-green-800">
        <h3 className="font-bold">Next step</h3>
        <p className="mt-1 text-sm">
          We’ll generate your professional PDF resume and prepare it for download.
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
      <div className="mt-2 space-y-1 text-sm text-gray-700">{children}</div>
    </div>
  );
}