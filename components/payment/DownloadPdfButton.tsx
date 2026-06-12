"use client";

import { useState } from "react";
import { ResumeData } from "@/types/resume";

type DownloadPdfButtonProps = {
  resumeData: ResumeData;
  resumeId: string;
};

export default function DownloadPdfButton({
  resumeData,
  resumeId,
}: DownloadPdfButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDownload() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/download/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId,
          templateId: resumeData.templateId ?? "basic",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "This download is not allowed.");
        return;
      }

      window.print();
    } catch {
      setError("Something went wrong while preparing your download.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Checking access..." : "Download PDF"}
      </button>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}