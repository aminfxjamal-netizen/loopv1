import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Safety Check
    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json({ error: "DEEPSEEK_API_KEY is missing on server" }, { status: 500 });
    }

    // Connect to DeepSeek
    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    });

    // Call the V4 Flash Model
    const completion = await openai.chat.completions.create({
      model: "deepseek-v4-flash", // <-- THIS IS THE ONLY LINE THAT CHANGED
      messages: [
        { 
          role: "system", 
          content: `
            You are Loop, a premium and highly organized AI OS assistant. 
            
            CRITICAL FORMATTING RULES FOR READABILITY:
            1. Use double line breaks (blank lines) between EVERY paragraph to create clean breathing room.
            2. Break complex information down into clearly labeled sections using Markdown headers (e.g., ## Section Title).
            3. Use bolding (**word**) to highlight key terms so the user can scan the text quickly.
            4. Use bullet points or numbered lists instead of long blocks of prose.
            5. Never return a solid wall of text. Spacing is priority.
          ` 
        },
        ...messages
      ],
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({ reply: reply });
  } catch (error: any) {
    console.error("DEEPSEEK ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}