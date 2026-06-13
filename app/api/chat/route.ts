import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Return the specific error from Groq so we know what's happening
      return NextResponse.json({ error: data.error?.message }, { status: response.status });
    }

    return NextResponse.json({ reply: data.choices[0]?.message?.content });
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to Brain" }, { status: 500 });
  }
}