import { createAdminClient } from "@/lib/supabase/server";

const supabase = createAdminClient();

export async function getPaymentAccess(paymentId: string) {
  const { data, error } = await supabase
    .from("payments")
    .select(
      `
      id,
      status,
      email,
      resume_id,
      plan_code,
      amount,
      resumes (
        id,
        status,
        data
      )
    `
    )
    .eq("id", paymentId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  const resume = Array.isArray(data.resumes)
    ? data.resumes[0]
    : data.resumes;

  return {
    paymentId: data.id,
    status: data.status as string,
    email: data.email as string,
    resumeId: data.resume_id as string | null,
    planCode: data.plan_code as string,
    amount: data.amount as number,
    resume: resume
      ? {
          id: resume.id as string,
          status: resume.status as string,
          data: resume.data,
        }
      : null,
  };
}