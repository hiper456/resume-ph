import { NextResponse } from "next/server";
import { saveResume } from "@/lib/resumes/saveResume";
import { ResumeData } from "@/types/resume";
import { createPayment } from "@/lib/payments/createPayment";
import { getPlanConfig, isPlanCode } from "@/lib/plans/plans";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const bodyEmail =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const resumeData = body.resumeData as ResumeData | undefined;

    const resumeEmail =
      typeof resumeData?.personal?.email === "string"
        ? resumeData.personal.email.trim().toLowerCase()
        : "";

    const paymentEmail = bodyEmail || resumeEmail;

    const planCode = isPlanCode(body.planCode) ? body.planCode : "basic";
    const plan = getPlanConfig(planCode);

    if (!paymentEmail) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    let resumeId: string | null = null;

    if (resumeData) {
      const savedResume = await saveResume({
        ...resumeData,
        personal: {
          ...resumeData.personal,
          email: paymentEmail,
        },
      });

      resumeId = savedResume.id;
    }

    const payment = await createPayment({
      resumeId,
      email: paymentEmail,
      amount: plan.price,
      planCode: plan.code,
    });

    return NextResponse.json({
      checkoutUrl: `/payment/manual?paymentId=${payment.id}`,
      paymentId: payment.id,
      planCode: plan.code,
      amount: plan.price,
    });
  } catch (error) {
    console.error("CREATE CHECKOUT ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create checkout session.",
      },
      { status: 500 }
    );
  }
}