import Link from "next/link";
import ResumeTemplate from "@/components/resume/ResumeTemplate";
import { getPaidResume } from "@/lib/payments/getPaidResume";
import DownloadPdfButton from "@/components/payment/DownloadPdfButton";

type DownloadPageProps = {
  params: Promise<{
    paymentId: string;
  }>;
};

export default async function PaymentDownloadPage({
  params,
}: DownloadPageProps) {
  const { paymentId } = await params;

  const paidResume = await getPaidResume(paymentId);

  if (!paidResume) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
            ⏳
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Payment Pending
          </h1>

          <p className="mt-3 text-gray-600">
            Your payment is still being verified. Once approved, your resume PDF
            download will be unlocked.
          </p>

          <Link
            href="/builder"
            className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Return to Builder
          </Link>
        </div>
      </main>
    );
  }

  const { resumeData, paymentId: verifiedPaymentId } = paidResume;

  const fullName =
    `${resumeData.personal.firstName} ${resumeData.personal.lastName}`.trim();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100 sm:p-8 print:hidden">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700 ring-1 ring-green-200">
                ✅ Payment Verified
              </div>

              <h1 className="mt-4 text-3xl font-black text-gray-950 sm:text-4xl">
                Your resume is ready
              </h1>

              <p className="mt-2 text-gray-600">
                You can preview your resume below and download it as a PDF.
              </p>

              <div className="mt-5 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                <InfoItem label="Resume For" value={fullName || "Customer"} />
                <InfoItem
                  label="Email"
                  value={resumeData.personal.email || "No email"}
                />
                <InfoItem label="Template" value="Classic" />
                <InfoItem label="Payment ID" value={verifiedPaymentId} />
              </div>
            </div>

           <DownloadPdfButton />
          </div>
        </div>

        <div className="mt-8 flex justify-center print:block">
          <ResumeTemplate resumeData={resumeData} />
        </div>
      </div>
    </main>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 break-all font-bold text-gray-900">{value}</p>
    </div>
  );
}