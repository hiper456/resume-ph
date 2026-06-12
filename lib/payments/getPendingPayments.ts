import { createAdminClient } from "@/lib/supabase/server";

const supabase = createAdminClient();

export async function getPendingPayments() {
  const { data, error } = await supabase
    .from("payments")
    .select(`
      id,
      email,
      amount,
      payment_method,
      reference_number,
      status,
      created_at,
      resumes (
        id,
        status
      )
    `)
    .eq("status", "awaiting_verification")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}