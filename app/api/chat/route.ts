import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "DEBUG: GEMINI_API_KEY is missing on server" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });


    const lastMessage = messages[messages.length - 1].content;
    const result = await model.generateContent(lastMessage);
    const response = await result.response;

    return NextResponse.json({ reply: response.text() });
  } catch (error: any) {
    // This will now send the EXACT error message to your browser screen
    return NextResponse.json({ error: "DEBUG ERROR: " + error.message }, { status: 500 });
  }
}