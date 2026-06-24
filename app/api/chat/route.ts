import { GoogleGenerativeAI } from "@google/generative-ai";

// Force Next.js to read your Vercel Dashboard variables live on every request
export const dynamic = 'force-dynamic';

const contacts: Record<string, string> = {
  john: "john@example.com",
  alice: "alice@example.com",
  brian: "brian@example.com"
};

export async function POST(req: Request) {
  try {
    // Read the Vercel key directly inside the execution function block
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { role: "assistant", content: "🚨 CONFIGURATION ERROR: GEMINI_API_KEY is missing from your Vercel dashboard variables." },
        { status: 500 }
      );
    }

    // Initialize SDK with the confirmed key
    const genAI = new GoogleGenerativeAI(apiKey);
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const cleanInput = lastMessage.trim().toLowerCase();

    // 1. Intercept Email Draft requests
    if (cleanInput.startsWith("@gmail draft")) {
      const words = cleanInput.split(" ");
      const toIndex = words.indexOf("to");
      const name = toIndex !== -1 && words[toIndex + 1] ? words[toIndex + 1] : "";
      const resolvedEmail = contacts[name] || "unknown@example.com";

      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are an executive assistant writing clean, concise email drafts. Output ONLY the raw body copy of the email."
      });

      const generationPrompt = `Write an optimized professional email draft based on this request: "${lastMessage}".`;
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

    // 2. Default Chat Execution Path
    const defaultModel = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are an elite, highly intelligent AI collaborator. Your tone is professional and direct."
    });

    const chatResult = await defaultModel.generateContent(lastMessage);
    const chatText = (await chatResult.response).text();
    
    return Response.json({ 
      role: "assistant", 
      content: chatText 
    });

  } catch (error: any) {
    console.error("Pipeline crash details:", error);
    return Response.json(
      { role: "assistant", content: `🚨 SERVER API ERROR: ${error.message || 'Verification sequence rejected.'}` },
      { status: 500 }
    );
  }
}