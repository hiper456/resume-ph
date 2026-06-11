import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { paymentId } = await request.json();

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("payments")
      .update({
        status: "rejected",
      })
      .eq("id", paymentId);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("REJECT PAYMENT ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to reject payment.",
      },
      { status: 500 }
    );
  }
}