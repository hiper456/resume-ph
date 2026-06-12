"use client";

import { ResumeData } from "@/types/resume";
import ResumeClassic from "./ResumeClassic";
import ResumeModern from "./ResumeModern";
import ResumeExecutive from "./ResumeExecutive";

type ResumeTemplateProps = {
  resumeData: ResumeData;
};

export default function ResumeTemplate({
  resumeData,
}: ResumeTemplateProps) {
  switch (resumeData.templateId ?? "basic") {
    case "modern":
      return <ResumeModern resumeData={resumeData} />;

    case "executive":
      return <ResumeExecutive resumeData={resumeData} />;

    case "basic":
    default:
      return <ResumeClassic resumeData={resumeData} />;
  }
}