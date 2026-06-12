"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";

export default function DownloadPdfButton() {
  const { resumeData } = useResume();
  const [error, setError] = useState("");

  function handleDownload() {
    setError("");

    if (resumeData.status !== "paid") {
      setError("Please complete payment before downloading your PDF.");
      window.location.href = `/payment/manual?resumeId=${resumeData.id}`;
      return;
    }

    window.print();
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDownload}
        className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 active:scale-95"
      >
        Download PDF
      </button>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}