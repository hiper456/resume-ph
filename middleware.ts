import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login"
  ) {
    const cookie = request.cookies.get("admin-auth");

    if (!cookie || cookie.value !== "authenticated") {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};