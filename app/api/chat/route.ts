import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: messages[messages.length - 1].content }] }]
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ reply: data.candidates[0].content.parts[0].text });
  } catch (error) {
    return NextResponse.json({ error: "System error" }, { status: 500 });
  }
}