"use client";

export default function DownloadPdfButton() {
  function handleDownload() {
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 active:scale-95"
    >
      Download PDF
    </button>
  );
}