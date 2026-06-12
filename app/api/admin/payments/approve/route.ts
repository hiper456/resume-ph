import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { PLANS, type PlanCode } from "@/lib/permissions";

const VALID_PLAN_CODES = Object.values(PLANS);

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const { paymentId, planCode } = await request.json();

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required." },
        { status: 400 }
      );
    }

    if (!planCode || !VALID_PLAN_CODES.includes(planCode as PlanCode)) {
      return NextResponse.json(
        { error: "Valid plan code is required." },
        { status: 400 }
      );
    }

    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select("id, resume_id")
      .eq("id", paymentId)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json(
        { error: "Payment not found." },
        { status: 404 }
      );
    }

    const { data: plan, error: planError } = await supabase
      .from("plans")
      .select("id, code")
      .eq("code", planCode)
      .eq("active", true)
      .single();

    if (planError || !plan) {
      return NextResponse.json(
        { error: "Selected plan not found." },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();

    const { error: paymentUpdateError } = await supabase
      .from("payments")
      .update({
        status: "paid",
        paid_at: now,
      })
      .eq("id", paymentId);

    if (paymentUpdateError) throw new Error(paymentUpdateError.message);

    const { error: resumeUpdateError } = await supabase
      .from("resumes")
      .update({
        plan_id: plan.id,
        payment_status: "paid",
        approved_at: now,
        status: "paid",
        updated_at: now,
      })
      .eq("id", payment.resume_id);

    if (resumeUpdateError) throw new Error(resumeUpdateError.message);

    return NextResponse.json({
      success: true,
      planCode: plan.code,
    });
  } catch (error) {
    console.error("APPROVE PAYMENT ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to approve payment.",
      },
      { status: 500 }
    );
  }
}