import { ResumeData } from "@/types/resume";
import { createAdminClient } from "@/lib/supabase/server";

const supabase = createAdminClient();

export async function getPaidResume(paymentId: string) {
  const { data, error } = await supabase
    .from("payments")
    .select(`
      id,
      status,
      resume_id,
      resumes (
        id,
        email,
        status,
        data
      )
    `)
    .eq("id", paymentId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.status !== "paid") {
    return null;
  }

  const resume = Array.isArray(data.resumes)
    ? data.resumes[0]
    : data.resumes;

  if (!resume || resume.status !== "paid") {
    return null;
  }

  return {
    paymentId: data.id,
    resumeId: data.resume_id,
    resumeData: resume.data as ResumeData,
  };
}