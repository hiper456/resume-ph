import { createAdminClient } from "@/lib/supabase/server";

export async function getAiCredits(sessionId: string) {
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("ai_usage_credits")
    .select("remaining_credits")
    .eq("builder_session_id", sessionId)
    .single();

  return data?.remaining_credits ?? 0;
}