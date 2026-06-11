import { ResumeData } from "@/types/resume";
import { supabase } from "@/lib/supabase/server";

export async function saveResume(resumeData: ResumeData) {
  const email = resumeData.personal.email?.trim().toLowerCase();

  if (!resumeData.id) {
    throw new Error("Resume ID is required.");
  }

  if (!email) {
    throw new Error("Email is required before checkout.");
  }

  const { data, error } = await supabase
    .from("resumes")
    .upsert(
      {
        id: resumeData.id,
        email,
        status: resumeData.status || "draft",
        data: resumeData,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "id",
      }
    )
    .select("id, email, status")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}