import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function downloadResumePdf() {
  const element = document.getElementById("resume-preview-paper");

  if (!element) {
    alert("Resume preview not found.");
    return;
  }

  const affectedElements = Array.from(
    element.querySelectorAll<HTMLElement>("*")
  );

  const originalStyles = affectedElements.map((el) => ({
    el,
    color: el.style.color,
    backgroundColor: el.style.backgroundColor,
    borderColor: el.style.borderColor,
    boxShadow: el.style.boxShadow,
  }));

  // Force html2canvas-safe colors.
  affectedElements.forEach((el) => {
    el.style.color = "#111827";
    el.style.borderColor = "#d1d5db";

    if (el.tagName === "SPAN") {
      el.style.backgroundColor = "#eff6ff";
      el.style.color = "#1d4ed8";
    } else {
      el.style.backgroundColor = "transparent";
    }

    el.style.boxShadow = "none";
  });

  const originalElementStyle = {
    backgroundColor: element.style.backgroundColor,
    color: element.style.color,
    borderColor: element.style.borderColor,
    boxShadow: element.style.boxShadow,
  };

  element.style.backgroundColor = "#ffffff";
  element.style.color = "#111827";
  element.style.borderColor = "#e5e7eb";
  element.style.boxShadow = "none";

  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save("resume-ph-resume.pdf");
  } finally {
    // Restore preview styles after export.
    originalStyles.forEach(
      ({ el, color, backgroundColor, borderColor, boxShadow }) => {
        el.style.color = color;
        el.style.backgroundColor = backgroundColor;
        el.style.borderColor = borderColor;
        el.style.boxShadow = boxShadow;
      }
    );

    element.style.backgroundColor = originalElementStyle.backgroundColor;
    element.style.color = originalElementStyle.color;
    element.style.borderColor = originalElementStyle.borderColor;
    element.style.boxShadow = originalElementStyle.boxShadow;
  }
}