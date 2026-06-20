// app/api/auth/google/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("uid");

  // If the user ID didn't make it from the frontend, abort before hitting Google
  if (!userId) {
    return NextResponse.json({ error: "Missing user identification parameter context." }, { status: 400 });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI; // e.g., http://localhost:3000/api/auth/callback/google

  // Scope parameters define exactly what permissions our AI agent is requesting
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly"
  ].join(" ");

  // We map our custom userId directly onto Google's 'state' parameter.
  // Google will pass this string right back to our callback route completely untouched.
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
    `client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri!)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&state=${userId}` + // <--- Tracking link anchored here
    `&access_type=offline` + 
    `&prompt=consent`;

  return NextResponse.redirect(googleAuthUrl);
}