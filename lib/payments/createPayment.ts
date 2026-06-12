import { createAdminClient } from "@/lib/supabase/server";
import { PlanCode } from "@/lib/plans/plans";

const supabase = createAdminClient();

export async function createPayment({
  resumeId,
  email,
  amount,
  planCode,
}: {
  resumeId: string;
  email: string;
  amount: number;
  planCode: PlanCode;
}) {
  const { data, error } = await supabase
    .from("payments")
    .insert({
      resume_id: resumeId,
      email,
      amount,
      plan_code: planCode,
      status: "pending",
      currency: "PHP",
      provider: "manual",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}