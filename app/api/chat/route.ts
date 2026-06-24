import { GoogleGenerativeAI } from "@google/generative-ai";

// Forces Next.js to read your Vercel Dashboard variables live on every single request
export const dynamic = 'force-dynamic';

const contacts: Record<string, string> = {
  john: "john@example.com",
  alice: "alice@example.com",
  brian: "brian@example.com"
};

export async function POST(req: Request) {
  try {
    // 1. Pull the key inside the server execution block
    const apiKey = process.env.GEMINI_API_KEY;

    // If Vercel is hiding the key, return an explicit error directly to the chat screen
    if (!apiKey) {
      return Response.json(
        { role: "assistant", content: "🚨 SYSTEM BACKEND ERROR: GEMINI_API_KEY is missing or undefined in your Vercel Project Dashboard variables." },
        { status: 500 }
      );
    }

    // 2. Initialize the SDK with the verified dashboard key
    const genAI = new GoogleGenerativeAI(apiKey);
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const cleanInput = lastMessage.trim().toLowerCase();

    // 3. Intercept Email Draft Automation requests
    if (cleanInput.startsWith("@gmail draft")) {
      const words = cleanInput.split(" ");
      const toIndex = words.indexOf("to");
      const name = toIndex !== -1 && words[toIndex + 1] ? words[toIndex + 1] : "";
      const resolvedEmail = contacts[name] || "unknown@example.com";

      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash", 
        systemInstruction: "You are an executive assistant writing clean, concise email drafts. Output ONLY the raw body copy of the email. Do not include metadata, subjects, or robotic intro lines."
      });

      const generationPrompt = `Write an optimized professional email draft based on this request: "${lastMessage}". Ensure the layout uses clean paragraph breaks. Do not wrap text in quotes.`;
      
      const result = await model.generateContent(generationPrompt);
      const responseText = (await result.response).text().trim();

      return Response.json({
        role: "assistant",
        isDraft: true,
        recipient: resolvedEmail,
        subject: `Update from Loop Workspace`,
        content: responseText
      });
    }

    // 4. Default Agent Chat Path
    const defaultModel = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are an elite, highly intelligent AI collaborator. Your tone is professional, direct, and completely devoid of fluff."
    });

    const chatResult = await defaultModel.generateContent(lastMessage);
    const chatText = (await chatResult.response).text();
    
    return Response.json({ 
      role: "assistant", 
      content: chatText 
    });

  } catch (error: any) {
    console.error("Backend compiler error:", error);
    return Response.json(
      { role: "assistant", content: `🚨 GOOGLE API ERROR: ${error.message || 'Handshake rejected by Gemini platform.'}` },
      { status: 500 }
    );
  }
}