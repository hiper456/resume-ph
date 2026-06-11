import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!password) {
    return NextResponse.json(
      { error: "Password is required." },
      { status: 400 }
    );
  }

const submittedPassword = String(password || "").trim();
const adminPassword = String(process.env.ADMIN_PASSWORD || "").trim();

if (submittedPassword !== adminPassword) {
  return NextResponse.json(
    { error: "Invalid password." },
    { status: 401 }
  );
}

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    name: "admin-auth",
    value: "authenticated",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return response;
}