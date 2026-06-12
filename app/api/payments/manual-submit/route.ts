import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

const supabase = createAdminClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const paymentId = String(body.paymentId || "");
    const paymentMethod = String(body.paymentMethod || "");
    const referenceNumber = String(body.referenceNumber || "").trim();

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required." },
        { status: 400 }
      );
    }

    if (!referenceNumber) {
      return NextResponse.json(
        { error: "Reference number is required." },
        { status: 400 }
      );
    }

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

    if (error) {
      throw new Error(error.message);
    }

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