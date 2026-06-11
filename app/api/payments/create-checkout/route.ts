import { NextResponse } from "next/server";
import { saveResume } from "@/lib/resumes/saveResume";
import { ResumeData } from "@/types/resume";
import { createPayment } from "@/lib/payments/createPayment";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resumeData = body.resumeData as ResumeData;

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
  amount: 99, // ₱99 MVP price
});

console.log("Payment created:", payment.id);

    return NextResponse.json({
      resumeId: savedResume.id,
      email: savedResume.email,
      status: savedResume.status,
      checkoutUrl: `/payment/manual?paymentId=${payment.id}`,
    });
  } catch (error) {
    console.error("CREATE CHECOUT ERROR:", error);

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