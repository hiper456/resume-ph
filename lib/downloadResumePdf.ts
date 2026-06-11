import jsPDF from "jspdf";
import { ResumeData } from "@/types/resume";
import {
  sortEducationNewestFirst,
  sortExperienceNewestFirst,
} from "@/utils/sortResumeEntries";

export function downloadResumePdf(resumeData: ResumeData) {
  const pdf = new jsPDF("p", "mm", "a4");

  const fullName =
    `${resumeData.personal.firstName} ${resumeData.personal.lastName}`.trim() ||
    "Juan Dela Cruz";

  const experiences = sortExperienceNewestFirst(resumeData.experience);
  const educationList = sortEducationNewestFirst(resumeData.education);

  let y = 20;

  const pageWidth = 210;
  const marginX = 20;
  const contentWidth = pageWidth - marginX * 2;

  function checkPageSpace(requiredSpace: number) {
    if (y + requiredSpace > 280) {
      pdf.addPage();
      y = 20;
    }
  }

  function sectionTitle(title: string) {
    checkPageSpace(12);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(title, marginX, y);

    y += 2;

    pdf.setDrawColor(180);
    pdf.line(marginX, y, pageWidth - marginX, y);

    y += 7;
  }

  function normalText(text: string, fontSize = 10) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(fontSize);
    pdf.text(text, marginX, y);
    y += 5;
  }

  function boldText(text: string, fontSize = 11) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(fontSize);
    pdf.text(text, marginX, y);
    y += 5;
  }

  function formatExperienceDate(item: (typeof experiences)[number]) {
    const start = `${item.startMonth || ""} ${item.startYear || ""}`.trim();

    const end = item.isCurrent
      ? "Present"
      : `${item.endMonth || ""} ${item.endYear || ""}`.trim();

    if (!start && !end) return "";
    if (!start) return end;
    if (!end) return start;

    return `${start} - ${end}`;
  }

  function formatEducationDate(item: (typeof educationList)[number]) {
    if (item.startYear && item.endYear) {
      return `${item.startYear} - ${item.endYear}`;
    }

    if (item.endYear) return item.endYear;
    if (item.startYear) return `${item.startYear} - Present`;

    return "";
  }

  // Header
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text(fullName, marginX, y);

  y += 8;

  const contactLine = [
    resumeData.personal.email,
    resumeData.personal.phone,
    resumeData.personal.address,
  ]
    .filter(Boolean)
    .join(" | ");

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(contactLine || "email@example.com | +63 912 345 6789 | Philippines", marginX, y);

  y += 14;

  // Work Experience
  sectionTitle("WORK EXPERIENCE");

  if (experiences.length > 0) {
    experiences.forEach((experience) => {
      checkPageSpace(30);

      boldText(experience.position || "Job Title", 11);
      normalText(experience.company || "Company Name", 10);

      const dateLine = formatExperienceDate(experience);
      if (dateLine) {
        normalText(dateLine, 9);
      }

      if (experience.description) {
        const lines = pdf.splitTextToSize(
          experience.description,
          contentWidth
        );

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text(lines, marginX, y);

        y += lines.length * 5 + 4;
      } else {
        y += 3;
      }
    });
  } else {
    normalText("No work experience added.");
    y += 4;
  }

  // Education
  sectionTitle("EDUCATION");

  if (educationList.length > 0) {
    educationList.forEach((education) => {
      checkPageSpace(20);

      boldText(education.degree || "Degree / Course", 11);
      normalText(education.school || "School / University", 10);

      const dateLine = formatEducationDate(education);
      if (dateLine) {
        normalText(dateLine, 9);
      }

      y += 3;
    });
  } else {
    normalText("No education added.");
    y += 4;
  }

  // Skills
  sectionTitle("SKILLS");

  if (resumeData.skills.length > 0) {
    const skillLines = pdf.splitTextToSize(
      resumeData.skills.join(", "),
      contentWidth
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(skillLines, marginX, y);
  } else {
    normalText("No skills added.");
  }

  pdf.save("resume-ph-resume.pdf");
}