import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = path.startsWith("/app");
  const isPublic = path === "/";

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (isPublic && session) {
    return NextResponse.redirect(new URL("/app", request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/app/:path*"],
};
