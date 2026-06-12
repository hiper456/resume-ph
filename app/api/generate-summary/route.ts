import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
${body.skills.join(", ")}

Requirements:
- 3 concise sentences
- Professional tone
- ATS optimized
- No bullet points
- No first person language
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
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      summary: data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate summary.",
      },
      {
        status: 500,
      }
    );
  }
}