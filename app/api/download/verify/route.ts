import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { FEATURES } from "@/lib/permissions/constants";
import { PermissionService } from "@/lib/permissions/PermissionService";
import {
  getTemplateById,
  ResumeTemplateId,
} from "@/lib/templates/templates";

function isResumeTemplateId(value: unknown): value is ResumeTemplateId {
  return value === "basic" || value === "modern" || value === "executive";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const resumeId =
      typeof body.resumeId === "string" ? body.resumeId : "";

    const templateId: ResumeTemplateId = isResumeTemplateId(body.templateId)
      ? body.templateId
      : "basic";

    if (!resumeId) {
      return NextResponse.json(
        { error: "Missing resumeId" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data: resume, error } = await supabase
      .from("resumes")
      .select("id,status")
      .eq("id", resumeId)
      .single();

    if (error || !resume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    if (resume.status !== "paid") {
      return NextResponse.json(
        {
          code: "PAYMENT_REQUIRED",
          error: "Payment is required before downloading PDF.",
        },
        { status: 402 }
      );
    }

    await PermissionService.requireFeature({
      resumeId,
      feature: FEATURES.PDF_DOWNLOAD,
    });

    const selectedTemplate = getTemplateById(templateId);

    if (!selectedTemplate) {
      return NextResponse.json(
        { error: "Invalid templateId" },
        { status: 400 }
      );
    }

    if (selectedTemplate.requiredFeature) {
      await PermissionService.requireFeature({
        resumeId,
        feature: selectedTemplate.requiredFeature,
      });
    }

    return NextResponse.json({
      allowed: true,
    });
  } catch (error) {
    console.error("Download verification error:", error);

    return NextResponse.json(
      {
        code: "FEATURE_LOCKED",
        error: "This download is not allowed for the current plan.",
      },
      { status: 403 }
    );
  }
}