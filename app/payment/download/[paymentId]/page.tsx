import Link from "next/link";
import ResumeTemplate from "@/components/resume/ResumeTemplate";
import { getPaidResume } from "@/lib/payments/getPaidResume";
import { getPaymentAccess } from "@/lib/payments/getPaymentAccess";
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

  const paymentAccess = await getPaymentAccess(paymentId);

  if (!paymentAccess || paymentAccess.status !== "paid") {
    return (
      <PaymentStatusCard
        icon="⏳"
        title="Payment Pending"
        message="Your payment is still being verified. Once approved, your access will be unlocked."
        buttonLabel="Return Home"
        buttonHref="/"
      />
    );
  }

  const paidResume = await getPaidResume(paymentId);

  if (!paidResume) {
    return (
      <PaymentStatusCard
        icon="✅"
        title="Payment Verified"
        message={`Your ${paymentAccess.planCode} plan has been approved. Your secure builder access link will be available soon.`}
        buttonLabel="Return Home"
        buttonHref="/"
      />
    );
  }

  const { resumeData, paymentId: verifiedPaymentId } = paidResume;

  const fullName =
    `${resumeData.personal.firstName} ${resumeData.personal.lastName}`.trim();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_minmax(0,1fr)] print:block">
        <aside className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100 lg:sticky lg:top-6 lg:self-start print:hidden">
          <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700 ring-1 ring-green-200">
            ✅ Payment Verified
          </div>

          <h1 className="mt-4 text-3xl font-black leading-tight text-gray-950">
            Your resume is ready
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Preview your resume on the right and download the PDF when ready.
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <InfoItem label="Resume For" value={fullName || "Customer"} />
            <InfoItem
              label="Email"
              value={resumeData.personal.email || "No email"}
            />
            <InfoItem
              label="Template"
              value={getTemplateLabel(resumeData.templateId)}
            />
            <InfoItem label="Payment ID" value={verifiedPaymentId} />
          </div>

          <div className="mt-6">
            <DownloadPdfButton
              resumeData={resumeData}
              resumeId={paidResume.resumeId}
            />
          </div>

          <p className="mt-4 text-xs leading-5 text-gray-500">
            Tip: choose “Save as PDF” if your browser opens the print dialog.
          </p>
        </aside>

        <section className="flex justify-center overflow-x-auto rounded-3xl bg-white p-4 shadow-xl ring-1 ring-gray-100 sm:p-6 lg:p-8 print:block print:overflow-visible print:rounded-none print:p-0 print:shadow-none print:ring-0">
          <ResumeTemplate resumeData={resumeData} />
        </section>
      </div>
    </main>
  );
}

function PaymentStatusCard({
  icon,
  title,
  message,
  buttonLabel,
  buttonHref,
}: {
  icon: string;
  title: string;
  message: string;
  buttonLabel: string;
  buttonHref: string;
}) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
          {icon}
        </div>

        <h1 className="mt-5 text-3xl font-bold text-gray-900">{title}</h1>

        <p className="mt-3 text-gray-600">{message}</p>

        <Link
          href={buttonHref}
          className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          {buttonLabel}
        </Link>
      </div>
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 break-all font-bold text-gray-900">{value}</p>
    </div>
  );
}

function getTemplateLabel(templateId?: string) {
  if (templateId === "modern") return "Modern";
  if (templateId === "executive") return "Executive";
  return "Classic";
}