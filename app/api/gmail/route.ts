// app/api/gmail/route.ts
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { refreshToken, to, subject, body } = await request.json();

    if (!refreshToken || !to || !subject || !body) {
      return NextResponse.json({ error: "Missing required parameters." }, { status: 400 });
    }

    // 1. Set up the OAuth client using your master keys
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({ refresh_token: refreshToken });

    // 2. Initialize the official Google Gmail v1 Client
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // 3. Format the email into a standard RFC 2822 raw string
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
    const messageParts = [
      `To: ${to}`,
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${utf8Subject}`,
      "",
      body,
    ];
    const message = messageParts.join("\n");

    // Encode the message to base64url standard required by Google
    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // 4. BLAST IT! This sends the email directly instead of making a draft
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    return NextResponse.json({ success: true, message: "Email automatically sent via Gmail!" });

  } catch (error: any) {
    console.error("Gmail Sending Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}