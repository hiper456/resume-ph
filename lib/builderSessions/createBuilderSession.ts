import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/server";

const supabase = createAdminClient();

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createBuilderSession({
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
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  const { data, error } = await supabase
    .from("builder_sessions")
    .insert({
      token_hash: tokenHash,
      payment_id: paymentId,
      resume_id: resumeId,
      email,
      plan_code: planCode,
      expires_at: expiresAt.toISOString(),
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    sessionId: data.id as string,
    token,
    builderUrl: `/builder/session/${token}`,
  };
}