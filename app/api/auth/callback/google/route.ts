// app/api/auth/callback/google/route.ts
import { google } from "googleapis";
import { NextResponse } from "next/server";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET(request: Request) {
  try {
    // 1. Extract the temporary security code from Google's redirect URL
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Authorization code not returned from Google." }, { status: 400 });
    }

    // 2. Trade the temporary code for your permanent tokens
    const { tokens } = await oauth2Client.getToken(code);
    
    // This is the permanent key Loop needs to operate in the background!
    const refreshToken = tokens.refresh_token; 

    if (!refreshToken) {
      return NextResponse.json({ 
        error: "Failed to retrieve refresh token. If you connected before, remove Loop from your Google Security settings and try again." 
      }, { status: 400 });
    }

    // 3. For right now, we print it to the server console so you can see it working securely
    console.log("=========================================");
    console.log("SUCCESS! YOUR GOOGLE REFRESH TOKEN IS:", refreshToken);
    console.log("=========================================");

    // 4. Redirect the user back to your frontend dashboard
    // If your main screen is "/" instead of "/dashboard", just change the string below
    return NextResponse.redirect(new URL("/dashboard?google=connected", request.url));

  } catch (error: any) {
    console.error("OAuth Callback Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}