import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    
    // We use the 'gemini-1.5-flash' model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are Loop, a premium AI Operating System. Your tone is calm, intelligent, and professional. Never mention you are an AI. Provide direct, helpful, and concise responses."
    });

    const result = await model.generateContent(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Loop API Error:", error);
    return NextResponse.json({ error: "Failed to connect to the brain." }, { status: 500 });
  }
}