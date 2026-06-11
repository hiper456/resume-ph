import { NextResponse } from "next/server";
import { saveResume } from "@/lib/resumes/saveResume";
import { ResumeData } from "@/types/resume";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resumeData = body.resumeData as ResumeData;

    if (!resumeData) {
      return NextResponse.json(
        { error: "Resume data is required." },
        { status: 400 }
      );
    }

    const savedResume = await saveResume(resumeData);

    return NextResponse.json({
      resumeId: savedResume.id,
      email: savedResume.email,
      status: savedResume.status,
      checkoutUrl: "https://example.com/test-checkout",
    });
  } catch (error) {
    console.error("CREATE CHECOUT ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create checkout session.",
      },
      { status: 500 }
    );
  }
}