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
        plan_id,
        plans (
          plan_features (
            features (
              code
            )
          )
        )
      `)
      .eq("id", resumeId)
      .single();

    if (error || !data || !data.plans) {
      return false;
    }

    const plan = Array.isArray(data.plans) ? data.plans[0] : data.plans;

    const featureCodes =
      plan.plan_features?.map((item: any) => item.features.code) ?? [];

    return featureCodes.includes(feature);
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