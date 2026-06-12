import { createAdminClient } from "@/lib/supabase/server";

const supabase = createAdminClient();

export async function createPayment({
  resumeId,
  email,
  amount,
}: {
  resumeId: string;
  email: string;
  amount: number;
}) {
  const { data, error } = await supabase
    .from("payments")
    .insert({
      resume_id: resumeId,
      email,
      amount,
      status: "pending",
      currency: "PHP",
      provider: "paymongo",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}