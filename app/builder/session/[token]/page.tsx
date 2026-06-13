import Link from "next/link";
import BuilderShell, { type PlanCode } from "@/components/builder/BuilderShell";
import { getBuilderSession } from "@/lib/builderSessions/getBuilderSession";

type BuilderSessionPageProps = {
  params: Promise<{
    token: string;
  }>;
};

function getValidPlanCode(planCode: string): PlanCode {
  if (planCode === "professional" || planCode === "executive") {
    return planCode;
  }

  return "basic";
}

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
<BuilderShell
  planCode={getValidPlanCode(session.planCode)}
  email={session.email}
  paymentId={session.paymentId}
  sessionId={session.id}
  sessionToken={token}
  aiCreditsRemaining={5}
  isPaidSession
  permissions={{
    aiSummary: session.planCode === "professional" || session.planCode === "executive",
    aiExperience: session.planCode === "professional" || session.planCode === "executive",
    templates: session.planCode === "professional" || session.planCode === "executive",
    coverLetter: session.planCode === "executive",
    atsScore: true,
    pdfDownload: true,
  }}
/>
);
}