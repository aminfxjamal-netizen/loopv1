import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { command, uid } = await request.json();

    if (!command || !uid) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isEmailIntent = command.toLowerCase().includes("email") || command.toLowerCase().includes("send");

    if (isEmailIntent) {
      return NextResponse.json({
        actionStaged: true,
        type: "GMAIL",
        payload: {
          to: "client@example.com",
          subject: "Project Update Coordination",
          body: "Hi there,\n\nFollowing up regarding our automated system pipeline logs.\n\nBest,\nLoop Agent",
        }
      });
    }

    return NextResponse.json({
      message: "Command parsed completely. No external validation sequences required."
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}