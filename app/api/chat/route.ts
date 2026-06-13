import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-specdec', // Premium ultra-fast orchestration model
        messages: [
          {
            role: 'system',
            content: `You are Loop, a premium, highly intelligent AI Operating System. 
            Users manage communication, files, scheduling, and work through natural conversation with you.
            
            Core Directives:
            - Your style is inspired by Stripe, Linear, and Apple design principles: clean, confident, professional, and calm.
            - Speak like a highly capable executive chief of staff. 
            - Keep responses concise, hyper-focused, and premium.
            - Avoid robotic prefaces, tech jargon, and emoji overload. 
            - Never reference underlying code, data structures, or system logs. Everything must feel deeply human.`
          },
          ...messages
        ],
        temperature: 0.3, 
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ error: `Groq Engine error: ${errorData}` }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || 'Loop encountered an processing anomaly.';

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}