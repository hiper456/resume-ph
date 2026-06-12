import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

const supabase = createAdminClient();

export async function POST(request: Request) {
  try {
    const { paymentId } = await request.json();

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required." },
        { status: 400 }
      );
    }

    const { data: payment, error: paymentFetchError } = await supabase
      .from("payments")
      .select("id, resume_id")
      .eq("id", paymentId)
      .single();

    if (paymentFetchError) {
      throw new Error(paymentFetchError.message);
    }

    const { error: paymentUpdateError } = await supabase
      .from("payments")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
      })
      .eq("id", paymentId);

    if (paymentUpdateError) {
      throw new Error(paymentUpdateError.message);
    }

    const { error: resumeUpdateError } = await supabase
      .from("resumes")
      .update({
        status: "paid",
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment.resume_id);

    if (resumeUpdateError) {
      throw new Error(resumeUpdateError.message);
    }

    return NextResponse.json({
      success: true,
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