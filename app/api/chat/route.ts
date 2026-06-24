import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the SDK using your pulled Vercel environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Temporary contact registry to mock resolution for the approval loop
const contacts: Record<string, string> = {
  john: "john@example.com",
  alice: "alice@example.com",
  brian: "brian@example.com"
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const cleanInput = lastMessage.trim().toLowerCase();

    // ==========================================
    // 1. ADVANCED INTERCEPTOR FOR EMAIL DRAFTS
    // ==========================================
    if (cleanInput.startsWith("@gmail draft")) {
      // Direct extraction layer to determine recipient name
      const words = cleanInput.split(" ");
      const toIndex = words.indexOf("to");
      const name = toIndex !== -1 && words[toIndex + 1] ? words[toIndex + 1] : "";
      const resolvedEmail = contacts[name] || "unknown@example.com";

      // Configure Gemini 3.5 Flash specifically for writing the draft block
      const model = genAI.getGenerativeModel({ 
        model: "gemini-3.5-flash",
        systemInstruction: "You are an executive assistant writing clean, concise email drafts. Output ONLY the raw body copy of the email. Do not include metadata, subjects, or robotic intro lines."
      });

      const generationPrompt = `Write an optimized professional email draft based on this request: "${lastMessage}". Ensure the layout uses clean paragraph breaks. Do not wrap text in quotes or provide alternative options.`;
      
      const result = await model.generateContent(generationPrompt);
      const responseText = (await result.response).text().trim();

      // Return structural data payload that matches your frontend message schema
      return Response.json({
        role: "assistant",
        isDraft: true,
        recipient: resolvedEmail,
        subject: `Update from Loop Workspace`,
        content: responseText
      });
    }

    // ==========================================
    // 2. DEFAULT CHAT PATH - FRONTIER CLASS
    // ==========================================
    // Leverage Gemini 3.5 Flash's reasoning capabilities for standard chat queries
    const defaultModel = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash",
      systemInstruction: `You are an elite, highly intelligent AI collaborator. Your tone is professional, direct, and completely devoid of fluff. You optimize for operational speed and accuracy. If the user mentions an action with an '@' trigger (like @gmail), guide them or trigger the functional response layout instantly.`
    });

    const chatResult = await defaultModel.generateContent(lastMessage);
    const chatText = (await chatResult.response).text();
    
    return Response.json({ 
      role: "assistant", 
      content: chatText 
    });

  } catch (error: any) {
    console.error("API error details:", error);
    return Response.json(
      { role: "assistant", content: `API processing failed: ${error.message || 'Unknown compilation error'}` },
      { status: 500 }
    );
  }
}