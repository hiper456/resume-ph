import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/server";

const supabase = createAdminClient();

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function getBuilderSession(token: string) {
  if (!token) return null;

  const tokenHash = hashToken(token);

  const { data, error } = await supabase
    .from("builder_sessions")
    .select(
      `
      id,
      payment_id,
      resume_id,
      email,
      plan_code,
      expires_at,
      revoked_at,
      last_used_at,
      created_at
    `
    )
    .eq("token_hash", tokenHash)
    .single();

  if (error || !data) {
    return null;
  }

  if (data.revoked_at) {
    return null;
  }

  if (new Date(data.expires_at) < new Date()) {
    return null;
  }

  await supabase
    .from("builder_sessions")
    .update({
      last_used_at: new Date().toISOString(),
    })
    .eq("id", data.id);

  return {
    id: data.id as string,
    paymentId: data.payment_id as string,
    resumeId: data.resume_id as string | null,
    email: data.email as string,
    planCode: data.plan_code as string,
    expiresAt: data.expires_at as string,
  };
}