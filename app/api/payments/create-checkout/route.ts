import { NextResponse } from "next/server";
import { saveResume } from "@/lib/resumes/saveResume";
import { ResumeData } from "@/types/resume";
import { createPayment } from "@/lib/payments/createPayment";
import { getPlanConfig, isPlanCode } from "@/lib/plans/plans";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const resumeData = body.resumeData as ResumeData;
    const planCode = isPlanCode(body.planCode) ? body.planCode : "basic";
    const plan = getPlanConfig(planCode);

    if (!resumeData) {
      return NextResponse.json(
        { error: "Resume data is required." },
        { status: 400 }
      );
    }

    const savedResume = await saveResume(resumeData);

    const payment = await createPayment({
      resumeId: savedResume.id,
      email: savedResume.email,
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