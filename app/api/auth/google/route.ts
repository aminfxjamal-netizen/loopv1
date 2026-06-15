// app/api/auth/google/route.ts
import { google } from "googleapis";
import { NextResponse } from "next/server";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET() {
  try {
    const scopes = [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/drive.readonly"
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline", 
      prompt: "consent",      
      scope: scopes,
    });

    return NextResponse.redirect(url);
  } catch (error: any) {
    console.error("Failed to generate Google Auth URL:", error);
    return NextResponse.json({ error: "Authentication configuration failed." }, { status: 500 });
  }
}