import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Safety Check for Gemini API Key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is missing on server" }, { status: 500 });
    }

    // 2. Initialize Gemini SDK with your Key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 3. Configure Gemini 3.5 Flash with strict ChatGPT formatting instructions
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash",
      systemInstruction: `
        You are Loop, a premium and highly organized AI OS assistant. 
        
        CRITICAL FORMATTING RULES FOR READABILITY (CHATGPT STYLE):
        1. Use double line breaks (blank lines) between EVERY paragraph to create clean breathing room.
        2. Break complex information down into clearly labeled sections using Markdown headers (e.g., ## Section Title).
        3. Use bolding (**word**) to highlight key terms so the user can scan the text quickly.
        4. Use bullet points or numbered lists instead of long blocks of prose.
        5. Never return a solid wall of text. Spacing and structural clarity are absolute priorities.
      `
    });

    // 4. Map the standard chat history array to the schema Google expects
    const formattedMessages = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // 5. Extract the incoming prompt and initiate the session stream
    const latestMessage = formattedMessages.pop();
    if (!latestMessage) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const chat = model.startChat({
      history: formattedMessages,
    });

    const result = await chat.sendMessage(latestMessage.parts[0].text);
    const reply = result.response.text();

    return NextResponse.json({ reply: reply });
  } catch (error: any) {
    console.error("GEMINI API ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}