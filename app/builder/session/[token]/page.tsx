import Link from "next/link";
import { getBuilderSession } from "@/lib/builderSessions/getBuilderSession";

type BuilderSessionPageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function BuilderSessionPage({
  params,
}: BuilderSessionPageProps) {
  const { token } = await params;

  const session = await getBuilderSession(token);

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
            ⚠️
          </div>

          <h1 className="mt-6 text-3xl font-black text-slate-950">
            Invalid or Expired Builder Link
          </h1>

          <p className="mt-3 text-slate-600">
            This builder access link is invalid, expired, or has been revoked.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700 ring-1 ring-green-200">
          ✅ Builder Access Verified
        </div>

        <h1 className="mt-6 text-4xl font-black text-slate-950">
          {formatPlanName(session.planCode)} Builder
        </h1>

        <p className="mt-3 text-slate-600">
          Your paid builder session is active. This secure link is connected to:
        </p>

        <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-5 text-sm">
          <InfoItem label="Email" value={session.email} />
          <InfoItem label="Plan" value={formatPlanName(session.planCode)} />
          <InfoItem label="Payment ID" value={session.paymentId} />
          <InfoItem
            label="Access Expires"
            value={new Date(session.expiresAt).toLocaleString()}
          />
        </div>

        <Link
          href={`/builder?session=${token}`}
          className="mt-8 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Open Builder
        </Link>
      </div>
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-all font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function formatPlanName(planCode: string) {
  if (planCode === "professional") return "Professional";
  if (planCode === "executive") return "Executive";
  if (planCode === "basic") return "Basic";
  return planCode;
}