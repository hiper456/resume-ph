import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
You are an expert ATS resume writer.

Rewrite the following job responsibilities into professional resume bullet points.

Position:
${body.position || "Not specified"}

Company:
${body.company || "Not specified"}

Current description:
${body.description}

Requirements:
- Return exactly 3 to 5 bullet points.
- Each bullet must start with "•".
- Use strong action verbs.
- Keep all facts truthful.
- Do not invent metrics, awards, certifications, or achievements.
- Improve grammar, clarity, and professional tone.
- Make it ATS-friendly.
- Maximum 22 words per bullet.
`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
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
          temperature: 0.4,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "OpenAI request failed." },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      description: data.choices?.[0]?.message?.content || "",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to improve experience." },
      { status: 500 }
    );
  }
}