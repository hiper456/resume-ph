import { createAdminClient } from "@/lib/supabase/server";

const supabase = createAdminClient();

function getCreditsForPlan(planCode: string) {
  if (planCode === "professional") return 5;
  if (planCode === "executive") return 10;
  return 0;
}

export async function createAiCredits({
  paymentId,
  resumeId,
  email,
  planCode,
}: {
  paymentId: string;
  resumeId: string | null;
  email: string;
  planCode: string;
}) {
  const totalCredits = getCreditsForPlan(planCode);

  const { data, error } = await supabase
    .from("ai_usage_credits")
    .insert({
      payment_id: paymentId,
      resume_id: resumeId,
      email,
      plan_code: planCode,
      total_credits: totalCredits,
      used_credits: 0,
    })
    .select("id, total_credits, used_credits")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}