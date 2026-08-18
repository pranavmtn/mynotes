import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get("oauth_state")?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(
      new URL("/?error=auth_failed", request.nextUrl.origin)
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL("/?error=auth_not_configured", request.nextUrl.origin)
    );
  }

  const redirectUri = new URL(
    "/api/auth/google/callback",
    request.nextUrl.origin
  ).toString();

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(
      new URL("/?error=auth_failed", request.nextUrl.origin)
    );
  }

  const tokens = (await tokenRes.json()) as { access_token: string };

  const userRes = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    { headers: { Authorization: `Bearer ${tokens.access_token}` } }
  );

  if (!userRes.ok) {
    return NextResponse.redirect(
      new URL("/?error=auth_failed", request.nextUrl.origin)
    );
  }

  const profile = (await userRes.json()) as {
    email: string;
    name: string;
    picture: string;
  };

  const token = await signSession({
    email: profile.email,
    name: profile.name,
    picture: profile.picture,
  });

  const response = NextResponse.redirect(
    new URL("/app", request.nextUrl.origin)
  );
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  response.cookies.delete("oauth_state");
  return response;
}
