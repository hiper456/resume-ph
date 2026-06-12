import { NextResponse } from "next/server";
import { FEATURES, PermissionService } from "@/lib/permissions";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.resumeId) {
      return NextResponse.json(
        { error: "Resume ID is required." },
        { status: 400 }
      );
    }

    await PermissionService.requireFeature({
      resumeId: body.resumeId,
      feature: FEATURES.AI_SUMMARY,
    });

    const prompt = `
You are an expert resume writer.

Create a professional ATS-friendly summary.

Name:
${body.name}

Work Experience:
${JSON.stringify(body.experience)}

Education:
${JSON.stringify(body.education)}

Skills:
${body.skills?.join(", ") ?? ""}

Requirements:
- 3 concise sentences
- Professional tone
- ATS optimized
- No bullet points
- No first person language
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
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
      summary: data.choices?.[0]?.message?.content ?? "",
    });
  } catch (error) {
    console.error("GENERATE SUMMARY ERROR:", error);

    if (
      error instanceof Error &&
      error.message.includes("locked")
    ) {
      return NextResponse.json(
        {
          error: "Upgrade to Professional to use AI Summary.",
          code: "FEATURE_LOCKED",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate summary." },
      { status: 500 }
    );
  }
}