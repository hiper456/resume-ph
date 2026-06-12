import { createAdminClient } from "@/lib/supabase/server";
import { FeatureCode } from "./constants";

export class PermissionService {
  static async hasFeature({
    resumeId,
    feature,
  }: {
    resumeId: string;
    feature: FeatureCode;
  }): Promise<boolean> {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("resumes")
      .select(`
        id,
        plan_id
      `)
      .eq("id", resumeId)
      .single();

    if (error || !data?.plan_id) {
      console.log("PERMISSION RESUME ERROR:", { resumeId, error, data });
      return false;
    }

    const { data: rows, error: featureError } = await supabase
      .from("plan_features")
      .select(`
        features (
          code
        )
      `)
      .eq("plan_id", data.plan_id);

    if (featureError || !rows) {
      console.log("PERMISSION FEATURE ERROR:", {
        planId: data.plan_id,
        featureError,
        rows,
      });
      return false;
    }

    const featureCodes = rows
      .map((row: any) => row.features?.code)
      .filter(Boolean);

    const allowed = featureCodes.includes(feature);

    return allowed;
  }

  static async requireFeature({
    resumeId,
    feature,
  }: {
    resumeId: string;
    feature: FeatureCode;
  }): Promise<void> {
    const allowed = await this.hasFeature({ resumeId, feature });

    if (!allowed) {
      throw new Error(`Feature "${feature}" is locked for this resume.`);
    }
  }
}