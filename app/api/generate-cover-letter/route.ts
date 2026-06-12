import { NextResponse } from "next/server";
import { FEATURES, PermissionService } from "@/lib/permissions";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.resumeId?.trim()) {
      return NextResponse.json(
        { error: "Resume ID is required." },
        { status: 400 }
      );
    }

    await PermissionService.requireFeature({
      resumeId: body.resumeId,
      feature: FEATURES.COVER_LETTER,
    });

    const prompt = `
You are an expert recruiter and professional resume writer.

Write a polished, employer-ready cover letter based on the candidate's resume.

Candidate Name:
${body.name}

Professional Summary:
${body.summary || "Not provided"}

Work Experience:
${JSON.stringify(body.experience || [])}

Education:
${JSON.stringify(body.education || [])}

Skills:
${(body.skills || []).join(", ")}

Target Position:
${body.targetPosition || "General application"}

Requirements:
- 350 to 450 words
- Professional and confident tone
- ATS friendly
- No fabricated achievements
- No exaggerated claims
- No bullet points
- No first-person exaggeration
- Mention transferable skills when appropriate
- End with a strong call to action
- Ready to send to an employer
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "AI provider request failed." },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      coverLetter: data.choices?.[0]?.message?.content ?? "",
    });
  } catch (error) {
    console.error("GENERATE COVER LETTER ERROR:", error);

    if (error instanceof Error && error.message.includes("locked")) {
      return NextResponse.json(
        {
          error: "Upgrade to Professional to generate an AI Cover Letter.",
          code: "FEATURE_LOCKED",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate cover letter." },
      { status: 500 }
    );
  }
}