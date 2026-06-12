import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { isPlanCode } from "@/lib/plans/plans";

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();

    const paymentId =
      typeof body.paymentId === "string" ? body.paymentId : "";

    const requestedPlanCode =
      typeof body.planCode === "string"
        ? body.planCode.trim().toLowerCase()
        : "";

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required." },
        { status: 400 }
      );
    }

    if (!isPlanCode(requestedPlanCode)) {
      return NextResponse.json(
        { error: "Valid plan code is required." },
        { status: 400 }
      );
    }

    const { data: payment, error: paymentError } = await supabase
      .schema("public")
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
const { data: allPlans, error: allPlansError } = await supabase
  .schema("public")
  .from("plans")
  .select("id, code, name, price");

console.log("REQUESTED PLAN:", requestedPlanCode);
console.log("ALL PLANS FROM API:", allPlans);
console.log("ALL PLANS ERROR:", allPlansError);

const plan = allPlans?.find(
  (item) => item.code === requestedPlanCode
);

if (!plan) {
  return NextResponse.json(
    {
      error: `Selected plan not found: ${requestedPlanCode}. API sees: ${JSON.stringify(
        allPlans
      )}`,
    },
    { status: 404 }
  );
}

    const now = new Date().toISOString();

    const { error: paymentUpdateError } = await supabase
      .schema("public")
      .from("payments")
      .update({
        status: "paid",
        paid_at: now,
        plan_code: requestedPlanCode,
      })
      .eq("id", paymentId);

    if (paymentUpdateError) throw new Error(paymentUpdateError.message);

    const { error: resumeUpdateError } = await supabase
      .schema("public")
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