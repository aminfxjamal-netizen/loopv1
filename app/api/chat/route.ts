import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const lastMessage = messages[messages.length - 1]?.content;

    if (!lastMessage) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Securely reads the key from Vercel's hidden environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "System Error: API Key missing" }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // The user's actual message
          contents: [{ parts: [{ text: lastMessage }] }],
          
          // The hidden core identity of your OS
          systemInstruction: {
            parts: [{ 
              text: "You are Loop, a premium AI Operating System. You manage communication, files, and scheduling. Your tone is calm, highly intelligent, concise, and effortless. Never talk about being an AI model developed by Google. Do not use excessive formatting or emojis. Speak like the interface of a billion-dollar company." 
            }]
          }
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || "Failed to reach the Brain" }, { status: response.status });
    }

    const aiReply = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ reply: aiReply });

  } catch (error: any) {
    console.error("Loop System Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}