const nodemailer = require("nodemailer");

export const dynamic = "force-dynamic";

const dailyLimits: Map<string, number> = new Map();

export async function POST(req: Request) {
  try {
    const { to, subject, body, userId, gmailUser, gmailAppPassword } = await req.json();

    if (!to || !subject || !body || !userId) {
      return Response.json(
        { success: false, error: "Missing required fields: to, subject, body, userId" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return Response.json(
        { success: false, error: "Invalid recipient email address" },
        { status: 400 }
      );
    }

    const sender = gmailUser || process.env.GMAIL_USER;
    const password = gmailAppPassword || process.env.GMAIL_APP_PASSWORD;

    if (!sender || !password) {
      return Response.json(
        { success: false, error: "Gmail not configured. Connect your Gmail in the Connected Apps panel." },
        { status: 500 }
      );
    }

    const today = new Date().toISOString().split("T")[0];
    const limitKey = `${userId}-${today}`;
    const currentCount = dailyLimits.get(limitKey) || 0;

    if (currentCount >= 10) {
      return Response.json(
        {
          success: false,
          error: "Daily limit reached",
          message: "You've used all 10 messages for today. Your limit resets at midnight.",
          remaining: 0,
          limit: 10
        },
        { status: 429 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: sender,
        pass: password
      }
    });

    const info = await transporter.sendMail({
      from: sender,
      to: to,
      subject: subject,
      text: body
    });

    dailyLimits.set(limitKey, currentCount + 1);
    const remaining = 10 - (currentCount + 1);

    return Response.json({
      success: true,
      messageId: info.messageId,
      remaining: remaining,
      limit: 10,
      from: sender,
      message: `Email sent from ${sender} to ${to}. ${remaining} messages remaining today.`
    });

  } catch (error: any) {
    console.error("Send error:", error);
    return Response.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}