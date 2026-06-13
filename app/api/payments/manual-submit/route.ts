import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

const supabase = createAdminClient();

const PLAN_PRICES: Record<string, number> = {
  basic: 99,
  professional: 199,
  executive: 399,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const paymentId = String(body.paymentId || "");
    const planCode = String(body.planCode || "").toLowerCase();
    const resumeId = String(body.resumeId || "");
    const email = String(body.email || "").trim();
    const paymentMethod = String(body.paymentMethod || "GCash");
    const referenceNumber = String(body.referenceNumber || "").trim();

    if (!referenceNumber) {
      return NextResponse.json(
        { error: "Reference number is required." },
        { status: 400 }
      );
    }

    /**
     * Existing flow:
     * /payment/manual?paymentId=xxx
     */
    if (paymentId) {
      const { data, error } = await supabase
        .from("payments")
        .update({
          status: "awaiting_verification",
          payment_method: paymentMethod,
          reference_number: referenceNumber,
          submitted_at: new Date().toISOString(),
        })
        .eq("id", paymentId)
        .select("id, status, reference_number")
        .single();

      if (error) throw new Error(error.message);

      return NextResponse.json({
        success: true,
        payment: data,
      });
    }

    /**
     * New pricing-card flow:
     * /payment/manual?plan=professional
     */
    if (!planCode || !PLAN_PRICES[planCode]) {
      return NextResponse.json(
        { error: "Valid plan code is required." },
        { status: 400 }
      );
    }

    if (!resumeId) {
      return NextResponse.json(
        { error: "Resume ID is required." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("payments")
      .insert({
        resume_id: resumeId,
        email,
        amount: PLAN_PRICES[planCode],
        plan_code: planCode,
        status: "awaiting_verification",
        payment_method: paymentMethod,
        reference_number: referenceNumber,
        submitted_at: new Date().toISOString(),
      })
      .select("id, resume_id, email, amount, plan_code, status, reference_number")
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      success: true,
      payment: data,
    });
  } catch (error) {
    console.error("MANUAL PAYMENT SUBMIT ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit payment reference.",
      },
      { status: 500 }
    );
  }
}