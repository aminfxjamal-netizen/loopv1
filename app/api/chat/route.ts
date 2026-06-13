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
        model: 'llama-3.3-70b-specdec',
        messages: messages, // Now sending the full array for "Brain" context
      }),
    });

    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0]?.message?.content });
  } catch (error) {
    return NextResponse.json({ reply: "I'm having trouble thinking. Please try again." }, { status: 500 });
  }
}