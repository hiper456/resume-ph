import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ paymentId: string }> }
) {
  try {
    const { paymentId } = await context.params;
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("payments")
      .select("id, resume_id, email, amount, plan_code, status")
      .eq("id", paymentId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Payment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ payment: data });
  } catch (error) {
    console.error("GET PAYMENT ERROR:", error);

    return NextResponse.json(
      { error: "Unable to load payment." },
      { status: 500 }
    );
  }
}