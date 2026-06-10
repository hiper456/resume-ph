import jsPDF from "jspdf";
import { ResumeData } from "@/types/resume";

export function downloadResumePdf(resumeData: ResumeData) {
  const pdf = new jsPDF("p", "mm", "a4");

  const fullName =
    `${resumeData.personal.firstName} ${resumeData.personal.lastName}`.trim() ||
    "Juan Dela Cruz";

  const experience = resumeData.experience[0];
  const education = resumeData.education[0];

  let y = 20;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text(fullName, 20, y);

  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(
    `${resumeData.personal.email || "email@example.com"} | ${
      resumeData.personal.phone || "+63 912 345 6789"
    } | ${resumeData.personal.address || "Philippines"}`,
    20,
    y
  );

  y += 12;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("WORK EXPERIENCE", 20, y);
  y += 6;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(experience?.position || "Job Title", 20, y);
  y += 5;

  pdf.setFont("helvetica", "normal");
  pdf.text(experience?.company || "Company Name", 20, y);
  y += 5;

  pdf.text(
    `${experience?.startDate || "Start"} - ${experience?.endDate || "Present"}`,
    20,
    y
  );
  y += 7;

  const expLines = pdf.splitTextToSize(
    experience?.description ||
      "Describe your responsibilities, achievements, and measurable results.",
    170
  );

  pdf.text(expLines, 20, y);
  y += expLines.length * 5 + 8;

  pdf.setFont("helvetica", "bold");
  pdf.text("EDUCATION", 20, y);
  y += 6;

  pdf.setFont("helvetica", "normal");
  pdf.text(education?.degree || "Degree / Course", 20, y);
  y += 5;
  pdf.text(education?.school || "School / University", 20, y);
  y += 5;
  pdf.text(education?.year || "Year", 20, y);
  y += 10;

  pdf.setFont("helvetica", "bold");
  pdf.text("SKILLS", 20, y);
  y += 6;

  pdf.setFont("helvetica", "normal");
  pdf.text(
    resumeData.skills.length > 0
      ? resumeData.skills.join(", ")
      : "Skills not added",
    20,
    y
  );

  pdf.save("resume-ph-resume.pdf");
}